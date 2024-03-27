## Register

* URL: /public/register
* Method: POST

### Example Request:

POST /public/register
body: {
    "name":"",
    "surname":"",
    "gender":"",
    "age":"",
    "phone":"",
    "email":"",
    "password":""
}

### Example Response:

{
    "message": "User successfully created"
}