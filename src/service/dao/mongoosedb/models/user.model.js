import mongoose from 'mongoose';

const collection = 'users';

const schema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: {
        type: String,
        unique: true
    },
    edad: Number,
    rol: String,
    password: String,
    loggedBy: String,
    cart: {
        type: [
            {
                _id: {
                    type: mongoose.Types.ObjectId,
                    ref: 'carts'
                }
            }
        ],
        default: []
    }
})

const userModel = mongoose.model(collection, schema);

export default userModel;