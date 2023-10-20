# CO2 Runter Web Application

An innovative web app that allows users to calculate and compare their personal carbon footprint, motivating them to
live more environmentally conscious and reduce their energy consumption.

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/) (recommended for easy setup)

## Development Setup with Docker

If you are using it is quite simple to set everything up.

First you need to install all the require Node modules. To do this, run `npm i` inside the client and server
directories.

For the client directory.

```bash
cd client
npm ci
```

Go back to the main directory

```bash
cd ..
```

Install the moduls in the server directory.

```bash
cd server
npm ic
```

After installing the Node moduls you can start the Docker containers. To do this, run `docker-compose up --build` inside
the main project directory. Then afterward all the containers should be running.

The client should be accessible via `http://localhost:3050/` via nginx.

The Adminer should be accessible via `http://localhost:8000/`.

Before everything works you need to load the data into the database. To do this you first need to log into the Adminer
using the following credentials:

Database System: `mysql_db`

Username: `root`

Password: `12345`

Database you want to access: `db_co2runter`

After logging in, copy the contents of `loader-new.sql` and paste it into the `SQL Command` query box in Adminer and
click `Execute`. Now you see in the tabler overview that all the tables have been filled with data. Now you just need to
create a `config.js` file in the `server` directory and past the contents of `config-template.js` into the newly
created `config.js`. Now everything is set up and should work.

Note: If you are using the Webstorm IDE from JetBrains, the configurations to start everything are already set up. You
just need to select the `Complete Repository Setup` configuration and then run it. Additionally, there are
configurations for starting the Docker containers and the client and server in development mode or production mode. But
you still need to create the `config.js` file.

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
> cp -r build/\* /var/www/html/co2runter/app/

Install the backend server like so:

> cd server
>
> npm i
>
> cp -r server/\* /var/www/html/co2runter/api/

Create the config file:

> cd /var/www/html/co2runter/api/
>
> cp config_template.js config.js

Edit the configuration in config.js

- Set database parameters according to your setup
- Set token key, e.g. 16 character random string

Initialize database

- Load setup.sql
- Load defaults.sql to get the comparison values for "Deutschland" and "Karlsruhe"

Start the service

> npm run start

### Setup process monitoring and autostart

... to be done ....

## Contribution Workflow

Contributing to the CO2 Runter Web Application is a straightforward process. Follow these steps for each feature, bug
fix, or other changes:

1. **Create a New Branch**: Start by creating a new branch for your feature or bug fix. Use the naming convention
   recommended by [Conventional Commits](https://www.conventionalcommits.org/):

   - For a new feature: `feat/your-feature-name`
   - For a bug fix: `fix/your-bug-name`
   - For a documentation update: `docs/your-documentation-update`

2. **Making Commits**: After creating the branch, make commits to it that encapsulate your work. Please ensure that each
   commit has a clear and descriptive message.

3. **Push Your Branch**: Once you've made your commits, push your branch to the remote repository.

4. **Create a Pull Request (PR)**: On GitHub, create a pull request from your branch. Follow the instructions provided
   in the pull request template.

5. **Review and Merge**: Your pull request will be reviewed by a team member or maintainer. Once it's approved, your
   changes will be merged into the main repository.

This workflow ensures a clean commit history and makes it easy for others to understand and review your contributions.
