import cartService from "../service/dao/mongoosedb/managerMongose/managerCartMongoose.js";
import  productService from "../service/dao/mongoosedb/managerMongose/managerProductoMoogose.js"
//este hay que sustituir por factory


const ProductService =new productService()
const CartService =new cartService ()

export async function getCarts(req, res) {
  try {
    const carts = await CartService.getCarts()
    // res.render("carritos", {carts})
    res.json({ carts })
  } catch (error) {
    console.log(error);
  }
}

export async function getCart(req, res) {
  try {
    const { idCart } = req.params
    const cart = await CartService.getCart(idCart)
    res.json({ cart })
    // res.render("carrito",cart)

  } catch (error) {
    console.log(error);
  }

}

export async function crearCarrito(req, res) {
  try {
    const newCart = await CartService.crearCarrito()
    res.json({ cart: newCart })

  } catch (error) {
    console.log(error);
  }
}

export async function delatecarrito(req, res) {
  try {
    const { idCart } = req.params
    const delatecart = await CartService.delatecarrito(idCart)
    res.json({ delatecart })
  } catch (error) {

  }
}


//adiciona  cantidad
export async function addProductoCarts(req, res) {
  const { cartId, pid } = req.params;
  const { quantity } = req.body;

  try {
    const checkIdProduct = await ProductService.getProductoById(pid)
    console.log(checkIdProduct);
    if (!checkIdProduct) {
      return res.status(40).send({ message: `Product with ID: ${pid} not found` });
    }

    const checkIdCart = await CartService.getCart(cartId)
    if (!checkIdCart) {
      return res.status(44).send({ message: `Cart with ID: ${cartId} not found` });
    }

    const result = await CartService.addProductoCarts(cartId, { _id: pid, quantity: quantity });
    console.log(result);
    return res.status(200).send({
      message: `Product with ID: ${pid} added to cart with ID: ${cartId}`,
      cart: result,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send({ message: "An error occurred while processing the request" });
  }
}


// ENDPOINT que elimina todos los productos de un carrito
export async function updateOneProduct(req, res) {
  try {
    const { cid } = req.params;
    const cart = await CartService.getCart(cid)

    if (!cart) {
      return res.status(404).send({ message: `Cart with ID: ${cid} not found` });
    }

    if (cart.products.length === 0) {
      return res.status(404).send({ message: 'The cart is already empty' });
    }

    // Vaciar el carrito estableciendo la propiedad 'products' como un arreglo vacío.
    cart.products = [];

    await CartService.updateOneProduct(cid, cart.products);

    return res.status(200).send({
      status: 'success',
      message: `The cart with ID: ${cid} was emptied correctly`,
      cart: cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'An error occurred while processing the request' });
  }
}

// ENDPOINT para eliminar un producto dado de un carrito
export async function deleteProductInCart(req, res) {
  try {
    // Extraer los parámetros de la URL: cid (ID del carrito) y pid (ID del producto)
    const { cid, pid } = req.params;

    // Verificar si el producto con el ID pid existe
    const checkIdProduct = await ProductService.getProductoById(pid)
    console.log(checkIdProduct);
    if (!checkIdProduct) {
      return res.status(40).send({ message: `Product with ID: ${pid} not found` });

    }

    // Verificar si el carrito con el ID cid existe
    const checkIdCart = await CartService.getCart(cid)
    if (!checkIdCart) {
      return res.status(404).send({ status: 'error', message: `Cart with ID: ${cid} not found` });
    }

    // Buscar el índice del producto en la lista de productos del carrito
    const findProductIndex = checkIdCart.products.findIndex((product) => product._id.toString() === pid);
    if (findProductIndex === -1) {
      return res.status(404).send({ status: 'error', message: `Product with ID: ${pid} not found in cart` });
    }

    // Eliminar el producto de la lista de productos del carrito
    checkIdCart.products.splice(findProductIndex, 1);

    // Actualizar el carrito en la base de datos sin el producto eliminado
    const updatedCart = await CartService.deleteProductInCart(cid, checkIdCart.products);

    return res.status(200).send({ status: 'success', message: `Deleted product with ID: ${pid}`, cart: updatedCart });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 'error', message: 'An error occurred while processing the request' });
  }
}
