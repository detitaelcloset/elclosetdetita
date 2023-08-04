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


    // Obtén una referencia a la colección de productos
    const productsRef = firebase.database().ref('ClientsProduct');

    // Leer todos los productos desde la base de datos
    productsRef.on('value', (snapshot) => {
      const productListContainer = document.getElementById('productList');
      productListContainer.innerHTML = '';

      snapshot.forEach((childSnapshot) => {
        const product = childSnapshot.val();

        // Crea una nueva tarjeta para el producto
        const card = document.createElement('div');
        card.classList.add('card');

        // Construye el contenido de la tarjeta con los datos del producto
        card.innerHTML = `
          <h3>${product.nombreProducto}</h3>
          <p>Precio: $${product.precioProducto}</p>
          <p>Cliente: ${product.clienteProducto}</p>
          <p>Fecha de Venta: ${product.fechaVenta}</p>
          <p>Abono: $${product.abonoProducto}</p>
          <p>Saldo: $${product.saldoProducto}</p>
          <button class="btn btn-danger" onclick="deleteClient('${product.id}')">Delete</button>
          <button class="btn btn-primary" onclick="updateBalance('${product.id}', ${product.precioProducto})">Update Balance</button>

        `;

        // Agrega la tarjeta al contenedor de productos
        productListContainer.appendChild(card);
      });
    });

function searchClients() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  console.log('Search input:', searchInput); // Verifica que el valor del campo de búsqueda sea correcto

  const productList = document.getElementById('productList');

  // Limpia las tarjetas anteriores antes de hacer una nueva búsqueda
  productList.innerHTML = '';

  // Obtén una referencia a la colección de clientes en la base de datos
  const clientsRef = firebase.database().ref('ClientsProduct');

  // Realiza la consulta en la base de datos para buscar el término ingresado
  clientsRef.orderByChild('clienteProducto').startAt(searchInput).endAt(searchInput + '\uf8ff').once('value')
    .then((snapshot) => {
      console.log('Snapshot:', snapshot.val()); // Verifica el resultado del snapshot obtenido

      snapshot.forEach((childSnapshot) => {
        // Agrega las tarjetas de los resultados de la búsqueda
        const client = childSnapshot.val();
        console.log('Client:', client); // Verifica el cliente obtenido

        const card = document.createElement('div');
        card.classList.add('card');

        // Construye el contenido de la tarjeta con los datos del producto
        card.innerHTML = `
            <h3>${client.nombreProducto}</h3>
            <p>Precio: Q${client.precioProducto}</p>
            <p>Cliente: ${client.clienteProducto}</p>
            <p>Fecha de Venta: ${client.fechaVenta}</p>
            <p>Abono: Q${client.abonoProducto}</p>
            <p>Saldo: Q${client.saldoProducto}</p>
            <button class="btn btn-danger" onclick="deleteClient('${client.id}')">Delete</button>
            <button class="btn btn-primary" onclick="updateBalance('${client.id}', ${client.precioProducto})">Update Balance</button>

        `;

        // Agrega un enlace o un evento para mostrar más detalles del cliente si es necesario
        // Por ejemplo:
        // cardDiv.addEventListener('click', () => { showClientDetails(clientId); });

        productList.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error al realizar la búsqueda:", error);
    });
}

function deleteClient(id) {
  const shouldDelete = confirm('Are you sure you want to delete this product?');
  if (shouldDelete) {
    productsRef.child(id).remove()
      .then(() => {
        console.log('Product deleted successfully.');
        // Refresh the product list after deleting
        productsRef.once('value')
          .then((snapshot) => {
            const productListContainer = document.getElementById('productList');
            productListContainer.innerHTML = '';

            snapshot.forEach((childSnapshot) => {
              const product = childSnapshot.val();

              const card = document.createElement('div');
              card.classList.add('card');

              // Construye el contenido de la tarjeta con los datos del producto
              card.innerHTML = `
                <h3>${product.nombreProducto}</h3>
                <p>Precio: $${product.precioProducto}</p>
                <p>Cliente: ${product.clienteProducto}</p>
                <p>Fecha de Venta: ${product.fechaVenta}</p>
                <p>Abono: $${product.abonoProducto}</p>
                <p>Saldo: $${product.saldoProducto}</p>
                <button class="btn btn-danger" onclick="deleteClient('${product.id}')">Delete</button>
              `;

              // Agrega la tarjeta al contenedor de productos
              productListContainer.appendChild(card);
            });
          })
          .catch((error) => {
            console.error('Error fetching products:', error);
          });
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  }
}

// Function to handle updating the balance of a product
function updateBalance(productId, productPrice) {
  const newBalanceInput = prompt('Enter the new balance:');
  const newBalance = parseFloat(newBalanceInput);

  if (isNaN(newBalance)) {
    alert('Ingresa una cantidad válida.');
    return;
  }

  const productRefToUpdate = firebase.database().ref('ClientsProduct').child(productId);
  productRefToUpdate.once('value')
    .then((snapshot) => {
      const productData = snapshot.val();

      if (!productData) {
        alert('No se encontró el producto a actualizar.');
        return;
      }

      const currentAbono = parseFloat(productData.abonoProducto);
      const currentSaldo = parseFloat(productData.saldoProducto);

      if (isNaN(currentAbono) || isNaN(currentSaldo) || isNaN(productPrice)) {
        alert('El abono, el saldo o el precio del producto no es un número válido.');
        return;
      }

      const newAbono = currentAbono + newBalance;
      const updatedSaldo = productPrice - newAbono;

      productRefToUpdate.update({ abonoProducto: newAbono, saldoProducto: updatedSaldo })
        .then(() => {
          alert('Saldo actualizado exitosamente.');
          // Refresh the client list after updating the balance
          displayClients();
        })
        .catch((error) => {
          console.error('Error al actualizar el saldo:', error);
        });
    })
    .catch((error) => {
      console.error('Error al obtener el producto:', error);
    });
}




