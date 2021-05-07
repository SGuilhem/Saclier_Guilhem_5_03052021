main()

async function main() {
  const products = await getProducts()
  for (product of products) {
    displayProduct(product)
  }
}

  function getProducts() {
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

  function displayProduct(product){
    const templateElt = document.getElementById("templateProduct")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("cameraImg").innerHTML = `<img class="card-img-top"src=${product.imageUrl} alt="Camera">`
    cloneElt.getElementById("cameraName").innerHTML = product.name
    cloneElt.getElementById("cameraPrice").innerHTML =  `${product.price} €`

    document.getElementById("main").appendChild(cloneElt)
    }
