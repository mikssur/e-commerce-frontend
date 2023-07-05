# E-Commerce Frontend Project

This is the readme file for the E-Commerce Frontend project, built with React, Vite, and Redux Toolkit. The project utilizes various libraries and technologies such as Mui with Styled, Google OAuth 2, React Router, Axios, and TypeScript. The goal of this project is to provide a user-friendly interface for customers to browse products, authenticate using Google OAuth 2, and place orders. Additionally, administrators have access to perform CRUD operations on products and manage categories.

### To run the project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory using the terminal.
3. Run the following command to install the dependencies:
   npm install
4. Once the installation is complete, start the development server with the command:
   npm run dev
5. Open your browser and visit http://localhost:5173 to see the application running.

## Authentication

The project utilizes Google OAuth 2 for user authentication. Users can log in to the application using their Google accounts. This authentication process provides a secure and convenient way to access the application's features.

## API Integration

The frontend project interacts with a Java-based API to fetch and update data. For more information about the API, please refer to the API documentation: https://github.com/mikssur/e-commerce-backend

To ensure proper communication with the API, make sure to configure the necessary environment variables in the .env file. These variables may include API endpoints, authentication credentials, or any other required configuration.

## Features

The E-Commerce Frontend project offers the following features:

1. View the list of products.
2. Authenticate via Google OAuth 2.
3. Place orders.
4. Admin functionalities:
   Perform CRUD operations for products.
   Add and delete categories.

Please note that this readme provides a brief overview of the project and its features. For detailed instructions or further information, refer to the relevant code comments or documentation within the project.
