# ticket project

## For Backend

#### 1. Change the current working directory to backend from root folder

```
$ cd /backend
```

#### 2. Install dependencies

```
$ yarn install
```

#### 3. Start dev server
Starting the dev server also starts MongoDB as a service in a docker container using the compose script at `docker-compose.dev.yml`.

```
$ yarn dev
```
Running the above commands results in 
* 🌏**API Server** running at `http://localhost:8000`
* ⚙️**Swagger UI** at `http://localhost:8000/dev/api-docs`
* 🛢️**MongoDB** running at `mongodb://localhost:27017`

## For Frontend

#### 1. Change the current working directory to frontend from root folder

```
$ cd /frontend
```

#### 2. Install dependencies

```
$ yarn install
```

#### 3. Start dev server
Start the development server on http://localhost:3000:
```
$ yarn dev
```

![Example Image](/example.png)

