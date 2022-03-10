const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;

class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id)
    }

    editarCita(citaActualizada) {
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita )
    }
}

class UI {

   // Elimina el Html previo


    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement ('div');
        divMensaje.classList.add ('text-center', 'alert', 'd-block', 'col-12');
        
    // Crear clase en base al tipo de error
    if (tipo === 'error') {
        divMensaje.classList.add('alert-danger');
    } else {
        divMensaje.classList.add('alert-success');

    }
    //Mensaje de Erro
    divMensaje.textContent = mensaje;

    //Agregar al Dom
    document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

    setTimeout( () => {
        divMensaje.remove();
    }, 5000);

    }

     imprimirCitas({citas}) {
         
        this.limpiarHTML();
       
        citas.forEach( cita => {
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


            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
            
            <span class = "font-weight-bolder"> telefono: </span> ${telefono}
            
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
            
            <span class = "font-weight-bolder"> Fecha: </span> ${fecha}
            
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
            
            <span class = "font-weight-bolder"> Hora: </span> ${hora}
            
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
            
            <span class = "font-weight-bolder"> Sintomas: </span> ${sintomas}
            
            `;
            
            //boton para eliminar las citas 
            const btnEliminar = document.createElement ('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg> `;

          btnEliminar.onclick = () => eliminarCita(id);


          //Boton para editar las citas
          const btnEditar = document.createElement('button');
          btnEditar.classList.add('btn', 'btn-info');
          btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>`
            btnEditar.onclick = () => cargarEdicion(cita);


            // Agregar los parrafos al Divcita
            divCita.appendChild(mascotaParrafo); 
            divCita.appendChild(propietarioParrafo); 
            divCita.appendChild(telefonoParrafo); 
            divCita.appendChild(fechaParrafo); 
            divCita.appendChild(horaParrafo); 
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            //Agregas citas al Html
            contenedorCitas.appendChild(divCita);
         })
     }

     limpiarHTML() {
        while( contenedorCitas.firstChild ) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }

       
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

    //editando citas
    if (editando) {
        ui.imprimirAlerta("Editado Correctamente" , 'alert-success');

        //Pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj});

        formulario.querySelector('button[type="submit"]').textContent = ' Crear Cita ';
        editando = false;

    }else {
        citaObj.id = Date.now();
        administrarCitas.agregarCita({...citaObj});
        //Mensaje de Agregado Correctamente
        ui.imprimirAlerta("Se agrego Correctamente", 'alert-success');
    }

    //Reiniciar el objeto para la Validacion
    reiniciarObjeto();

    //Mostrar Citas en el Html
    formulario.reset();

    ui.imprimirCitas(administrarCitas);
}

function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha= '';
    citaObj.hora = '';
    citaObj.sintomas = '';

}

// Erroes solucionados

function eliminarCita (id) {
   //eliminar cita
   administrarCitas.eliminarCita(id);

   // Muestre un mensaje 
   ui.imprimirAlerta('La cita se elimino correctamente')

   //Refrescar las citas
   ui.imprimirCitas(administrarCitas);
}

//Cargar los datos y el modo edicion

function cargarEdicion (cita) {
    const {mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    //lenas lo inputs 

    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenar el objeto

    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;
    //Cambiar teto del boton

    formulario.querySelector('button[type="submit"]').textContent = ' Guardar Cambios'

    editando = true;
}