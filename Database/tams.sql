-- CS313 - TA MANAGEMENT SYSTEM
-- ABIlGAIL BYRAM, NEIL WATSON, MATTHEW POINTER, MATTHEW TRAN
-- gcloud sql connect myinstance --user=root
-- PASSWORD: vcu

CREATE TABLE applicant(
	studentName varchar(30) DEFAULT NULL,
	vNumber varchar(9) NOT NULL PRIMARY KEY,
	email varchar(30) DEFAULT NULL,
	classYear varchar(9) DEFAULT NULL,
	taMotivation varchar(500) DEFAULT NULL,-- courseHistory
	refName varchar(30) DEFAULT NULL,
	refEmail varchar(30) DEFAULT NULL,
	refResponse varchar(500) DEFAULT NULL,
	isConfirmed boolean DEFAULT NULL,-- from referenced professor
	
	request255 boolean DEFAULT NULL,-- from applicant
	request256 boolean DEFAULT NULL,
	request257 boolean DEFAULT NULL);

CREATE TABLE TA(
	studentName varchar(30) DEFAULT NULL,
	vNumber varchar(9) NOT NULL PRIMARY KEY,
	email varchar(30) DEFAULT NULL,
	classYear varchar(9) DEFAULT NULL,
	currentAssign varchar(10) DEFAULT NULL,
	previousAssign varchar(100) DEFAULT NULL,
	ptdLabTA boolean DEFAULT NULL,
	ptdClassTA boolean DEFAULT NULL,
	ptdTestGrade boolean DEFAULT NULL,
	ptdProjectGrade boolean DEFAULT NULL,
	ptdOfficeHours boolean DEFAULT NULL); 
	
CREATE TABLE faculty(
	profID varchar(9) NOT NULL PRIMARY KEY,-- or v number 
	profName varchar(30) DEFAULT NULL,
	email varchar(30) DEFAULT NULL);

CREATE TABLE course(
	courseName varchar(50) DEFAULT NULL,-- Intro to Programming
	courseDept varchar(4) DEFAULT NULL, -- CMSC
	courseNo decimal(3,0) NOT NULL PRIMARY KEY, -- 255
	courseDesc varchar(500) DEFAULT NULL);

CREATE TABLE section(
	crn decimal(5,0) NOT NULL PRIMARY KEY, -- sectID if crn is not unique per semester
	sectNo decimal (3,0) DEFAULT NULL,
	profID varchar(9) DEFAULT NULL,
	semester varchar(20) DEFAULT NULL,
	lectureTime varchar(20) DEFAULT NULL,
	labTime varchar(20) DEFAULT NULL,
	lectureRoom varchar(20) DEFAULT NULL,
	labRoom varchar(20) DEFAULT NULL,
	capacity decimal(4,0) DEFAULT NULL,
	FOREIGN KEY (profID) REFERENCES faculty (profID));


INSERT INTO applicant VALUES
	('Abigail Byram','V00701835','byramag@vcu.edu','Senior','Because I want to','Debra Duke','s2dmduke@vcu.edu',null,0,1,1,1);
	
INSERT INTO TA VALUES
	('John Doe','V00123456','doej@vcu.edu','Junior','257','255,256',1,1,1,1,0),
	('Neil Watson','V00698622','watsonns@vcu.edu','Senior','255',null,0,1,1,0,1);



INSERT INTO faculty VALUES
	('1','Debra Duke','s2dmduke@vcu.edu'),
	('2','Caroline Budwell','ccbudwell@vcu.edu'),
	('3','IRFAN AHMED','iahmed3@vcu.edu'),
	('4','TOMASZ ARODZ','tarodz@vcu.edu'),
	('5','EYUPHAN BULUT','ebulut@vcu.edu'),
	('6','ALBERTO CANO','acano@vcu.edu'),
	('7','KRZYSZTOF CIOS','kcios@vcu.edu'),
	('8','ROBERT DAHLBERG,','dahlbergra@vcu.edu'),
	('9','KOSTADIN DAMEVSKI','kdamevski@vcu.edu'),
	('10','THANG DINH','tndinh@vcu.edu'),
	('11','CAROL FUNG','cfung@vcu.edu'),
	('12','PREETAM GHOSH','pghosh@vcu.edu'),
	('13','VOJISLAV KECMAN','vkecman@vcu.edu'),
	('14','BARTOSZ KRAWCZYK','bkrawczyk@vcu.edu'),
	('15','LUKASZ KURGAN','lkurgan@vcu.edu'),
	('16','JOHN D. LEONARD II','jdleonard@vcu.edu'),
	('17','CHANGQING LUO','cluo@vcu.edu'),
	('18','MILOS MANIC','misko@vcu.edu'),
	('19','BRIDGET MCINNES','btmcinnes@vcu.edu'),
	('20','TAMER NADEEM','tnadeem@vcu.edu'),
	('21','ZACHARY WHITTEN','zwhitten@vcu.edu'),
	('22','TARYNN WITTEN','tmwitten@vcu.edu'),
	('23','CANG YE','cye@vcu.edu'),
	('24','HONG-SHENG ZHOU','hszhou@vcu.edu');

INSERT INTO course VALUES
	('Intro to Programming','CMSC','255','Introduction to object-oriented programming using Java. '),
	('Data Structures and Object Oriented Programming','CMSC','256','Advanced programming using Java.'),
	('Computer Systems','CMSC','257','C Programming and Advanced topics');

INSERT INTO section VALUES
	(36067,001,'1','Fall 2018','TR 12:30pm-01:45pm','W 11:00am-12:50pm','EGRB2 E2214','EGRB2 E1239',30),
	(28934,002,'1','Fall 2018','TR 12:30pm-01:45pm','W 1:00pm-2:50pm','EGRB2 E2214','EGRB2 E1239',30);

	
--Grading/Analytics tables if we can get the data
--Current tables are base


