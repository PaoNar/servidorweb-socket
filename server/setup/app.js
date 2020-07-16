;
'use strict'
//definimos el express y el body-parser
const express = require('express'),
    bodyParser = require('body-parser'),
    connectDb = require('../config/db'),
    passport = require('passport'),
    cors = require('cors'),
    parseurl = require('parseurl')

//designamos a un archivo donde van estar las rutas para poder utilizar el servidor
let app = express()
    session = require('express-session')
    usuarioRuta = require('../rutas/usuarios.rutas')
    fileRuta = require('../rutas/files.rutas')
    db = connectDb(),

    sess = {
        secret: 'hola',
        resave: false,
        saveUninitialized: true,
        name: 'sessionID',
        cookie: {
            httpOnly: false,
            maxAge: parseInt(process.env.TIEMPO)
        }

    },
    corsOptions = {
        origin: 'http://localhost:4200',
        optionsSuccessStatus: 200
    }




//configuracion del body-parser
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//configuracion del CORS
app.use(cors(corsOptions))
//Session
app.use(session(sess))

//Passport
app.use(passport.initialize())
app.use(passport.session())

//EJEMPLO DE SESION PARA VERIFICAR
app.use(function (req, res, next) {
    if (!req.session.views) {
      req.session.views = {}
    }
   
    // get the url pathname
    var pathname = parseurl(req).pathname
   
    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
   
    next()
  })
   
  app.get('/prueba1', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/prueba1'] + ' times')
  })
   
  app.get('/prueba2', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/prueba2'] + ' times' + req.sessionID)
  })



//base de nuestro servidor
app.use('/api', usuarioRuta)
app.use('/api', fileRuta)


module.exports = app