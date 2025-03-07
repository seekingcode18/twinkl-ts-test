# Rationale

I enjoyed this task. Here is an explanation of some of my design and coding choices ,expanding what's in the `git log`.

I opted for `vitest` due to its performance and positive developer experience. My personal preference is to use `ESM` over `CommonJS` for new projects, hence my choice there.

I chose to break up my code into modules: services, constollers, utils, routes, etc. to make it easier to follow and maintain.

I wrote tests as I went, sometimes before and sometimes just after writing the functionality. I mention two possible improvements I could make to them (see below).

I used it as an opportunity to explore Drizzle ORM, which I'd heard of but never used. It was fun to implement, although the docs weren't 100% accurate and I had to resort to an article to help finalise the setup.

For the database schema, I thought about implementing an id column and then remembered that SQLite has a built-in `rowid`. However, this proved impossible to get using Drizzle, so I resorted to adding an auto-incrementing id.

I considered using a tuple in the validation logic but I felt an object was more semantic. However, this still isn't ideal and could be improved (see below).


# Opportunities to refactor and extend
- provide more detailed password validation error messages
- hash the passwords in the database
- utlise before functions in tests to avoid repetition
- use a reference object for validation messages to clean up the code
- mock the users service in the GET tests
