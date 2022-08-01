// Inicializo la el array de productos vacio y el ID de productos en 0, defino otras variables utiles y algunos elementos del DOM
let listaProductos = []
let id = 0
let confirmacion = true
const moneda = "$"
const DOMlistaProductos = document.querySelector('#carrito-items-description');
const DOMaddProductosBtn = document.querySelector('#add-product-btn');
const DOMemptyCartBtn = document.querySelector('#empty-cart-btn');

// le agrego eventos a los botones del header de 2 formas diferentes
DOMaddProductosBtn.addEventListener('click', agregarProductos)

DOMemptyCartBtn.onclick = () => {
    vaciarCarrito();
}

// Defino la clase producto con sus atributos
class Producto{
    constructor(id, nombre, precio, cantidad){
        this.id = id;
        this.nombre = nombre
        this.precio = parseFloat(precio)
        this.cantidad = parseInt(cantidad)
    }
}

// Funcion que se activa al clickear agregar productos
function agregarProductos(){
    // Funcion para ingresar los productos por prompt
    const ingresarProducto = () => {
        let nombre = prompt("Ingrese el nombre del producto")
        let precio = prompt("Ingrese el precio del producto")
        let cantidad = prompt("Ingrese la cantidad del producto")
        return {nombre, precio, cantidad}
    }

    // Ejecuto la funcion ingresarProducto hasta que el usuario decida cancelar
    do {
        // desestructuro el objeto y le creo un id a cada ingreso
        const {nombre, precio, cantidad} = ingresarProducto()
        id ++
        let nuevoProducto = new Producto(id, nombre, precio, cantidad)
        listaProductos.push(nuevoProducto)
        confirmacion = confirm("Desea ingresar un nuevo producto?")

    } while (confirmacion)
    renderizarProductos()
}

// Funcion para renderizar los productos del array en el front
function renderizarProductos() {
    
    // Primero vacio el contenedor por si ya tiene productos cargados
    DOMlistaProductos.textContent = ''

    // Luego renderizo los productos dentro del array con sus clases correspondientes
    for (let producto of listaProductos){

        const filaProducto = document.createElement('div')
        filaProducto.classList.add('row')

        const colProduto = document.createElement('div')
        colProduto.classList.add('col-5', 'ps-0')
        colProduto.textContent = producto.nombre

        const colCantidad = document.createElement('div')
        colCantidad.classList.add('col', 'text-center')
        colCantidad.textContent = producto.cantidad

        const colPrecio = document.createElement('div')
        colPrecio.classList.add('col', 'text-center')
        colPrecio.textContent = `${moneda}${producto.precio}`

        const colDelete = document.createElement('div')
        colDelete.classList.add('col', 'text-center')

        const btnDelete = document.createElement('i')
        btnDelete.classList.add('bi', 'bi-trash3')

        btnDelete.dataset.item = producto.id
        colDelete.appendChild(btnDelete)
        filaProducto.appendChild(colProduto)
        filaProducto.appendChild(colCantidad)
        filaProducto.appendChild(colPrecio)
        filaProducto.appendChild(colDelete)
        colDelete.addEventListener('click', borrarProducto)
        DOMlistaProductos.appendChild(filaProducto)
    }
}

// funcion que vacia el carrito y vuelve a hacer un render del array de productos
function vaciarCarrito(){
    listaProductos = []
    renderizarProductos()
}

// funcion que borra un producto en base al data-item del boton seleccionado
function borrarProducto(e) {
  // Obtenemos el producto ID que hay en el boton pulsado
  const idProd = e.target.dataset.item;
  // Borramos todos los productos
  listaProductos = listaProductos.filter((el) => el.id != idProd)
  // volvemos a renderizar
  renderizarProductos();
}

// function actualizarCantidad(){
// }
// function actualizarTotales(){
// }