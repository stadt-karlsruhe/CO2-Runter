## **User get Groups with Admin**

This endpoint allows users to retrieve a list of groups they administer.

- **URL**

  `/groups/admin`

- **Method:**

  `GET`

- **Data Params**

  **Required:**

  `token=[string]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ groups = [{group_id=[string], name = [string], owner_username=[string], NumberOfGroupMembers = [integer]}, ...] }`

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

  /groups/member

- **Method:**

  `GET`

- **Data Params**

  **Required:**

  `token=[integer]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ groups : [{group_id=[string], name = [string], owner_username=[string], NumberOfGroupMembers = [integer]}, ...] }`

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

  `/groups/<group_number>/add_user`

- **Method:**

  `POST`

- **Data Params**

  **Required:**

  `token=[string]`

- **Success Response:**

  - **Code:** 200 <br />

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "The user is not logged in." }`
  - **Code:** 404 Not Found<br />
    **Content:** `{ error : "The group with the specified ID was not found." }`
  - **Code:** 409 Conflict<br />
    **Content:** `{ error : "The user is already a member of the group." }`
  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error : A server error occurred." }`

## **Get Group by Groupcode**

This endpoint allows users to retrieve information about a group by providing its number.

- **URL**

  `/groups/<group_code>`

- **Method:**

  `GET`

- **Success Response:**

  - **Code:** 200 Ok<br />
    **Content:** `{name = [string], owner_username=[string], NumberOfGroupMembers = [integer]}`

- **Error Response:**

  - **Code:** 404 Not Found<br />
    **Content:** `{ error : "The group with the specified group code was not found." }`
  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error : A server error occurred." }` 

## **Create Group**

This endpoint allows users to create a new group by providing a name.

- **URL**

  `/groups`

- **Method:**

  `POST`

- **Data Params**

  **Required:**

  `token=[string], groupname=[string]`

- **Success Response:**

  - **Code:** 201 Created<br />
    **Content:** `{ groupname: [string], groupcode=[string] }`

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

  `/groups/<group_name>`

- **Method:**

`DELETE`

- **Data Params**

  **Required:**

  `token=[string]`

- **Success Response:**

  - **Code:** 204 No Content<br />

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "The user is not logged in." }`
  - **Code:** 403 Forbidden <br />
    **Content:** `{ error : "The user is not allowed to delete the group." }`
  - **Code:** 404 Not Found<br />
    **Content:** `{ error : "The group with the specified ID was not found." }`
  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error : A server error occurred." }`
