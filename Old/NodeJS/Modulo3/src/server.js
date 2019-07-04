require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const Youch = require('youch')
const Sentry = require('@sentry/node')
const validate = require('express-validation')
const databaseConfig = require('./config/database')
const sentryConfig = require('./config/sentry')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.sentry()
    this.database()
    this.middlewares()
    this.routes()
    this.exception()
  }

  sentry () {
    Sentry.init(sentryConfig)
  }

  database () {
    // mongodb://usuario@senha@localhost:27017/nomedatabase
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
  }

  middlewares () {
    this.express.use(express.json())
    this.express.use(Sentry.Handlers.requestHandler())
  }

  routes () {
    this.express.use(require('./routes'))
  }

  exception () {
    if (process.env.NODE_ENV === 'production') {
      this.express.use(Sentry.Handlers.errorHandler())
    }

    this.express.use(async (error, req, res, next) => {
      if (error instanceof validate.ValidationError) {
        return res.status(error.status).json(error)
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(error, req)

        return res.json(await youch.toJSON())
      }

      return res
        .status(error.status || 500)
        .json({ error: 'Internal Server Error' })
    })
  }
}

module.exports = new App().express
