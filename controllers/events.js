const { response } = require('express');
const Event = require('../models/Event');


const getEvents = async (req, res = response) => {
    try {

        const events = await Event.find()
        // rellena datos de user de acuerdo al id user
        .populate('user','name');

        res.status(201).json({
            ok: true,
            events
        })

    } catch (error) {
        console.log( error )
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        })
    }
}

const createEvent = async (req, res = response) => {

    try {

        const event = new Event( req.body );

        event.user = req.uid

        const saveEvent = await event.save(); 

        res.status(201).json({
            ok: true,
            event: saveEvent
        })

    } catch (error) {
        console.log( error )
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        })
    }
}

const updateEvent = async(req, res = response) => {

    try {

        const eventId = req.params.id;
        const uid = req.uid;

        const event = await Event.findById( eventId );

        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'The event does not exist'
            })
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have authorization to edit the event'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

        res.status(201).json({
            ok: true,
            event: updatedEvent
        })

    } catch (error) {
        console.log( error )
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        })
    }
}

const deleteEvent = async(req, res = response) => {
    try {

        const eventId = req.params.id;
        const uid = req.uid;

        const event = await Event.findById( eventId );

        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'The event does not exist'
            })
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have authorization to edit the event'
            })
        }

        await Event.findByIdAndDelete( eventId );

        res.status(201).json({
            ok: true
        })

    } catch (error) {
        console.log( error )
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}