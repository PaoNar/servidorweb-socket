; 
'use strict'

//const gestionDocumentos = require('../controles/socket.control')

//configurar variables del sistema para almacenarlas directamente
const env = require('dotenv').config(),

    app = require('./app'),
    //si no encuentra ese puerto va utilizar el puerto 3000
    port = process.env.PORT ||  3000


let http = require('http').Server(app),
    io = require('../controles/socket.control')(http)

//console.log(process.env)

http.listen(port, (err) => {
    if(!err){
        console.log(`El servidor corre en el puerto: http://localhost: ${port}`)
    }else{
        console.log('El servicio no està funcionando')
    }
})

