//! -------------- Rutas de Auth -----------------
//! ------------- host + /api/auth --------------

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { JWTvalidated } = require('../middlewares/jwt-validated')


const router = Router();

const { createUser, loginUser, reNewToken } = require('../controllers/auth')

router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'The password must be at least 6 characters').isLength({ min:6 }),
        fieldValidator
    ],
    createUser )

router.post(
    '/login',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'The password must be at least 6 characters').isLength({ min:6 }),
        fieldValidator
    ],
    loginUser )

router.get('/renew', JWTvalidated, reNewToken )

module.exports = router;