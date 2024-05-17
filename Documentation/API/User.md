# User Endpoints

## User change Password

This endpoint allows users to change their password by providing their new password.

- **URL**

  `/change_password`

- **Method:**

  `PUT`

 **Data Params**

  **Required:**

  `token=[string], old_password=[string], new_password=[string]`

- **Success Response:**

  - **Code:** 200 <br />

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "The request was invalid or incomplete." }`
  - **Code:** 404 Not Found<br />
    **Content:** `{ error : "The user with the specified ID was not found." }`
  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error : A server error occurred." }`

## User change Email

This endpoint allows users to change their email address by providing their new email.

- **URL**

  `/change_email`

- **Method:**

  `PUT`

- **Data Params**

  **Required:**

  `token=[string], new_email=[string]`

- **Success Response:**

  - **Code:** 204 No Content<br />

- **Error Response:**

  - **Code:** 400 Bad Request<br />
    **Content:** `{ error : "All input is required" }`
  - **Code:** 404 Not Found<br />
    **Content:** `{ error : "The user with the specified ID was not found." }`
  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error : A server error occurred." }`

## User change Username

This endpoint allows users to change their username by providing their new username.

- **URL**

  `/change_username`

- **Method:**

  `PUT`

- **Data Params**

  **Required:**

  `token=[string], username=[string]`

- **Success Response:**

  - **Code:** 204 No Content<br />

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "The user is not logged in." }`

  - **Code:** 403 Forbidden <br />
    **Content:** `{ error : "The user is not entitled to delete the account." }`
  - **Code:** 404 Not Found<br />
    **Content:** `{ error : "The user with the specified ID was not found." }`
  - **Code:** 409 Conflict<br />
    **Content:** `{ error : "The new username is already assigned." }`
  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error : A server error occurred." }`

## User delete Account

This endpoint allows users to delete their account. When this endpoint is invoked, the user's account is deleted and all associated data is permanently deleted from the database.

- **URL**

`/delete`

- **Method:**

`DELETE`

- **Data Params**

  **Required:**

  `token=[string], password=[string]`

- **Success Response:**

  - **Code:** 204 No Content<br />

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "The user is not logged in." }`

  - **Code:** 403 Forbidden <br />
    **Content:** `{ error : "The user is not entitled to delete the account." }`
  - **Code:** 404 Not Found<br />
    **Content:** `{ error : "The user with the specified ID was not found." }`
  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error : A server error occurred." }`
