; 
'use strict'

const connectDb = require('../config/db'),
    fs = require('fs'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken')




let prueba = (req, res) => {
    res.status(200).send('Hola Api')
}

let getUsuarios = async(req, res)=>{
    let db = await connectDb()
    db.collection('usuarios').find().toArray()
    .then((data)  => {
        res.status(200).json({
            transaccion: true,
            data: data ,
            msg: 'listo',
            token: req.token
        })
        
    }).catch(err => {
        res.status(500).json({
            transaccion: false,
            data: null,
            msg: err
            })
        })
        
            
    }


    let insertUsuarios = async(req, res)=>{
        let db = await connectDb()
        let array = req.body.array
        db.collection('usuarios').insertMany(array)
        .then((data)  => {
            res.status(200).json({
                transaccion: true,
                data: data ,
                msg: 'listo'
            })
        }).catch(err => {
            res.status(500).json({
                transaccion: false,
                data: null,
                msg: err
                })
            })
        }
    
    let insertUno = async(req, res)=>{
        let db = await connectDb()
        let dato = req.body
        db.collection('usuarios').insertOne(dato)
        .then((data)  => {
            res.status(200).json({
                transaccion: true,
                data: data ,
                msg: 'listo'
            })
        }).catch(err => {
            res.status(500).json({
                transaccion: false,
                data: null,
                msg: err
                })
            })
        }

    let updateUsuarios = async(req, res)=>{
            let db = await connectDb()
            let datos = req.body
            db.collection('usuarios').update({'_id': new ObjectId(datos.id)}, {$set: datos.datos})
            .then((data)  => {
                res.status(200).json({
                    transaccion: true,
                    data: data ,
                    msg: 'listo'
                })
            }).catch(err => {
                res.status(500).json({
                    transaccion: false,
                    data: null,
                    msg: err
                    })
                })
        }


    let buscarNombre = async(req, res)=>{
                let db = await connectDb()
                let nombre = req.query.nombre
                db.collection('usuarios').find({'nombre':nombre}).toArray()
                .then((data)  => {
                    res.status(200).json({
                        transaccion: true,
                        data: data ,
                        msg: 'listo'
                    })
                }).catch(err => {
                    res.status(500).json({
                        transaccion: false,
                        data: null,
                        msg: err
                        })
                    })
        }

                
    let deleteUsuario = async(req, res)=>{
                    let db = await connectDb()
                    let id =  new ObjectId(req.query.id)
                    db.collection('usuarios').deleteOne({'_id':id})
                    .then((data)  => {
                        res.status(200).json({
                            transaccion: true,
                            data: data ,
                            msg: 'Se borro un elemento'
                        })
                    }).catch(err => {
                        res.status(500).json({
                            transaccion: false,
                            data: null,
                            msg: err
                            })
                        })
        }


    let updateFullUsuarios = async(req, res)=>{
            let db = await connectDb()
            let data = req.body
            db.collection('usuarios').updateMany({"sexo":data.sexo}, {$set: {"edad": data.edad, "provincia":"Pichincha"}})
            .then((data)  => {
                res.status(200).json({
                    transaccion: true,
                    data: data ,
                    msg: 'Full Actualizaciòn'
                })
            }).catch(err => {
                res.status(500).json({
                    transaccion: false,
                    data: null,
                    msg: err
                    })
                })
        }   
    
        

    let posmanQuery = (req, res) => {
        let id = req.query.id
        let nombre = req.query.nombre
        let apellido = req.query.apellido

        let persona = req.query
        console.log(persona)

        let data = {
            id,
            nombre,
            apellido
        }
        res.status(200).json({
            transaccion: true, 
            data,
            msg: ''
        })
    }


    let posmanParams = (req, res) => {
        let nombre = req.params.nombre
        let apellido = req.params.apellido
        
        let persona = req.params
        console.log(req)
        console.log(persona)

        let data = {
            nombre,
            apellido
        }
        res.status(200).json({
            transaccion: true, 
            data,
            msg: ''
        })
    }



    let posmanBody = (req, res) => {
        let nombre = req.body.nombre
        let apellido = req.body.apellido
        
        let persona = req.body
        console.log(persona)

        let data = {
            nombre,
            apellido
        }
        res.status(200).json({
            transaccion: true, 
            data,
            msg: ''
        })
    }


let nuevoUsuario = async(req, res) =>{
    let usuario = req.body.usuario
    let db = await connectDb()
    db.collection('usuarios').insertOne(usuario)
    .then((data) =>{
        res.status(200).json({
            data,
            msg:'usuario OK'
        })

    }).catch(err =>{
        res.status(500).json({
            data: null,
            msg:'No se pudo crear el usuario'
            
    })
        
    })
 }


 let loginUsuario = async (req, res) => {
    
    let email = req.body.email
    let passw = req.body.password

    let db = await connectDb()
        db.collection('usuarios').find({ 'email': email }).toArray((err, data) =>{

        console.log(data)

           if(!email === 1) {
               let usuario = data[0]
        //    if(!err && data.length === 1) {
        //        let usuario = data[0]
               if(bcrypt.compareSync(passw, usuario.password)) {
                  
                   let token = jwt.sign({ data: usuario }, req.sessionID, {
                    algorithm: "HS256",
                    expiresIn: 6000

                }
                );
                res.status(500).json({
                    transaccion: true,
                    data: null,
                    msg: 'usuario ok',
                    token: token
                })

               }else{
                res.status(500).json({
                    transaccion: true,
                    data: null,
                    msg: 'No es Usuario'
               } )
           }

        }
        // console.log(token)
        // console.log(data)
    })
}


module.exports = {
    prueba,
    getUsuarios,
    posmanQuery,
    posmanParams,
    posmanBody,
    insertUsuarios,
    insertUno,
    updateUsuarios,
    deleteUsuario,
    buscarNombre,
    updateFullUsuarios,
    nuevoUsuario,
    loginUsuario
}