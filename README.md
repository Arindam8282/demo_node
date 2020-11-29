This project is created with [Node.js](https://nodejs.org/en/docs/).
We have typescript support in this project using [typescript](https://code.visualstudio.com/docs/typescript/typescript-compiling).

Press  `Cmd + Shift + V`  form your Mac keyboard to preview the README.md.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the production mode. Then, visit [http://localhost:5000/api/test](http://localhost:5000/api/test) through a browser window to check the application running.

## Learn More

You can learn more in the [Express.js](https://expressjs.com/en/starter/installing.html).

### Setup Node.js project using TypeScript

**Initialize the project with `TypeScript`.** *Make sure you have a stable version of* [NodeJS](https://nodejs.org/en/), [NPM](https://www.npmjs.com/) and [TypeScript](https://code.visualstudio.com/docs/typescript/typescript-compiling) *is installed in your system globally.*

```bash
tsc --init
```

**Check** the `tsconfig.json` file to understand the TypeScript configurations. Visit [tsconfig.json](https://bitbucket.org/abhisekdutta507/nodejs-quick-start-typescript/src/master/tsconfig.json).

Please visit [typescriptlang.org](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) for more info.

**Install the modular dependencies with `NPM`.** *Make sure you are in the project's root directory.*

```bash
npm init -y

npm i express dotenv body-parser cors mongoose

npm i -D typescript ts-loader ts-node webpack webpack-cli nodemon @types/cors @types/express @types/mongoose @types/node
```

**Add the environment file if it is missing.**

```ts
export const MongoDB = {
  host: '12345.mlab.com',
  port: 54321,
  database: 'db',
  username: 'username',
  password: 'password'
}
```

Please visit `/src/environment/index.ts`. The above is a json that gives you an idea of the environment file. Update with the proper values before you start.

**Generate build files with `NPM`.** *Make sure you updated the tsconfig.json.*

```bash
npm run build
```

**Run the application in development mode.** 

```bash
npm run dev
```

### Node.js API Documentation

**CREATE a `Car` API is documented below.**

```cURL
curl --location --request POST 'http://localhost:5000/api/cars' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "BMW X4",
    "brand": "BMW",
    "price": 6300000,
    "photoPath": "https://res.cloudinary.com/imagebag/image/upload/q_auto,w_500/Dummy%20Uploads/bmw-x4.jpg"
}'
```

**GET a `Car` API is documented below.**

```cURL
curl --location --request GET 'http://localhost:5000/api/cars/:_id'
```

**LIST all `Cars` API is documented below.**

```cURL
curl --location --request GET 'http://localhost:5000/api/cars?sort=price&order=-1&search=BMW&or=brand,name'
```

Query parameters can be passed `sort`, `order`, `skip`, `limit`, `select`, `populate`, `search` and `or`.

Descriptions,

`sort`: the key using which we want to sort the documents.

`order`: `1` (asc) or `-1` (desc). default is `1`. passing `sort` is required.

`skip`: skip the number of elements from the list. default `0`.

`limit`: maximum number of records to be fetched. default `20`.

`select`: comma separated string. e.g. `name,price`. only the selected keys will be returned.

`populate`: comma separated string. schema join with keys that contains ObjectId.

