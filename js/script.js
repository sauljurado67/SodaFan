const audio = document.querySelector("audio");
const title = document.querySelector("h2");
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const next = document.getElementById("next");
const current_time = document.getElementById("current_time");
const current_audio = document.getElementById("current_audio");
const progressContainer = document.querySelector(".progress_container");
const progress = document.getElementById("progress");

const songs = ["01-Soda Stereo-Nada Personal",
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

signIn.onclick = function() {
    nameInput.style.maxHeight = "0";
    titu.innerHTML = "Login";
    signUp.classList.add("disable");
    signIn.classList.remove("disable");
}
signUp.onclick = function() {
    nameInput.style.maxHeight = "60px";
    titu.innerHTML = "Registro";
    signUp.classList.remove("disable");
    signIn.classList.add("disable");
}

/*----------- Validacion de Registro ------------*/

// const formulario = document.getElementById('formulario');
// const inputs = document.querySelectorAll('#formulario input');

// const expresiones = {
// 	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
// 	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
// 	password: /^.{4,12}$/, // 4 a 12 digitos.
// }

// const campos = {
//     nombre: false,
//     email: false,
//     password: false
// };

// const validarFormulario = (e) => {
//     switch (e.target.name) {
//         case "nombre":
//             validarCampo(expresiones.nombre, e.target, 'nombre');
//         break;
//         case "email":
//             validarCampo(expresiones.email, e.target, 'email');
//         break;
//         case "password":
//             validarCampo(expresiones.password, e.target, 'password');
//         break;
//     }
// }


// const validarCampo = (expresion, input, campo) => {
//     if (expresion.test(input.value)){
//         document.getElementById(`${campo}Input`).classList.remove('input-field-incorrecto');
//         document.getElementById(`${campo}Input`).classList.add('input-field-correcto');
//         campos[campo] = true;
//     } else {
//         document.getElementById(`${campo}Input`).classList.add('input-field-incorrecto');
//         document.getElementById(`${campo}Input`).classList.remove('input-field-correcto');
//         campos[campo] = false;
//     }
// }


// inputs.forEach((input)=>{
//     input.addEventListener('keyup', validarFormulario);
//     input.addEventListener('blur', validarFormulario);
// });



// formulario.addEventListener('submit', (e)=> {
//     e.preventDefault();

//     const terminos = document.getElementById('terminos');
//     if(campos.nombre && campos.email && campos.password && terminos.checked){
//         formulario.reset();

//     }
// });


