window.addEventListener('DOMContentLoaded', ()=> {

  const panier = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {}
  const productId = (Object.keys(panier))
  const btns = document.querySelector('#btn-to-empty-cart')


  console.log(panier)
  console.log(Object.values(panier)[0])
  console.log(Object.values(panier)[1])
  console.log(Object.values(panier)[2])



  if (localStorage.getItem("cart") === null) {
    document.querySelector(".emptyCart").innerHTML = `Votre panier est vide`;
    document.querySelector(".totalPrice").style.visibility = "hidden";
    document.querySelector(".card-footer").style.visibility = "hidden";
  }


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


  function displayCart(product){
    const templateElt = document.getElementById("templateProduct")
    const cloneElt = document.importNode(templateElt.content, true)


    if (panier.hasOwnProperty(product._id)) {
      cloneElt.getElementById("cameraImg").innerHTML = `<img class="card-img-top"src="${product.imageUrl}" alt="Camera">`

        for (var i = 0; i < Object.values(panier).length; i++) {

        cloneElt.getElementById("quantity").value = Object.values(panier)[i]
        cloneElt.querySelector("#productTotalPrice").innerHTML = `${product.price/100 /** Object.values(panier)*/} €`
        console.log(product.price/100)
      }

    document.getElementById("cart").appendChild(cloneElt)
  }
}

let btnQuantity = document.querySelectorAll(".group-quantity .btn");
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
    document.querySelector("#productTotalPrice").innerHTML =  `${product.price/100 * quantity} €`;
  })
}

btns.addEventListener("click", (event) => {
  localStorage.removeItem('cart')
})



})
