# Backend Project

[Postman Published link](https://documenter.getpostman.com/view/15642679/TzefBPpf)

A simple stateless microservice in Node.js, with three major functionalities:

- Authentication
- JSON patching
- Image Thumbnail Generation

## Authentication

A login request body that contains an arbituary username/password pair that returns a signed Json Web Token to access specific end points.

## Sign Up User

---

## Request

{
"username": string, <br />
"password": string
}

## Response

{
"message": "Successfully signed up"
}

## Link

[Sign up user](http://localhost:3000/users/signup)

## Sign in/Login User

---

## Request

{
"username": string, <br />
"password": string
}

## Response

{
"message": "User signed in successfully", <br />
"token": string
}

## Link

[Login User](http://localhost:3000/users/login)

## Applying JSON Patch

---

Request body contains a JSON object and a JSON patch object, which returns a formatted or patched JSON object.

## Request

{ <br />
"jsonObj": { <br />
"firstName": "Segun",<br />
"lastName": "David",<br />
"gender": "male",<br />
"age": 25,<br />
"status": "happy"<br />
},<br />
"jsonPatchObj": [<br />
{"op": "add", "path": "/status", "value": {"location": "Lagos"}},<br />
{"op": "remove", "path": "/status"},<br />
{"op": "replace", "path": "/age", "value": 90},<br />
{"op": "copy", "from": "/firstName", "path": "/lastName"},<br />
{"op": "move", "from": "/firstName", "path": "/gender"}<br />
]
}

## Response

{<br />
"message": "Data Edited",<br />
"patchedDoc": {<br />
"lastName": "Segun",<br />
"gender": "Segun",<br />
"age": 90<br />
}
}

[JSON Patching Object](http://localhost:3000/patch)

## Create Thumbnail Request

Request body contains a public image url. The image is downloaded, resized and saved to 'thumbnails'

## Request

{
"uri": "https://cdn.pixabay.com/photo/2020/06/01/10/02/puffin-5246026_960_720.jpg"
}

![Image](https://cdn.pixabay.com/photo/2020/06/01/10/02/puffin-5246026_960_720.jpg)

Thumbnail

---

![Thumbnail image](/thumbnails/small_image.jpg)
