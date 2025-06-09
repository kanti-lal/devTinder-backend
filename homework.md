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