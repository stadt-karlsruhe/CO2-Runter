update ComparisonPrints set nutrition = 2.2 where name = "Karlsruhe";
update ComparisonPrints set consume = 2.9 where name = "Karlsruhe";
update ComparisonPrints set housing = 2.19 where name = "Karlsruhe";
update ComparisonPrints set mobility = 1.89 where name = "Karlsruhe";


delete from ComparisonPrints where name = "Deutschland";

 
alter table ComparisonPrints add column baseline double;
update ComparisonPrints set baseline = 1.12;



MariaDB [db_co2runter]> select * from ComparisonPrints;
+--------------+-------------+----------+---------+---------+-----------+------------+------------+
| com_print_ID | name        | mobility | housing | consume | nutrition | totalPrint | date       |
+--------------+-------------+----------+---------+---------+-----------+------------+------------+
|            1 | Deutschland |      2.2 |     2.7 |     3.4 |       1.7 |         10 | 2020-01-01 |
|            2 | Karlsruhe   |     1.89 |    2.19 |     2.9 |       2.2 |         11 | 2020-01-02 |
+--------------+-------------+----------+---------+---------+-----------+------------+------------+
2 rows in set (0.000 sec)

MariaDB [db_co2runter]>


