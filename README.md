# Express Boilerplate!

This is a boilerplate project used for starting new projects!

## Set up

Complete the following steps to set up a new boilerplate:

1. Clone this repo
2. `cd` into cloned repository
3. Make a fresh start of the git history with `rm -rf .git && git init`
4. Install dependencies with `npm install`
5. Move the example .env file to `.env` that will be ignored by git and read by and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`
7. If using PostgreSQL with Postgrator, checkout the `psql` branch `git checkout psql`
8. For a REST API boiler plate with JWT auth system in place, checkout the `auth` branch `git checkout auth`
9. For a simple Express/GraphQL server checkout the `graphql` branch `git checkout graphql`

## Scripts

Start the REST API server with `npm run dev` or `npm start`

Start the GraphQL server with `node src/server.js`

Run database migrations `npm run migrate`

Run the texts `npm test`

## Deploying to Heroku

(steps 4-8 for deploy with database addon)

1. Log in to Heroku CLI `heroku login`
2. Make a new project `heroku create <name-of-project>`
3. Push to Heroku `git push heroku main`

4. Create the database addon `heroku addons:create heroku-postgresql:hobby-dev`
5. Get the database url `heroku pg:credentials:url`
6. Insert the url `psql <url>`
7. Run production migrations `npm run migrate:production`
8. Seed the production database `cat <file-name> | heroku pg:psql`
