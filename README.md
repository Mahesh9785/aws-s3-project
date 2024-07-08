
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
## Installation

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

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Unique usename of the user |
| `password` | `string` | **Required**. Password of the user |

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

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of the bucket |

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

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `bucketId`      | `string` | **Required**. Id of item to fetch |

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

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `bucketId`      | `string` | **Required**. Id of bucket to delete |

### List Objects

```http
GET /api/bucket/:bucketId/files
```
#### Description
```
List all files for the authenticated user in a specific bucket.
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `bucketId`      | `string` | **Required**. Id of bucket for which files need to be fetched  |

### Put Object

```http
POST /api/bucket/:bucketId/files
```
#### Description
```
Create a new object in a specific bucket.
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `bucketId`      | `string` | **Required**. Id of bucket for which file needs to be added  |

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

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `bucketId`      | `string` | **Required**. Id of bucket where the file exists |
| `fileId`      | `string` | **Required**. Id of file to fetch |

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

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `bucketId`      | `string` | **Required**. Id of bucket where the file exists |
| `fileId`      | `string` | **Required**. Id of file to delete |

