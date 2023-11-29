import userModel from "../models/user.model.js"
import { cartModel } from "../models/cart.model.js";
import { productoModel } from "../models/producto.model.js"
import mongoose, { get } from "mongoose";


export default class ManagerCart {

    addCartToUser = async (id) => {
        try {

            const user = await userModel.findById(id).populate("cart._id").lean()
            console.log("getuser", user);
            if (user.cart.length === 0) {
                console.log("El carrito está vacío");

                const cart = await cartModel.create({});
                console.log(cart);


                const insertCartToUser = await userModel.updateOne({
                    _id: user._id
                }, {
                    $set: { cart: cart }
                },
                    (err, result) => {
                        if (err) throw err;
                        console.log('Carrito asociado al usuario correctamente');
                        client.close(); // Cerrar la conexión a la base de datos
                    }
                ).exec().lean()

            } else {
                // console.log("El carrito contiene elementos");
                const cart = await userModel.findById(user._id)
                const cartid = new mongoose.Types.ObjectId(cart.cart[0])
                // console.log("desde ",cartid);
                const getCartId = await cartModel.findById(cartid).populate("products._id").lean()

                // console.log("getCartId",getCartId.products);

                return { products: getCartId.products }

            }

            return products



        } catch (error) {
            console.error('Error al traer add carrito:', err.message);
            return [];
        }

    }


    addproductToCart = async (id) => {
        try {
            console.log("iduser", id);
            const user = await userModel.findById(id).populate("cart._id")
            console.log("getaddproduct", user)
            const cart = await userModel.findById(user._id)
            const cartid = new mongoose.Types.ObjectId(cart.cart[0])
            console.log("desde ",cartid);
            return cartid
          

            // console.log("getCartId",getCartId.products);

            // return { productos: getCartId.products }

    
        } catch (error) {
            console.error('Error al traer add carrito:', err.message);
            return [];
        }


    }


















}
