//template string para el header de todas las páginas
document.getElementById("header").innerHTML = `
    <a href="index.html" class="logo"><img class="logo" src="imgs/logo.png" alt="logo"></a>
    <div class="enlaceInterno">
        <a href="recetas.html">Recetas</a>
        <a href="nosotros.html">Nosotros</a>
        <a href="historia.html">Historia</a>
        <a href="contacto.html">Contacto</a>
    </div>
    <div class="redes">
        <a href="https://www.facebook.com/" target="_blank"><img src="imgs/facebook.png" alt="Facebook"></a>
        <a href="https://www.instagram.com/" target="_blank"><img src="imgs/instagram.png" alt="Instagram"></a>
        <a href="https://api.whatsapp.com/send?phone=numero&text=Hola" target="_blank"><img src="imgs/whatsapp.png" alt="whatsapp"></a>
    </div>
`
//template string para el footer de todas las páginas
document.getElementById("footer").innerHTML = `
    <div class="logo-1">
      <a href="index.html" class="logo"><img src="imgs/logo.png" alt="logo"></a>
    </div>
    <div class="redes-f">              
      <a href="https://www.facebook.com/" target="_blank"><img src="imgs/facebook.png" alt="Facebook"></a>
      <a href="https://www.instagram.com/" target="_blank"><img src="imgs/instagram.png" alt="Instagram"></a>
      <a href="https://api.whatsapp.com/send?phone=numero&text=Hola" target="_blank"><img src="imgs/whatsapp.png"
          alt="whatsapp"></a>
    </div>

    <div class="copyright">
      PapaParaPreparar 2022 Copyright © Todos los derechos reservados
    </div>
`

/* Funciones para iniciar las animaciones de los elementos según el observador */
//Función para agregar la clase de la animación al elemento según si se encuentra en el viewport
const animarElemento = (entradas, observador) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('animar');
    } else {
      //entrada.target.classList.remove('animar');
    }
  });
}
// Declaro al observador 
const observador = new IntersectionObserver(animarElemento, {
  root: null,
  rootMargin: '200px 100px 500px 100px',
  threshold: 1.0
});
// Declaro los elementos que son evaluados por el observador según la página
if (document.getElementById('inicio') != null) {
  observador.observe(document.getElementById('imagen_1'));
  observador.observe(document.getElementById('contenido_1'));
  observador.observe(document.getElementById('imagen_2'));
  observador.observe(document.getElementById('contenido_2'));
  observador.observe(document.getElementById('imagen_3'));
  observador.observe(document.getElementById('contenido_3'));
}