# Table of Contents

- [CO2 Runter Web Application](#co2-runter-web-application)
    - [Prerequisites](#prerequisites)
    - [Development Setup with Docker](#development-setup-with-docker)
        - [Setting Up Dependencies](#setting-up-dependencies)
        - [Starting Docker Containers](#starting-docker-containers)
        - [Using Webstorm IDE](#using-webstorm-ide)
        - [Developing the Frontend with Docker](#developing-the-frontend-with-docker)
        - [Common Issues](#common-issues)
    - [Build Instructions for Production](#build-instructions-for-production)
    - [Contribution Workflow](#contribution-workflow)
    - [License](#license)

# CO2 Runter Web Application

CO2 Runter Web Application is an innovative platform that empowers users to calculate and compare their personal carbon
footprint. By providing insights into energy consumption, it motivates users to adopt more environmentally conscious
lifestyles.

## Prerequisites

Before using the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)

## Development Setup with Docker

For all the development setup, you have to start Docker before running any commands.

### Using Webstorm IDE

If you're using Webstorm IDE, follow these steps:

1. Select the `Complete Repository Setup` configuration.
2. Run the configuration.

### Setting Up Dependencies

To set up the development environment, follow these steps:

1. Install Node modules:
    ```bash
    cd client
    npm ci
    cd ..
    cd server
    npm ci
    ```
2. Load the database schema:
    - Open Adminer at `http://localhost:8080/`.
    - Use `mysql_db` as the server, `root` as the username, and `12345` as the password.
    - and use `db_co2runter` as the database.
    - Import the `loader-new.sql` file into the database over the SQL command query box.
3. Create server config file
    - Create a new file named `config.json` in the `server` directory.
    - paste the content form the `config-template.js` into the `config.json` file.

### Starting Docker Containers

To start Docker containers, run the following command in the main project directory:

```bash
docker-compose up --build
```

### Developing the Frontend with Docker

To develop the client and access the API, use the following steps:

1. Start the client in development mode (start server, DB, NGINX, Adminer over Docker):
    ```bash
    docker compose -f docker-compose-client-development.yml up --build
    ```

2. Start the client:
    ```bash
    cd client
    npm run dev
    ```

### Common Issues

If you encounter errors, ensure you've loaded data into the database. Use `loader-new.sql` and paste it into the SQL
command query box in Adminer.

## Build Instructions for Production

Follow these steps to build the application for production:

1. Change DB Password and Token Key in `docker-compose-pord.yml` to something new.
2. Run:
    ```bash
    docker compose -f docker-compose-prod.yml up --build
    ```
3. To log in, use `mysql_db` as the server, `root` as the username, and the new password.
4. Access the application at `http://localhost:9001/`.

## Contribution Workflow

Contributing to CO2 Runter Web Application is easy:

1. **Create a New Branch**: Start a new branch for your feature, bug fix, or documentation update.
2. **Make Commits**: Make descriptive commits on your branch.
3. **Push Your Branch**: Push your branch to the remote repository.
4. **Create a Pull Request (PR)**: Create a PR on GitHub from your branch.
5. **Review and Merge**: Your PR will be reviewed and merged into the main repository.

## License

This project is licensed under the Creative Commons CC0 1.0 Universal License. For more details, see
the [LICENSE](https://github.com/stadt-karlsruhe/CO2-Runter?tab=CC0-1.0-1-ov-file) file.