window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const inputNombre = document.querySelector('#inputNombre');
    const inputApellido = document.querySelector('#inputApellido');
    const inputEmail = document.querySelector('#inputEmail');
    const inputPassword = document.querySelector('#inputPassword');
    const inputPasswordRepetida = document.querySelector('#inputPasswordRepetida');
    const form = document.querySelector('form');

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const datos = {
            firstName: inputNombre.value,
            lastName: inputApellido.value,
            email: inputEmail.value,
            password: inputPassword.value,
        }

        const config = {
                method: 'POST',
                body: JSON.stringify(datos),
                headers: {
                 'Content-type': 'application/json; charset=utf-8',
            }
        }

        if(compararContrasenias(inputPassword.value, inputPasswordRepetida.value)){
            realizarRegister(config);
        }


    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        const endPoint = 'https://todo-api.ctd.academy/v1/users';

        fetch(endPoint, settings)
        .then(response => response.json())
        .then(datos => {
            localStorage.setItem('jwt', dato.jwt);
            location.replace('mis-tareas.html');
        })




    };


});