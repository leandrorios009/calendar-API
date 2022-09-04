const { reponse } = require('express');
const jwt = require('jsonwebtoken');

const JWTvalidated = ( req, res = response, next ) => {
    //x-token headers
    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'Authentication token not received'
        })
    }

    try {
        const { uid, name } = jwt.verify(
            token, 
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid
        req.name = name


    } catch( error ){
        res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        })
    }

    //console.log( token )

    next();
}

module.exports = {
    JWTvalidated
}