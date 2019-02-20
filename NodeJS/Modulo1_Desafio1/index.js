const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoscape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

var idade = ''

const logMiddleware = (req, res, next) => {
  if (idade == '') {
    return res.redirect('/')
  } else {
    return next()
  }
}

app.get('/', (req, res) => {
  return res.render('age')
})

app.get('/minor', logMiddleware, (req, res) => {
  return res.render('minor', { idade })
})

app.get('/major', logMiddleware, (req, res) => {
  return res.render('major', { idade })
})

app.post('/check', (req, res) => {
  idade = req.body.idade

  if (idade >= 18) {
    return res.redirect('/major')
  } else {
    return res.redirect('minor')
  }
})

app.listen(3000)
