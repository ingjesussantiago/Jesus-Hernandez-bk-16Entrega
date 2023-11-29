import { Router } from "express"
import { __dirname } from "../../utils.js"
import managerUser from "../service/dao/mongoosedb/managerMongose/managerUserMongoose.js"



const router = Router()

const ManagerUser = new managerUser()

router.get("/", async (req, res) => {
    console.log({user:req.session.user});
    res.render("profile", { user: req.session.user })
})


router.get("/addCart", async (req, res) => {
    try {
        if (req.session.user && req.session.user.id) {
            const { id } = req.session.user
            console.log("desde req.session", id);

            const products = await ManagerUser.addCartToUser(id)

            res.render("carrito", {products:products.products })

            //  res.json({products:products.products })
            console.log(products);


        } else {
            return res.status(403).send('Usuario no se ha logeado o no resgistrado ')
        }
    } catch (error) {

    }


})


router.get("/addproduct", async (req, res) => {
    try {
        if (req.session.user && req.session.user.id) {
            const { id } = req.session.user
        
            const products = await ManagerUser.addproductToCart(id)

            // res.render("carrito", {products:products.productos })
            res.json(products)


        } else {
            return res.status(403).send('Usuario no se ha logeado o no resgistrado ')
        }
    } catch (error) {

    }


})



export default router

// try {
//     const producto = await productoModel.findById(_id).lean()
//     //  console.log("desdemanager",producto);
//     return producto

// } catch (error) {
//     console.log(error);
// }
