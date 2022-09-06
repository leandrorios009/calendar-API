const { response } = require('express');
const { validationResult } = require('express-validator');

const fieldValidator = ( req, res = response, next ) => {

     //Manejo de errores
     const errors = validationResult( req );
     //if( !errors.isEmpty() ) {
        // return res.status(400).json({
          //   ok: false,
           //  errors: errors.mapped()
         //});
     //}

     if ( !errors.isEmpty() ) {
 
        const errorsArray = [];
     
        const errorsMapped = errors.mapped();
     
        for ( const property in errorsMapped ) {
     
          if ( property === 'email' || property === 'password' ) {
     
            errorsArray.push( errorsMapped[ property ].msg );
     
          }
     
        }
     
        const errorsString = errorsArray.join( ', ' );
     
        return res.status( 400 ).json( {
          ok: false,
          msg: errorsString
        } );
     
      }
     

    next();
}

module.exports = {
    fieldValidator
}