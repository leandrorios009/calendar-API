const { response, application } = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config')

console.log( process.env );

const express = require('express');

// Crear el Sevidor de Express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

// Directorio Publico
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/events', require('./routes/events') );

//Configuracion para que el back nos mande a la aplicacion cuando la url no es la de una peticion
app.get( '*', (req, res) => {
    res.sendFile( __dirname + '/public/index.html');
});

// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`)
});