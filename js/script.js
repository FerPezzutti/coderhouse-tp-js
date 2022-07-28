// Inicializo la el array de productos vacio y el ID de productos en 0
let listaProductos = []
let id = 0
let confirmacion = true

// Defino la clase producto con sus atributos
class Producto{
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre
        this.precio = parseFloat(precio)
    }
}

// Funcion para ingresar los productos por prompt
const ingresarProducto = () => {
    let nombre = prompt("Ingrese el nombre del producto")
    let precio = prompt("Ingrese el precio del producto")
    return {nombre, precio}
}

function agregarProducto(){
    alert("btn")
    // Ejecuto la funcion ingresarProducto hasta que el usuario decida cancelar
    // do {
    //     // desestructuro el objeto y le creo un id a cada ingreso
    //     const {nombre, precio} = ingresarProducto()
    //     id ++
    //     let nuevoProducto = new Producto(id, nombre, precio)
    //     listaProductos.push(nuevoProducto)
    //     confirmacion = confirm("Desea ingresar un nuevo producto?")

    // } while (confirmacion)
}

// Recorro el array para imprimir los productos
for (let producto of listaProductos){
    document.write(`<h3>Id: ${producto.id} </h3>`)
    document.write(`<h3>Nombre: ${producto.nombre} </h3>`)
    document.write(`<h4>Precio: ${producto.precio} </h4>`)
}

