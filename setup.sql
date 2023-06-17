CREATE TABLE IF NOT EXISTS `Users` (
  `user_ID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL UNIQUE,
  `password` char(60) NOT NULL,
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
  `print_ID` int,
  UNIQUE KEY `unique_combination` (`group_ID`, `print_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `Prints_In_Carbon_Footprint_Groups`
  ADD FOREIGN KEY (`group_ID`) REFERENCES `Carbon_Footprint_Groups` (`group_ID`) ON DELETE CASCADE,
  ADD FOREIGN KEY (`print_ID`) REFERENCES `CO2Prints` (`print_ID`) ON DELETE CASCADE;

ALTER TABLE `Groupmemberships` ADD FOREIGN KEY (`user_ID`) REFERENCES `Users`(`user_ID`) ON DELETE CASCADE;
ALTER TABLE `Groupmemberships` ADD FOREIGN KEY (`group_ID`) REFERENCES `Carbon_Footprint_Groups`(`group_ID`) ON DELETE CASCADE;

