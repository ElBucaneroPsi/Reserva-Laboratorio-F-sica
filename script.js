// ========== MATRIX RAIN EFFECT ==========
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00FF41';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = matrix.charAt(Math.floor(Math.random() * matrix.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ========== DATETIME UPDATE ==========
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const dateTimeString = now.toLocaleDateString('es-MX', options).toUpperCase();
    document.getElementById('currentDateTime').textContent = dateTimeString;
}

updateDateTime();
setInterval(updateDateTime, 1000);

// ========== RESERVATIONS SYSTEM ==========
let reservas = JSON.parse(localStorage.getItem('reservas')) || [];

const form = document.getElementById('reservaForm');
const listaReservas = document.getElementById('listaReservas');

mostrarReservas();

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
    
    showToast('¡RESERVA REALIZADA CON ÉXITO!');
});

function mostrarReservas() {
    listaReservas.innerHTML = '';
    
    if (reservas.length === 0) {
        listaReservas.innerHTML = '<li style="text-align: center; color: var(--matrix-dim);">NO HAY RESERVAS AÚN</li>';
        return;
    }
    
    reservas.forEach(reserva => {
        const li = document.createElement('li');
        
        const experimentoLabel = {
            'mecanica': 'Mecánica',
            'electromagnetismo': 'Electromagnetismo',
            'optica': 'Óptica',
            'termodinamica': 'Termodinámica',
            'ondas': 'Ondas y Sonido',
            'fluidos': 'Fluidos'
        };
        
        li.innerHTML = `
            <strong>▸ ${reserva.nombre}</strong><br>
            📅 FECHA: ${reserva.fecha}<br>
            ⏰ HORA: ${reserva.hora}<br>
            🔬 EXPERIMENTO: ${experimentoLabel[reserva.experimento] || reserva.experimento}
            <button class="btn-delete" onclick="eliminarReserva(${reserva.id})">ELIMINAR</button>
        `;
        listaReservas.appendChild(li);
    });
}

function eliminarReserva(id) {
    if (confirm('¿ESTÁS SEGURO DE ELIMINAR ESTA RESERVA?')) {
        reservas = reservas.filter(r => r.id !== id);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        mostrarReservas();
        showToast('RESERVA ELIMINADA', 'error');
    }
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
