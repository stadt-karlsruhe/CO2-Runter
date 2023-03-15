**Get Question**
----
  This endpoint allows to retrieve a list of questions for the footprint survey

* **URL**

  `questions`

* **Method:**

  `GET` 

* **Success Response:**
  
  A JSON is expected which contains the questions to calculate the CO2 footprint.

  * **Code:** 200 Ok<br />
    **Content:** `{ questions: {JSON}}`
 
* **Error Response:**

  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error : A server error occurred." }`

**Submit Footprint**
----

* **URL**

`/footprint`  

* **Method:**
  
  `POST`
  

* **Data Params**

  **Required:**
 
   `districts={JSON}, groups={JSON} ,answers={JSON}`

* **Success Response:**

  * **Code:** 200 Ok<br />
 
* **Error Response:**

   - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "One or more parameters are missing or invalid." }`
  - **Code:** 500 Internal Server Error<br />
    **Content:** `{ error : A server error occurred." }`

