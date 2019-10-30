//use SQLite3, it requires no setup of database server.

1. host docker for mssql server:
   `docker pull mcr.microsoft.com/mssql/server:2019-CTP3.2-ubuntu`
   or `sudo docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=<YourStrong@Passw0rd>" \ -p 1433:1433 --name sql1 \ -d mcr.microsoft.com/mssql/server:2019-CTP3.2-ubuntu`

   `connect: docker exec -it sql1 /opt/mssql-tools/bin/sqlcmd \ -S localhost -U SA -P "<YourStrong@Passw0rd>"`

2. create the table of Student and offeredClass
