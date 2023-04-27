## **Get Footprint Data for all Districts**

This endpoint allows users to retrieve a list of groups they administer.

- **URL**

  `/dashboard/footprints`

- **Method:**

  `GET`

- **Data Params**

  **Required:**


- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `[ category : "Category" districts: [ name: "District Name" footprint: "Footprint" ], ... ]`

- **Error Response:**

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "The user is not logged in." }`
  - **Code:** 404 Not Found<br />
    **Content:** `{ error : "The user with the specified ID was not found." }`
  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error : A server error occurred." }` 