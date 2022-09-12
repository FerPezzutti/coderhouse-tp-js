// ********************************* VARIABLES ********************************* //

// Inicializo el array de productos del carrito vacio, defino otras variables utiles y algunos elementos del DOM

let listaCarrito = []
let listaProductos = []
let idCarrito = 0
let shippingCost = 1000
let freeShippingFrom = 15000

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
// window.addEventListener("load", readFromSessionStorage());

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
        const productoElegido = new CarritoItem(idCarrito, prod.nombre, prod.precio, prod.stock, prod.img, prod.id)
        idCarrito++
        listaCarrito.push(productoElegido)
    })
    
    // ejecuto funciones para renderizar el carrito desplegable
    setTimeout(function(){
        renderCart()
        actualizarTotales()
    }, 500);

    Toastify({
        text: "Producto agregado al carrito",
        duration: 1000
    }).showToast();

    // guardo el carrito en session storage
    // saveInSessionStorage()
}

// Funcion renderizar carrito
function renderCart(){
    //  si el carrito no tiene items
    if (listaCarrito.length == 0){
        document.querySelector('.empty-cart-txt').classList.remove('d-none')
        document.querySelector('.js-cart-totals').classList.add('d-none')
        DOMlistaCarrito.classList.add('d-none')
        document.querySelector('.js-cart-size').textContent = '0'
    }
    // si el carrito tiene items
    else{
        DOMlistaCarrito.classList.remove('d-none')
        document.querySelector('.empty-cart-txt').classList.add('d-none')
        document.querySelector('.js-cart-totals').classList.remove('d-none')
        document.querySelector('.js-cart-size').textContent = listaCarrito.length
        // vacio el contenedor para que no se dupliquen los productos
        DOMlistaCarrito.textContent = ''
        listaCarrito.forEach((prod) => {
            DOMlistaCarrito.insertAdjacentHTML("afterbegin",
            '<div class="row mb-4">'+
                '<div class="col-4">'+
                    '<img class="img-fluid" src="img/'+ prod.img +'" />'+
                '</div>'+
                '<div class="col-7">'+
                    '<h6>'+ prod.nombre +'</h6>'+
                    '<span>'+ moneda + prod.precio +'</span>'+
                '</div>'+
                '<div class="col-1">'+
                '<a class="cart-trash js-cart-trash"><i class="bi bi-trash" data-item="'+ prod.id +'"></i></a>'+
                '</div>'+
            '</div>'
            )
            document.querySelector('.js-cart-trash').addEventListener('click', removeItemCart)
        })
    }
}

// funcion que actualiza los totales y subtotales del carrito
function actualizarTotales(){
    let cartSubtotal = listaCarrito.reduce((acc,el) => acc + el.precio, 0)
    let cartTotal = cartSubtotal + shippingCost
    document.querySelector('.js-subtotal').textContent = '$' + cartSubtotal
    if (cartSubtotal >= freeShippingFrom){
        document.querySelector('.js-free-shipping').innerHTML = 'Tu envío es <span class="js-green-text">gratis</span>'
        document.querySelector('.js-shipping-cost').innerHTML = '<span class="js-green-text">Gratis</span>'
        let cartTotal = cartSubtotal
        document.querySelector('.js-total').textContent = '$' + cartTotal
    }
    else{
        let freeshipping = freeShippingFrom - cartSubtotal
        document.querySelector('.js-shipping-cost').classList.remove('js-green-text')
        document.querySelector('.js-free-shipping').innerHTML = 'Te faltan $' + freeshipping + ' para tener <span class="js-green-text">envío gratis</span>'
        document.querySelector('.js-total').textContent = '$' + cartTotal
        document.querySelector('.js-shipping-cost').textContent = '$' + shippingCost
    }
}

// funcion para eliminar elementos del carrito
function removeItemCart(e){
    const idSelectedCartItem = e.target.dataset.item;
    listaCarrito = listaCarrito.filter((e) => e.id != idSelectedCartItem)

    // ejecuto funciones para renderizar el carrito desplegable
    setTimeout(function(){
        renderCart()
        actualizarTotales()
    }, 500);

    Toastify({
        text: "Producto eliminado",
        duration: 1000
    }).showToast();
}

// // Guardo el carrito en sessionStorage
// function saveInSessionStorage(){
//     sessionStorage.setItem('listaCarrito', JSON.stringify(listaCarrito))
// }

// // Leo los productos desde sessionStorage
// function readFromsessionStorage(){
//     if (sessionStorage.length > 0) {
//         const listaCarritoJson = sessionStorage.getItem('listaCarrito')
//         const listaCarritoFromsessionStorage = JSON.parse(listaCarritoJson)
//         listaCarrito = listaCarrito.concat(listaCarritoFromsessionStorage)
//         // renderizo productos cargados en local storage
//         renderCart()
//     }
// }