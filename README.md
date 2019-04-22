# 2018-2019 CMSC 313: CS TA Management System

This project is to design a system for managing undergraduate teaching assistants at Virginia Commonwealth University's Compuater Science department.

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
  - Go to `***` in the JHipsterApp
  - Set `***` to `***`
- To set the Database connection:
  - Go to `***` in the JHipsterApp
  - Set `***` to `***`
- To make changes to the database:
  - Make changes to the file `Database/jhipster-jdl.jh` by following the format described in the [Jhipster JDL Documentation](https://www.jhipster.tech/jdl/)
  - Next, run 
  `jhipster import-jdl ../Database/jhipster-jdl.jh` from the JhipsterApp directory
  - To make more extreme changes easier, or to generate a new ER Diagram go to the [JDL Studio](https://start.jhipster.tech/jdl-studio/) console to create the file and replace the files in this repo (note: you have to be signed in to save changes)
  - Note: more extreme database changes tend to break a lot of things, especially when there are data in the tables changed. Follow the directions in [Jhipster Liquibase docs](https://www.jhipster.tech/creating-an-entity/)
- Other changes to web app:
  - The web application protion of this project is in Angular, see [JHipster's Angular Docs](https://www.jhipster.tech/using-angular/) for description of the general organization, changing user roles, and building components

## Description of web app target functionality 
######(and what needs to be done to reach the target)

- 


