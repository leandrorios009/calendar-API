const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generarJWT } = require('../helpers/jwt')

const createUser = async(req, res = response ) => {

    try { 
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'The mail is already in use'
            })
        }

        user = new User( req.body )

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt);

        await user.save(); 

        //Generar JWT
        const token = await generarJWT( user.id, user.name )

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log( error )
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        })
    }
}

const loginUser = async(req, res = response) => {

    try {
        const { email, password } = req.body

        let user = await User.findOne({ email });

        if( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'There is no registered user with that email'
            })
        }

        //Confirmar Password
        const validPassword = bcrypt.compareSync( password, user.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password'
            })
        }

        //Generar JWT
        const token = await generarJWT( user.id, user.name )

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })


    } catch( error ) {
        console.log( error )
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        })
    }

}

const reNewToken = async(req, res = response) => {
    try {
        const { uid, name } = req;

        //Generar JWT
        const token = await generarJWT( uid, name )
    
        res.json({
            ok: true,
            uid,
            name,
            token
        })
    } catch ( error ) {
        console.log( error )
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        })
    }

}

module.exports = {
    createUser,
    loginUser,
    reNewToken
} 