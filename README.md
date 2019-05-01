# 2018-2019 CMSC 313: CS TA Management System

This project is to design a system for managing undergraduate teaching assistants at Virginia Commonwealth University's Computer Science department.

Team Members:
- Abigail Byram
- Neil Watson
- Matthew Pointer
- Matthew Tran

The main goals of this project: 
- creating a channel for communication between TAs and professors
- building a database of current and potential TAs along with records of student needs by class
- designing an integrated method assignment and supervision of grading
- organizing a method of TA recruitment and assigning TA duties to most effectively support students


## Project Components
- Database in Google Cloud Platform (GCP) MySQL: [Link to cloud console](https://console.cloud.google.com/sql/instances/myinstance/overview?project=cs313tams&authuser=1&folder&organizationId=138485386339&duration=PT1H)
  - Note that this database instance must be running for the web app to interact with it
  - There is an overhead cost to run this instance, keep track of the amount of funds left through the [Billing](https://console.cloud.google.com/billing/011928-A6FA78-0EC909/reports?project=cs313tams&authuser=1&organizationId=138485386339) section of the GCP console
- Web application for data interaction 
  - Jhipster web aplication which interacts with the GCP MySQL database
  - Application is in the docker container (which was built into the Jhipster application) and hosted on [GCP App Engine](https://console.cloud.google.com/appengine?authuser=1&organizationId=138485386339&project=cs313tams&serviceId=default&duration=PT1H)
- Mail server for web application using [MailGun](https://www.mailgun.com/)
  - This server is connected to the backend of the web app to allow sending emails through the app
  - Currently using a sandbox mail server, so for a permanent solution, a domain will be needed to maintain a permanent server [Read the docs here](https://documentation.mailgun.com/en/latest/quickstart-sending.html#how-to-verify-your-domain)

## Database description
See the file `Database/jhipster-jdl.jh` for descriptions of the specific entities and attributes as well as description of the relationships between entities. See The file `Documentation/EntityRelationshipDiagram` to visualize the relationships.


## Web Application Usage Directions
Follow the [JHipster Documentation](https://www.jhipster.tech/) for most information needed.

##### To run only the backend: 
- Run maven with `./mvnw` from the main JHipster directory
- This does not show active changes in the front end portion
##### To run only the front end:
- Run angular with `npm start` from the main JHipster directory
- This shows front end active updates, but by itself cannot connect to backend functions

For best results, run both maven and angular in separate terminals. See the [Running in Development Documentation](https://www.jhipster.tech/development/)  or see the README in the JHipsterApp directory for more information.

#### Making changes in web app configuration:
- To change the Mail server:
  - Go to `src/main/resources/config/application-dev.yml` in the JHipsterApp
  - Under `spring.mail`
    - set `host` to `smtp.mailgun.org`
    - set `port` to `587`
    - `username` and `password` can be found in the mailgun console as `Default SMTP Login` and `Default Password` respectively:
    ![mailgun](https://github.com/VCU-CS-Capstone/2018-CS-313-CS-TAManagement/blob/master/Documentation/mailgun.PNG)
  - Set the same values in `src/main/resources/config/application-prod.yml`
- To set the Database connection:
  - Create a user in the GCP console:
    ![GCPUser](https://github.com/VCU-CS-Capstone/2018-CS-313-CS-TAManagement/blob/master/Documentation/gcp_user.PNG)
  - Create a database in your GCP SQL instance by going to your instance -> databases -> create database
  - Go to `src/main/resources/config/application-dev.yml` in the JHipsterApp
  - Under `spring.datasource`
    - set `username` and `password` to the values from the user created in GCP
    - insert `<IP address>:3306/<Name of created database>` into `url`
  - Do the same in `src/main/resources/config/application-prod.yml` 
  - (or you can set up a local DB for development and only connect to the GCP DB when in prod to )
- To make changes to the database:
  - Make changes to the file `Database/jhipster-jdl.jh` by following the format described in the [Jhipster JDL Documentation](https://www.jhipster.tech/jdl/)
  - Next, run 
  `jhipster import-jdl ../Database/jhipster-jdl.jh` from the JhipsterApp directory
  - To make more extreme changes easier, or to generate a new ER Diagram go to the [JDL Studio](https://start.jhipster.tech/jdl-studio/) console to create the file and replace the files in this repo (note: you have to be signed in to save changes)
  - Note: more extreme database changes tend to break a lot of things, especially when there are data in the tables changed. Follow the directions in [Jhipster Liquibase docs](https://www.jhipster.tech/creating-an-entity/)
- Other changes to web app:
  - The web application protion of this project is in Angular, see [JHipster's Angular Docs](https://www.jhipster.tech/using-angular/) for description of the general organization, changing user roles, and building components

## Description of web app target functionality 
###### (and what needs to be done to reach the target)

### General Functionality
- TA Application on the home page when not logged in, adds an instance to the applicant table
- TA Handbook: a page available form anywhere, static text page with policy and directions about TAs

###### General TODOs:
- Formatting and changing UI of all pages for better usability, clarity, and user experience
- Expand the TA handbook and work with Debra Duke and/or the undergraduate committee to get approval of the handbook and get more ideas for useful information or policies
- Host application in Google App Engine (this has been attempted, but there is a problem with the `jhipster gae` command, alternate hosting locations are also an option)
- When logged in, all users can view their course list and open a course to see more detailed course information
- Add connections between DB instances which have relationships (e.g. keeping track of which sections are linked to a specific faculty, documents to sections/assignments, or TimeWindows to sections/TAs etc.) 

##### User Accounts and Registeration
###### TODOs:
- Get a permanent mail server domain so that registeration emails can be sent (sandbox domain requires extra authentication of the email form mailgun before mail can be sent)
- Include validation on registration for email to be a valid TA or faculty member
- Link a specific instance of TA or Faculty to a user automatically on registration (The DB relationship exists, but this currently has be be done manually)
- Stop the automatic login as anonymous user when not (this makes you have to log out again to be able to log in as a user or to access the TA application)

### TA Functionality
###### (Note: in terms of the app, TAs have a role `ROLE_USER`)

##### Update Information
TAs can update their information, especially for availabilities and qualifications at any time. Active TAs will be prompted by email to update new semester information at the start of each semester.

###### TODO:
- Implement notification for TA information update, send an email to all active TAs x number of days before the semester starts
- Improve input of availabilities with a calendar function (which correlates to TimeWindow instance(s))

##### View Assigned Grading
TAs can see the grading of specific assignments that the faculty has assigned to them. This includes assignment information and grading instructions. 

###### TODOs:
- Add option for TAs to update status on grading (e.g. "In Progress", "Completed")
- Make an easier integration of grading with this app using the `gradingLink` field for the assignment

##### Making Notes
TAs should be able to make a note on a section to get general messages to the faculty and/or other TAs to be on a long term record. The entity for TANotes is currently created but not being used.

### Faculty Functionality
###### (Note: in terms of the app, all faculty have a role `ROLE_ADMIN`)

Beyond the TA viewing ability, faculty can also make edits to courses and add new courses to the course list (these should be added to the faculty's sections, but this needs to be implemented). Faculty can also add documents to the section such as syllabus or list of students.

##### TA Selection
On the page for a specific section, faculty can click to select TAs for this section. On the selection page, the faculty sees a list of TAs, this can be limited to those  who are qualified for this course, those who are available to act as a specific role, and those who have availabilities at the times needed (this will take quite a bit of logic in the backend). Currently, the list only shows the list of all TAs. A specific "add TA to this section" function also still needs to be implemented.

###### TODOs:
- Implementing the filtering logic and schedule matching for the list of TAs
- Currently, the list only shows the list of all TAs. A specific "add TA to this section" function also still needs to be implemented.
- When a TA is selected for a course, an email notification should be send to that TA

##### Assignments and Grading
On a specific section, faculty for the section can create an assignment to be graded and assign TAs to grade these assignments or portions of them, keeping track of TA progress with the `status` field of the grading entity.
Documents can be added to the assignment for quick and easy description.

###### TODOs:
- Filtering list of TAs to assign grading to only those in this section who have a grading role
- When a TA is assigned grading, the TA should get an email notification, from which they can either accept or it or reject and send a message back to the faculty
- Document functionality is only partially implemented

##### Making Notes
Faculty should have the same ability as TAs to create a note to share information within a section, but also to make a note on a TA for more informed TA selection. This is not currently implemented.

### Admin Functionality
###### (Note: admin is defined as a faculty member with isAdmin set to true)

##### Applicant Review
An list of all unreviewed applicants with an ability to view each applicant, accept or reject them, and send a contact email to the applicant and to their faculty reference. When an applicant is accepted, the instance is deleted and the applicant information is added to the TA table. If reject, the applicant is only deleted.

###### TODOs:
- Increase usability of applicant list, view screens by only showing most useful values and formatting UI
- Implement email functionality to contact applicant or reference to get more information (currently email button leads back to the list)
- Automatically send an email to the applicant on the decision of the reviewer (accepted or rejected). If accepted, include onboarding information from the TA handbook

##### Database Management
This is a direct interaction interface to each entity in the database to allow admin to view, edit, and delete all data. No changes have to be made.

##### Website management
This is an analytics and settings funcitonality auto-generated by JHipster and can be useful for managing users and seeing performance data of the site. No changes have to be made.


