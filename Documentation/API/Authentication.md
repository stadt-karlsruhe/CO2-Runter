# Authentication Endpoints

## Login

Authenticates a user and returns a token that can be used for future requests.

- **URL**

  `/login`

- **Method:**

  `POST`

- **Data Params**

  **Required:**

  `{password=[string], usermail=[string]}`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ token=[string] }`

- **Error Response:**

  - **Code:** 400 <br />
    **Content:** `{ error : "Missing Username or Password" }`
  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error : A server error occurred." }`

## Register

This endpoint allows users to create a new account by providing their username, email, and password.

- **URL**

  `/register`

- **Method:**

  `POST`

- **Data Params**

  **Required:**

  `{password=[string], usermail=[string], username=[string]}`

- **Success Response:**

  - **Code:** 201 Created<br />
    **Content:** `{ token : string }`

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Missing Username, Email or Password" }`
  - **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Invalid Input" }`
  - **Code:** 409 Conflict<br />
    **Content:** `{ error : "The email or username is already assigned." }`
  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error : A server error occurred." }`
