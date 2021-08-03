main()

async function main() {                       // Afficher les produits dans le catalogue de la page d'Accueil
  const products = await getProducts()
  for (product of products) {
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
    alert("Serveur indisponible")
  })
}


function displayProduct(product){       // Template cloné pour les produits du catalogue
  const templateElt = document.getElementById("templateProduct")
  const cloneElt = document.importNode(templateElt.content, true)

  cloneElt.querySelector("img").src = product.imageUrl
  cloneElt.querySelector("a").href = `./product.html?id=${product._id}`
  cloneElt.querySelector("h5").textContent = product.name
  cloneElt.querySelector("p").textContent =  `${product.price/100} €`

  document.getElementById("main").appendChild(cloneElt)

  console.log(product.name)
}
