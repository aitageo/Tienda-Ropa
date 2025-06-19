document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector(".mostrar-carrito");
  const carrito = document.getElementById("carrito");
  const contenedorCarrito = document.getElementById("productos").querySelector("tbody");
  let TotalCarrito = [];

  const buttons = document.querySelectorAll(".btn-dark");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      contenedor.style.display = "none";
      const buton = e.target;
      buton.innerHTML = "Producto agregado";
      buton.classList.remove("btn-dark");
      buton.classList.add("btn-secondary");
      setTimeout(() => {
        buton.innerHTML = "Añadir al carrito";
        buton.classList.remove("btn-secondary");
        buton.classList.add("btn-dark");
      }, 2200);
      cargarProductos(e);
    });
  });

  function cargarProductos(e) {
    const productoSeleccionado = e.target.closest(".Producto");
    leerDatosProducto(productoSeleccionado);
  }

  function leerDatosProducto(producto) {
    const infoProducto = {
      imagen: producto.querySelector("img").src,
      titulo: producto.querySelector("h4").textContent,
      precio: producto.querySelector(".precio").textContent,
      id: producto.querySelector('button').getAttribute('id'),
      cantidad: 1,
    };

    const existe = TotalCarrito.some(prod => prod.id === infoProducto.id);
    if (existe) {
      TotalCarrito = TotalCarrito.map(prod => {
        if (prod.id === infoProducto.id) {
          prod.cantidad++;
        }
        return prod;
      });

      const filas = contenedorCarrito.querySelectorAll("tr");
      filas.forEach(fila => {
        if (fila.querySelector(".borrar-producto").getAttribute("data-id") === infoProducto.id) {
          const cantidadTd = fila.children[3];
          cantidadTd.textContent = parseInt(cantidadTd.textContent) + 1;
        }
      });
    } else {
      TotalCarrito.push(infoProducto);
      agregarProductoCarrito(infoProducto);
    }
  }

  function agregarProductoCarrito(producto) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${producto.imagen}" width="50"></td>
      <td>${producto.titulo}</td>
      <td>${producto.precio}</td>
      <td>${producto.cantidad}</td>
      <td><a href="#" class="btn btn-danger" data-id="${producto.id}">X</a></td>
    `;
    contenedorCarrito.appendChild(row);
  }

  // Mostrar y ocultar carrito
  contenedor.style.display = "none";

  carrito.addEventListener("mouseenter", () => {
    contenedor.style.display = "flex";
  });

  carrito.addEventListener("mouseleave", () => {
    setTimeout(() => {
      if (!contenedor.matches(":hover")) {
        contenedor.style.display = "none";
      }
    }, 200);
  });

  contenedor.addEventListener("mouseleave", () => {
    contenedor.style.display = "none";
  });
  contenedorCarrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-danger")) {
      const id = e.target.getAttribute("data-id");
      TotalCarrito = TotalCarrito.filter(producto => producto.id !== id);
      e.target.parentElement.parentElement.remove();
    }
  });
});
