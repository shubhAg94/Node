const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = "mongodb+srv://ska95dev:icIOVfBSRB9sN7PD@cluster0-kmtym.azure.mongodb.net/conFusion?retryWrites=true&w=majority";
const connect = mongoose.connect(url);

connect.then((db) => {

    console.log('Connected correctly to server');

    var newDish = Dishes({
        name: 'Uthappizza',
        description: 'test'
    });

    newDish.save()
        .then((dish) => {
            console.log(dish);

            return Dishes.find({});
        })
        .then((dishes) => {
            console.log(dishes);

            return Dishes.remove({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });

});