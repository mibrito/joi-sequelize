# joi-sequelize

A lib to automaticaly create joi validation schemas from sequelize models.

[![Build Status](https://travis-ci.org/mibrito/joi-sequelize.svg?branch=master)](https://travis-ci.org/mibrito/joi-sequelize)

A lots of Hapi projects uses Sequelize to handle database conection, data modeling and manipulation, and Joi to validate its requests and responses. In this case is common to use quite the same schema for both libraries. Hence that it is a fertile scenario to create inconsistency between both schemas, that will be likely rearranged every time the database models change. So why not use the database to auto generate joi schemas, and remove the unnecessary validation in especifica routes. This is the main idea behind joi-sequelize.

# Usage

### Model example

```javascript
'use strict'; // jshint ignore:line

var config = require('../../config/config'),
    bcrypt = require('bcrypt'),
    salt   = config.saltGen;

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      allowNull: false, /* will generate a .required() on joi schema */
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      description: 'User`s identifier' /* will generate a .description() on joi schema tha can be used by swagger */
    },
    firstname: {
      type: DataTypes.STRING(64), /* will generate .string().max(64) */
      allowNull: false, 
      description: 'User`s first name'
    },
    lastname: {
      type: DataTypes.STRING(64), /* will generate .string().max(64) */
      allowNull: false,
      description: 'User`s last name'
    },
    email: {
      type: DataTypes.STRING(64), /* will generate .string().max(64) */
      allowNull: false,
      description: 'User`s email'
    },
    password: {
      type: DataTypes.STRING, /* will generate .string() */
      allowNull: false,
      description: 'User`s password'
    },
    role: {
      type: DataTypes.ENUM('admin', 'common user'), /* will generate .valid('admin', 'common user') */
      allowNull: false,
      description: 'User`s role'
    },
    active: {
      type: DataTypes.BOOLEAN, /* will generate .boolean() */
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
```

### Loading models

```javascript
'use strict';

var fs        = require('fs'),
    path      = require('path'),
    Sequelize = require('sequelize'),
    JoiSequelize = require('joi-sequelize'),
    basename  = path.basename(module.filename),
    env       = process.env.NODE_ENV || 'development',
    log       = (!process.env.LOG || process.env.LOG === 'false') ? false : true,
    config    = require(__dirname + '/../../config/database.json')[env],
    db,
    sequelize;

function init() {
  db = {};
  config.logging = (env === 'development' && log) ? console.log : false;

  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  db.JS = {};
  fs
    .readdirSync(__dirname)
    .filter(file => (
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js')
      )
    )
    .forEach(function (file) {
      var model = sequelize['import'](path.join(__dirname, file));
      db[model.name] = model;
      db.JS[model.name] = new JoiSequelize(require(path.join(__dirname, file)));
    });
    
  Object.keys(db).forEach(function (modelName) {
        if (db[modelName].associate) {
          db[modelName].associate(db);
        }
      });

  Object.keys(db).forEach(function (modelName) {
    if (db[modelName].addScopes) {
      db[modelName].addScopes(db);
    }

    if (db[modelName].addHooks) {
      db[modelName].addHooks(db);
    }
  });
  
  return db;
}

module.exports = db || init();

```

### Apply joi-sequelize generated schemas on routes

```javascript
'use strict';

const Hapi = require('hapi');
const db = require('./model');
const JS = db.JS;

const server = new Hapi.Server();
server.connection({ port: 3000 });

const JS = new JoiSequelize(model);
server.route({
  method:  'POST',
  path:    '/hello',
  handler: (request, reply) => reply(request.payload),
  config:  {
    validate: {
      payload: JS.User.joi()
    }
  }
});

server.start((err) => {
  if (err) throw err;
  console.log('Server running at:', server.info.uri);
});
```

# Other functions

### Omit

Return a joi object with all items except the ones passed as arguments
```javascript
JS.User.omit('role', ...);
```

### Pick

Return a joi object with all fields passed as arguments
```javascript
JS.User.pick('active', ...);
```

### Include

Return a joi object with like JS.User.joi() but with field picture of joi type .any()
```javascript
JS.User.include({picture: joi.any()});
```
