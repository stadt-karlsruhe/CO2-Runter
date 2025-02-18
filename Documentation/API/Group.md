## **User get Groups with Admin**

This endpoint allows users to retrieve a list of groups they administer.

- **URL**

  `/groups/admin`

- **Method:**

  `GET`

- **Data Params**

  **Required:**

  `co2token=[string]`,

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `[ groupname = [string], groupcode = [string], memberCount = [int]},...]`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "The user is not logged in." }`
  - **Code:** 404 Not Found<br />
    **Content:** `{ error : "The user with the specified ID was not found." }`
  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error : A server error occurred." }` 

## **User get Groups with Member**

This endpoint allows users to retrieve a list of groups they are a member of.

- **URL**

  `/groups/member`


- **Method:**


  `GET`

- **Data Params**

  **Required:**

  `co2token=[integer]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `[{ groupname = [string], groupcode = [string], ownername=[string], memberCount = [integer]},...] `


- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "The user is not logged in." }`
  - **Code:** 404 Not Found<br />
    **Content:** `{ error : "The user with the specified ID was not found." }`
  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error : A server error occurred." }`

## **Add User to Group**

This endpoint allows adding a user to a group by entering the group code.

- **URL**

  `/groups/add_user`

- **Method:**

  `POST`

- **Data Params**

  **Required:**
  `groupcode=[string]`,
  `co2token=[string]`

- **Success Response:**

  - **Code:** 200 <br />

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "The user is not logged in." }`
  - **Code:** 404 Not Found<br />
    **Content:** `{ error : "Group not found" }`
  - **Code:** 409 Conflict<br />
    **Content:** `{ error : "The user is already a member of the group." }`
  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error : A server error occurred." }`

## **Get Group by Groupcode**

This endpoint allows users to retrieve information about a group by providing its number.

- **URL**

  `/groups/get`

- **Method:**

  `GET`

  **Data Params**

  **Required:**
  `groupcode=[string]`


- **Success Response:**

  - **Code:** 200 Ok<br />
    **Content:** `{groupname = [string], ownername=[string], memberCount = [integer]}`

- **Error Response:**

  - **Code:** 404 Not Found<br />
    **Content:** `{ error : "The group with the specified group code was not found." }`
  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error : A server error occurred." }` 

## **Create Group**

This endpoint allows users to create a new group by providing a name.

- **URL**

  `/groups/create`

- **Method:**

  `POST`

- **Data Params**

  **Required:**

  `co2token=[string], groupname=[string]`

- **Success Response:**

  - **Code:** 201 Created<br />
    **Content:** `{ groupcode=[string] }`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "The user is not logged in." }`
  - **Code:** 403 Forbidden <br />
    **Content:** `{ error : "The user is not authorized to create a group." }`
  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error : A server error occurred." }`

**Delete Group**
---

This endpoint allows an admin to delete a group by providing its number.

- **URL**

  `/groups/delete`

- **Method:**

`DELETE`

- **Data Params**

  **Required:**

   `{ co2token=[string], groupname=[string] }`

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:** `Group deleted`
  

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "The user is not logged in." }`
  - **Code:** 403 Forbidden <br />
    **Content:** `{ error : "The user is not allowed to delete the group." }`
  - **Code:** 404 Not Found<br />
    **Content:** `{ error : "Group not found" }`
  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error : Something went wrong" }`
