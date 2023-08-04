// Configura tus datos de Firebase aquí
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
firebase.initializeApp(firebaseConfig);

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


// Reference to the "Clients" collection in Firebase Realtime Database
const clientsRef = firebase.database().ref('Clients');

// Function to create a card view for each client
function createClientCard(client) {
  const cardContainer = document.getElementById('cardContainer');

  const card = document.createElement('div');
  card.className = 'col-md-4 mb-3';

  card.innerHTML = `
    <div class="card">
      <div class="card-body">
        <p class="card-text">Client: <span id="clientName_${client.id}">${client.client}</span></p> 
        <p class="card-text">Telefono: <span id="clientName_${client.phone}">${client.phone}</span></p>        
        <button class="btn btn-primary" onclick="editClient('${client.id}')">Edit Name</button>
      </div>
    </div>
  `;

  cardContainer.appendChild(card);
}

// Function to fetch clients from Firebase and display them as cards
function displayClients() {
  clientsRef.once('value')
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const client = childSnapshot.val();
        createClientCard(client);
      });
    })
    .catch((error) => {
      console.error('Error fetching clients:', error);
    });
}

// Call the displayClients function when the page loads
window.addEventListener('load', displayClients);



// Function to handle client name editing
function editClient(clientId) {
  const newInfo = prompt('Enter the new name and phone number for the client (separated by a comma):');
  if (newInfo !== null && newInfo.trim() !== '') {
    const [newName, newPhone] = newInfo.split(',').map(item => item.trim());

    if (newName === '') {
      alert('Name cannot be empty.');
      return;
    }

    const clientNameElement = document.getElementById(`clientName_${clientId}`);
    clientNameElement.textContent = newName;

    // Update the name and phone number in the database
    clientsRef.child(clientId).update({ client: newName, phone: newPhone })
      .then(() => {
        console.log('Client name and phone number updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating client name and phone number:', error);
      });
  }
}


function searchClients() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const cardContainer = document.getElementById('cardContainer');

  // Clear the previous cards before doing a new search
  cardContainer.innerHTML = '';

  clientsRef.orderByChild('client').startAt(searchInput).endAt(searchInput + '\uf8ff').once('value')
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const client = childSnapshot.val();
        createClientCard(client);
      });
    })
    .catch((error) => {
      console.error('Error searching for clients:', error);
    });
}