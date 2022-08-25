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

// function productoElegido(id, nombre, precio, stock, img, idProducto) {
//     this.id = id
//     this.nombre = nombre
//     this.precio = precio
//     this.stock = stock
//     this.img = img
// }

// ********************************* EVENTOS ********************************* //

window.addEventListener("load", checkEmptySabana());
window.addEventListener("load", readFromLocalStorage());

DOMaddProductosBtn.addEventListener('click', createProducto)

DOMCartBtn.onclick = () => {
    checkEmptyCart()
}

// ********************************* FUNCIONES ********************************* //

// Funcion que se activa al agregar un producto desde el formulario
function createProducto() {
    // aca estoy harcodeando el id de producto porque todavia no logre hacerlo dinamico correctamente
    let idProducto = listaProductos.length + 1
    let nombreProducto = document.querySelector('#nombreProducto').value
    let precioProducto = document.querySelector('#precioProducto').value
    let stockProducto = document.querySelector('#stockProducto').value
    let imgProducto = document.querySelector('#imagenProducto').files[0].name

    // creo un nuevo producto y lo guardo en el array de productos
    const producto = new Producto(idProducto, nombreProducto, precioProducto, stockProducto, imgProducto);
    listaProductos.push(producto);
    // guardo el producto en local storage y renderizo los productos
    saveInLocalStorage()
    renderizarProductos()
    // ejecuto un success toast
    Toastify({
        text: "Producto creado!",
        duration: 3000
    }).showToast();
}

// Guardo la lista de productos en LocalStorage
function saveInLocalStorage(){
    localStorage.setItem('listaProductos', JSON.stringify(listaProductos))
}

// Leo los productos desde LocalStorage
function readFromLocalStorage(){
    if (localStorage.length > 0) {
        const listaProductosJson = localStorage.getItem('listaProductos')
        const listaProductosFromLocalStorage = JSON.parse(listaProductosJson)
        listaProductos = listaProductos.concat(listaProductosFromLocalStorage)
        // renderizo productos cargados en local storage
        renderizarProductos()
    }
}

// Renderizamos los productos en la sabana de productos
function renderizarProductos(){
    checkEmptySabana()
    // Primero vacio el contenedor por si ya tiene productos cargados
    DOMlistaProductos.textContent = ''

    // // Luego renderizo los productos dentro del array con sus clases correspondientes
    // for (let producto of listaProductos){
    //     DOMlistaProductos.insertAdjacentHTML("afterbegin",
    //         '<div class="col-6 col-xl-3 item mb-4">'+
    //           '<div class="img-container">'+
    //             '<img class="img-fluid" src="img/'+ producto.img +'" />'+
    //             '<button class="btn-add-to-cart" data-item="'+ producto.id +'">Agregar al carrito</button>'+
    //           '</div>'+
    //           '<div class="item-description-container mt-2 justify-content-between d-flex">'+
    //             '<h5>'+ producto.nombre +'</h5>'+
    //             '<span>'+ moneda + producto.precio +'</span>'+
    //           '</div>'+
    //         '</div>'
    //     );
    //     // Creo un event listener para los botones de agregar al carrito
    //     document.querySelector('.btn-add-to-cart').addEventListener('click', addToCart)
    // }

    fetch('data.json', {
      mode: "no-cors"
    })
    .then( (res) => res.json())
    .then( (data) => {
        for (let producto of listaProductos) {
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
            )
            document.querySelector('.btn-add-to-cart').addEventListener('click', addToCart)
        }
    })
    
}

// Funcion que chekea si la sabana esta vacia
function checkEmptySabana(){
    localStorage.length > 0 ? document.querySelector(".empty-sabana-txt").classList.add("d-none") : document.querySelector(".empty-sabana-txt").classList.remove("d-none");
}

// Funcion agregar productos al carrito
function addToCart(e) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const idSelectedProd = e.target.dataset.item;
   
    const nuevoItem = listaProductos.find((element) => element.id === idSelectedProd);

    console.log(element.id)

    // const productoElegido = new CarritoItem(id, nombreProducto, precioProducto, stockProducto, imgProducto, idProducto);
    // listaCarrito.push(productoElegido);

    // console.log(idProd)
    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000
    }).showToast();
    
    console.log(nuevoItem)

    // let nuevoItemCarrito = new CarritoItem(id, nombre, precio, stock, img, idProducto)
}





// readFromLocalStorage()

// Agrego toastify







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



// // function actualizarCantidad(){
// // }
// // function actualizarTotales(){
// // }