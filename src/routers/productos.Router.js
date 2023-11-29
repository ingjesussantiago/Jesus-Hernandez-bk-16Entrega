import { Router } from "express"
import * as productController from "../controllers/productos.controller.js"
import { uploader } from "../../utils.js"

const router = Router()

router.get("/paginate", productController.paginateProductos)
router.get("/agregation", productController.getProductAgregation)
router.get("/", productController.getProduct)
router.get("/:id", productController.getProductoById)
router.post("/", uploader.single('file'), productController.addProduct)
router.delete("/", productController.delateProduct)
router.delete("/:idProducto", productController.delateProductById)
router.put("/:idProducto", productController.upDateProduc)

// function auth(req, res, next) {
//     if (req.session.rol === administrador) {
//         return next()
//     } else {
//         return res.status(403).send('Usuario no autorizado para ingresar a este recurso..')
//     }
// }



export default router