main()

async function main() {                       // Afficher les produits dans le catalogue de la page d'Accueil
  const products = await getProducts()
  for (product of products) {
    console.log(products)
    displayProduct(product)
  }
}

function getProducts() {                  // Récupérer les caractéristiques des produits depuis l'API
  return fetch("http://localhost:3000/api/cameras")
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


function displayProduct(product){       // Template cloné pour les produits du catalogue
  const templateElt = document.getElementById("templateProduct")
  const cloneElt = document.importNode(templateElt.content, true)

  cloneElt.getElementById("cameraImg").innerHTML = `<img class="card-img-top"src=${product.imageUrl} alt="Camera">`
  cloneElt.getElementById("cameraURL").innerHTML = `<a class="btn btn-primary btn-to-cart" role="button" href="./product.html?id=${product._id}">Voir la fiche produit.</a>
  `
  cloneElt.getElementById("cameraName").innerHTML = product.name
  cloneElt.getElementById("cameraPrice").innerHTML =  `${product.price/100} €`

  document.getElementById("main").appendChild(cloneElt)

  console.log(product.name)
}
