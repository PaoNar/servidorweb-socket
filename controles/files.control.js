;
'use strict'

const connectDb = require('../config/db'),
    fs = require('fs'),
    path = require('path')

let uploadFile = (req, res) =>{
    let file = req.files.uploadFile
    console.log(file)
    if(file.originalFileName == '') {
        fs.unlinkSync(file.path)
        return res.status(400).json({
            transaccion: false,
            data: null,
            msg: 'No existe el archivo'
        })
    }else{
        let url = file.path
        url = url.split('\\')
        let urlFile = [url[url.length  -1]]
        return res.status(200).json({
            transaccion: true,
            data: urlFile,
            msg: urlFile.length
        })
    }
} 


let verFileGaleria = (req, res) =>{
    let urlFile = req.params.urlFile
    let pathFile = `./files/galeria/${urlFile}` 
    console.log(pathFile)
    fs.exists(pathFile, (exists) => {
        if (exists){
            return res.status(200).sendFile(path.resolve(pathFile))
        } else {
            return res.status(400).send('No existe el archivo')
        }
    }) 
}

module.exports = {
    uploadFile,
    verFileGaleria
}
    

