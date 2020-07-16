; 
'use strict'

let gestionDoc = (http) => {
    let io = require('socket.io')(http)

    let socketJwt= require('socketio-jwt')
    
    // let session = getsessionID()
    // console.log(session)

    //io usa jwt
     io.use(socketJwt.authorize({
         secret: (req, decodedToken, callback) =>{
             console.log(req._query.sessionID)
             callback(null, req._query.sessionID)
         },
         handshake: true
     }))

    //salas
    const gestionDatos = {}
    io.on('connection', socket => {
        let anteriorID
        console.log(socket.handshake)
        
        const safeJoin = actualId => {
            //salir de una sala
            socket.leave(anteriorID)
            //entrar una sala 
            socket.join(actualId)
            anteriorID = actualId
        }
        //listar los diferentes documentos
        socket.on('getDoc', docId => {
           
            safeJoin(docId)

            //llama al evento 
            socket.emit('gestionDato', gestionDatos[docId])
        })

        socket.on('addDoc', doc => {
            if(doc.pasw === '12345'){
                let salas= Object.keys(gestionDatos)
                let numeroSalas = salas.length + 1

                let nombreSala = `documento${numeroSalas}`
                doc.id = nombreSala
                gestionDatos[doc.id] = doc
    //            console.log(gestionDatos)
                safeJoin(doc.id)

                io.emit('gestionDatos', Object.keys(gestionDatos))
                //recibe en nombre y contenido de la sala
                socket.emit('gestionDato', doc)
            } 
        })



        socket.on('editDoc', doc =>{
            gestionDatos[doc.id] = doc
            socket.to(doc.id).emit('gestionDato', doc)  
            
        })
        io.emit('gestionDatos', Object.keys(gestionDatos))


    })
}


// let getsessionID = (req, res)=>{
//     return req.sessionID
// }

module.exports = gestionDoc
