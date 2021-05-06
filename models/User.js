const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref : 'Order'
        }
    ],


    wishlist: [String],
        

        
    

});

const User = mongoose.model('User', userSchema);

module.exports = User;