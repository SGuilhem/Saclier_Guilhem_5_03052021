getProductArray()

async function getProductArray() {       // Afficher les information des produits dans le catalogue de la page d'Accueil
  const products = await getProducts()
  const product = await getProducts()
  console.log(product.name)
  console.log(product.description)
  console.log(product.price)
  for (var i = 0; i < product.lenses.length; i++) {
    console.log(product.lenses[i])
  }
  displayProductSheet(product)
}

function getProducts() {                  // Récupérer les caractéristiques des produits depuis l'API
  var parsedUrl = new URL(window.location.href);
  const idProduct = parsedUrl.searchParams.get("id");
  return fetch(`http://localhost:3000/api/cameras/${idProduct}`)
    .then(function(httpBodyResponse) {
      return httpBodyResponse.json();
    })
    .then(function(products) {
      return products;
    })
    .catch(function(error) {
      alert(error)
    })
  }

  function displayProductSheet(product){
    const templateElt = document.getElementById("templateSheet")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("cameraImg").innerHTML = `<img class="card-img-top"src=${product.imageUrl} alt="Camera">`
    cloneElt.getElementById("addToCart").innerHTML = `<a class="btn btn-primary btn-to-cart" onclick="emptyCart()" role="button" href="./cart.html">Ajouter au panier</a>
    `
    cloneElt.getElementById("cameraName").innerHTML = product.name
    cloneElt.getElementById("cameraDescription").innerHTML = product.description

    for (var i = 0; i < product.lenses.length; i++) {
      cloneElt.getElementById("cameraLenses").innerHTML += `<a tabindex="-1" href="#" id="cameraLenses">${product.lenses[i]}</br></a>`
    }


    cloneElt.getElementById("cameraLenses").onclick = function(event) {
      document.getElementById("caret").innerHTML = product.lenses
    }

    document.getElementById("productSheet").appendChild(cloneElt)
  }

  function totalPrice() {
    var numberOfObj = document.getElementById("numberOfProduct").value;
    document.getElementById("sumTotalPrice").innerHTML = 599 * numberOfObj + ` €`;
  }

  function emptyCart() {
    var numberOfObj = document.getElementById("numberOfProduct").value;
      if (numberOfObj <= "0") {
        alert("Aucun article à ajouter au panier.");
        event.preventDefault();
}
}
