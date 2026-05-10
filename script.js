const textoMama = `Para la mujer más increíble de mi vida:\n\nGracias por tu amor incondicional, tus cuidados y tu paciencia.\n\nEres mi mayor inspiración y mi refugio más seguro.\n\n— ¡Feliz Día de las Madres!`;

// FECHA DE NACIMIENTO (Año, Mes-1, Día) -> Diciembre es el mes 11 en JS
const fechaNacimiento = new Date(2005, 11, 18, 0, 0, 0);

const audio = document.getElementById('miCancion');
const btnPlay = document.getElementById('masterPlay');
const barraProgreso = document.getElementById('progressBar');

// 1. Reproductor Spotify
btnPlay.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        btnPlay.classList.replace('fa-play', 'fa-pause');
    } else {
        audio.pause();
        btnPlay.classList.replace('fa-pause', 'fa-play');
    }
});

audio.addEventListener('timeupdate', () => {
    const porcentaje = (audio.currentTime / audio.duration) * 100;
    barraProgreso.style.width = porcentaje + "%";
});

// 2. Función del Contador de Tiempo
function actualizarContador() {
    const ahora = new Date();
    const diferencia = ahora - fechaNacimiento;

    const anios = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365.25));
    const diasRestantes = diferencia % (1000 * 60 * 60 * 24 * 365.25);
    const horas = Math.floor((diasRestantes % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diasRestantes % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diasRestantes % (1000 * 60)) / 1000);

    document.getElementById('reloj').innerHTML = 
        `${anios} años ${horas} horas ${minutos} minutos ${segundos} segundos`;
}

// 3. Función de escribir texto
function escribir(text, i, element, callback) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i) === "\n" ? "<br>" : text.charAt(i);
        setTimeout(() => escribir(text, i + 1, element, callback), 45);
    } else if (callback) {
        callback();
    }
}

// 4. Navegación
document.getElementById('btn-empezar').addEventListener('click', () => {
    document.getElementById('pantalla1').classList.remove('active');
    document.getElementById('pantalla2').classList.add('active');
    
    escribir(textoMama, 0, document.getElementById('maquina-escribir'), () => {
        // Al terminar el texto, aparece el contador y el botón
        document.getElementById('contador-container').classList.add('visible_el');
        document.getElementById('btn-a-final').classList.add('visible_el');
        // Iniciar el reloj cada segundo
        setInterval(actualizarContador, 1000);
    });

    setTimeout(() => {
        document.getElementById('box-arbol').classList.add('box-visible');
    }, 1000);
});

document.getElementById('btn-a-final').addEventListener('click', () => {
    document.getElementById('pantalla2').classList.remove('active');
    document.getElementById('pantalla3').classList.add('active');
    
    setTimeout(() => {
        document.getElementById('box-final').classList.add('box-visible');
        setTimeout(() => {
            document.getElementById('texto-final').classList.add('visible_el');
        }, 1500);
    }, 500);
});