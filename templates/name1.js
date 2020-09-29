let nombre = localStorage.getItem('nombre');

print(nombre)

document.write('nombre ', nombre);
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#form').onsubmit = function() {
        const name = document.querySelector('#nombre').value;
        document.write('hola ', name);
        console.log(name)
        localStorage.setItem('nombre', name);


    }
});

