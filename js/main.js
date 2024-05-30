// URL del archivo JSON
const url = "/data.json";

// Fetch para obtener los datos de los productos
fetch(url)
  .then((res) => res.json()) // Convertir la respuesta a JSON
  .then((data) => {
    // Llamar a las funciones pasando los productos obtenidos del JSON
    renderProductos(data);
  })
  .catch((error) => console.error("Error fetching data:", error));

// Selección del contenedor de productos
const tienda = document.querySelector("#tienda");

// Función para renderizar los productos en otro contenedor
function renderProductos(productos) {
  tienda.innerHTML = ""; // Vacía el contenedor "tienda"
  productos.forEach((product) => {
    let productDiv = document.createElement("div");
    productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.img}" alt="${product.name}"/>
            <p>Precio: $${product.price}</p>
            <button id="bAdCart" onclick="agregarAlCarrito(${product.id})">Agregar al carrito</button>
        `;
    tienda.appendChild(productDiv);
  });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(productId) {
  fetch(url)
    .then((res) => res.json()) // Volver a obtener los productos del JSON
    .then((products) => {
      const product = products.find((p) => p.id === productId);
      if (product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart)); // Almacenar el carrito en localStorage
      } else {
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Función para vaciar el carrito
function clearCart() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "¿Estas seguro?",
      text: "No podras regresar en el tiempo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Borralo!",
      cancelButtonText: "No, Cambie de opinion!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("cart"); // Eliminar el carrito del localStorage
        swalWithBootstrapButtons.fire({
          title: "Borrado",
          text: "El carrito se vacio.",
          icon: "success",
        });
        setTimeout(() => {
          location.reload();
        }, 1500); // Recargar la página después de que se muestra el mensaje
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Tu compra esta segura :)",
          icon: "error",
        });
      }
    });
}

// Renderizar productos al cargar la página
window.onload = () => {
  fetch(url)
    .then((res) => res.json()) // Obtener los productos al cargar la página
    .then((data) => renderProductos(data))
    .catch((error) => console.error("Error fetching data:", error));
};
