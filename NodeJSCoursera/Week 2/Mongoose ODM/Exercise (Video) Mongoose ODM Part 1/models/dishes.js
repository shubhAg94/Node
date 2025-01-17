const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
},{
    timestamps: true //Will help us to know the time of document creation
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;