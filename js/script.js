// ********************************* VARIABLES ********************************* //

// Inicializo el array de productos vacio y el ID de productos en 0, defino otras variables utiles y algunos elementos del DOM

let listaProductos = []
let listaCarrito = []

let id = 0

const moneda = "$"
const DOMlistaProductos = document.querySelector('#sabana-items-container');
const DOMlistaCarrito = document.querySelector('#carrito-items-description');
const DOMaddProductosBtn = document.querySelector('#submitProducto');
const DOMCartBtn = document.querySelector('#open-cart-link');
const DOMAddToCartBtn = document.querySelector('#btn-add-to-cart');

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

// class CarritoItem{
//     constructor(id, nombre, precio, stock, img, idProducto){
//         this.id = id
//         this.nombre = nombre
//         this.precio = parseFloat(precio)
//         this.stock = parseInt(stock)
//         this.img = img
//         this.idProducto = idProducto
//     }
// }

// function productoElegido(id, nombre, precio, stock, img, idProducto) {
//     this.id = id
//     this.nombre = nombre
//     this.precio = precio
//     this.stock = stock
//     this.img = img
// }

// ********************************* EVENTOS ********************************* //

// window.addEventListener("load", renderizarProductosSabana());
// window.addEventListener("load", checkEmptySabana());

// le agrego eventos a los botones del header de 2 formas diferentes
DOMaddProductosBtn.addEventListener('click', createProducto)
// DOMAddToCartBtn.addEventListener('click', addToCart)

DOMCartBtn.onclick = () => {
    checkEmptyCart()
}

// ********************************* FUNCIONES ********************************* //

// Funcion que se activa al agregar un producto desde el formulario
function createProducto() {
    // aca estoy harcodeando el id de producto porque todavia no logre hacerlo dinamico correctamente
    let idProducto = 1
    let nombreProducto = document.querySelector('#nombreProducto').value
    let precioProducto = document.querySelector('#precioProducto').value
    let stockProducto = document.querySelector('#stockProducto').value
    let imgProducto = document.querySelector('#imagenProducto').files[0].name

    const producto = new Producto(idProducto, nombreProducto, precioProducto, stockProducto, imgProducto);

    listaProductos.push(producto);
    saveInLocalStorage();
    readFromLocalStorage();
}

// Renderizamos los productos en la sabana de productos
function renderizarProductos(){

    // Primero vacio el contenedor por si ya tiene productos cargados
    DOMlistaProductos.textContent = ''

    // Luego renderizo los productos dentro del array con sus clases correspondientes
    for (let producto of listaProductos){
        DOMlistaProductos.insertAdjacentHTML("afterbegin",
            '<div class="col-6 col-xl-3 item mb-4">'+
              '<div class="img-container">'+
                '<img class="img-fluid" src="img/'+ producto.img +'" />'+
                '<button class="btn-add-to-cart" data-item="'+ producto.id +'">Agregar al carrito</button>'+
              '</div>'+
              '<div class="item-description-container mt-2 justify-content-between d-flex">'+
                '<h5>'+ producto.nombre +'</h5>'+
                '<span>'+ moneda + producto.precio +'</span>'+
              '</div>'+
            '</div>'
        );
    }
}

// Guardo la lista de productos en LocalStorage
function saveInLocalStorage(){
    localStorage.setItem('listaProductos', JSON.stringify(listaProductos))
}

// Leo los productos desde LocalStorage
function readFromLocalStorage(){
    const listaProductosJson = localStorage.getItem('listaProductos')
    const listaProductosFromLocalStorage = JSON.parse(listaProductosJson)
    listaProductos = listaProductos.concat(listaProductosFromLocalStorage)
    renderizarProductos()
}

readFromLocalStorage();

// function addToCart(e) {
//     // Obtenemos el producto ID que hay en el boton pulsado
//     const idProd = e.target.dataset.item;
//     alert(idProd)
//     let nuevoItemCarrito = new CarritoItem(id, nombre, precio, stock, img, idProducto)
// }

// Dejo comentadas todas estas funciones que tal vez reutilice mas adelante

// // funcion que borra un producto en base al data-item del boton seleccionado
// function borrarProducto(e) {
//   // Obtenemos el producto ID que hay en el boton pulsado
//   const idProd = e.target.dataset.item;
//   // Borramos todos los productos
//   listaProductos = listaProductos.filter((el) => el.id != idProd)
//   // volvemos a renderizar
//   renderizarProductosSabana();
//   checkEmptyCart();
// }

// // Funcion que chekea si el carrito esta vacio
// function checkEmptyCart(){
//     if (listaCarrito.length > 0){
//         document.querySelector(".empty-cart-txt").classList.add("d-none");
//     } else{
//         document.querySelector(".empty-cart-txt").classList.remove("d-none");
//     }
// }

// // Funcion que chekea si la sabana esta vacia
// function checkEmptySabana(){
//     if (listaProductos.length > 0){
//         document.querySelector(".empty-sabana-txt").classList.add("d-none");
//     } else{
//         document.querySelector(".empty-sabana-txt").classList.remove("d-none");
//     }
// }

// // function actualizarCantidad(){
// // }
// // function actualizarTotales(){
// // }