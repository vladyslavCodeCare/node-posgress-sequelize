PROJECT node-express, postgres-sequelize with docker

You need docker to be installed on you machine: https://www.docker.com/products/docker-desktop/

To start project use socker-compose up

It availeble on 4000 port
You can use postaman to check

post "api/users"
get "api/users"
put "api/users/:id"
delete "api/users/:id"
get "api/users/:id"
put "api/exchange"

It uses sync force for DB, remove it if you want to use migration instead

To create migration 'npm run migrate:create'
To undo migration 'npm run migrate:undo'
To start migration 'npm run migrate:run'

It has seeds, creates copule user types and user
To create seed 'npm run seed:create'
To undo seed 'npm run seed:undo'
To start seed 'npm run seed:run'

To change DB config for sequelize migration ./config/config.json

To change DB config ./docker-compose.yml section 'db-seq'
