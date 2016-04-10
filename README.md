# joi-sequelize

[![Build Status](https://travis-ci.org/mibrito/joi-sequelize.svg?branch=master)](https://travis-ci.org/mibrito/joi-sequelize)

Joi-Sequelize is a lib to automaticaly create joi validation schemas from sequelize schemas.

A lots of Hapi projects uses Sequelize to handle database conection, data modeling and manipulation, and Joi to validate its requests and responses. In this case is common to use quite the same schema for both libraries. Hence that it is a fertile scenario to create inconsistency between both schemas, that will be likely rearranged every time the database models change. So why not use the database to auto generate joi schemas, and remove the unnecessary validation in especifica routes. This is the main idea behind joi-sequelize.
