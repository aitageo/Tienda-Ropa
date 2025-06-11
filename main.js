document.addEventListener('DOMContentLoaded', () => {
    const carrito = [];

    function agregarAlCarrito(nombre, precio) {
      carrito.push({ nombre, precio });
      renderizarCarrito();
    }

    function renderizarCarrito() {
      const lista = document.getElementById('lista-carrito');
      const total = document.getElementById('total');
      lista.innerHTML = '';
      let suma = 0;

      carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${producto.nombre} - $${producto.precio.toLocaleString()} <button class="eliminar" onclick="eliminarProducto(${index})">X</button>`;
        lista.appendChild(li);
        suma += producto.precio;
      });

      total.textContent = `Total: $${suma.toLocaleString()}`;
    }

    function eliminarProducto(index) {
      carrito.splice(index, 1);
      renderizarCarrito();
    }

    function vaciarCarrito() {
      carrito.length = 0;
      renderizarCarrito();
    }
  });