//! -------------- Rutas de Events -----------------
//! ------------- host + /api/events --------------

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { JWTvalidated } = require('../middlewares/jwt-validated');
const { isDate } = require('../helpers/isDate');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events')

const router = Router();

// Todas las rutas de aca para abajo estan protegidas por Json web token, tiene que psar la validacion
router.use( JWTvalidated );

router.get('/', getEvents );

router.post(
    '/', 
    [
        check('title', 'The title is required').not().isEmpty(),
        check('start', 'Start date is required').custom( isDate ),
        check('end', 'End date is required').custom( isDate ),
        fieldValidator
    ],
    createEvent );

router.put(
    '/:id', 
    [
        check('title', 'The title is required').not().isEmpty(),
        check('start', 'Start date is required').custom( isDate ),
        check('end', 'End date is required').custom( isDate ),
        fieldValidator
    ],
    updateEvent );

router.delete('/:id', deleteEvent );

module.exports = router;