
    /* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.querySelector('form');
    const inputEmail = document.querySelector('#inputEmail');
    const inputPassword = document.querySelector('#inputPassword');



    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        
        event.preventDefault();
        const datos = {
            email: inputEmail.value,
            password: inputPassword.value
        }

        const config = {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
             'Content-type': 'application/json; charset=utf-8',
            }    
        }

        realizarLogin(config);



    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(config) {
        const endpoint = 'https://todo-api.ctd.academy/v1/users/login';

        fetch(endpoint, config)
        .then( response => response.json() )
        .then(dato => {
            if (dato.jwt){
                localStorage.setItem('jwt', dato.jwt);
                location.replace('mis-tareas.html');
            }
        }).catch(error => error);
        
    };


