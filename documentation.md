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

## Add Category

* URL: /admins/addCategory
* Method: POST

### Example Request:
```
POST /admins/addCategory
authorization: jwt
body: {
    "name_am":"_",
    "name_en":"_"
}
```
### Example Response:
```
{
    "message": "category added",
    "category": {
        "id": _,
        "name_am": "_",
        "name_en": "_",
        "updatedAt": "_",
        "createdAt": "_"
    }
}
```

## Upload

* URL: /admins/upload
* Method: POST

### Example Request:
```
POST /admins/upload
authorization: jwt
form-data: {
    image: _
}
```
### Example Response:
```
{
    "fieldname": "_",
    "originalname": "_",
    "encoding": "_",
    "mimetype": "_",
    "destination": "_",
    "filename": "_",
    "path": "_",
    "size": _
}
```

## Add Product

* URL: /admins/addProduct
* Method: POST

### Example Request:
```
POST /admins/addProduct
authorization: jwt
body: {
    "category_id":"_",
    "name_am":"_",
    "name_en":"_",
    "description_am":"_",
    "description_en":"_",
    "price":"_",
    "quantity":"_",
    "discount":"_",
    "image":"_"
}
```
### Example Response:
```
{
    "message": "product added",
    "product": {
        "id": _,
        "category_id": "_",
        "name_am": "_",
        "name_en": "_",
        "description_am": "_",
        "description_en": "_",
        "price": "_",
        "quantity": "_",
        "discount": "_",
        "image": "_",
        "updatedAt": "_",
        "createdAt": "_"
    }
}
```

## Add Table

* URL: /admins/addTable
* Method: POST

### Example Request:
```
POST /admins/addTable
authorization: jwt
body: {
    "table_number":"_"
}
```
### Example Response:
```
{
    "message": "table added",
    "table": {
        "id": _,
        "table_number": "_",
        "updatedAt": "_",
        "createdAt": "_"
    }
}
```

## Update Category

* URL: /admins/updateCategory/:id
* Method: PATCH

### Example Request:
```
PATCH /admins/updateCategory/_
authorization: jwt
body: {
    "name_am":"_",
    "name_en":"_"
}
```
### Example Response:
```
{
    "message": "category updated",
    "categoryUpdate: [1]
}
```

## Update Product

* URL: /admins/updateProduct/:id
* Method: PATCH

### Example Request:
```
PATCH /admins/updateProduct/_
authorization: jwt
body: {
    "category_id":"_",
    "name_am":"_",
    "name_en":"_",
    "description_am":"_",
    "description_en":"_",
    "price":"_",
    "quantity":"_",
    "discount":"_",
    "image":"_"
}
```
### Example Response:
```
{
    "message": "product updated",
    "productUpdate: [1]
}
```

## Update Table

* URL: /admins/updateTable/:id
* Method: PATCH

### Example Request:
```
PATCH /admins/updateTable/_
authorization: jwt
body: {
    "table_number":"_"
}
```
### Example Response:
```
{
    "message": "table updated",
    "tableUpdate: [1]
}
```

## Delete Category

* URL: /admins/deleteCategory/:id
* Method: DELETE

### Example Request:
```
DELETE /admins/deleteCategory/_
authorization: jwt
```
### Example Response:
```
{
    "message": "category deleted",
    "categoryDelete: [1]
}
```

## Delete Product

* URL: /admins/deleteProduct/:id
* Method: DELETE

### Example Request:
```
DELETE /admins/deleteProduct/_
authorization: jwt
```
### Example Response:
```
{
    "message": "product deleted",
    "productDelete: [1]
}
```

## Delete Table

* URL: /admins/deleteTable/:id
* Method: DELETE

### Example Request:
```
DELETE /admins/deleteTable/_
authorization: jwt
```
### Example Response:
```
{
    "message": "table deleted",
    "tableDelete: [1]
}
```