// Datos de productos
const products = [
    { id: 1, name: 'Producto 1', price: 10 },
    { id: 2, name: 'Producto 2', price: 20 },
    { id: 3, name: 'Producto 3', price: 30 }
];

// Función para renderizar los productos
function renderProductos() {
    const tienda = document.getElementById('tienda');
    tienda.innerHTML = ''; // Vacía el contenedor "tienda"
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button id="bAdCart" onclick="agregarAlCarrito(${product.id})">Agregar al carrito </button>
        `;
        tienda.appendChild(productDiv);
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart)); // Almacenar el carrito en localStorage
    //    alert(`Producto agregado al carrito: ${product.name}`);
    } else {
    //    alert('Producto no encontrado');
    }
}

// Función para vaciar el carrito
function clearCart() {
    localStorage.removeItem('cart'); // Eliminar el carrito del localStorage
    //alert('El carrito ha sido vaciado');
}

// Renderizar productos al cargar la página
window.onload = renderProductos;