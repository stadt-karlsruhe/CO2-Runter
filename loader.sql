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


