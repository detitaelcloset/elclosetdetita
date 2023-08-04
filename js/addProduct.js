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
    const fields = ["product", "price", "client", "date", "abono", "saldo", "number"];
  
    for (const field of fields) {
      const value = document.getElementById(field + "_et").value;
      if (value === "") {
        const errorMessage = field === "abono"
          ? "el abono del cliente a los productos pedidos"
          : field === "number"
            ? "el numero de telefono del cliente"
            : `el ${field}`;
        alert(`Debes llenar ${errorMessage}`);
        return;
      }
    }
  
    const values = fields.map(field => document.getElementById(field + "_et").value);
    createClient(...values);
  }
  
  
  function createClient(order, price, client,  date, debt, debit, number) {
    var timestamp = Date.now();
  
    var hashMap = {
      id: timestamp,
      client: client,
      phone: number,
    };
  
    var ref = firebase.database().ref("Clients");
    ref.child(timestamp)
      .set(hashMap)
      .then(function() {

        addOrdersClient(timestamp, order, price, client,  date, debt, debit, number);
      
        // Resto del código
        progressDialog.dismiss();
        alert("Agregado exitosamente");

        document.getElementById("numberEt").value = "";
        document.getElementById("clientEt").value = "";
      })

      .catch(function(error) {
        console.log("Ocurrió un error al agregar el cliente en la base de datos")
        alert();
      });
  }

  function addOrdersClient(id, order, price, client,  date, debt, debit, number) {
    var buscadorClient = client + "\n\n" + order + "\n" + date;
    var timestamp = Date.now();
    var hashMap = {};
  
    hashMap["id"] = timestamp;
    hashMap["uid"] = firebase.auth().currentUser.uid;
    hashMap["nombreProducto"] = order;
    hashMap["precioProducto"] = price;
    hashMap["clienteProducto"] = client;
    hashMap["fechaVenta"] = date;
    hashMap["buscador"] = buscadorClient;
    hashMap["abonoProducto"] = debt;
    hashMap["saldoProducto"] = debit;
    hashMap["clientId"] = id;
  
    var ref = firebase.database().ref("ClientsProduct");
    ref.child(timestamp)
      .set(hashMap)
      .then(function() {
        // Resto del código
        alert("Agregado exitosamente");
        // Limpiar los campos (esto depende de cómo se llaman en tu formulario)
        document.getElementById("product_et").value = "";
        document.getElementById("price_et").value = "";
        document.getElementById("date_et").value = "";
        document.getElementById("saldo_et").value = "";
        document.getElementById("abono_et").value = "";
      })
      .catch(function(error) {
        alert("Ocurrió un error al agregar el cliente en la base de datos");
      });
  }

  function createEmails(client, email) {
    var timestamp = Date.now();
  
    var hashMap = {};
    hashMap["id"] = timestamp;
    hashMap["client"] = client;
    hashMap["mails"] = email;
    hashMap["uid"] = firebase.auth().currentUser.uid;
  
    var ref = firebase.database().ref("Mails");
    ref.child(timestamp)
      .set(hashMap)
      .then(function() {
        // Resto del código
        progressDialog.dismiss();
        alert("Agregado exitosamente");
        // Limpiar el campo de email (esto depende de cómo se llama en tu formulario)
        document.getElementById("email_et").value = "";
      })
      .catch(function(error) {
        alert("Ocurrió un error al agregar el cliente en la base de datos");
      });
  }
  
  
  