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
    cloneElt.getElementById("addToCart").innerHTML = `<a class="btn btn-primary btn-to-cart" role="button" href="../cart/html">Ajouter au panier.</a>
    `
    cloneElt.getElementById("cameraName").innerHTML = product.name
    cloneElt.getElementById("cameraDescription").innerHTML = product.description
    /* for (var i = 0; i < product.lenses.length; i++) {
      cloneElt.getElementById("cameraLenses").innerHTML = `<a tabindex="-1" href="#">${product.lenses[i]}</a>`
    } */
    document.getElementById("productSheet").appendChild(cloneElt)

    console.log(product.name)
  }
