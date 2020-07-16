; 
'use strict'

const jwt = require('jsonwebtoken')

let autentica = (req, res, next) =>{
    let token = req.headers.authorization || null 
    console.log(token)
    jwt.verify(token, process.env.KEY_JWT, (err, decode) =>{
        if(err){
            return res.status(500).json({
                data: null,
                msg: 'token invalido'
            })
        }else {
            req.decode = decode
            console.log(decode)
            let token = jwt.sign({data: decode.data}, req.sessionID, {
                algorithm: 'HS256',
                expiresIn: parseInt(process.env.TIEMPO)
            })
            req.token = token
            next()
        }
    })
}

module.exports = {
    autentica
}