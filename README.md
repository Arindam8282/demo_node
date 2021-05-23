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
  host: '',
  port: '',
  database: '',
  username: '',
  password: ''
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

### Node.js API Documentation - [Postman Documentation](https://documenter.getpostman.com/view/4293302/TzRa7j5d)

**CREATE a `Record` API is documented below.**

```TS
/**
 * @description {string} record. Possible values "department" or "employee"
 */
const record: string = 'department';

/**
 * @description {object} data for "department". 
 */
const data: {} = {
  name: 'string' // required
};

/**
 * @description {object} data for "employee". 
 */
const data: {} = {
  name: 'string', // required
  department: 'MongoDB ObjectId' // required
};

const config = {
  method: 'post',
  url: `https://officeemployee.herokuapp.com/api/${record}`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token ...'
  },
  data
};

axios(config)
.then((response) => {
  // output should be there in response.data
})
.catch((error) => {
  console.log(error);
});
```

**GET a `Record` API is documented below.**

```TS
/**
 * @description {string} record. Possible values "department" or "employee"
 */
const record: string = 'department';

/**
 * @description {string} mongodbObjectId. Possible value is a MongoDB ObjectId
 */
const mongodbObjectId: string = '...';

const config = {
  method: 'get',
  url: `https://officeemployee.herokuapp.com/api/${record}/${mongodbObjectId}`,
  headers: {
    'Content-Type': 'application/json'
  }
};

axios(config)
.then((response) => {
  // output should be there in response.data
})
.catch((error) => {
  console.log(error);
});
```

**LIST all `Records` API is documented below.**

```TS
/**
 * @description {string} record. Possible values "department" or "employee"
 */
const record: string = 'department';

const config = {
  method: 'get',
  url: `https://officeemployee.herokuapp.com/api/${record}`,
  headers: {
    'Content-Type': 'application/json'
  }
};

axios(config)
.then((response) => {
  // output should be there in response.data
})
.catch((error) => {
  console.log(error);
});
```

**EDIT a `Record` API is documented below.**

```TS
/**
 * @description {string} record. Possible values "department" or "employee"
 */
const record: string = 'department';

/**
 * @description {string} mongodbObjectId. Possible value is a MongoDB ObjectId
 */
const mongodbObjectId: string = '...';

/**
 * @description {object} data for "department". 
 */
const data: {} = {
  name: 'string' // optional
};

/**
 * @description {object} data for "employee". 
 */
const data: {} = {
  name: 'string', // optional
  department: 'MongoDB ObjectId' // optional
};

const config = {
  method: 'put',
  url: `https://officeemployee.herokuapp.com/api/${record}/${mongodbObjectId}`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token ...'
  },
  data
};

axios(config)
.then((response) => {
  // output should be there in response.data
})
.catch((error) => {
  console.log(error);
});
```

**DELETE a `Record` API is documented below.**

```TS
/**
 * @description {string} record. Possible values "department" or "employee"
 */
const record: string = 'department';

/**
 * @description {string} mongodbObjectId. Possible value is a MongoDB ObjectId
 */
const mongodbObjectId: string = '...';

const config = {
  method: 'delete',
  url: `https://officeemployee.herokuapp.com/api/${record}/${mongodbObjectId}`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token ...'
  }
};

axios(config)
.then((response) => {
  // output should be there in response.data
})
.catch((error) => {
  console.log(error);
});
```

**SEARCH within `Records` API is documented below.**

```TS
/**
 * @description {object} data for "employee".
 * The below query will search the records with department "609d750b0b366b00dd3d9c39" and name should contain "Subhankar" or "Arindam" but not "Debnath".
 */
const data: {} = {
  // optional
  '$and': [
    {
      department: '609d750b0b366b00dd3d9c39'
    }
  ],

  // optional
  '$or': [
    {
      name: 'Subhankar'
    },
    {
      name: 'Arindam'
    }
  ],

  // optional
  '$nor': [
    {
      name: 'Debnath'
    }
  ],
};

const config = {
  method: 'post',
  url: `https://officeemployee.herokuapp.com/api/searchemployee`,
  headers: {
    'Content-Type': 'application/json'
  },
  data
};

axios(config)
.then((response) => {
  // output should be there in response.data
})
.catch((error) => {
  console.log(error);
});
```

**Login as `Admin` API is documented below.**

```TS
/**
 * @description {object} data for "employee".
 * The below query will search the records with department "609d750b0b366b00dd3d9c39" and name should contain "Subhankar" or "Arindam" but not "Debnath".
 */
const data: {} = {
  email: 'string',
  password: 'string'
};

const config = {
  method: 'post',
  url: `https://officeemployee.herokuapp.com/api/loginasadmin`,
  headers: {
    'Content-Type': 'application/json'
  },
  data
};

axios(config)
.then((response) => {
  // output should be there in response.data
})
.catch((error) => {
  console.log(error);
});
```

**Query parameters can be passed with API calls.** The parameters are `sort`, `order`, `skip`, `limit`, `populate`, `select`, `search` and `or`.

Descriptions: The query params work with almost all the available `GET` APIs.

**sort**: The key using which we want to sort the documents.

**order**: `1` (asc) or `-1` (desc). Default is `1`. Passing `sort` is required.

**skip**: Skips the number of elements from the list. Default is `0`.

**limit**: Maximum number of records to be fetched. Default is `20`.

**populate**: Comma separated string. Schema join using `Refs` that contains ObjectId.

**select**: Comma separated string. E.g. `name,department`. Only the selected keys will be returned. Populated keys will be also there in the API response.

**search**: Can be used to search text data within the records.

**or**: Comma separated string. The fields where `search` will be applied. This param is required along with `search`. E.g. `search=Bose&or=name`. Now it will help you search the records with the text `Bose` in the `name` fields. 

```TS
/**
 * @description {string} record. Possible values "department" or "employee"
 */
const record: string = 'employee';

/**
 * @description Seach the text "Saha" in "name" within the "employee" records. Sort the result in "Descending" order by "name". Do not fetch the 1st 10 records and show maximum 100 records. Also only show the "name" & "department" fields in the response. And join the "employee" & "department" records by "Ref".
 */
const sort: string = 'name';
const order: number = -1;
const skip: number = 10;
const limit: number = 100;
const populate: string = 'department';
const select: string = 'name,department';
const search: string = 'Saha';
const or: string = 'name';

const config = {
  method: 'get',
  url: `https://officeemployee.herokuapp.com/api/${record}?sort=${sort}&order=${order}&skip=${skip}&limit=${limit}&populate=${populate}&select=${select}&search=${search}&or=${or}`,
  headers: {
    'Content-Type': 'application/json'
  }
};

axios(config)
.then((response) => {
  // output should be there in response.data
})
.catch((error) => {
  console.log(error);
});
```

**Response object without populate `department`.**

```JSON
{
  "message": {
    "type": "success"
  },
  "data": [
    {
      "_id": "609d7e0242e8090132da416d",
      "name": "Sourav Saha",
      "department": "609d76dfdee81200fc10f8b6",
      "__v": 0
    },
    {
      "_id": "609e0827596ac300157dc45f",
      "name": "Debarati Saha",
      "department": "609d754963d8f400ec7c7cdc",
      "__v": 0
    }
  ]
}
```

**Response object with populate `department`.**

```JSON
{
  "message": {
    "type": "success"
  },
  "data": [
    {
      "_id": "609d7e0242e8090132da416d",
      "name": "Sourav Saha",
      "department": {
        "_id": "609d76dfdee81200fc10f8b6",
        "name": "Designer",
        "__v": 0
      },
      "__v": 0
    },
    {
      "_id": "609e0827596ac300157dc45f",
      "name": "Debarati Saha",
      "department": {
        "_id": "609d754963d8f400ec7c7cdc",
        "name": "Project Manager",
        "__v": 0
      },
      "__v": 0
    }
  ]
}
```
