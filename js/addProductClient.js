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

    // Obtén una referencia al elemento select del HTML
const selectElement = document.getElementById('client_et');

// Obtén una referencia a la colección de clientes
const clientsRef = firebase.database().ref('Clients');

// Leer todos los clientes desde la base de datos
clientsRef.on('value', (snapshot) => {
  // Limpiar las opciones anteriores antes de agregar las nuevas
  selectElement.innerHTML = '';

  snapshot.forEach((childSnapshot) => {
    const client = childSnapshot.val();
    //const clientId = childSnapshot.key;

    // Crea una nueva opción para el select con el nombre del cliente y el valor del ID del cliente
    const option = document.createElement('option');
    option.textContent = client.client;
    //option.value = clientId;

    // Agrega la opción al select
    selectElement.appendChild(option);
  });
});

// Función para manejar el evento de cambio en el select
selectElement.addEventListener('change', (event) => {
  // Obtiene el nombre y el ID del cliente seleccionado
  const selectedClientName = event.target.selectedOptions[0].textContent;v
  //const selectedClientId = event.target.value;

  // Actualiza el texto en el elemento con ID 'clientsTxt'
  document.getElementById('client_et').textContent = selectedClientName;
});



function validateData() {
  const fields = ["product", "price", "client", "date", "abono", "saldo"];
  
  for (const field of fields) {
    const value = document.getElementById(field + "_et").value;
    if (value === "") {
      alert(`No has añadido ${field === "abono" ? "el abono del cliente a los productos pedidos" : `el ${field}`}`);
      return;
    }
  }

  addOrdersClient(...fields.map(field => document.getElementById(field + "_et").value));
}


function addOrdersClient(order, price, client,  date, debt, debit){

  const buscadorClient = client + "\n\n" + order + "\n" + date;
  const timestamp = Date.now();

  const productData = {
      id: timestamp,
      nombreProducto: order,
      precioProducto: price,
      clienteProducto: client,
      fechaVenta: date,
      clientId: client, 
      abonoProducto: debt,
      saldoProducto: debit,
      buscador: buscadorClient,
      timestamp: timestamp,
      uid: firebase.auth().currentUser.uid

  };

  // Obtén una referencia a la colección de ClientesProductos
  const ref = firebase.database().ref("ClientsProduct");
  ref.child(timestamp)
      .set(productData)
      .then(() => {
          alert('Producto agregado exitosamente');
          document.getElementById('product_et').value = '';
          document.getElementById('price_et').value = '';
          document.getElementById('client_et').value = '';
          document.getElementById('date_et').value = '';
          document.getElementById('abono_et').value = '';
          document.getElementById('saldo_et').value = '';
      })
      .catch((error) => {
          console.error('Error al agregar el producto:', error);
          alert('Ocurrió un error al agregar el producto en la base de datos');
      });
}