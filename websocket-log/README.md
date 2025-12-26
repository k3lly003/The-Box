# Drizzle_Ln
Learning Dizzle with psql + docker in express js.

## Guidance 

### 1. setting up Postgres using docker
-  I used "docker run --name drizzle_ln -e POSTGRES_PASSWORD=drizzle_ln  -p 5431:5432 -d postgres" to set up Postgres inside docker

 [drizzle_ln] = name of the DB.
 [drizzle_ln] = password of the DB.
 [5431:5432] = mapped 5431 to be the port in case 5432 is in use. 

### NB: docker ps -a
I used this command to see all images running and see if there is the Image I've just created.
![alt text](image.png)
### 2. Connect this image to the psql
They are two ways you can follow:
 1. connect to pgAdmin
 2. Use command tools:
    Here you can run 'docker exec -it drizzle_ln psql -U postgres'

### 3. Installing dependencies
Run these commands :
- npm install express drizzle-orm postgres dotenv
- npm install -D @types/express @types/node tsx drizzle-kit typescript

### 4. create an .env file
- create an env file and add your DB_URL  
  [example: 
        npm install express drizzle-orm postgres dotenv
        npm install -D @types/express @types/node tsx drizzle-kit typescript
  ]
- #### Generate migration files
run "npx drizzle-kit generate:pg"

- #### Push schema to database
run "npx drizzle-kit push"

- ### Run seeds
run "npm run seed" (this will use the built in drizzle seeds)

- ### Run drizzle studio
run "npx drizzle-kit studio"

### 5. Run Psql commands
Now from here you can use psql commands to interact with your datas, as you wish.
