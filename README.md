# Spaarks Backend Developer Intern Challenge

## Local Setup Instructions

Follow these steps to set up the backend API locally:

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
2. Navigate to the Server Directory:
    ```bash
    cd <dirname>
3. Install Required Packages:
    ```bash
    npm install
4. Set Up Environment Variables:
    - Create a `.env` file in the root directory.
    - Refer to the `envfiletemplate` for the list of required environment variables.
5. Set Up MongoDB Atlas:
    - Create a MongoDB cluster and obtain the connection string for Node.js.
    - Paste the connection string into your .env file under the appropriate key.
6. Load Sample Data into MongoDB Atlas:
    -[Refer](https://www.mongodb.com/docs/atlas/sample-data/) to the MongoDB documentation or use the provided guide to load sample data into your cluster.
7. Add IP Address to Network Access:
    -Ensure your IP address is added to MongoDB Atlas's network access. Refer to this [guide](https://www.mongodb.com/docs/atlas/security/ip-access-list/).
8. Send a Request Using Postman:
    - In the Authorization tab, select JWT Bearer Token.
        - Algorithm: HS256
        - Secret: pranavkokate
        - Payload: 
        ```json
        {
        "email": "admin@gmail.com",
        "password": "qwerty"
        }
    - For Radius-based Query:
    ```php
    http://localhost:<PORT>/q?lat=<value1>&long=<value2>&rad=<value3>
    ```

    - For Minimum and Maximum Radius Query:
     ```php
    http://localhost:<PORT>/q?lat=<value1>&long=<value2>&min=<value3>&max=<value4>
    ```
    - Replace all the `<variables>` with appropriate values.

## Example

### Input 1

```php
http://localhost:8080/q?lat=-73.98241999999999&long=40.579505&rad=10
```
### Output 1
```json
[
    {
        "Name of the Restaurant": "Riviera Caterer",
        "Location": "2780 Stillwell Avenue, Brooklyn 11224",
        "Description of restaurant": "American",
        "Restaurant": {
            "latitude": -73.98241999999999,
            "longitude": 40.579505
        },
        "Average Rating of the restaurant": 9,
        "No of Ratings": 4
    }
]
```

### Input 2

```php
http://localhost:8080/q?lat=-73.98241999999999&long=40.579505&max=200&min=190
```

### Output 1
```json
[
    {
        "Name of the Restaurant": "Papa Johns",
        "Location": "1612 Neptune Avenue, Brooklyn 11224",
        "Description of restaurant": "Pizza",
        "Restaurant": {
            "latitude": -73.98451299999999,
            "longitude": 40.5787321
        },
        "Average Rating of the restaurant": 6.166666666666667,
        "No of Ratings": 6
    }
]
```