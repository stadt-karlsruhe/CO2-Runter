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

After installing the Node modules you can start the Docker containers. To do this, run `docker-compose up --build`
inside
the main project directory. Then afterward all the containers should be running.

The client (with access to the API) should be accessible via `http://localhost:3050/` (NGINX)

The Adminer should be accessible via `http://localhost:8000/`.

Before everything works you need to load the data into the database. To do this you first need to log into the Adminer
using the following credentials:

Database System: `mysql_db`

Username: `root`

Password: `12345`

Database you want to access: `db_co2runter`

After logging in, copy the contents of `loader-new.sql` and paste it into the `SQL Command` query box in Adminer and
click `Execute`. Now you see in the table overview that all the tables have been filled with data. Now you just need to
create a `config.js` file in the `server` directory and past the contents of `config-template.js` into the newly
created `config.js`. Now everything is set up and should work.

Important: If you are using the Webstorm IDE from JetBrains, the configurations to start everything is already set up.
You just need to select the `Complete Repository Setup` configuration and then run it. Additionally, there are
configurations for starting the Docker containers and the client and server in development mode or production mode. But
you still need to create the `config.js` file.

### Developing the Frontend with Docker

To develop the client but still be able to get the data from backend and access the API, you just need to do a few
things.

Exactly for this reason there is a `docker-compose-client-development.yml` file. To start the client in development
mode,
run `docker compose -f docker-compose-client-development.yml up --build` inside the main project directory. Then
afterward the client should be accessible via `http://localhost:3050/` via nginx.

But because you are developing the client, you need to start the client in development mode. To do this,
run `npm run dev` inside the client directory. Then afterward the client should be accessible
via `http://localhost:3000/` and over the nginx server via `http://localhost:3050/`, where you can access the API.

### Popular Problems you might encounter

- If you forgot to insert data into the database, you will get an error message (probably a 500 error), therefore
  use the `loader-new.sql` and paste it into the `SQL Command` query box in Adminer

## Build Instructions for Production

    Change DB Password and Token Key in `docker-compose-pord.yml` to something new

    Run `docker compose -f docker-compose-prod.yml up --build` inside the main project directory

    To log in, use `mysql_db` as the server Username as `root` and password as the new Password.

    To start interacting with the application, open `http://localhost:9001/` on a browser.

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

## License

Creative Commons Legal Code

CC0 1.0 Universal

CREATIVE COMMONS CORPORATION IS NOT A LAW FIRM AND DOES NOT PROVIDE
LEGAL SERVICES. DISTRIBUTION OF THIS DOCUMENT DOES NOT CREATE AN
ATTORNEY-CLIENT RELATIONSHIP. CREATIVE COMMONS PROVIDES THIS
INFORMATION ON AN "AS-IS" BASIS. CREATIVE COMMONS MAKES NO WARRANTIES
REGARDING THE USE OF THIS DOCUMENT OR THE INFORMATION OR WORKS
PROVIDED HEREUNDER, AND DISCLAIMS LIABILITY FOR DAMAGES RESULTING FROM
THE USE OF THIS DOCUMENT OR THE INFORMATION OR WORKS PROVIDED
HEREUNDER.