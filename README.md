# NodeJS Rest API with (ExpressJS and MongoDB)

NodeJS based rest service application
<br>

# Installation

- Clone repository or download it manually
  
  ```bash
  git clone https://github.com/xbersoy/nodejs-mongo-rest-api
  ```
  
- Install dependencies

  ```bash
  npm install
  ```

- Start the application
  
  ```bash
  npm run start
  ```
  or with nodemon
  ```bash
  npm run watch
  ```
  
- Create a file name .env and specify port and database connection URL. Your .env file should look like below:
  ```bash
  PORT = 3000
  DB_CONNECTION_STRING = mongodb+srv://...
  ```
  That's all! Application should be running on your local. <br><br>
  To run tests
  ```bash
  npm test
  ```

## Install with docker

```bash
docker container run 
  -p <desired_port>:3000 burakersoy/nodejs-mongo-rest-api 
```
<br>

# Swagger
You can test see and test endpoint with swagger ui. <br>
http://ec2-3-141-198-45.us-east-2.compute.amazonaws.com:8080/api-docs

<img src="./screenshots/swagger.png"><br><br>

# AWS
Application has been deployed to aws and the container runs on a ec2 instance. You can use the link below.
http://ec2-3-141-198-45.us-east-2.compute.amazonaws.com:3030/

<br>

# Test Result
<img src="./screenshots/Mocha.png">
<br>
More tests can be added<br>
<br>

# Endpoints

### POST /records

Returns data from MongoDB with parameters given in request body.
<br><br>

<br>

Sample Request Payload <br>

```bash
{
"startDate": "2016-01-26",
"endDate": "2016-02-02",
"minCount": 2700,
"maxCount": 3000
}
```

Successful Response Payload

```bash
{
    "code": 0,
    "msg": "Success",
    "records": [
        {
            "key": "bxoQiSKL",
            "createdAt": "2016-01-29T01:59:53.494Z",
            "totalCount": 2991
        },
        {
            "key": "NOdGNUDn",
            "createdAt": "2016-01-28T07:10:33.558Z",
            "totalCount": 2813
        }
    ]
}
```
