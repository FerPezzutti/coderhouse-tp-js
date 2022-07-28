// Inicializo la el array de productos vacio y el ID de productos en 0
let listaProductos = []
let id = 0
let confirmacion = true

// Defino la clase producto con sus atributos
class Producto{
    constructor(id, nombre, precio, stock){
        this.id = id;
        this.nombre = nombre
        this.precio = parseFloat(precio)
        this.stock = parseInt(stock)
    }
}

// Funcion para ingresar los productos por prompt
const ingresarProducto = () => {
    let nombre = prompt("Ingrese el nombre del producto")
    let precio = prompt("Ingrese el precio del producto")
    let stock = prompt("Ingrese el stock del producto")
    return {nombre, precio, stock}
}

function agregarProducto(){
    // Ejecuto la funcion ingresarProducto hasta que el usuario decida cancelar
    do {
        // desestructuro el objeto y le creo un id a cada ingreso
        const {nombre, precio, stock} = ingresarProducto()
        id ++
        let nuevoProducto = new Producto(id, nombre, precio, stock)
        listaProductos.push(nuevoProducto)
        confirmacion = confirm("Desea ingresar un nuevo producto?")

    } while (confirmacion)
}

function borrarProducto(){
    let originalArray = listaProductos
    let filteredArray = filteredArray.filter(producto => producto.nombre.lenght > 4){ 
        return filteredArray
    }
}
function imprimirProducto(){

}
function actualizarCantidad(){

}
function actualizarTotales(){

}

// Recorro el array para imprimir los productos
for (let producto of listaProductos){
    document.write(`<h3>Id: ${producto.id} </h3>`)
    document.write(`<h3>Nombre: ${producto.nombre} </h3>`)
    document.write(`<h4>Precio: ${producto.precio} </h4>`)
    document.write(`<h4>Precio: ${producto.stock} </h4>`)
}

