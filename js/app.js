const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#nueva-cita');

const contenedorCitas = document.querySelector('#citas');

class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];

        console.log(this.citas);
    }
}

class UI {

    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement ('div');
        divMensaje.classList.add ('text-center', 'alert', 'd-block', 'col-12');
    
    // Crear clase en base al tipo de error
    if (tipo === 'error') {
        divMensaje.classList.add('alert-danger');
    } else {
        divMensaje.classList.add('alert-succes');

    }
    //Mensaje de Erro
    divMensaje.textContent = mensaje;

    //Agregar al Dom
    document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

    setTimeout( () => {
        divMensaje.remove();
    }, 5000);

    }

     imprimirCitas(citas) {
         citas.forEach(cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //Scripting de los elementos de la cita

            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;


            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
            
            <span class = "font-weight-bolder"> Propietario: </span> ${propietario}
            
            `;

            // Agregar los parrafos al Divcita
            divCita.appendChild(mascotaParrafo); 
            divCita.appendChild(propietarioParrafo); 
            contenedorCitas.appendChild(divCita);
         })
     }

}

const ui = new  UI();
const administrarCitas = new Citas();

//Agregar Eventos
eventListeners(); 
function eventListeners () {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

//OBJETO CON LA INFORMACION DE LA CITA
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}


//Agregar datos al objeto de cita
function datosCita(e) {
    citaObj[e.target.name] = e.target.value; 
}

function nuevaCita (e) {
    e.preventDefault();

    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    if (mascota === '' ||  propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error')
        return;
    }

    citaObj.id = Date.now();

    administrarCitas.agregarCita([...citaObj]);

    //Reiniciar el objeto para la Validacion
    reiniciarObjeto();

    //Mostrar Citas en el Html

    formulario.reset();
}

function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha= '';
    citaObj.hora = '';
    citaObj.sintomas = '';

}