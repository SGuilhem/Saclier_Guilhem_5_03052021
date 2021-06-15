window.addEventListener('DOMContentLoaded', ()=> {

  const panier = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {}


  if (localStorage.getItem("cart") === null) {
    alert('Votre panier est vide.')
  }

  /*function displayCart() {
  if (localStorage.getItem("cart") === "5be9bc241c9d440000a730e7") {
  document.getElementById("cameraImg").innerHTML = `<img class="card-img-top"src="http://localhost:3000/images/vcam_3.jpg" alt="Camera">`
}
}
*/

  fetch("http://localhost:3000/api/cameras")
  .then(function(httpBodyResponse) {
    return httpBodyResponse.json();
  })
  .then(function(products) {
    for (product of products) {
      displayCart(product)
    }
  })
  .catch(function(error) {
    alert("Serveur indisponible")
  })

  let btnQuantity = document.querySelectorAll(".group-quantity .btn");       //Futur boutons quantité
  for (let i = 0; i < btnQuantity.length; i++ ) {
  let button = btnQuantity[i];
  button.addEventListener("click", event => {
  let quantity = Number(document.querySelector("input#quantity").value)
  if (event.target.classList.contains("btn-less")) {
  quantity = quantity == 1? 1 : quantity - 1;
  } else {
  quantity = quantity + 1
  }
  document.querySelector("#quantity").value = quantity
  document.querySelector("#productTotalPrice").innerHTML =  product.price/100 * quantity + ` €`;
  })
  }

  function displayCart(product){
    if (panier.hasOwnProperty(product._id)) {
      document.getElementById("cameraImg").innerHTML = `<img class="card-img-top"src="${product.imageUrl}" alt="Camera">`
      document.getElementById("quantity").value = Object.values(panier)
      document.querySelector("#productTotalPrice").innerHTML = `${product.price/100 * Object.values(panier)} €`



    }
  }
/* const templateElt = document.getElementById("templateCart")
const cloneElt = document.importNode(templateElt.content, true)

cloneElt.getElementById("cameraImg").innerHTML = `<img class="card-img-top"src=${product.imageUrl} alt="Camera">`

document.getElementById("cart").appendChild(cloneElt)

} */



})
