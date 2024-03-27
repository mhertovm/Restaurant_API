## Register

* URL: /public/register
* Method: POST

### Example Request:
```
POST /public/register
body: {
    "name":"_",
    "surname":"_",
    "gender":"_",
    "age":"_",
    "phone":"_",
    "email":"_",
    "password":"_"
}
```
### Example Response:
```
{
    "message": "User successfully created"
}
```
## Login

* URL: /public/login
* Method: POST

### Example Request:
```
POST /public/login
body: {
    "email":"_",
    "password":"_"
}
```
### Example Response:
```
{
    "jwt": "_",
    "role": "_"
}
```
## Products

* URL: /products
* Method: GET
* Parameters:
    * category: product category,
    * q: product name for search,
    * from: starting from which product,
    * to: ending to which product,
    * le: lenguage for search

### Example Request:
```
GET /products?category=_&q=_&from=_&to=_&le=_
```
### Example Response:
```
{
    "length": _,
    "results": [
        {
            "id": _,
            "category_id": _,
            "name_am": "_",
            "name_en": "_",
            "description_am": "_",
            "description_en": "_",
            "price": _,
            "quantity": _,
            "discount": _,
            "image": "_",
            "createdAt": "_",
            "updatedAt": "_",
            "Category": {
                "id": _,
                "name_am": "_",
                "name_en": "_",
                "createdAt": "_",
                "updatedAt": "_"
            },
            "Reviews": [
                {
                    "id": _,
                    "user_id": _,
                    "product_id": _,
                    "rating": _,
                    "comment": "_",
                    "createdAt": "_",
                    "updatedAt": "_"
                },
            ]
        },
    ]
}
```
## Product

* URL: /products/product/:id
* Method: GET

### Example Request:
```
GET /products/product/_
```
### Example Response:
```
{
            "id": _,
            "category_id": _,
            "name_am": "_",
            "name_en": "_",
            "description_am": "_",
            "description_en": "_",
            "price": _,
            "quantity": _,
            "discount": _,
            "image": "_",
            "createdAt": "_",
            "updatedAt": "_",
            "Category": {
                "id": _,
                "name_am": "_",
                "name_en": "_",
                "createdAt": "_",
                "updatedAt": "_"
            },
            "Reviews": [
                {
                    "id": _,
                    "user_id": _,
                    "product_id": _,
                    "rating": _,
                    "comment": "_",
                    "createdAt": "_",
                    "updatedAt": "_"
                },
            ]
        },
```
## Categories

* URL: /products/categories
* Method: GET

### Example Request:
```
GET /products/categories
```
### Example Response:
```
[
    {
        "id": _,
        "name_am": "_",
        "name_en": "_",
        "createdAt": "_",
        "updatedAt": "_"
    },
]
```
## Tables

* URL: /products/tables
* Method: GET

### Example Request:
```
GET /products/tables
```
### Example Response:
```
[
    {
        "id": _,
        "table_number": _,
        "createdAt": "_",
        "updatedAt": "_"
    },
]
```
## Images

* URL: /public/image-name
* Method: GET

### Example Request:
```
GET /public/image-name
```
### Example Response:
```
    image.png
```