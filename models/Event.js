const { Schema, model } = require('mongoose');

const EventSchema = Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    title: {
        type:String,
        required: true
    },
    notes: {
        type:String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

//config adicionales del modelo
//cambio de _id por id en respuesta
EventSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Event', EventSchema );