// ********************************* VARIABLES ********************************* //

// Inicializo el array de productos del carrito vacio, defino otras variables utiles y algunos elementos del DOM

let listaCarrito = []
let listaProductos = []
let id = 0

const moneda = "$"
const DOMsabanaProductos = document.querySelector('#sabana-items-container');
const DOMlistaCarrito = document.querySelector('#carrito-items-description');
const DOMCartBtn = document.querySelector('#open-cart-link');

// Defino la clase producto con sus atributos

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

// ********************************* EVENTOS ********************************* //

window.addEventListener("load", loadProducts());
window.addEventListener("load", renderCart());

window.addEventListener("load", readFromLocalStorage());

// ********************************* FUNCIONES ********************************* //

// realizo un fetch desde un archivo json para precargar items a la sabana de productos

function loadProducts(){
    fetch('/data.json')
    .then( resp => resp.json() )
    .then( data => {
        
        // recorro cada producto y lo renderizo en el front
        data.forEach((prod) => {
            // agrego los productos a un array
            listaProductos.push(prod)
            DOMsabanaProductos.insertAdjacentHTML("afterbegin",
            '<div class="col-6 col-xl-3 item mb-4">'+
                '<div class="img-container">'+
                '<img class="img-fluid" src="img/'+ prod.img +'" />'+
                '<button class="btn-add-to-cart" data-item="'+ prod.id +'">Agregar al carrito</button>'+
                '</div>'+
                '<div class="item-description-container mt-2 justify-content-between d-flex">'+
                '<h5>'+ prod.nombre +'</h5>'+
                '<span>'+ moneda + prod.precio +'</span>'+
                '</div>'+
            '</div>'
            )
            document.querySelector('.btn-add-to-cart').addEventListener('click', addToCart)
        })
    })
}

// Funcion agregar productos al carrito
function addToCart(e) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const idSelectedProd = e.target.dataset.item;

    // busco en data.jason el id que corresponde al producto seleccionado
    fetch('/data.json')
    .then( resp => resp.json() )
    .then( data => {
        let prod = data.find((element) => element.id == idSelectedProd)
        // creo una nueva entrada en el array del carrito
        const productoElegido = new CarritoItem(id, prod.nombre, prod.precio, prod.stock, prod.img, prod.id)
        listaCarrito.push(productoElegido)
    })
    
    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000
    }).showToast();
    
    renderCart()
}

// Funcion renderizar carrito
function renderCart(){
    //  si el carrito no tiene items
    if (listaCarrito.length == 0){
        document.querySelector('.empty-cart-txt').classList.remove('d-none')
    }
    // si el carrito tiene items
    else{
        document.querySelector('.empty-cart-txt').classList.add('d-none')
        listaCarrito.forEach((prod) => {
            DOMlistaCarrito.insertAdjacentHTML("afterbegin",
            '<div class="row mb-4">'+
                '<div class="col-4">'+
                    '<img class="img-fluid" src="img/'+ prod.img +'" />'+
                '</div>'+
                '<div class="col-8">'+
                    '<h6>'+ prod.nombre +'</h6>'+
                    '<span>'+ moneda + prod.precio +'</span>'+
                '</div>'+
            '</div>'
            )
        })
    }
}

// // function actualizarTotales(){
// // }

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
        // renderizarProductos()
    }
}
