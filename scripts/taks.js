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
  const tareasPendientes = document.querySelector('.tareas-pendientes');
  const tareasTerminadas = document.querySelector('.tareas-terminadas');
  const cantidadTareasFinalizadas = document.querySelector('#cantidad-finalizadas');

  obtenerNombreUsuario();
  consultarTareas();
  

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    Swal.fire({
      title: 'ToDo App',
      text: "¿Seguro que desea Salir de la APP?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      background: '#000',
      color: '#fff',
    }).then((result) => {

      if (result.isConfirmed) {
        localStorage.removeItem('jwt');
        location.replace('index.html');
      }
    })

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
        renderizarTareas(datos);
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
    
      let tareasCompletadas = 0;
      tareasTerminadas.innerHTML = '';
      tareasPendientes.innerHTML = '';
  
      
      listado.forEach(tarea => {

        let fecha = new Date(tarea.createdAt);
        if (tarea.completed){
          tareasCompletadas++;
          
          tareasTerminadas.innerHTML +=`
            <li class="tarea">
              <div class="hecha">
                <i class="fa-regular fa-circle-check"></i>
              </div>
              <div class="descripcion">
                <p class="nombre">${tarea.description}</p>
                <div class="cambios-estados">
                  <button class="change incompleta" id="${tarea.id}" ><i class="fa-solid fa-rotate-left"></i></button>
                  <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
                </div>
              </div>
            </li>
                          `;
        } else{
          tareasPendientes.innerHTML +=  `
                                <li class="tarea">
                                  <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle"></i></button>
                                  <div class="descripcion">
                                    <p class="nombre">${tarea.description}</p>
                                    <p class="timestamp">${fecha.toLocaleDateString()}</p>
                                  </div>
                                </li>
                                        ` ;
        }
        cantidadTareasFinalizadas.innerText = tareasCompletadas;
      });
      

      botonesCambioEstado();
      botonBorrarTarea();
  };



  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    const btnCambioEstado = document.querySelectorAll('.change');

    btnCambioEstado.forEach( boton => {
      boton.addEventListener('click', function(e){
        const terminada = e.target.classList.contains('incompleta');
        const id = e.target.id;
        const endpoint = 'https://todo-api.ctd.academy/v1/tasks/'+id;

        const datos = {
          completed: !terminada
        }

        const config = {
          method: 'PUT',
          body:  JSON.stringify( datos),
          headers: {
            authorization: jwt,
            'Content-type': 'application/json; charset=UTF-8'
          }
        }
      
        fetch(endpoint, config)
        .then( response => response.json())
        .then( json => {
          consultarTareas();
        })
      })
    })

  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
    
    const btnBorrarTarea = document.querySelectorAll('.borrar');
    
    btnBorrarTarea.forEach( tarea => {

      tarea.addEventListener('click', function(e){
        const id = e.target.id;
        const endpoint = 'https://todo-api.ctd.academy/v1/tasks/'+id;

        const config = {
          method: 'DELETE',
          headers: {
            authorization: jwt,
            'Content-type': 'application/json; charset=UTF-8'
          }
        }
      
        fetch(endpoint, config)
        .then( response => response.json())
        .then( json => {
          consultarTareas();
        })
      })
    })
  }


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
      consultarTareas();
    }).catch(error => error)
  }

});