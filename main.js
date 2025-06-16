document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.querySelector('.mostrar-carrito');
  const carrito = document.getElementById('carrito');

  contenedor.style.display = 'none';

  carrito.addEventListener('mouseenter', () => {
    contenedor.style.display = 'block'; 
  });

  carrito.addEventListener('mouseleave', () => {
    setTimeout(() => {
      if (!contenedor.matches(':hover')) {
        contenedor.style.display = 'none';
      }
    }, 200);
  });

  contenedor.addEventListener('mouseleave', () => {
    contenedor.style.display = 'none';
  });
});


