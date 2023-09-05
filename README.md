# Side Property CRUD API

This is a Node.js project that provides a RESTful API for performing CRUD (Create, Read, Update, Delete) operations on property data. The project is built using Express.js, TypeScript, TypeORM, Supertest for testing, and Joi for schema validation. It includes endpoints for managing properties and supports pagination for listing properties.

## Getting Started

To get started with this project, follow the steps below:

### Prerequisites

Before you begin, make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/property-crud.git
   cd property-crud
   ```

2. Install dependencies:

   ```bash
   npm install
   ```


3. Start the server:

   ```bash
   npm run start
   ```

The server is running at http://localhost:3000
## API Endpoints

### Create a Property

- **URL**: `/properties`
- **Method**: `POST`
- **Request Body**:

  ```json
  {
	"address": "addressName",
	"price" : 9375751,
	"bedrooms": 2,
	"bathrooms": 1,
	"type": "type"
  }
  ```

- **Response**:

  - **Success**: 201 Created
  - **Error**: 400 Bad Request

### Get a Property

- **URL**: `/properties/:id`
- **Method**: `GET`
- **Response**:

  - **Success**: 200 OK

  ```json
  {
	"data": {
		"property": {
			"id": 1,
			"address": "74434 East Sweet Bottom Br #18393",
			"price": 20714261,
			"bedrooms": 2,
			"bathrooms": 5,
			"type": null
		}
	}
  }
  ```

  - **Error**: 404 Not Found

### Update a Property

- **URL**: `/properties/:id`
- **Method**: `PUT`
- **Request Body**:

  ```json
  {
	"address": "addresss123",
	"price" : 9375751,
	"bedrooms": 2,
	"bathrooms": 1,
	"type": "Condominium"
  }
  ```

- **Response**:

  - **Success**: 200 OK

  ```json
  {
	"address": "addresss123",
	"price" : 9375751,
	"bedrooms": 2,
	"bathrooms": 1,
	"type": "Condominium"
  }
  ```

  - **Error**: 404 Not Found

### Delete a Property

- **URL**: `/properties/:id`
- **Method**: `DELETE`
- **Response**:

  - **Success**: 204 No Content
  - **Error**: 404 Not Found

### List Properties with Pagination

- **URL**: `/properties`
- **Method**: `GET`
- **Query Parameters**:

  - `page` (optional): Page number (default: 1)
  - `pageSize` (optional): Number of items per page (default: 10)
  - `address` (optional)
  - `price` (optional)
  - `bathrooms` (optional)
  - `bedrooms` (optional)
  - `type` (optional)

- **Response**:

  - **Success**: 200 OK

  ```json
  {
	"data": [
		{
			"id": 1,
			"address": "endereço123",
			"price": 9375751,
			"bedrooms": 2,
			"bathrooms": 1,
			"type": "Condominium"
		},
		{
			"id": 2,
			"address": "8369 West MAJESTY STREET Path #1765",
			"price": 9375751,
			"bedrooms": 3,
			"bathrooms": 6,
			"type": null
		},
		{
			"id": 3,
			"address": "90678 South VELLUM Extension #6A2",
			"price": 12104869,
			"bedrooms": 5,
			"bathrooms": 4,
			"type": null
		},
		{
			"id": 4,
			"address": "34149 East GRANICUS Mews #I-7",
			"price": 7857291,
			"bedrooms": 6,
			"bathrooms": 2,
			"type": "Condominium"
		},
		{
			"id": 5,
			"address": "21366 South Creek Mist Bluff #I-7",
			"price": 13685168,
			"bedrooms": 2,
			"bathrooms": 3,
			"type": "Condominium"
		},
		{
			"id": 6,
			"address": "89810 East Running Doe Knoll #709S",
			"price": 20764446,
			"bedrooms": 5,
			"bathrooms": 1,
			"type": "Townhouse"
		},
		{
			"id": 7,
			"address": "96294 West BEAD GRASS TER Gate #4059",
			"price": 17450668,
			"bedrooms": 1,
			"bathrooms": 5,
			"type": null
		},
		{
			"id": 8,
			"address": "39781 West Old Woman Springs Rd Drive #APT 2B",
			"price": 10114945,
			"bedrooms": 6,
			"bathrooms": 2,
			"type": "Condominium"
		},
		{
			"id": 9,
			"address": "172 North British Colony Boulevard #27",
			"price": 9014063,
			"bedrooms": 4,
			"bathrooms": 5,
			"type": null
		},
		{
			"id": 10,
			"address": "22690 West Hunters Hollow Garden #LPH-1",
			"price": 9199166,
			"bedrooms": 4,
			"bathrooms": 2,
			"type": "Townhouse"
		}
	],
	"pagination": {
		"page": 1,
		"pageSize": 10
	}
  }
  ```

## Testing

To run tests for this project using Supertest, use the following command:

```bash
npm run test
```

## Schema Validation

Joi is used for schema validation of incoming requests. You can find the schema validation logic in the `src/validation` directory.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- This project is based on the Express.js framework and leverages the power of TypeScript for type safety.
- TypeORM is used for database management.
- Supertest is used for API testing.
- Joi is used for schema validation.