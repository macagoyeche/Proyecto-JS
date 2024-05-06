// Función para mostrar el contenido del carrito
function mostrarCarrito() {

    // datos desde localStorage
    const storedCart = localStorage.getItem('cart');
    let cart = [];
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }

    // referencia el elemento donde se mostrará el carrito
    const carritoElement = document.getElementById('carrito');

    // Limpia el contenido del carrito
    carritoElement.innerHTML = '';

    if (cart.length === 0) {
        carritoElement.innerHTML = '<p>El carrito está vacío</p>';
    } else {
        cart.forEach(item => {
            const productoHTML = document.createElement('div');
            productoHTML.innerHTML = `
                <p>${item.name} - $${item.price}</p>
            `;
            carritoElement.appendChild(productoHTML);
        });
    }
}
// Función para vaciar el carrito
function clearCart() {
    localStorage.removeItem('cart'); // Eliminar el carrito del localStorage
    location.reload();
}
// Llamar a la función para mostrar el carrito cuando la página se cargue
window.onload = mostrarCarrito;

