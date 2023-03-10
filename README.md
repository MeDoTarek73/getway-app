
# GETWAY

This sample project is managing gateways - master devices that control multiple peripheral devices. 
Server creating a REST service (JSON/HTTP) for storing information about these gateways and their associated devices. This information storing in mongodb database. 
When storing a gateway, any field marked as “to be validated” must be validated and an error returned if it is invalid. Also, no more that 10 peripheral devices are allowed for a gateway.

- The service must also offer an operation for displaying information about all stored gateways (and their devices) 
- and an operation for displaying details for a single gateway. 
- Finally, it must be possible to add and remove a device from a gateway.

Each gateway has:
-	a unique serial number (string), 
-	human-readable name (string),
-	IPv4 address (to be validated),
-	multiple associated peripheral devices. 

Each peripheral device has:
- a UID (number),
- vendor (string),
- date created,
- status - online/offline.





## Tech Stack

**Server:** Node, Express

**Pattern** This app is build on Onion Structure (Repo pattern) so you will find the app devided to multi layers 
- API layer (controllers): This layer provides the interface for external systems and clients to access the application's services. It usually consists of the HTTP endpoints, which are responsible for receiving requests and returning responses. The API layer should handle input validation and request processing and delegate the actual business logic to the next layer.

- Business logic layer (services): This layer implements the core business logic of the application. It should contain all the application-specific rules and workflows, as well as any domain-specific validation or calculations. The business logic layer should be independent of any specific technology or infrastructure and should be easily testable.

- Data layer (repositories & models): This layer provides access to the underlying data storage and is responsible for interacting with the database or other data sources. It includes the repository and data access objects (DAOs) that abstract the details of the underlying storage technology from the rest of the application. The data layer should also be independent of any specific technology and should be easily testable.


## Contributing

Contributions are always welcome!

Import this postman collection `GETWAY-APIs.postman_collection.json` to your postman to get all the APIs prefrances.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`
 - This is refer to mongoDB uri, I already set a temp url for testing mongodb server 

`PORT`
- This refer to the port where the server will run, I already set the port with 3000 you can change it if you want
## Run Locally

Clone the project

```bash
  git clone https://github.com/MeDoTarek73/getway-app.git
```

Go to the project directory

```bash
  cd getway-app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Installation

run this command to setup all the packages

```bash
  npm install
```

To start the server run the below command

```bash
  npm run start
```

IF you want to run the server on the develoment mode 
run the below commands

```bash
  npm install -g nodemon
```
```bash
  npm run dev
```
## Running Tests

To run tests, stop the server if you run it before then run the following command

```bash
  npm run test
```


## Authors

- [@MeDoTarek73](https://github.com/MeDoTarek73)

