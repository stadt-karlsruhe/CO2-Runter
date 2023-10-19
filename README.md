# CO2 Runter 

An innovative web app that allows users to calculate and compare their personal carbon footprint, motivating them to live more environmentally conscious and reduce their energy consumption.


## Build Instructions

    Run `npm i` inside the client directory

    Run `npm i` inside the server directory

    Run `docker-compose up --build` inside the mainn project directory

    Access the Adminer using route `http://localhost:8000/`.


    To log in, use `mysql_db` as the server Username as `root` and password as `12345`.

    To start interacting with the application, open `http://localhost:3050/` on a browser.

    To load data into the database copy the contents of `loader.sql` and paste it into the SQL query box in Adminer and click `Execute`.


## Build Instructions for Production

    Change DB Password and Token Key in `docker-compose-pord.yml` to something new 

    Run `docker compose -f docker-compose-prod.yml up --build` inside the main project directory

    To log in, use `mysql_db` as the server Username as `root` and password as the new Password.

    To start interacting with the application, open `http://localhost:9001/` on a browser.

## Install without Docker

With an existing mysql/mariadb server you can deploy client and server directly without docker. 

Database config expects your mysql ro run on the standard port 3306.

Assume the following directory setup with nginx

    * Client in /var/www/html/co2runter/app
    * Server in  /var/www/html/co2runter/api

Nginx config:

```
server {
    listen 80;
    server_name co2runter.<your domain>;
    return 301 https://$host$request_uri;
}

server {
        listen 443 ssl;
        server_name co2runter.<your domain>;
        location /api {
        rewrite /api/(.*) /$1 break;
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        }
        location / {
        root /var/www/html/co2runter/app;  #client/build;
        index index.html;
        try_files $uri /index.html;
        }
}

```



Build and install the frontend client like so:

> cd client 
> 
> npm i 
> 
> npm run build 
> 
> cp -r build/* /var/www/html/co2runter/app/ 
> 

Install the backend server like so:

> cd server 
> 
> npm i 
> 
> cp -r server/* /var/www/html/co2runter/api/ 
> 

Create the config file:

> cd /var/www/html/co2runter/api/ 
>
> cp config_template.js config.js
>

Edit the configuration in config.js

   * Set database parameters according to your setup
   * Set token key, e.g. 16 character random string

Initialize database

   * Load setup.sql
   * Load defaults.sql to get the comparison values for "Deutschland"  and "Karlsruhe"


Start the service

> npm run start
>

### Setup process monitoring and autostart

... to be done ....

