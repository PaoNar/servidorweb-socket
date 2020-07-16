;
'use strict'

const express = require('express'),
    mutiParty = require('connect-multiparty')


let api = express.Router(),
    filesControl = require('../controles/files.control'),
    galeriaMiddleware = mutiParty({uploadDir: './files/galeria'})
    pdfMiddleware = mutiParty({uploadDir: './files/pdf'})

//ENDPOINT de file
api.post('/upload_galeria', galeriaMiddleware, filesControl.uploadFile)
api.post('/upload_file', galeriaMiddleware, filesControl.uploadFile)
api.get('/file_galeria/:urlFile', filesControl.verFileGaleria)


module.exports = api