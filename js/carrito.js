// Función para mostrar el contenido del carrito
function mostrarCarrito() {
  // datos desde localStorage
  const storedCart = localStorage.getItem("cart");
  let cart = [];
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }

  // Agrupar productos por id
  const groupedCart = cart.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 0, totalPrice: 0 };
    }
    acc[item.id].quantity += 1;
    acc[item.id].totalPrice += item.price;
    return acc;
  }, {});

  // referencia el elemento donde se mostrará el carrito
  const carritoElement = document.getElementById("carrito");

  // Limpia el contenido del carrito
  carritoElement.innerHTML = "";

  if (cart.length === 0) {
    carritoElement.innerHTML = "<p>El carrito está vacío</p>";
  } else {
    Object.values(groupedCart).forEach((item) => {
      const cartItem = document.createElement("div");
      const productoHTML = document.createElement("div");
      productoHTML.innerHTML = `
      <span>${item.name} - $${item.price} x ${item.quantity} = $${item.totalPrice}</span>
            `;
      carritoElement.appendChild(productoHTML);
    });
  }
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
// Llamar a la función para mostrar el carrito cuando la página se cargue
window.onload = mostrarCarrito;

// Función de compra
function comprar() {
  const storedCart = localStorage.getItem("cart");
  const cart = storedCart ? JSON.parse(storedCart) : [];

  if (cart.length === 0) {
    Swal.fire({
      position: "right",
      icon: "error",
      title: "El carrito está vacío",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    localStorage.removeItem("cart"); // Eliminar el carrito del localStorage
    Swal.fire({
      position: "right",
      icon: "success",
      title: "Tu compra se realizó con éxito",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      location.reload();
    }, 1500); // Recargar la página después de que se muestra el mensaje
  }
}
