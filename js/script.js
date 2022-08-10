// ********************************* VARIABLES ********************************* //

// Inicializo el array de productos vacio y el ID de productos en 0, defino otras variables utiles y algunos elementos del DOM

// comento la lista de productos porque no la inicializo vacia
// let listaProductos = []
let listaCarrito = []

// seteo el id en 4 por la precarga
let id = 4

let confirmacion = true
const moneda = "$"
const DOMlistaProductos = document.querySelector('#sabana-items-container');
const DOMlistaCarrito = document.querySelector('#carrito-items-description');
const DOMaddProductosBtn = document.querySelector('#add-product-btn');
const DOMCartBtn = document.querySelector('#open-cart-link');

// Defino la clase producto con sus atributos
class Producto{
    constructor(id, nombre, precio, stock, img){
        this.id = id
        this.nombre = nombre
        this.precio = parseFloat(precio)
        this.stock = parseInt(stock)
        this.img = img
    }
}

class CarritoItem{
    constructor(id, nombre, precio, stock, img, idProducto){
        this.id = id
        this.nombre = nombre
        this.precio = parseFloat(precio)
        this.stock = parseInt(stock)
        this.img = img
        this.idProducto = idProducto
    }
}

function productoElegido(id, nombre, precio, stock, img, idProducto) {
    this.id = id
    this.nombre = nombre
    this.precio = precio
    this.stock = stock
    this.img = img
}

// ********************************* PRECARGO PRODUCTOS ********************************* //

const producto1 = new Producto(1, "Nike Airmax", 35000, 3, "img/airmax.jpg");
const producto2 = new Producto(2, "Jordan Hoodie", 15000, 4, "img/hoodie.jpg");
const producto3 = new Producto(3, "Nike Alphafly", 70000, 5, "img/alphafly.jpg");
const producto4 = new Producto(4, "Nike Jogging", 9000, 2, "img/jogging.jpg");

let listaProductos = [producto1, producto2, producto3, producto4];

window.addEventListener("load", renderizarProductosSabana());
window.addEventListener("load", checkEmptySabana());

// ********************************* EVENTOS ********************************* //

// le agrego eventos a los botones del header de 2 formas diferentes
DOMaddProductosBtn.addEventListener('click', agregarProductos)

DOMCartBtn.onclick = () => {
    checkEmptyCart()
}

// ********************************* FUNCIONES ********************************* //

// Funcion que se activa al clickear agregar productos
function agregarProductos(){
    // Funcion para ingresar los productos por prompt
    const ingresarProducto = () => {
        let nombre = prompt("Ingrese el nombre del producto")
        let precio = prompt("Ingrese el precio del producto")
        let stock = prompt("Ingrese el stock del producto")
        let img = prompt("Ingrese el src del producto")
        return {nombre, precio, stock, img}
    }

    // Ejecuto la funcion ingresarProducto hasta que el usuario decida cancelar
    do {
        // desestructuro el objeto y le creo un id a cada ingreso
        const {nombre, precio, stock, img} = ingresarProducto()
        id ++
        let nuevoProducto = new Producto(id, nombre, precio, stock, img)
        listaProductos.push(nuevoProducto)
        confirmacion = confirm("Desea ingresar un nuevo producto?")

    } while (confirmacion)
    renderizarProductosSabana()
}

// Funcion para renderizar los productos del array en el front
function renderizarProductosSabana() {
    
    // Primero vacio el contenedor por si ya tiene productos cargados
    DOMlistaProductos.textContent = ''

    // Luego renderizo los productos dentro del array con sus clases correspondientes
    for (let producto of listaProductos){

        DOMlistaProductos.insertAdjacentHTML("afterbegin",
            '<div class="col-6 col-xl-3 item mb-4">'+
              '<div class="img-container">'+
                '<img class="img-fluid" src="'+ producto.img +'" />'+
                '<button class="btn-add-to-cart" data-item="'+ producto.id +'">Agregar al carrito</button>'+
              '</div>'+
              '<div class="item-description-container mt-2 justify-content-between d-flex">'+
                '<h5>'+ producto.nombre +'</h5>'+
                '<span>'+ moneda + producto.precio +'</span>'+
              '</div>'+
            '</div>'
        );
        document.querySelector('.btn-add-to-cart').addEventListener('click', addToCart)
        
        // otra forma de renderizar los productos

        // // item container
        // const filaProducto = document.createElement('div')
        // filaProducto.classList.add('col-6', 'col-xl-3', 'item', 'mb-4')

        // // image container
        // const imgContainer = document.createElement('div')
        // imgContainer.classList.add('img-container')

        // // img
        // const itemImage = document.createElement('img')
        // itemImage.classList.add('img-fluid')
        // itemImage.src = producto.img

        // // add to cart btn
        // const buttonAddToCart = document.createElement('button')
        // buttonAddToCart.classList.add('btn-add-to-cart')
        // buttonAddToCart.textContent = "Agregar al carrito"
        // buttonAddToCart.dataset.item = producto.id
        // buttonAddToCart.addEventListener('click', addToCart)

        // // item description container
        // const itemDescription = document.createElement('div')
        // itemDescription.classList.add('mt-2', 'justify-content-between', 'd-flex')

        // // title
        // const itemTitle  = document.createElement('h5')
        // itemTitle.classList.add('item-title')
        // itemTitle.textContent = producto.nombre

        // // price
        // const itemPrice  = document.createElement('span')
        // itemPrice.classList.add('item-price')
        // itemPrice.textContent = `${moneda}${producto.precio}`

        // // lleno los divs
        // imgContainer.appendChild(itemImage)
        // imgContainer.appendChild(buttonAddToCart)
        // itemDescription.appendChild(itemTitle)
        // itemDescription.appendChild(itemPrice)
        // filaProducto.appendChild(imgContainer)
        // filaProducto.appendChild(itemDescription)
        // DOMlistaProductos.appendChild(filaProducto)
    }
}

// funcion que borra un producto en base al data-item del boton seleccionado
function borrarProducto(e) {
  // Obtenemos el producto ID que hay en el boton pulsado
  const idProd = e.target.dataset.item;
  // Borramos todos los productos
  listaProductos = listaProductos.filter((el) => el.id != idProd)
  // volvemos a renderizar
  renderizarProductosSabana();
  checkEmptyCart();
}

function addToCart(e) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const idProd = e.target.dataset.item;
    alert(idProd)
    let nuevoItemCarrito = new CarritoItem(id, nombre, precio, stock, img, idProducto)
}

// Funcion que chekea si el carrito esta vacio
function checkEmptyCart(){
    if (listaCarrito.length > 0){
        document.querySelector(".empty-cart-txt").classList.add("d-none");
    } else{
        document.querySelector(".empty-cart-txt").classList.remove("d-none");
    }
}

// Funcion que chekea si la sabana esta vacia
function checkEmptySabana(){
    if (listaProductos.length > 0){
        document.querySelector(".empty-sabana-txt").classList.add("d-none");
    } else{
        document.querySelector(".empty-sabana-txt").classList.remove("d-none");
    }
}

// function actualizarCantidad(){
// }
// function actualizarTotales(){
// }