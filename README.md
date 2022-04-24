# Ecommerce 
An application that let registered clients, purchase, track all purchases and topup historic
on the other hand Admin would add money along with their discounts, discount is dealt while client is purchasing

# Installation guide
Later on cloning this repository you have
1. Installing Backend.
```  
cd zatech-challenge/server
composer update 
php artisan migrate
php artisan serve --host=YOUR_COMPUTER_IP_ADDRESS:8000
```
2. Installing Frontend
```
cd zatech-challenge/client
npm install 
npm start
```
N.B: Before starting app please ```PATH_TO_THE_PROJECT/zatec_challenge/client/src/util/index.js ``` and modify this repository to add your computer address ```http://YOUR_COMPUTER_IP:8000/api/"``` unless you're connected on the internet change this to ```http://127.0.0.1:8000/api/``` it would be enough.
# REST APIs:
|Method|Endpoint|Action|
|---|--|--|
| POST | auth/login | Provided required information to login 
| POST      | auth/signup | Signup new user
| POST   | products| Add new product
| POST|topup/create| For clients to add money on their profile
| POST |purchases/new/{user_id}/{product_id/  | Purchase one product based on it's `ID`
| GET| purchases/all/{user_id} | Retrieve all purchases 
|GET| topups/all/{user_id}| Retrieve all topups 
|GET| /user/{user_id}| Retrieve balance of user based on user_ID

Tools 
===============
- Mysql
- Laravel 8 & Sanctum, Validator `package` for request validations
- ReactJs functional components and localstorage to keep user info and API TOKEN
 
## Dev notes
- To test email feature you need to set receiver address like this ``ADMIN_EMAIL=RECEIVER_ADDRESS``
Updates
 =======
 - Add feature that can be used by admin to update
 - Deploying application 
 

