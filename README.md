This project is an online vacation booking platform that allows users to browse, select, and book vacation packages. The application is built with a modern tech stack, providing a seamless and user-friendly experience.
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Tech Stack
-----------
 - Frontend: React, Tailwind CSS
 - Backend: Node.js, Express.js
 - Database: MySQL
 - ORM: Prisma

Installation
------------
Prerequisites
---------------

 - Node.js (v14.x or higher)
 - MySQL (v8.x or higher)
 - Git

Clone the Frontend Backend Repo with the following command - 
---------------------------------------------------------------
- git clone https://github.com/Forever12012/TravelEasyBackend.git
- Install all the node dependencies using npm install.

Create a .env file and make the following changes in your .env file -
----------------------------------------------------
- DATABASE_URL="mysql://username:password@localhost:3306/travel_easy_db"

Setup Database
---------------------------

- Create a new MySQL database (if not already created): CREATE DATABASE travel_easy_db;

Run Prisma migrations in the backend terminal to create the necessary tables in your database:
---------------------------------------------------------------------------------------------------

- npx prisma migrate dev

To run the backend give command : 
----------------------------------
- npm start

API Endpoints
-------------------

1) User Signup
  - Endpoint: /signup
  - Method: POST
  - Description: This endpoint allows users to sign up for an account by providing their userName, email, and password. The password is securely hashed before storing it in the database. After successful signup,  
    a welcome email is sent to the user's email address using SendGrid.

2) User Signup
  - Endpoint: /login
  - Method: POST
  - Description: This endpoint allows users to log in by providing their email and password. The provided password is validated against the stored hashed password. If the credentials are valid, a success message is returned.

3) Newsletter Subscription
  - Endpoint: /login
  - Method: POST
  - Description: This endpoint allows users to subscribe to a newsletter by providing their email address. Upon subscribing, a confirmation email is sent to the provided email address, and the subscription is saved in the database.

4) Contact Us
  - Endpoint: /contact
  - Method: POST
  - Description: This endpoint allows users to submit their contact information, including their name, email, question, and comment. The provided data is stored in the database, and a confirmation email is sent to the user's email     
    address to acknowledge their inquiry.

This is how the .env file should look - 
------------------------------------------------
Use the given api key for sendgrid integration
![Screenshot (58)](https://github.com/user-attachments/assets/5e6715df-bf20-47cd-b40d-f482335b40cb)
