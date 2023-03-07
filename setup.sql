CREATE TABLE IF NOT EXISTS `Users` (
  `user_ID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50),
  `email` varchar(50),
  `password` varchar(50),
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
  `disctrict_ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50),
  PRIMARY KEY (disctrict_ID)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Groups` (
  `group_ID` int NOT NULL AUTO_INCREMENT,
  `groupname` varchar(50),
  `groupcode` varchar(6) NOT NULL,
  `owner_ID` int,
  PRIMARY KEY (group_ID),
  FOREIGN KEY (owner_ID) REFERENCES Users(user_ID)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `PrintsInDistricts` (
  `disctrict_ID` int,
  `print_ID` int,
  FOREIGN KEY (disctrict_ID) REFERENCES Districts(disctrict_ID),
  FOREIGN KEY (print_ID) REFERENCES CO2Prints(print_ID)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `Groupmemberships` (
  `user_ID` int, 
  `group_ID` int
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `PrintsInGroups` (
  `group_ID` int,
  `print_ID` int
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `Groupmemberships` ADD FOREIGN KEY (`user_ID`) REFERENCES `Users`(`user_ID`);
ALTER TABLE `Groupmemberships` ADD FOREIGN KEY (`group_ID`) REFERENCES `Groups`(`group_ID`);
ALTER TABLE `PrintsInGroups` ADD FOREIGN KEY (`group_ID`) REFERENCES `Groups`(`group_ID`);
ALTER TABLE `PrintsInGroups` ADD FOREIGN KEY (`print_ID`) REFERENCES `CO2Prints`(`print_ID`);