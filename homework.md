- Create a repo
- Initialize the repository
- node_modules, package.json, lock.json
- Install express
- Create a server
- Listen to port 7777
- write request handlers for /test, /hello
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Diff b/w caret and tilde (^ vs ~)

- initialize git
- .gitignore
- push all code to remote origin
- Play with routes and route extensions ex. /hello , / , hello/2, /xyz
- Order of the routes matter a lot
- Install postman app and make a workspace/COllection > test API call
- Write  logic to handle GET,  POST, PATCH, DELETE API calls and test them on postman
- Explore routing and user of ?, + , (), * in the routes
- User of regex in routes /a/ , /.*fly$/
- Reading the query params in the routes
- Reading the dynamic routes in the routes

- Multiple Route Handlers - Play with the code
- next()
- next function and errors along with res.send() 
- app.use("/route, rh1, rh2,[ rh3, rh4], rh5)
- What is Middleware? why do we need it
- How Express JS basically handles requests behind the scenes
- Difference app.use and app.all()
- Write a dummy auth middleware for admin
- Write a dummy middleware for all users routes, except /user/login


- Create a free cluster on MongoDB official website mongo atlas
- Install mongoose library
- Connect your application to the Database "connection-url"/devTinder
- call the connectDB function and connect to database before starting application on 7777
- Create a userSchema & user model
- Create POST  /signup API to add data to database
- Push some document using APIs from postmans
- Error handling using try, catch 

- JS Objects vs JSON (difference)
- Add the express.json middleware to your app
- Make your signup API dynamic to recieve data from the end user ( user, postman)
- User.findOne with duplicate email ids, which object returned
- API - Get user by email
- API - Feed API - GET /feed - get all the users from the db
- API - Get user by id
- Create a delete user API
- diff b/w PATCH and PUT
- API - Update a user
- Explore the Mongoose documentation  for model methods
- What are options in a model.findOneAndUpdate method, explore more about it
- API - Update the user with email ID

- Explore schemeType options from the documentation
- add required, unique, min , minLength, maxLength, trim
- Add default
- Create a custom validate function for gender
- Improve the DB schema - PUT all appropriate validations on each field in schema
- Add timestamps to the userSchema
- Add  API  level validation for the patch and signUp post api
- DATA sanitizing - Add API Validation for each field
- Install Validator
- Explore validator library function and use validator func for password, email etc.
- NEVER TRUST req.body

- Validate data in Signup API
- Install bcrypt package
- Create passwordHash using bcrypt.hash and save user with encrypted password
- Create loginAPI 
- Compare password and throw errors if email or password is invalid

- install cookie-parser 
- send dummy cookie to user 
- create GET /profile API and check if you get the cookie back
- install jsonwebtoken
- IN login API, after email and password validation, create a JWT token and send it back to the user
- read the cookies inside your profile API and find the logged in user
- userAuth middleware 
- Add the userAuth middleware in profileAPI  and new sendConnectionRequest API 
- set the expiry of JWT token and cookies to 7 days
- Create userSchema method to getJWD()
- Create userSchema method to comparePassword(passwordInputByUser)

- Explore tinder APIs
- Create a list all apis you can thing of in Dev tinder
- Group multiple routes under respective routers

- Read documentation for express.router
- Create route folder for managing auth, profile, request routers
- create authRouter, profileRouter, requestRouter
- Import these routes in app.js
- Create POST /logout API 
- Create PATCH /profile/edit
- Create PATCH /profile/password  API -> forgot password API
- Make sure you validate all data in every POST, PATCH apis
