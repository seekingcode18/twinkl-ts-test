# Twinkl TypeScript Test

- [Running locally](#running-locally)
- [Endpoints](#endpoints)
- [Rationale](#rationale)
- [Opportunities to refactor and extend](#opportunities-to-refactor-and-extend)

## Running locally

1. Clone the repo
2. `npm install`
3. `npm run db:setup` to initialise and seed the database
4. `npm run test` to run the tests
5. `npm run start` to start the app
6. Use `requests.http` or Postman to test the endpoints on http://localhost:3000
  * Ensure nothing else is running on port 3000 before running the app

N.B. For the 2nd and subsequent times you run the app, you can start at step 4 or 5.


## Endpoints

The app contains 2 endpoints as detailed here.

### Create a user

`POST /users`

Content type: `json`

Request body:

```
{
  "fullName": "Test User",
  "emailAddress": "user@test.com",
  "password": "asdASD123", // must meet password requirements*
  "createdDate": "01-01-2025T00:00:00",
  "type": "student" // student || teacher || parent || private tutor
}
```

\* passwords must be between 8 and 64 characters in length, and must contain at least one of each of the following: digits (0-9), lowercase letters (a-z), and uppercase letters (A-Z).


Return type:
```
{
  "message": "User received",
  "user": {
    "id": 1, // auto-incremented by the database
    "fullName": "Test User",
    "emailAddress": "user@test.com",
    "createdDate": "01-01-2025T00:00:00",
    "type": "student"
  }
}
```

N.B.: If there is an error, the endpoint will return a useful error message, e.g. what field failed validation.


### Get a user by id

`GET /users/:id` (where `:id`  is the number of a user in the database)

Return type:
```
{
  "id": 1,
  "fullName": "Test User",
  "emailAddress": "user@test.com",
  "password": "asdASD123",
  "createdDate": "01-01-2025T00:00:00",
  "type": "student"
}
```

N.B.: If the provided id doesn't match one in the database, the endpoint will return 404 with the following:

```
{
  "message": "User not found"
}
```

## Rationale

I enjoyed solving this task. Here is an explanation of some of my design and coding choices, expanding what's in the `git log`.

I opted for `vitest` due to its performance and positive developer experience. My personal preference is to use `ESM` over `CommonJS` for new projects, hence my choice there.

I chose to break up my code into modules: services, constollers, utils, routes, etc. to make it easier to follow and maintain.

I wrote tests as I went, sometimes before and sometimes just after writing the functionality. I mention two possible improvements I could make to them (see below).

I used it as an opportunity to explore Drizzle ORM, which I'd heard of but never used. It was fun to implement, although the docs weren't 100% accurate and I had to resort to an article to help finalise the setup.

For the database schema, I thought about implementing an id column and then remembered that SQLite has a built-in `rowid`. However, this proved impossible to get using Drizzle, so I resorted to adding an auto-incrementing id.

I considered using a tuple in the validation logic but I felt an object was more semantic. However, this still isn't ideal and could be improved (see below).

## Opportunities to refactor and extend
- provide more detailed password validation error messages
- hash the passwords in the database
- consider whether any passwords should be returned by the GET endpoint
- utlise before functions in tests to avoid repetition
- use a reference object for validation messages to clean up the code
- mock the users service in the GET tests
- an endpoint to return all users
- user TypeScript and SQLite functions to handle `createdDate`
