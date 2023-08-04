const firebaseConfig = {
    apiKey: "AIzaSyDNnSSPCp5Skd3S19LigN8tb65dZg9SiCw",
    authDomain: "elclosetdetita-sds.firebaseapp.com",
    databaseURL: "https://elclosetdetita-sds-default-rtdb.firebaseio.com",
    projectId: "elclosetdetita-sds",
    storageBucket: "elclosetdetita-sds.appspot.com",
    messagingSenderId: "160210172174",
    appId: "1:160210172174:web:0b5a55d42a6374c3307f5f",
    measurementId: "G-QNZCZ2SKCM"
  };
  
  // Inicializa Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();


function login() {
    var emailtv = document.getElementById('email').value;
    var passwordtv = document.getElementById('password').value;

    if (!validateEmail(emailtv)) {
        //Validar si el email es correcto
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    } else if (passwordtv.trim() === '') {
        //validar que el password no este vacio 
        alert('Por favor, ingresa una contraseña.');
        return;
    } else  if(passwordtv.length < 7){
        //verificar que el password tenga como minimo 7 caracteres
        alert('La contraseña por lo menos debe de tener 7 caracteres');
        return;
    } else{
        verifyLogin(emailtv, passwordtv)
    }
}

function validateEmail(emailtv) {
    // Validación básica de correo electrónico
    // Puedes implementar una validación más detallada si lo deseas
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(emailtv);
}

function verifyLogin(emailtv, passwordtv){
 // Inicia sesión con Firebase Auth
 firebase.auth().signInWithEmailAndPassword(emailtv, passwordtv)
 .then((userCredential) => {
     // El usuario ha iniciado sesión con éxito
     var user = userCredential.user;
     window.location.href = "home.html";

     console.log("Usuario ha iniciado sesión:", user);
     // Aquí puedes redirigir a la página principal o realizar otras acciones
 })
 .catch((error) => {
     // Se produjo un error al iniciar sesión, puedes mostrar un mensaje de error al usuario
     var errorCode = error.code;
     var errorMessage = error.message;
     console.error("Error al iniciar sesión:", errorCode, errorMessage);
 });
}