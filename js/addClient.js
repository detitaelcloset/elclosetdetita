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

function cerrarSesion() {
    firebase.auth().signOut().then(() => {
      // Cierre de sesión exitoso
      console.log("Sesión cerrada exitosamente");
      window.location.href = "index.html";
  
      // Aquí puedes redirigir al usuario a la página de inicio de sesión o cualquier otra página
    }).catch((error) => {
      // Ocurrió un error al cerrar sesión
      console.error("Error al cerrar sesión:", error);
    });
  }

  function validateData() {
    var client = document.getElementById("client_et").value.trim();
    var number = document.getElementById("number_et").value.trim();
  
   
  
    if (client === "") {
      alert("Ingrese el nombre completo del cliente");
    } else {
      if (number !== "") {
        addClientFirebase(client, number);
      } else {
        alert("Ingrese el número de teléfono del cliente");
      }
    }
  }

  function addClientFirebase(client, number) {
  
    var timestamp = Date.now();
  
  
  
    var hashMap = {
      id: timestamp,
      client: client,
      timestamp: timestamp,
      phone: number,
    };
  
    var ref = firebase.database().ref("Clients");
    ref.child(timestamp)
      .set(hashMap)
      .then(function() {
        progressDialog.dismiss();
        alert("Agregado exitosamente");
        document.getElementById("cliente_et").value = "";
        document.getElementById("number_et").value = "";
      })
      .catch(function(error) {
        alert("Ocurrió un error al agregar el cliente en la base de datos");
      });
  }
  
  