# vidly
A backend video rental service

*Technologies*
=======================================
- Nodejs (v > 12.0)
- Express (Web Server)
- Joi (Schema Validation)
- MongoDB (Data Persistence)

baseurl - 'https://my-vidly-app.herokuapp.com' <br>

Genres /api/genres
- GET / (get all genres) <br>
*sample response*
```
 [
    {
        "_id": "6238283837be1cf712e432c5",
        "name": "Comedy",
        "__v": 0
    },
    {
        "_id": "62387d3808c71fb2c3e51ef8",
        "name": "Thriller",
        "__v": 0
    }
 ]
```
- GET /:id (get genre by id) <br>
*sample response*
```
{
    "_id": "6238283837be1cf712e432c5",
    "name": "Comedy",
    "__v": 0
}
```

- POST / (create a genre) <br>
*Requires authorization - send x-auth-token header* <br>
*request body*
```
{
  "name": "Action"
}
```
*sample response*
```
{
    "name": "Action",
    "_id": "62e807acd76df76b7727a9d7",
    "__v": 0
}
```
- PUT /:id (update a genre) <br>
*Requires authorization - send x-auth-token header* <br>
*request body*
```
{
  "name": "Romance"
}
```
*sample response*
```
{
    "_id": "62e807acd76df76b7727a9d7",
    "name": "Romance",
    "__v": 0
}
```
- DELETE /:id (delete a genre) <br>
*Requires authorization - send x-auth-token header* <br>
*Requires admin user - send x-auth-token header* <br>
*request body*
```
{
  "name": "Tester"
}
```
*sample response*
```
{
    "_id": "62e80a8ad76df76b7727a9de",
    "name": "Tester",
    "__v": 0
}
```

