import { Router } from "express"
import { __dirname } from "../../utils.js"
import * as cartController from "../controllers/cart.Controller.js"

const router = Router()

router.get("/", cartController.getCarts)
router.get("/:idCart",cartController.getCart)
router.post("/", cartController.crearCarrito)
router.get("/delete/:idCart", cartController.delatecarrito)
router.post("/:cartId/products/:pid", cartController.addProductoCarts)
router.delete('/:cid', cartController.updateOneProduct)
router.delete('/:cid/products/:pid', cartController.deleteProductInCart)

export default router
