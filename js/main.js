

let tour;

if (localStorage.getItem("tour")) {
    tour = JSON.parse(localStorage.getItem("tour"));
} else {
    tour = [];
};


const container = document.getElementById("container");

fetch ('./data.json')
.then (response => response.json())
.then (data => data.forEach(el => crearCard(el)));

const mostrar = document.createElement("button");
mostrar.innerText = "Ver mi tour";


mostrar.addEventListener("click", () => {
    console.log("Este es el tour a realizar", tour);
});

const limpiar = document.createElement("button");
limpiar.innerText = "Volver a organizar mi tour";

limpiar.addEventListener("click", () => {
    if (tour.length > 0){
    Swal.fire({
        title: 'Está seguro de borrar el tour?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero'
    })
        .then(result => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Qué pena!",
                    text: "Borraste el Tour",
                    icon: "error",
                });
                tour = [];
                localStorage.setItem("tour", JSON.stringify(tour));
                } else {
                    Swal.fire({
                        title: "Bien ahí!",
                        text: "No eliminaste nada",
                        icon: "success",
                    });
            };
        });
    } else {
        Toastify({
            text: "El carrito está vacío. No lo podés limpiar",
        }).showToast();
    }
})

function agregarAlCarrito(refugio) {



    if (tour.some(el => el.id === refugio.id)) {
        const indexRefugio = tour.findIndex(el => el.id === refugio.id);
        tour[indexRefugio].visitas += 1;
    } else {
        const nuevoRefugio = {
            id: refugio.id,
            nombre: refugio.nombre,
            precio: refugio.precio,
            visitas: 1,
        };
        tour.push(nuevoRefugio);
    };

    console.log("Añadiste un destino a tu viaje", tour)

    Toastify({
        text: `${refugio.nombre} se agrego al tour`,
        gravity: "top",
    }).showToast();

    localStorage.setItem("tour", JSON.stringify(tour));
};

function crearCard(refugio) {
    const card = document.createElement("div");
    card.className = "card";

    const titulo = document.createElement("h3");
    titulo.innerText = refugio.nombre;

    const imagen = document.createElement("img");
    imagen.src = refugio.img
    imagen.className = "img";

    const precio = document.createElement("p");
    precio.innerText = `$${refugio.precio}`;

    const boton = document.createElement("button");
    boton.innerText = "Agregar este refugio al Tour";
    boton.onclick = () => agregarAlCarrito(refugio);

    card.append(titulo);
    card.append(imagen);
    card.append(precio);
    card.append(boton);
    container.append(card);
}

const nombre = document.getElementById("nombre");
const dni = document.getElementById("dni");
const nacimiento = document.getElementById("nacimiento");
const email = document.getElementById("email");

let Formulario = document.getElementById("formulario");
Formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const objeto = {
        nombre: nombre.value,
        dni: dni.value,
        nacimiento: nacimiento.value,
        email: email.value
    }
    console.log("Enviado", objeto);
    alert("Listo, recibiras nuestras ofertas en exclusiva")

});

const boton = document.createElement("button");
boton.innerText = "Agregar a mi Tour"

carrito.append(mostrar)
carrito.append(limpiar)