#  REST API CONVENTION:

 GET ALL CONTACTS ------------------------- /api/contacts  (GET)<br>
 Get One contact -------------------------- /api/contacts/:id (GET)<br>
 Create Contact --------------------------- /api/contacts (POST)<br>
 Update Contact --------------------------- /api/contacts/:id (PUT)<br> 
 Delete Contact ---------------------------  /api/contacts/:id (DELETE)<br>
 
Whenever we are trying to interact with our MongoDB and mongoose database. It returns a promise at our routes. Why at out routes, because we are interacting with the server and handling requests through our routes and then the database storing will also be different based on different routes.So we handle them using async functions. Now if we convert every route to async, then we also must add a try catch block in every route. This is  not good code. A better way to do is to make use of our ```async handler``` which will all of our promises at the routes.
 
# COMMON MONGOOSE MODEL METHODS:

| Method	                            Purpose
Model.create(obj)	                Creates and saves a new document<br>
Model.find()	                    Finds all documents<br>
Model.findById(id)	                 Finds a document by its _id<br>
Model.findOne(query)                 Finds the first matching document<br>
Model.updateOne()	                Updates a single document<br>
Model.findByIdAndUpdate()	        Finds by _id and updates<br>
Model.deleteOne()	                Deletes the first match<br>
Model.findByIdAndDelete()	        Deletes a document by _id<br>
Model.countDocuments()	            Counts matching documents<br>
Model.exists()	                     Returns true if at least one document matches a condition

# AUTHENTICATION PROCESS:

First we have to add user routes for login and signup and make sure that they do login and then they get a refresh token.(This verifies that the user is authorized) and then we can use that refresh token in order to access the remaining routes of contacts and manager their contacts. This is the protected routes.

# Setting up api endpoints for authentication:

User Registration-------------------- /api/users/register<br>
Login -------------------------------/api/users/login<br>
Info --------------------------------/api/users/current<br>

# JWT - Json Web Tokens:

A JWT Token contains three parts:
request header algorithm----------- algorithm and type of a JWT <br>
payload------------------contains the user information<br>
signature verification--------- verifies the signature of the user for the token<br>
A sample token:
```code
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
```
Till the first dot- header algo: HS256 , Type : JWT<br>
Till the second dot and after the first-payload (encoded):<br>
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1516239022
}(decoded sample)<br>
After the second dot- signing verification( a secret)- sample: a-string-secret-at-least-256-bits-long<br>
<br>

<hr>
 
We have added an access token by using ```jwt.sign()``` and then validate and verified the token using the validateToke() middleware. Now using this , our currentInfo route for the user is private and can only be accessed with sending the access token in the authorization header

# Handling User-Contact Relations:

Adding the connection between users and  contact  

# WE HAVE SUCCESSFULLY SET UP A PROJECT WHICH CONTAINS ONLY BACKEND!

# NEXT TASK: BUILD UI AND CONNECT AND UPDATE WITH BACKEND

1. Sign Up Page:-- Form for the post request, form ui page, on submit, registration has been done, then login page

2. Login Page:- Same thing, after registration, go to the Home page and keep a side menu for all the contacts updation.

# IMPORTANT!

BUILD UI ONLY AND ONLY AFTER COMPLETING THE FULL STACK ONLINE FOOD ORDERING SYSTEM ASSIGNMENT!