# S3 Clone

This project is a simple Node.js web service that mimics basic AWS S3 functionality, including operations to get, put, delete, and list objects, as well as list buckets. It includes authentication and authorization mechanisms and uses MongoDB with Mongoose ORM for database operations. Swagger is used for API documentation.

## Features

- User authentication with JWT.
- Api authorization based on roles.
- Create, list, and delete buckets.
- Upload, list, get, and delete objects within buckets.
- Swagger UI for API documentation.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Multer for file uploads
- Swagger for API documentation

## Getting Started

### Prerequisites

- Node.js installed on your machine. (Version 20 preferred)
- MongoDB instance running (either locally or on a cloud service like MongoDB Atlas)

### Here are the steps to install MongoDB and Node.js on Ubuntu and Windows:

#### Ubuntu:

- Install MongoDB

```bash
sudo apt-get update && sudo apt-get install gnupg
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install mongodb-org
sudo service mongod start
sudo systemctl enable mongod
```

- Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get update
sudo apt-get install nodejs
node -v
```

#### Windows:

- Install MongoDB

```
Download the MongoDB 6 Community Server installer from the official MongoDB website: https://www.mongodb.com/download-center/community

Run the installer and follow the installation wizard to install MongoDB.

Add the MongoDB bin directory to your system's PATH environment variable:

Right-click on "Computer" or "This PC" and select "Properties".

Click on "Advanced system settings" on the left side.

Click on "Environment Variables".

Under "System Variables", scroll down and find the "Path" variable, then click "Edit".

Click "New" and add the path to the MongoDB bin directory (e.g., C:\Program Files\MongoDB\Server\6.0\bin).

Click "OK" to close all the windows.
```

Open a new Command Prompt or PowerShell window and verify that MongoDB is installed by running:

```
mongod --version
```

- Install Node.js

```
Download the Node.js 20 installer from the official Node.js website: https://nodejs.org/en/download/
```

Run the installer and follow the installation wizard to install Node.js 20.
Verify the Node.js version:

```
node -v
```

## Project Installation

Clone the repository:

```bash
git clone https://github.com/Mahesh9785/aws-s3-project.git
cd aws-s3-project
```

Install the dependencies:

```bash
npm install
```

Modify the .env file in the root directory to include your MongoDB instance url if it is not locally installed.

```bash
DB_URL =  your_mongodb_connection_string
```

Start the server:

```bash
npm start
```

Access the Swagger documentation at:

```bash
http://localhost:3000/api-docs
```

## API Reference

### User login

```http
POST /api/login
```

#### Description

```
Authenticate a user and get a token.
```

| Parameter  | Type     | Description                              |
| :--------- | :------- | :--------------------------------------- |
| `username` | `string` | **Required**. Unique usename of the user |
| `password` | `string` | **Required**. Password of the user       |

### List Buckets

```http
GET /api/buckets
```

#### Description

```
List all buckets for the authenticated user.
```

#### Response

```
List of Buckets for the authenticated user with bucket Id
```

### Create Bucket

```http
POST /api/buckets
```

#### Description

```
Create a new bucket.
```

| Parameter | Type     | Description                      |
| :-------- | :------- | :------------------------------- |
| `name`    | `string` | **Required**. Name of the bucket |

#### Response

```
Added Bucket info with bucket Id
```

### Get Bucket Info

```http
GET /api/buckets/:bucketId
```

#### Description

```
Get Bucket Info based on bucketId
```

| Parameter  | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `bucketId` | `string` | **Required**. Id of item to fetch |

#### Response

```
Bucket info
```

### Delete Bucket

```http
DELETE /api/buckets/:bucketId
```

#### Description

```
Delete a specific bucket.
```

| Parameter  | Type     | Description                          |
| :--------- | :------- | :----------------------------------- |
| `bucketId` | `string` | **Required**. Id of bucket to delete |

### List Objects

```http
GET /api/bucket/:bucketId/files
```

#### Description

```
List all files for the authenticated user in a specific bucket.
```

| Parameter  | Type     | Description                                                   |
| :--------- | :------- | :------------------------------------------------------------ |
| `bucketId` | `string` | **Required**. Id of bucket for which files need to be fetched |

### Put Object

```http
POST /api/bucket/:bucketId/files
```

#### Description

```
Create a new object in a specific bucket.
```

| Parameter  | Type     | Description                                                 |
| :--------- | :------- | :---------------------------------------------------------- |
| `bucketId` | `string` | **Required**. Id of bucket for which file needs to be added |

#### Response

```
Added Object info with file Id
```

### Get Object

```http
GET /api/bucket/:bucketId/files/:fileId
```

#### Description

```
Get Object or file Info based on fileId
```

| Parameter  | Type     | Description                                      |
| :--------- | :------- | :----------------------------------------------- |
| `bucketId` | `string` | **Required**. Id of bucket where the file exists |
| `fileId`   | `string` | **Required**. Id of file to fetch                |

#### Response

```
File info
```

### Delete Object

```http
DELETE /api/bucket/:bucketId/files/:fileId
```

#### Description

```
Delete a specific object.
```

| Parameter  | Type     | Description                                      |
| :--------- | :------- | :----------------------------------------------- |
| `bucketId` | `string` | **Required**. Id of bucket where the file exists |
| `fileId`   | `string` | **Required**. Id of file to delete               |

#### Demo Username : "JKTECH"

#### Demo Password : "password"
