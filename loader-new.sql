-- MySQL dump 10.19  Distrib 10.3.38-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: db_co2runter
-- ------------------------------------------------------
-- Server version	10.3.38-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `CO2Prints`
--

DROP TABLE IF EXISTS `CO2Prints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CO2Prints` (
  `print_ID` int(11) NOT NULL AUTO_INCREMENT,
  `mobility` double DEFAULT NULL,
  `housing` double DEFAULT NULL,
  `consume` double DEFAULT NULL,
  `nutrition` double DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`print_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CO2Prints`
--

LOCK TABLES `CO2Prints` WRITE;
/*!40000 ALTER TABLE `CO2Prints` DISABLE KEYS */;
INSERT INTO `CO2Prints` VALUES (1,1,2,3,4,'2020-01-01'),(2,2,3,4,5,'2020-01-02'),(3,3,4,5,6,'2020-01-03'),(4,4,5,6,7,'2020-01-04'),(5,5,6,7,8,'2020-01-05'),(6,1,2,3,4,'2020-01-06'),(7,2,3,4,5,'2020-01-07'),(8,3,4,5,6,'2020-01-08'),(9,4,5,6,7,'2020-01-09'),(10,5,6,7,8,'2020-01-10'),(11,1,2,3,4,'2020-01-11'),(12,2,3,4,5,'2020-01-12'),(13,3,4,5,6,'2020-01-13'),(14,4,5,6,7,'2020-01-14'),(15,5,6,7,8,'2020-01-15'),(16,1,2,3,4,'2020-01-16'),(17,2,3,4,5,'2020-01-17'),(18,3,4,5,6,'2020-01-18'),(19,4,5,6,7,'2020-01-19'),(20,5,6,7,8,'2020-01-20'),(21,1,2,3,4,'2020-01-21'),(22,2,3,4,5,'2020-01-22'),(23,3,4,5,6,'2020-01-23'),(24,4,5,6,7,'2020-01-24'),(25,5,6,7,8,'2020-01-25'),(26,1,2,3,4,'2020-01-26'),(27,2,3,4,5,'2020-01-27'),(28,3,4,5,6,'2020-01-28'),(29,4,5,6,7,'2020-01-29'),(30,5,6,7,8,'2020-01-30'),(31,1,2,3,4,'2020-01-31'),(32,2,3,4,5,'2020-02-01'),(33,3,4,5,6,'2020-02-02'),(34,1.46,1.75,2.49,2.9,'2023-07-06'),(35,1.46,1.75,2.49,2.9,'2023-07-06'),(36,1.46,1.75,2.49,2.9,'2023-08-17');
/*!40000 ALTER TABLE `CO2Prints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Carbon_Footprint_Groups`
--

DROP TABLE IF EXISTS `Carbon_Footprint_Groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Carbon_Footprint_Groups` (
  `group_ID` int(11) NOT NULL AUTO_INCREMENT,
  `groupname` varchar(50) NOT NULL,
  `groupcode` varchar(6) NOT NULL,
  `owner_ID` int(11) NOT NULL,
  PRIMARY KEY (`group_ID`),
  KEY `owner_ID` (`owner_ID`),
  CONSTRAINT `Carbon_Footprint_Groups_ibfk_1` FOREIGN KEY (`owner_ID`) REFERENCES `Users` (`user_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Carbon_Footprint_Groups`
--

LOCK TABLES `Carbon_Footprint_Groups` WRITE;
/*!40000 ALTER TABLE `Carbon_Footprint_Groups` DISABLE KEYS */;
INSERT INTO `Carbon_Footprint_Groups` VALUES (1,'TestGroup1','13456',1),(2,'TestGroup2','65431',2),(3,'TestGroup3','12354',3),(4,'TestGroup4','45123',4),(5,'TestGroup5','79456',5),(6,'GRP1','86ZT6Q',7),(7,'GRP2','04U6S1',7);
/*!40000 ALTER TABLE `Carbon_Footprint_Groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ComparisonPrints`
--

DROP TABLE IF EXISTS `ComparisonPrints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ComparisonPrints` (
  `com_print_ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `mobility` double DEFAULT NULL,
  `housing` double DEFAULT NULL,
  `consume` double DEFAULT NULL,
  `nutrition` double DEFAULT NULL,
  `totalPrint` double DEFAULT NULL,
  `date` date DEFAULT NULL,
  `baseline` double DEFAULT NULL,
  PRIMARY KEY (`com_print_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ComparisonPrints`
--

LOCK TABLES `ComparisonPrints` WRITE;
/*!40000 ALTER TABLE `ComparisonPrints` DISABLE KEYS */;
INSERT INTO `ComparisonPrints` VALUES (2,'Karlsruhe',1.89,2.19,2.9,2.2,11,'2020-01-02',1.12);
/*!40000 ALTER TABLE `ComparisonPrints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Districts`
--

DROP TABLE IF EXISTS `Districts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Districts` (
  `district_ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`district_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Districts`
--

LOCK TABLES `Districts` WRITE;
/*!40000 ALTER TABLE `Districts` DISABLE KEYS */;
INSERT INTO `Districts` VALUES (1,'Knielingen'),(2,'Daxlanden'),(3,'Innenstadt-West'),(4,'Innenstadt-Ost'),(5,'Südstadt'),(6,'Palmbach'),(7,'Grünwettersbach'),(8,'Hohenwettersbach'),(9,'Wolfartsweier'),(10,'Rintheim'),(11,'Neureut'),(12,'Waldstadt'),(13,'Stupferich'),(14,'Durlach'),(15,'Grünwinkel'),(16,'Mühlburg'),(17,'Oberreut'),(18,'Grötzingen'),(19,'Hagsfeld'),(20,'Weiherfeld-Dammerstock'),(21,'Beiertheim-Bulach'),(22,'Südweststadt'),(23,'Weststadt'),(24,'Nordweststadt'),(25,'Nordstadt'),(26,'Oststadt'),(27,'Rüppurr'),(28,'Knielingen'),(29,'Daxlanden'),(30,'Innenstadt-West'),(31,'Innenstadt-Ost'),(32,'Südstadt'),(33,'Palmbach'),(34,'Grünwettersbach'),(35,'Hohenwettersbach'),(36,'Wolfartsweier'),(37,'Rintheim'),(38,'Neureut'),(39,'Waldstadt'),(40,'Stupferich'),(41,'Durlach'),(42,'Grünwinkel'),(43,'Mühlburg'),(44,'Oberreut'),(45,'Grötzingen'),(46,'Hagsfeld'),(47,'Weiherfeld-Dammerstock'),(48,'Beiertheim-Bulach'),(49,'Südweststadt'),(50,'Weststadt'),(51,'Nordweststadt'),(52,'Nordstadt'),(53,'Oststadt'),(54,'Rüppurr');
/*!40000 ALTER TABLE `Districts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Groupmemberships`
--

DROP TABLE IF EXISTS `Groupmemberships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Groupmemberships` (
  `user_ID` int(11) NOT NULL,
  `group_ID` int(11) NOT NULL,
  UNIQUE KEY `user_ID` (`user_ID`,`group_ID`),
  KEY `group_ID` (`group_ID`),
  CONSTRAINT `Groupmemberships_ibfk_1` FOREIGN KEY (`user_ID`) REFERENCES `Users` (`user_ID`) ON DELETE CASCADE,
  CONSTRAINT `Groupmemberships_ibfk_2` FOREIGN KEY (`group_ID`) REFERENCES `Carbon_Footprint_Groups` (`group_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Groupmemberships`
--

LOCK TABLES `Groupmemberships` WRITE;
/*!40000 ALTER TABLE `Groupmemberships` DISABLE KEYS */;
INSERT INTO `Groupmemberships` VALUES (1,1),(1,2),(1,5),(2,1),(2,2),(2,3),(2,5),(3,1),(3,4),(4,1),(7,6),(7,7);
/*!40000 ALTER TABLE `Groupmemberships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Prints_In_Carbon_Footprint_Groups`
--

DROP TABLE IF EXISTS `Prints_In_Carbon_Footprint_Groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Prints_In_Carbon_Footprint_Groups` (
  `group_ID` int(11) DEFAULT NULL,
  `print_ID` int(11) DEFAULT NULL,
  UNIQUE KEY `unique_combination` (`group_ID`,`print_ID`),
  KEY `print_ID` (`print_ID`),
  CONSTRAINT `Prints_In_Carbon_Footprint_Groups_ibfk_1` FOREIGN KEY (`group_ID`) REFERENCES `Carbon_Footprint_Groups` (`group_ID`) ON DELETE CASCADE,
  CONSTRAINT `Prints_In_Carbon_Footprint_Groups_ibfk_2` FOREIGN KEY (`print_ID`) REFERENCES `CO2Prints` (`print_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Prints_In_Carbon_Footprint_Groups`
--

LOCK TABLES `Prints_In_Carbon_Footprint_Groups` WRITE;
/*!40000 ALTER TABLE `Prints_In_Carbon_Footprint_Groups` DISABLE KEYS */;
INSERT INTO `Prints_In_Carbon_Footprint_Groups` VALUES (7,35);
/*!40000 ALTER TABLE `Prints_In_Carbon_Footprint_Groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Prints_In_Districts`
--

DROP TABLE IF EXISTS `Prints_In_Districts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Prints_In_Districts` (
  `district_ID` int(11) DEFAULT NULL,
  `print_ID` int(11) DEFAULT NULL,
  KEY `district_ID` (`district_ID`),
  KEY `print_ID` (`print_ID`),
  CONSTRAINT `Prints_In_Districts_ibfk_1` FOREIGN KEY (`district_ID`) REFERENCES `Districts` (`district_ID`) ON DELETE CASCADE,
  CONSTRAINT `Prints_In_Districts_ibfk_2` FOREIGN KEY (`print_ID`) REFERENCES `CO2Prints` (`print_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Prints_In_Districts`
--

LOCK TABLES `Prints_In_Districts` WRITE;
/*!40000 ALTER TABLE `Prints_In_Districts` DISABLE KEYS */;
INSERT INTO `Prints_In_Districts` VALUES (1,1),(1,2),(1,3),(2,4),(2,5),(3,6),(4,7),(5,8),(6,9),(7,10),(8,11),(9,12),(10,13),(11,14),(12,15),(13,16),(14,17),(15,18),(16,19),(17,20),(18,21),(19,22),(20,23),(21,24),(22,25),(23,26),(24,27),(25,28),(26,29),(27,30),(27,31),(27,32),(27,33),(4,34),(4,35),(3,36);
/*!40000 ALTER TABLE `Prints_In_Districts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `user_ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` char(60) NOT NULL,
  PRIMARY KEY (`user_ID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'TestUser1','test1@mail.de','kjansignzidd'),(2,'TestUser2 ','test2@mail.de','wsfAEWQsd'),(3,'TestUser3','test3@mail.de','ojsaINF^*%'),(4,'TestUser4','test4@mail.de','ASK324E0-SADK'),(5,'TestUser5','test5@mail.de','ASKD32=AFEFE'),(6,'xy','x@y.de','$2a$10$hY5HhZ6bjKvwDWGYyfXLFe2TO5CgsRjrcrP1wLBp08hLP0ZkzT8/u'),(7,'xyz','xyz@y.de','$2a$10$q4tT88HgE2dFl7k9.wzTRuNp4zfXpcEfiBY2zVBzJKYov..igbWOa');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-27 15:31:31
