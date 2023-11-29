import  productService from "../service/dao/mongoosedb/managerMongose/managerProductoMoogose.js"
import { uploader } from "../../utils.js"
//este hay que sustituir por factory

const ProductService =new productService()

export async function paginateProductos (req, res) {
    try {
        const {limit=10,page=1}=req.query
        const productos = await ProductService.paginateProductos(limit,page)
    // res.render("products", { productos })
    res.json({ productos })
    } catch (error) {
        console.log(error);
    }
}

export async function getProductAgregation (req, res){
    try {
        const productosFiltrados= await ProductServiceroductService.getProductAgregation()
        // res.render("formulario")
        // res.render("home", { productosFiltrados })
         res.json({ productosFiltrados })
    } catch (error) {
        console.log(error);
    }
}




export async function getProduct  (req, res) {
    try {
        console.log("desde get")
        const productos = await ProductService.getProducto()
        console.log("resulta");
        // res.render("formulario")
    //  res.render("home", { productos })
    res.render("home", { productos , user:req.session.user })
     
        // res.json({ productos })
    } catch (error) {
        console.log(error);
    }
}



export async function getProductoById (req, res){
    try {
        const { id } = req.params
        const producto = await ProductService.getProductoById(id)
        // res.json({producto})
        res.render("detalle", { producto })
    } catch (error) {
        console.log(error);
    }

}

// function auth(req, res, next) {
//     if (req.session.rol === administrador) {
//         return next()
//     } else {
//         return res.status(403).send('Usuario no autorizado para ingresar a este recurso..')
//     }
// }

//pos para imagen
export async function addProduct (req, res) {
    try {
        uploader.single("file")
        if (!req.file) {
            return res.status(400).send({ status: "error", mensaje: "no se adjunto archivo" })
        }
        console.log(req.file)

        const producto = req.body

        const productopaht = req.file.filename

        producto.thumbnails = `/img/${productopaht}`
        console.log(producto.thumbnails);


        const nuevoProducto = await ProductService.addProduct(producto)
        res.json({ message: "Producto creado", producto: nuevoProducto })
        //res.redirect("/api/products")
    } catch (error) {
        console.log(error);
    }

}

export async function delateProduct (req, res) {
    const message = await ProductService.delateProduct()
    res.json({ message })
}

export async function delateProductById (req, res) {
    try {
        const { idProducto } = req.params
        const message = await ProductService.delateProductById(idProducto)
        res.json({ message })
    } catch (error) {
        console.log(error);
    }

}

export async function upDateProduc (req, res) {
    try {
        const { idProducto } = req.params
        const productoup = req.body
        // const updateOptions={new:true}
        const producto = await ProductService.upDateProduc(idProducto, productoup)
        res.json({ producto })
    } catch (error) {
        console.log(error);
    }

}

