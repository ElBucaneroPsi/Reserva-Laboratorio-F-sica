// Array para guardar reservas (se guarda en localStorage)
let reservas = JSON.parse(localStorage.getItem('reservas')) || [];

// Referencias a elementos del DOM
const form = document.getElementById('reservaForm');
const listaReservas = document.getElementById('listaReservas');

// Cargar reservas al iniciar
mostrarReservas();

// Evento para enviar formulario
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const reserva = {
        id: Date.now(),
        nombre: document.getElementById('nombre').value,
        fecha: document.getElementById('fecha').value,
        hora: document.getElementById('hora').value,
        experimento: document.getElementById('experimento').value
    };
    
    reservas.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));
    
    form.reset();
    mostrarReservas();
    
    alert('¡Reserva realizada con éxito!');
});

// Función para mostrar reservas
function mostrarReservas() {
    listaReservas.innerHTML = '';
    
    if (reservas.length === 0) {
        listaReservas.innerHTML = '<li>No hay reservas aún</li>';
        return;
    }
    
    reservas.forEach(reserva => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${reserva.nombre}</strong><br>
            📅 ${reserva.fecha} a las ${reserva.hora}<br>
            🔬 Experimento: ${reserva.experimento}
            <button onclick="eliminarReserva(${reserva.id})" style="float: right; background: #e74c3c; padding: 5px 10px; font-size: 0.9em;">Eliminar</button>
        `;
        listaReservas.appendChild(li);
    });
}

// Función para eliminar reserva
function eliminarReserva(id) {
    if (confirm('¿Estás seguro de eliminar esta reserva?')) {
        reservas = reservas.filter(r => r.id !== id);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        mostrarReservas();
    }
}
