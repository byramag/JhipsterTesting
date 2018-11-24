-- CS313 - TA MANAGEMENT SYSTEM
-- ABIlGAIL BYRAM, NEIL WATSON, MATTHEW POINTER, MATTHEW TRAN

CREATE TABLE TA(
	studentName varchar(30) DEFAULT NULL,
	vNumber varchar(9,0) NOT NULL PRIMARY KEY,
	email varchar(30) DEFAULT NULL,
	classYear varchar(9) DEFAULT NULL,
	currentAssign varchar(10) DEFAULT NULL,
	previousAssign SET() DEFAULT NULL--incomplete
);

CREATE TABLE applicant(
	studentName varchar(30) DEFAULT NULL,
	vNumber varchar(9,0) NOT NULL PRIMARY KEY,
	email varchar(30) DEFAULT NULL,
	classYear varchar(9) DEFAULT NULL,
	taMotivation -- courseHistory
	requestedDuties 
	255request -- from applicant
	255confirm -- from referenced professor
	256request
	256confirm
	257request
	257confirm
);

CREATE TABLE course(
	courseName varchar(50) DEFAULT NULL,-- Intro to Programming
	courseDept varchar(4) DEFAULT NULL, -- CMSC
	courseNo decimal(3,0) NOT NULL PRIMARY KEY, -- 255
	courseDesc TEXT(500) DEFAULT NULL
	);

CREATE TABLE section (
	courseID
	crn decimal(5,0) NOT NULL PRIMARY KEY, -- sectID if crn is not unique per semester
	sectNo decimal (3,0) DEFAULT NULL,
	profName varchar(30) DEFAULT NULL,
	semester varchar(10) DEFAULT NULL,
	lectureTime varchar(20) DEFAULT NULL,
	labTime varchar(20) DEFAULT NULL,
	lectureRoom varchar(10) DEFAULT NULL,
	labRoom varchar(10) DEFAULT NULL,
	capacity decimal(4,0) DEFAULT NULL,
	FOREIGN KEY (profName) REFERENCES faculty (profName)
);

CREATE TABLE faculty(
	profID varchar(9,0) NOT NULL PRIMARY KEY -- or v number 
	profName varchar(30) DEFAULT NULL
	email varchar(30) DEFAULT NULL);

--Grading/Analytics tables if we can get the data
--Current tables are base


