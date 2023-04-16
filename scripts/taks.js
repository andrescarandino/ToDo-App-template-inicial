// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
const jwt = localStorage.getItem('jwt');
if (jwt){

}else{
  location.replace('index.html');
}


/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
  const btnCerrarSesion = document.querySelector('#closeApp');
  const formCrearTarea = this.document.querySelector('.nueva-tarea');
  const inputNuevaTarea = document.querySelector('#nuevaTarea');
  obtenerNombreUsuario();
  consultarTareas();

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    if( confirm('Deseas cerrar sesión? ') ){
      localStorage.removeItem('jwt');
      location.replace('index.html');
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
    const nombreUsuario = document.querySelector('.user-info p');
    

    const endpoint = 'https://todo-api.ctd.academy/v1/users/getMe';
    const config = {
      method: 'GET',
      headers: {
        authorization: jwt,
      }
      }    

      fetch(endpoint, config)
      .then(response => response.json())
      .then(datos => {
        nombreUsuario.innerText = datos.firstName + " " +datos.lastName;

      })
      .catch(error => error);
  };


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    
    const endpoint = 'https://todo-api.ctd.academy/v1/tasks';
    const config = {
      method: 'GET',
      headers: {
        authorization: jwt,
      }
      }    

      fetch(endpoint, config)
      .then(response => response.json())
      .then(datos => {
        console.log(datos);
      })
      .catch(error => error);
  }

  


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event) {
    event.preventDefault();  
    crearNuevaTarea();
    inputNuevaTarea.value = "";



  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {







  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    
    



  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
   
    

    

  };

    /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 8 - Crear Nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */
  function crearNuevaTarea () {
    

    const endpoint = 'https://todo-api.ctd.academy/v1/tasks';

    const datos = {
      description: inputNuevaTarea.value,
      completed: false,
    }

    const config = {
      method: 'POST',
      headers: {
        authorization: jwt,
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(datos),
    }

    fetch(endpoint, config)
    .then(response => response.json())
    .then(datos => {
      console.log(datos);
    }).catch(error => error)
  }

});