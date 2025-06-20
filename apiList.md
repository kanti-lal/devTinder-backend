 # DevTinder APIs

 ## authRouter
 - POST /signup
 - POST /login
 - POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/:status/:userId
<!-- - instead of creating 2 api make single with dynamic status -->
    - POST /request/send/interested/:userId
    - POST /request/send/ignored/:userId
    - 
- POST /request/review/:status/:requestId
- <!-- - instead of creating 2 api make single with dynamic status -->
    - POST /request/review/accepted/:requestId
    - POST /request/review/rejected/:requestId

## userRouter
- GET /users/connections
- GET /user/requests
- GET /user/feed - Gets you the profiles of other users on platform


Status: ignore, interested, accepted, rejected