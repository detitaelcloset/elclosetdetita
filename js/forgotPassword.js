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

function forgotPassword(){
    var emailtv = document.getElementById('email').value;

    if (!validateEmail(emailtv)) {
        //Validar si el email es correcto
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }else{
        firebase.auth().sendPasswordResetEmail(emailtv)
        .then(() => {
          alert('Se ha enviado un correo para restablecer la contraseña. Revise su bandeja de entrada.');
        })
        .catch((error) => {
          alert('El correo electronico:\t' + emailtv + '\tno existe.');
        });
    }
}

function regresar(){
    window.location.href = "index.html";
}

function validateEmail(emailtv) {
    // Validación básica de correo electrónico
    // Puedes implementar una validación más detallada si lo deseas
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(emailtv);
}