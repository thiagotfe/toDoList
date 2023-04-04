# To-Do List

**API developed in Node to create and manage tasks.**

## CREATE
**Description:** Create tasks.

**Url:** `/tasks/`

**Method:** `POST`

**Body (JSON)**:
```
{
  "name": "Task name"
}
```

### Success Response:
**Code:** `200`

**Content Example:**
```
{
 	"id": 3,
	"name": "Go to school",
}
```

### Error Responses:
**Code**: `400`

**Conditions:**
- When passing `status` or `delivery_date`
- When something unexpected happens

**Content Example:**
```
{
	"errors": [
		//Error message
	]
}
```

## LIST
**Description:** List tasks.

**Url:** `/tasks/`

**Method:** `GET`

### Success Response:
**Code:** `200`

**Content example:**
```
[
	{
		"id": 4,
		"name": "Read a book",
		"delivery_date": "2023-11-30T03:00:00.000Z",
		"status": 1
	},
	{
		"id": 5,
		"name": "Wash the hair",
		"delivery_date": null,
		"status": 0
	}
]
```

### Error Responses:
**Code:** `400`

**Conditions:**
- When something unexpected happens

**Content Example:**
```
{
	"errors": [
		//Error message
	]
}
```

## SHOW
**Description:** Show a task by `ID`.

**Url:** `/tasks/:id`

**Method:** `GET`

### Success Response:
**Code:** `200`

**Content example:**
```
{
	"id": "4",
	"name": "Read a book",
	"status": 0,
	"delivery_date": "2023-04-04T03:00:00.000Z"
}
```
### Error Responses:
**Code:** 400

**Conditions:**
- Task does not exist
- When something unexpected happens

**Content example:**
```
{
	"errors": [
		//Error message
	]
}
```

## UPDATE
**Description:** Updates a task by `ID` and submitted parameters.

**Url:** `/tasks/:id`

**Method:** `PUT`

**Body (JSON):**

Exemple 1
```
{
  "name": "Wash the car",
  "status": 0
  "delivery_date": {
      "year": 2023,
      "month":4,
      "day":4
  }
}
```
Example 2
```
{
  "name": "Wash the car"
}
```
Example 3
```
{
  "status":1
}
```

### Success Response:
**Code:** `200`

**Content example:**
```
{
	"updated_task": "4"
}
```

### Error Responses:
**Code:** `400`

**Conditions:**
- Task `ID` is missing
- Task does not exist
- Task was finished *and the user passed status*
- `status` must be 0 (pending) or 1 (in progress) or 2 (finished) *and the user passed a different status value*
- `delivery_date` must be a dict with `year`, `month` and `day`
- `delivery_date.year` must be integer
- `delivery_date.month` must be integer, between 1 (January) and 12 (December)
- `delivery_date.day` must be integer, between 1 and 31
- `delivery_date` cannot be in the past
- When something unexpected happens

**Content Example:**
```
{
	"errors": [
		//Error message
	]
}
```

## DELETE
**Description:** Delete a task by `ID`.

**Url:** `/tasks/:id`

**Method:** `DELETE`

### Success Response:
**Code:** `200`

**Content example:**
```
{
	"deleted_task": "5"
}
```

### Error Responses:
**Code:** `400`

**Conditions:**
- Task `ID` is missing
- Task does not exist
- When something unexpected happens

**Content Example:**
```
{
	"errors": [
		//Error message
	]
}
```
