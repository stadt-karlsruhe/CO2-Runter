CREATE TABLE IF NOT EXISTS `Users` (
  `user_ID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` binary(60) NOT NULL,
  PRIMARY KEY (user_ID)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `CO2Prints` (
  `print_ID` int NOT NULL AUTO_INCREMENT,
  `mobility` double,
  `housing` double,
  `consume` double,
  `nutrition` double,
  `date` date,
  PRIMARY KEY (print_ID)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `ComparisonPrints` (
  `com_print_ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50),
  `mobility` double,
  `housing` double,
  `consume` double,
  `nutrition` double,
  `totalPrint` double,
  `date` date,
  PRIMARY KEY (com_print_ID)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Districts` (
  `district_ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50),
  PRIMARY KEY (district_ID)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Carbon_Footprint_Groups` (
  `group_ID` int NOT NULL AUTO_INCREMENT,
  `groupname` varchar(50) NOT NULL,
  `groupcode` varchar(6) NOT NULL,
  `owner_ID` int NOT NULL,
  PRIMARY KEY (group_ID),
  FOREIGN KEY (owner_ID) REFERENCES Users(user_ID) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Prints_In_Districts` (
  `district_ID` int,
  `print_ID` int,
  FOREIGN KEY (district_ID) REFERENCES Districts(district_ID) ON DELETE CASCADE,
  FOREIGN KEY (print_ID) REFERENCES CO2Prints(print_ID) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Groupmemberships` (
  `user_ID` int NOT NULL, 
  `group_ID` int  NOT NULL,
   UNIQUE(user_ID,group_ID)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Prints_In_Carbon_Footprint_Groups` (
  `group_ID` int,
  `print_ID` int
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `Groupmemberships` ADD FOREIGN KEY (`user_ID`) REFERENCES `Users`(`user_ID`) ON DELETE CASCADE;
ALTER TABLE `Groupmemberships` ADD FOREIGN KEY (`group_ID`) REFERENCES `Carbon_Footprint_Groups`(`group_ID`) ON DELETE CASCADE;
ALTER TABLE `Prints_In_Carbon_Footprint_Groups` ADD FOREIGN KEY (`group_ID`) REFERENCES `Carbon_Footprint_Groups`(`group_ID`)ON DELETE CASCADE;
ALTER TABLE `Prints_In_Carbon_Footprint_Groups` ADD FOREIGN KEY (`print_ID`) REFERENCES `CO2Prints`(`print_ID`)ON DELETE CASCADE;

--Test data for all tables for testing purposes only (not for production use)

-- Test data for Users table
Insert into Users (username, email, password) Values ("TestUser1", "test1@mail.de", "kjansignzidd");
Insert into Users (username, email, password) Values ("TestUser2 ", "test2@mail.de", "wsfAEWQsd"); 
Insert into Users (username, email, password) Values ("TestUser3", "test3@mail.de", "ojsaINF^*%"); 
Insert into Users (username, email, password) Values ("TestUser4", "test4@mail.de", "ASK324E0-SADK"); 
Insert into Users (username, email, password) Values ("TestUser5", "test5@mail.de", "ASKD32=AFEFE");  

-- Test data for CO2Prints table
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (1.0, 2.0, 3.0, 4.0, "2020-01-01");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (2.0, 3.0, 4.0, 5.0, "2020-01-02");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (3.0, 4.0, 5.0, 6.0, "2020-01-03");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (4.0, 5.0, 6.0, 7.0, "2020-01-04");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (5.0, 6.0, 7.0, 8.0, "2020-01-05");

-- Test data for ComparisonPrints table
Insert into ComparisonPrints (name, mobility, housing, consume, nutrition, totalPrint, date) Values ("TestData1", 1.0, 2.0, 3.0, 4.0, 10.0, "2020-01-01");
Insert into ComparisonPrints (name, mobility, housing, consume, nutrition, totalPrint, date) Values ("TestData2", 2.0, 3.0, 4.0, 5.0, 14.0, "2020-01-02");
Insert into ComparisonPrints (name, mobility, housing, consume, nutrition, totalPrint, date) Values ("TestData3", 3.0, 4.0, 5.0, 6.0, 18.0, "2020-01-03");
Insert into ComparisonPrints (name, mobility, housing, consume, nutrition, totalPrint, date) Values ("TestData4", 4.0, 5.0, 6.0, 7.0, 22.0, "2020-01-04");
Insert into ComparisonPrints (name, mobility, housing, consume, nutrition, totalPrint, date) Values ("TestData5", 5.0, 6.0, 7.0, 8.0, 26.0, "2020-01-05");

-- Test data for Districts table
Insert into Districts (name) Values ("TestDistrict1");
Insert into Districts (name) Values ("TestDistrict2");
Insert into Districts (name) Values ("TestDistrict3");
Insert into Districts (name) Values ("TestDistrict4");
Insert into Districts (name) Values ("TestDistrict5");

-- Test data for Carbon_Footprint_Groups table
Insert into Carbon_Footprint_Groups (groupname, groupcode, owner_ID) Values ("TestGroup1", "13456", 1);
Insert into Carbon_Footprint_Groups (groupname, groupcode, owner_ID) Values ("TestGroup2", "65431", 2);
Insert into Carbon_Footprint_Groups (groupname, groupcode, owner_ID) Values ("TestGroup3", "12354", 3);
Insert into Carbon_Footprint_Groups (groupname, groupcode, owner_ID) Values ("TestGroup4", "45123", 4);
Insert into Carbon_Footprint_Groups (groupname, groupcode, owner_ID) Values ("TestGroup5", "79456", 5);

-- Test data for Prints_In_Districts table
Insert into Prints_In_Districts (district_ID, print_ID) Values (1, 1);
Insert into Prints_In_Districts (district_ID, print_ID) Values (1, 2);
Insert into Prints_In_Districts (district_ID, print_ID) Values (1, 3);
Insert into Prints_In_Districts (district_ID, print_ID) Values (2, 1);
Insert into Prints_In_Districts (district_ID, print_ID) Values (2, 2);

-- Test data for Groupmemberships table
Insert into Groupmemberships (group_ID, user_ID) Values (1, 1);
Insert into Groupmemberships (group_ID, user_ID) Values (1, 2);
Insert into Groupmemberships (group_ID, user_ID) Values (1, 3);
Insert into Groupmemberships (group_ID, user_ID) Values (2, 1);
Insert into Groupmemberships (group_ID, user_ID) Values (2, 2);
Insert into Groupmemberships (group_ID, user_ID) Values (1, 4);
Insert into Groupmemberships (group_ID, user_ID) Values (3, 2);
Insert into Groupmemberships (group_ID, user_ID) Values (4, 3);
Insert into Groupmemberships (group_ID, user_ID) Values (5, 1);
Insert into Groupmemberships (group_ID, user_ID) Values (5, 2);
Insert into Groupmemberships (group_ID, user_ID) Values (1, 1);

-- Test data for Prints_In_Carbon_Footprint_Groups table
Insert into Prints_In_Carbon_Footprint_Groups (group_ID, print_ID) Values (1, 1);
Insert into Prints_In_Carbon_Footprint_Groups (group_ID, print_ID) Values (1, 2);
Insert into Prints_In_Carbon_Footprint_Groups (group_ID, print_ID) Values (1, 3);
Insert into Prints_In_Carbon_Footprint_Groups (group_ID, print_ID) Values (2, 1);
Insert into Prints_In_Carbon_Footprint_Groups (group_ID, print_ID) Values (2, 2);
