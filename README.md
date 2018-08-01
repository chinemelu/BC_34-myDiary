[![Build Status](https://travis-ci.org/chinemelu/BC_34-myDiary.svg?branch=develop)](https://travis-ci.org/chinemelu/BC_34-myDiary)[![Coverage Status](https://coveralls.io/repos/github/chinemelu/BC_34-myDiary/badge.svg?branch=develop)](https://coveralls.io/github/chinemelu/BC_34-myDiary?branch=develop&service=github)
[![Maintainability](https://api.codeclimate.com/v1/badges/37e7f8cade3573f23a57/maintainability)](https://codeclimate.com/github/chinemelu/BC_34-myDiary/maintainability)

# BC_34-myDiary
MyDiary is an online journal where users can pen down their thoughts and feelings

## Getting Started
* Click on the "Clone or download" button.
* You can decide to download the zip file of the app onto the system or you can clone the repository from the terminal
* If you decide to clone the repository from the terminal, navigate to a directory of your choice on that terminal.
* Using SSH; copy and paste the following below on your terminal
`git@github.com:chinemelu/BC_34-myDiary.git`
* Using HTTPS; copy and paste the following below on your terminal
>```https://github.com/chinemelu/BC_34-myDiary.git```

## Running the tests
* The tests have been written using Mocha and Chai.
* cd into the folder
* Write the following command on terminal.
* ```npm test```
* If the tests are successful, they will complete without failures or errors.
  ```
  .........
  ----------------------------------------------------------------------
    60 passing
  ```

## Deployment
* copy this link `https://bc-34-my-app.herokuapp.com/`
* Using Postman, and the url above as a prefix, e.g `https://bc-34-my-app.herokuapp.com/api/v1/entries`
utilise every endpoint in this application a with any of these headers: 
key: Content-Type value: `application/json`  
key: Content-Type value: `application/x-www-form-urlencoded`

  
### Front End Dependencies
* [Font Awesome](http://fontawesome.io/) -font and CSS toolkit

### Back End Dependencies
* [Node](nodejs.org) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
* [Body-Parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware.
* [validator](https://www.npmjs.com/package/validator) - An express.js middleware for node-validator.
* [pg](https://www.npmjs.com/package/pg) - Non-blocking PostgreSQL client for node.js. Pure JavaScript and optional native libpq bindings.
* [jsonwebToken](https://jwt.io/) - JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.
* [Bcrypt](https://www.npmjs.com/package/bcrypt) - A password hashing function
* [dotenv](https://www.npmjs.com/package/dotenv) - dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

## Author
Chinemelu Nwosu

## License
This project is licensed under the MIT License - see the LICENSE.md file for details



