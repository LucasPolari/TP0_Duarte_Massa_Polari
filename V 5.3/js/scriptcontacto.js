const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
console.log(inputs);

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    nombre: false,
    correo: false,
    telefono: false,
    direccion: false,
    recetas: false
}

const validarFormulario = (e) => {
    console.log(e.target.name);
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');

            break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;
        case "direccion":
            validarDireccion();
            //validarReceta();
            break;


    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-xmark');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-check');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;

    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-xmark');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-check');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;

    }
}

const validarDireccion = () => {
   
    /*** API del Servicio de Normalización de Datos Geográficos de Argentina */
    
    let autocomplete_results = document.getElementById('autocomplete-results');
    let band = false;

    direccion.addEventListener('keyup', (event) => {
        autocomplete_results.style.display = 'block';
        let key = event.target.value;

        console.log(key)

        if (key.length > 3) {
            search(key);
        }
        else {
            build_list();
        }
    })

    const search = (key) => {
        // fetch(`https://restcountries.eu/rest/v2/name/${key}?fields=name`)
        fetch(`https://apis.datos.gob.ar/georef/api/direcciones?direccion=${key}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (Array.isArray(data.direcciones)) {
                    build_list(data.direcciones.map((item) => {
                        return item.nomenclatura;
                    }));
                } else {
                    build_list();
                }
            })
            .catch(e => { console.log(e) })
    }

    const build_list = (items = []) => {     
        autocomplete_results.innerHTML = '';
        items.map((item) => {
            autocomplete_results.innerHTML += `<li>${item}</li>`;
        })
    }

    document.getElementById("autocomplete-results")
        .addEventListener("click", e => {
            if (e.target && e.target.nodeName == "LI") {
                band = true;
                direccion.value = e.target.innerHTML;
                build_list()
            }
        });
    /************************************ */

    if (band == false) {
        document.getElementById(`grupo__direccion`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__direccion`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__direccion .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['direccion'] = true;

    } else {
        document.getElementById(`grupo__direccion`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__direccion`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__direccion .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['direccion'] = false;
    }
}

const validarReceta = () => {
    const recetas = document.getElementById("receta").selectedIndex;

    if (recetas > 0) {
        document.getElementById(`grupo__receta`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__receta`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__receta .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['recetas'] = true;

    } else {
        document.getElementById(`grupo__receta`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__receta`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__receta .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['recetas'] = false;
    }

}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);

});

//document.getElementById("direccion").addEventListener('click', validarDireccion);
document.getElementById("receta").addEventListener('change', validarReceta);



formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const terminos = document.getElementById('terminos')
    if (campos.nombre && campos.correo && campos.telefono && campos.direccion && campos.recetas && terminos.checked) {
        formulario.reset();
        document.querySelector(`#grupo__nombre i`).classList.remove('fa-circle-check');
        document.querySelector(`#grupo__correo i`).classList.remove('fa-circle-check');
        document.querySelector(`#grupo__telefono i`).classList.remove('fa-circle-check');
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);
        document.QuerySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulsrio__grupo--correcto');
        });
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }, 2000);
    }
});

