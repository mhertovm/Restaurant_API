# RESTful API | Node.js

## Features

* User registration and login
* Authentication whit JWT
* Email confirmation
* CRUD
* MySql database

### Installing

```
cd Restaurant_API
npm install
```

## Getting Started

To test the application

* In config folder create MySql database and choose a username and password for it
* Create config folder and create config.json file and add the database data as in the example
```
    {
    "development": {
        "username": "username",
        "password": "password",
        "database": "database name",
        "host": "host",
        "port": "port",
        "dialect": "mysql"
    },
    "test": {
        "username": "username",
        "password": "password",
        "database": "database name",
        "host": "host",
        "port": "port",
        "dialect": "mysql"
    },
    "production": {
        "username": "username",
        "password": "password",
        "database": "database name",
        "host": "host",
        "port": "port",
        "dialect": "mysql"
    }
    }
```

* Create .env file and add 
    * PORT = port(the port on which you want to send a request)
    * JWT_SECRET = secret(the password with which the token will be issued)
    * EMAIL = email(the email from which you want to send a code for verification)
    * EMAIL_PASSWORD = password (Enable 2 factor authentication and click on app passwords (gmail example: https://support.google.com/mail/answer/185833?hl=en))

```
Create the database tables
    npx sequelize-cli db:migrate
Create index for emails
    CREATE INDEX index_email
    ON users (email);
Create admin in MySql workbench example
    INSERT INTO Users (name, surname, gender, age, phone, email, password, role)
    VALUES ('', '', '', '', '', '', '', 'admin');
Start the application
    npm start
```

## Authors

Contributors names and contact info

ex. mher tovmasyan
ex. https://github.com/mhertovm