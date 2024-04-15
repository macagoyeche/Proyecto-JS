// Datos de productos
const products = [
    { id: 1, name: 'Producto 1', price: 10 },
    { id: 2, name: 'Producto 2', price: 20 },
    { id: 3, name: 'Producto 3', price: 30 }
];
// Carrito de compras
let cart = [];

// Botón para mostrar el contenido del carrito
const mostrarBoton = document.getElementById('botonCarrito');
mostrarBoton.addEventListener('click', contenidoCarrito);


// Función para renderizar los productos
function renderProducto() {
    const tienda = document.getElementById('tienda');
    tienda.innerHTML = ''; //vacía contenedor "tienda"
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button id= "bAdCart" onclick="agregarCarrito(${product.id})">Agregar al carrito </button>
        `;
        tienda.appendChild(productDiv);
    });
    
}

// Función para agregar un producto al carrito
function agregarCarrito(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`Producto agregado al carrito: ${product.name}`);
    } else {
        alert('Producto no encontrado');
    }
}
// Función para vaciar el carrito
function clearCart() {
    cart = [];
    alert('El carrito ha sido vaciado');
}

// Función para agregar un producto al carrito
function agregarCarrito(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        alert(`Producto agregado al carrito: ${product.name}`);
    } else {
        alert('Producto no encontrado');
    }
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    if (cart.length === 0) {
        alert('El carrito está vacío');
    } else {
        let cartItems = 'Productos en el carrito:\n';
        cart.forEach(item => {
            cartItems += `${item.name} - $${item.price}\n`;
        });
        alert(cartItems);
    }
}

// Función para mostrar el contenido del carrito
function contenidoCarrito() {
    if (cart.length === 0) {
        alert('El carrito está vacío');
    } else {
        let contenido = 'Contenido del carrito:\n';
        cart.forEach(item => {
            contenido += `${item.name} - $${item.price}\n`;
        });
        alert(contenido);
    }
}

// Renderizar productos al cargar la página
window.onload = renderProducto;
