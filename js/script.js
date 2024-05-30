const audio = document.querySelector("audio");
const title = document.querySelector("h2");
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const next = document.getElementById("next");
const current_time = document.getElementById("current_time");
const current_audio = document.getElementById("current_audio");
const progressContainer = document.querySelector(".progress_container");
const progress = document.getElementById("progress");

const songs = [
               "01-Soda Stereo-Nada Personal",
               "02-Soda Stereo Si No Fuera por Official Audio",
               "03-Soda Stereo Cuando Pase el Temblor Official Audio",
               "04-Soda Stereo Danza Rota Official Audio",
               "05-Soda Stereo El Cuerpo del Delito Official Audio",
               "06-Soda Stereo Juego De Seducción Official Audio",
               "07-Soda Stereo Estoy Azulado Official Audio",
               "08-Soda Stereo Observándonos Satélites Official Audio",
               "09-Soda Stereo Imágenes Retro Official Audio",
               "10-Soda Stereo Ecos Official Audio"];

let audioIndex = 0;

loadAudio(songs[audioIndex]);

function loadAudio(song){
    title.textContent = song;
    audio.src = `mp3/${song}.mp3`;
    
    audio.addEventListener("loadedmetadata", () =>{
        timeSong(audio.duration, current_audio)
    });
};

function playSong(){
    play.classList.add("play");
    const icon = play.querySelector("i.fas");
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");

    audio.play();
};

function pauseSong(){
    play.classList.remove("play");
    const icon = play.querySelector("i.fas");
    icon.classList.add("fa-play");
    icon.classList.remove("fa-pause");

    audio.pause();
};

function updateBarProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickPosition = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickPosition / width) * duration;
}
function timeSong(audio, element){
    const totalSeconds = Math.round(audio);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    element.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function prevSong() {
    audioIndex--
    if (audioIndex < 0){
        audioIndex = songs.length -1;
    }
    loadAudio(songs[audioIndex]);
    playSong();
}

function nextSong() {
    audioIndex++
    if (audioIndex > songs.length -1){
        audioIndex = 0;
    }
    loadAudio(songs[audioIndex]);
    playSong();
}

play.addEventListener("click", ()=> {
    const isPlaying = play.classList.contains("play")
    if (!isPlaying) {
        playSong();
    } else {
        pauseSong();
    }
});

audio.addEventListener("timeupdate", (e) =>{
    updateBarProgress(e)
    timeSong(audio.currentTime, current_time);
});
progressContainer.addEventListener("click", setProgress);
prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);

audio.addEventListener("ended", nextSong);

/*-------- reproduccion desde el listado ---------*/


function playList(a) {
    audioIndex = a
    loadAudio(songs[audioIndex]);
    playSong();
}

/*----------------- Ventana Login --------------------*/

function abrir(){
    document.getElementById("vent").style.display="block";
}

function cerrar(){
    document.getElementById("vent").style.display="none";
}
function abri(){
    document.getElementById("radio").style.display="block";
}
function cerr(){
    document.getElementById("radio").style.display="none";
}

let signUp = document.getElementById("signUp");
let signIn = document.getElementById("signIn");
let nameInput = document.getElementById("nameInput");
let titu = document.getElementById("title");
let condition = document.getElementById('terminos');
let condi = document.getElementById('term')

signIn.onclick = function() {
    nameInput.style.maxHeight = "0";
    titu.innerHTML = "Login";
    condition.style.display = 'none';
    condi.style.display = 'none';
    signUp.classList.add("disable");
    signIn.classList.remove("disable");
}
signUp.onclick = function() {
    nameInput.style.maxHeight = "60px";
    titu.innerHTML = "Registro";
    condition.style.display = 'flex';
    condi.style.display = 'flex';
    signUp.classList.remove("disable");
    signIn.classList.add("disable");
}

/*----------- Validacion de Registro ------------*/

const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const pass = document.getElementById('password');
const form = document.getElementById('formulario')
const parrafo = document.getElementById('warnings')


form.addEventListener('submit', e=>{
    if (signIn.classList.value == 'disable'){
        e.preventDefault();
        let warnings = '';
        let regxEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let entrar = false;
        parrafo.innerHTML = "";

        if (nombre.value.length <6){
            warnings += 'Nombre muy corto <br>'
            entrar = true
        };
        console.log(regxEmail.test(email.value))
        if (!regxEmail.test(email.value)){
            warnings += 'El email no es valido <br>'
            entrar = true
        };
        if (pass.value.length < 6){
            warnings += 'La contraseña no es valida <br>'
            entrar = true
        };
        if (!condition.checked) {
            warnings += 'Debe aceptar los Terminos <br>'
        }
        if (entrar){
            parrafo.innerHTML = warnings
        } else {
            parrafo.innerHTML = 'Enviado'
        };
        let emailR = email.value;
        let passR = pass.value;
        localStorage.setItem('email', emailR);
        localStorage.setItem('password', passR);

    } else {
        e.preventDefault();
        let warnings = '';
        let regxEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let entrar = false;
        parrafo.innerHTML = "";
        // if (nombre.value.length <6){
        //     warnings += 'Nombre muy corto <br>'
        //     entrar = true
        // };
        console.log(regxEmail.test(email.value))
        if (!regxEmail.test(email.value)){
            warnings += 'El email no es valido <br>'
            entrar = true
        };
        if (pass.value.length < 6){
            warnings += 'La contraseña no es valida <br>'
            entrar = true
        };
        if (entrar){
            parrafo.innerHTML = warnings
        } else {
            if (email.value == localStorage.getItem('email', '') &&  (pass.value == localStorage.getItem('password', ''))){
                parrafo.innerHTML = 'Bienvenido'
                alert('Bienvenido')
                cerrar()
            } else {
                alert('Debe Registrarse')
            }
        };
    };
});



/* ------------------------------------------------------ */



// Función para buscar música
async function fetchMusic(searchTerm) {
    const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&limit=10`);
    const data = await response.json();
    return data.results;
}

// Añadir un event listener al botón de búsqueda
document.getElementById('searchButton').addEventListener('click', async () => {
    const searchTerm = document.getElementById('searchTerm').value;
    const data = await fetchMusic(searchTerm);
    const audioElements = displayMusic(data);
    console.log('Audio Elements:', audioElements);
});

// Función para mostrar los datos de la música y devolver los elementos de audio
function displayMusic(data) {
    if (Array.isArray(data)) {
        // Limpiar resultados previos
        const existingMusicPlayer = document.getElementById('music-playe');
        if (existingMusicPlayer) {
            existingMusicPlayer.remove();
        }

        // Crear un div para el reproductor de música
        const musicDiv = document.createElement('section');
        musicDiv.className = 'section-list';
        musicDiv.id = 'music-playe';

        // Array para almacenar los elementos de audio
        const audioElements = [];

        // Crear elementos para cada canción
        for (let i = 0; i < data.length; i++) {
            const track = data[i];
            console.log(track);

            // Crear un div para cada pista
            const trackDiv = document.createElement('li');
            trackDiv.className = 'track';

            // Crear un título para la pista
            const title = document.createElement('a');
            title.textContent = track.trackName;
            trackDiv.appendChild(title);

            // Crear un elemento de audio
            const audio = document.createElement('audio');
            audio.controls = true;
            audio.src = track.previewUrl; // Utiliza la URL de vista previa de la pista
            trackDiv.appendChild(audio);

            // Añadir el elemento de audio al array
            audioElements.push(audio);

            // Añadir el div de la pista al div del reproductor de música
            musicDiv.appendChild(trackDiv);
        }

        // Obtener el elemento main y el div2
        const mainElement = document.querySelector('main');
        const div2 = document.getElementById('busca');

        // Insertar el div del reproductor de música después de div2
        mainElement.insertBefore(musicDiv, div2.nextSibling);

        // Devolver el array de elementos de audio
        return audioElements;
    } else {
        console.error('Se esperaba un array de pistas');
        return [];
    }
}

// Búsqueda inicial al cargar la página con un término predeterminado
document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchMusic('');
    const audioElements = displayMusic(data);
    console.log('Audio Elements:', audioElements);
});
