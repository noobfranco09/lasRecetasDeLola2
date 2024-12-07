// Obtener los elementos del DOM
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("nuevaReceta");
const closeBtn = document.getElementById("botonCerrar");

// Función para abrir el modal
openModalBtn.onclick = function() {
  modal.style.display = "block";
};

// Función para cerrar el modal
closeBtn.onclick = function() {
  modal.style.display = "none";
};

// Cerrar el modal si se hace clic fuera del área del modal
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};



let contador=localStorage.getItem('contador') || 0;


function guardar() {
    // Aseguramos que contador tenga un valor numérico
    let contador = localStorage.getItem("contador");
    if (!contador) {
      contador = 0;
    } else {
      contador = parseInt(contador);  // Aseguramos que sea un número
    }
    
    let consecutivo = document.getElementById('consecutivo').value;
    let nombre = document.getElementById('nombreReceta').value;
    let descripcion = document.getElementById('descripcion').value;
    let precioNeto = document.getElementById('precioNeto').value;
    let precioSugerido = document.getElementById('precioSugerido').value;
    const inputImage = document.getElementById('foto');
    const archivo = inputImage.files[0];
  
    // Verificar que se haya seleccionado una imagen
    if (!archivo) {
      alert("Por favor, selecciona una imagen.");
      return;
    }
  
    const reader = new FileReader();
    
    // Esta función se ejecutará una vez que el archivo sea leído
    reader.onloadend = function() {
      const imagenBase64 = reader.result;  // Aquí tenemos la imagen en Base64
  
      // Verificar que todos los campos estén llenos
      if (nombre.trim().length > 0 && descripcion.trim().length > 0 && precioNeto.trim().length > 0 && precioSugerido.trim().length > 0) {
        
        // Crear el objeto receta con la imagen en Base64
        const receta = {
          numeroConsecutivo:consecutivo,
          nombreReceta: nombre,
          descripcionReceta: descripcion,
          foto: imagenBase64,  // Guardamos la imagen en Base64
          precioNeto:precioNeto,
          precioSugerido:precioSugerido,

        };
  
        // Guardamos la receta en localStorage
        localStorage.setItem("receta" + contador, JSON.stringify(receta));
        contador++;  // Incrementamos el contador
        localStorage.setItem("contador",contador);  // Guardamos el contador
  
        // Limpiamos los campos del formulario después de guardar
        document.getElementById('nombreReceta').value = "";
        document.getElementById('descripcion').value = "";
        document.getElementById('foto').value = "";  // Limpiar el campo de imagen
        document.getElementById('precioNeto').value = "";
        document.getElementById('precioSugerido').value = "";
  
        alert("Receta guardada correctamente.");
      } else 
        {
             alert("Por favor, llena todos los campos.");
        }
    };
  
    // Leer el archivo seleccionado como un Data URL (Base64)
    reader.readAsDataURL(archivo);
    location.reload();
  }


  document.addEventListener('DOMContentLoaded',function() 
{
  let contador2=parseInt(localStorage.getItem('contador'));
  for (let index = 0; index <contador2; index++) 
  {
    var receta1=localStorage.getItem('receta'+index)
    var receta=JSON.parse(receta1)
    let columna=
                `<div class="col-6 mt-5" >
                    <div class="card" style="width: 30rem;">
                        <img src="${receta.foto}" class="card-img-top" alt="...">
                        <div class="card-body" id="cardReceta">
                        <h3>#${receta.numeroConsecutivo}</h3>
                        <h3>Receta:</h3>
                          <h5 class="card-title">${receta.nombreReceta}</h5>
                          <h3>Preparación:</h3>
                          <p> ${receta.descripcionReceta}</p>
                          <h3>Costo por plato:</h3>
                          <h6>${receta.precioNeto}</h6>
                          <h3>Precio sugerido para la venta,por plato:</h3>
                          <h6>${receta.precioSugerido}</h6>
                          
                        </div>
                      </div>
                </div>`
  
  var div=document.getElementById('cards');
  div.innerHTML+=columna;
  }
    
  
});

//document.getElementById('buscar1').addEventListener('click', function() {
    // Cambia la URL a la nueva página
    
   // window.location.href = 'busqueda.html';  // Sustituye 'otra_pagina.html' por la URL que desees
  
  //});
  





