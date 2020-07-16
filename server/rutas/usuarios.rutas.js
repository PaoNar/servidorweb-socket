;
'use strict'

const express = require('express')
const passport = require('passport')

let api = express.Router()
    usuarioControl = require('../controles/usuarios.control'),
    passwordControl = require('../controles/password')

    let authenticateControl = require('../controles/autentifica')

api.get('/prueba', usuarioControl.prueba)

api.get('/getusuarios', authenticateControl.autentica, usuarioControl.getUsuarios)

api.get('/postman_query', usuarioControl.posmanQuery)
api.get('/postman_params/:nombre/:apellido', usuarioControl.posmanParams)
api.post('/postman_body',usuarioControl.posmanBody )

api.post('/insert', usuarioControl.insertUsuarios)
api.post('/insertuno', usuarioControl.insertUno)
api.put('/actualizaruno', usuarioControl.updateUsuarios)
api.get('/nombre', usuarioControl.buscarNombre)
api.delete('/borrarusuario', usuarioControl.deleteUsuario)
api.put('/updatefull', usuarioControl.updateFullUsuarios)


api.post('/nuevo_usuario', [passwordControl.codificarPassword], usuarioControl.nuevoUsuario)

api.post('/login', usuarioControl.loginUsuario)





module.exports = api