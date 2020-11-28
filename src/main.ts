import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import cors from 'cors'
import { config } from 'dotenv'
import { v1 } from './config'

/**
 * @description create an express application.
 */
const app = express()
/**
 * @description configure the .env file.
 */
config()

/**
 * @description cross-origin domain blocking.
 */
app.use(cors())

/**
 * @description parse the request body into the below options.
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * @description use public directory as a static directory.
 */
app.use(express.static(`${__dirname}/../public`))

/**
 * @description bind the version control routes with app.
 */
app.use('/api', v1().router)

/**
 * @description create a HTTP server.
 */
const server = new http.Server(app)

/**
 * @description sail the app on the server with a given PORT.
 */
server.listen(process.env.PORT || 5000)