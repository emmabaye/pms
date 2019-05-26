# Population Management System API
[![Build Status](https://travis-ci.org/emmabaye/pms.svg?branch=develop)](https://travis-ci.org/emmabaye/pms)
[![Coverage Status](https://coveralls.io/repos/github/emmabaye/pms/badge.svg?branch=develop)](https://coveralls.io/github/emmabaye/pms?branch=develop)

Population Management System.  Contains a list of locations and the total number of residents in each location broken down by gender.

## Features
- Add location to parent location
- View specific location and its child locations
- View all locations
- Update a location
- Delete a location

## API Documentation
Documentation for this API can be found here [![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/3183791/S1TR6L7f?version=latest)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This applications runs on Windows, MacOS and Linux operating systems. You need to have the following installed to run this application.

- Nodejs >8.x.x
- PostgreSQL > v9.6.x Database

### Installation

```bash
# Clone this repository in your terminal
git clone https://github.com/emmabaye/pms.git my-project

# Change directory
cd my-project

# Install dependencies
npm install

```

Rename `sample.env` file with to `.env` and populate it with appropriate environment variable values, then proceed to the next step

```bash
# Migrate database models to postgreSQL database
npm run migrate

# Start application in development mode
npm run start-dev

# If you want to build for production
npm run build-server

# then start application in production mode
npm run start
```

### Running the tests and coverage

```bash
 # Run server-side tests
 npm run test
```

### Coding style tests

This application uses ESLint to lint ES6 code.

```bash
#Lint code
npm run lint
```

## Deployment

The scripts in package.json are setup for ease of deployment on Heroku or any nodejs hosting provider. Follow this tutorial if you need help, https://devcenter.heroku.com/articles/deploying-nodejs

## Built With

- [Nodejs](https://nodejs.org/en/) - JavaScript server-side engine
- [Expressjs](https://expressjs.com/) - Web framework
- [Sequelize](http://docs.sequelizejs.com/) - Object Relational Mapper
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Babel](https://babeljs.io/) - ES6 Transpiler
- [ESlint](https://eslint.org/) - ES6 linting
- [Mocha](https://mochajs.org/) - JavaScript testing framework
- [Supertest](https://v4-alpha.getbootstrap.com/) - For HTTP assertions in tests

## Contributing

Feel free to contribute to this repository. Your pull requests are welcomed

## Authors

- **Emmanuel Abaye** - [emmabaye](https://github.com/emmabaye)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Thanks to everyone that assisted me in building this application.

