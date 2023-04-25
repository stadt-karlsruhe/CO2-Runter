-- Test data for Users table
Insert into Users (username, email, password) Values ("TestUser1", "test1@mail.de", "kjansignzidd");
Insert into Users (username, email, password) Values ("TestUser2 ", "test2@mail.de", "wsfAEWQsd"); 
Insert into Users (username, email, password) Values ("TestUser3", "test3@mail.de", "ojsaINF^*%"); 
Insert into Users (username, email, password) Values ("TestUser4", "test4@mail.de", "ASK324E0-SADK"); 
Insert into Users (username, email, password) Values ("TestUser5", "test5@mail.de", "ASKD32=AFEFE");  

-- Test data for CO2Prints table with randomnumber between 1 and 5 for each value and date from 2020-01-01 to 2023-02-25
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (1.0, 2.0, 3.0, 4.0, "2020-01-01");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (2.0, 3.0, 4.0, 5.0, "2020-01-02");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (3.0, 4.0, 5.0, 6.0, "2020-01-03");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (4.0, 5.0, 6.0, 7.0, "2020-01-04");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (5.0, 6.0, 7.0, 8.0, "2020-01-05");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (1.0, 2.0, 3.0, 4.0, "2020-01-06");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (2.0, 3.0, 4.0, 5.0, "2020-01-07");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (3.0, 4.0, 5.0, 6.0, "2020-01-08");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (4.0, 5.0, 6.0, 7.0, "2020-01-09");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (5.0, 6.0, 7.0, 8.0, "2020-01-10");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (1.0, 2.0, 3.0, 4.0, "2020-01-11");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (2.0, 3.0, 4.0, 5.0, "2020-01-12");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (3.0, 4.0, 5.0, 6.0, "2020-01-13");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (4.0, 5.0, 6.0, 7.0, "2020-01-14");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (5.0, 6.0, 7.0, 8.0, "2020-01-15");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (1.0, 2.0, 3.0, 4.0, "2020-01-16");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (2.0, 3.0, 4.0, 5.0, "2020-01-17");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (3.0, 4.0, 5.0, 6.0, "2020-01-18");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (4.0, 5.0, 6.0, 7.0, "2020-01-19");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (5.0, 6.0, 7.0, 8.0, "2020-01-20");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (1.0, 2.0, 3.0, 4.0, "2020-01-21");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (2.0, 3.0, 4.0, 5.0, "2020-01-22");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (3.0, 4.0, 5.0, 6.0, "2020-01-23");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (4.0, 5.0, 6.0, 7.0, "2020-01-24");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (5.0, 6.0, 7.0, 8.0, "2020-01-25");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (1.0, 2.0, 3.0, 4.0, "2020-01-26");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (2.0, 3.0, 4.0, 5.0, "2020-01-27");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (3.0, 4.0, 5.0, 6.0, "2020-01-28");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (4.0, 5.0, 6.0, 7.0, "2020-01-29");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (5.0, 6.0, 7.0, 8.0, "2020-01-30");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (1.0, 2.0, 3.0, 4.0, "2020-01-31");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (2.0, 3.0, 4.0, 5.0, "2020-02-01");
Insert into CO2Prints (mobility, housing, consume, nutrition, date) Values (3.0, 4.0, 5.0, 6.0, "2020-02-02");


-- Test data for ComparisonPrints table
Insert into ComparisonPrints (name, mobility, housing, consume, nutrition, totalPrint, date) Values ("TestData1", 1.0, 2.0, 3.0, 4.0, 10.0, "2020-01-01");
Insert into ComparisonPrints (name, mobility, housing, consume, nutrition, totalPrint, date) Values ("TestData2", 2.0, 3.0, 4.0, 5.0, 14.0, "2020-01-02");
Insert into ComparisonPrints (name, mobility, housing, consume, nutrition, totalPrint, date) Values ("TestData3", 3.0, 4.0, 5.0, 6.0, 18.0, "2020-01-03");
Insert into ComparisonPrints (name, mobility, housing, consume, nutrition, totalPrint, date) Values ("TestData4", 4.0, 5.0, 6.0, 7.0, 22.0, "2020-01-04");
Insert into ComparisonPrints (name, mobility, housing, consume, nutrition, totalPrint, date) Values ("TestData5", 5.0, 6.0, 7.0, 8.0, 26.0, "2020-01-05");

-- Test data for Districts table
Insert into Districts (name) Values ("Knielingen");
Insert into Districts (name) Values ("Daxlanden");
Insert into Districts (name) Values ("Innenstadt-West");
Insert into Districts (name) Values ("Innenstadt-Ost");
Insert into Districts (name) Values ("Südstadt");
Insert into Districts (name) Values ("Palmbach");
Insert into Districts (name) Values ("Grünwettersbach");
Insert into Districts (name) Values ("Hohenwettersbach");
Insert into Districts (name) Values ("Wolfartsweier");
Insert into Districts (name) Values ("Rintheim");
Insert into Districts (name) Values ("Neureut");
Insert into Districts (name) Values ("Waldstadt");
Insert into Districts (name) Values ("Stupferich");
Insert into Districts (name) Values ("Durlach");
Insert into Districts (name) Values ("Grünwinkel");
Insert into Districts (name) Values ("Mühlburg");
Insert into Districts (name) Values ("Oberreut");
Insert into Districts (name) Values ("Grötzingen");
Insert into Districts (name) Values ("Hagsfeld");
Insert into Districts (name) Values ("Weiherfeld-Dammerstock");
Insert into Districts (name) Values ("Beiertheim-Bulach");
Insert into Districts (name) Values ("Südweststadt");
Insert into Districts (name) Values ("Weststadt");
Insert into Districts (name) Values ("Nordweststadt");
Insert into Districts (name) Values ("Nordstadt");
Insert into Districts (name) Values ("Oststadt");
Insert into Districts (name) Values ("Rüppurr");


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
Insert into Prints_In_Districts (district_ID, print_ID) Values (2, 4);
Insert into Prints_In_Districts (district_ID, print_ID) Values (2, 5);
Insert into Prints_In_Districts (district_ID, print_ID) Values (3, 6);
Insert into Prints_In_Districts (district_ID, print_ID) Values (4, 7);
Insert into Prints_In_Districts (district_ID, print_ID) Values (5, 8);
Insert into Prints_In_Districts (district_ID, print_ID) Values (6, 9);
Insert into Prints_In_Districts (district_ID, print_ID) Values (7, 10);
Insert into Prints_In_Districts (district_ID, print_ID) Values (8, 11);
Insert into Prints_In_Districts (district_ID, print_ID) Values (9, 12);
Insert into Prints_In_Districts (district_ID, print_ID) Values (10, 13);
Insert into Prints_In_Districts (district_ID, print_ID) Values (11, 14);
Insert into Prints_In_Districts (district_ID, print_ID) Values (12, 15);
Insert into Prints_In_Districts (district_ID, print_ID) Values (13, 16);
Insert into Prints_In_Districts (district_ID, print_ID) Values (14, 17);
Insert into Prints_In_Districts (district_ID, print_ID) Values (15, 18);
Insert into Prints_In_Districts (district_ID, print_ID) Values (16, 19);
Insert into Prints_In_Districts (district_ID, print_ID) Values (17, 20);
Insert into Prints_In_Districts (district_ID, print_ID) Values (18, 21);
Insert into Prints_In_Districts (district_ID, print_ID) Values (19, 22);
Insert into Prints_In_Districts (district_ID, print_ID) Values (20, 23);
Insert into Prints_In_Districts (district_ID, print_ID) Values (21, 24);
Insert into Prints_In_Districts (district_ID, print_ID) Values (22, 25);
Insert into Prints_In_Districts (district_ID, print_ID) Values (23, 26);
Insert into Prints_In_Districts (district_ID, print_ID) Values (24, 27);
Insert into Prints_In_Districts (district_ID, print_ID) Values (25, 28);
Insert into Prints_In_Districts (district_ID, print_ID) Values (26, 29);
Insert into Prints_In_Districts (district_ID, print_ID) Values (27, 30);
Insert into Prints_In_Districts (district_ID, print_ID) Values (27, 31);
Insert into Prints_In_Districts (district_ID, print_ID) Values (27, 32);
Insert into Prints_In_Districts (district_ID, print_ID) Values (27, 33);


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


