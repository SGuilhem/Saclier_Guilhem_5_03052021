window.addEventListener('DOMContentLoaded', ()=> {

  const panier = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {}
  const productId = (Object.keys(panier))
  const btnEmpty = document.querySelector('#btn-empty')


  if (localStorage.getItem("cart") === null) {
    document.querySelector(".emptyCart").innerHTML = `Votre panier est vide`;
    document.querySelector("#cart").style.visibility = "hidden";
    document.querySelector(".card-footer").style.visibility = "hidden";
    document.querySelector(".center_div").style.visibility = "hidden";
  }


  fetch("http://localhost:3000/api/cameras")
  .then(function(httpBodyResponse) {
    return httpBodyResponse.json();
  })
  .then(function(products) {
    for (product of products) {
      if (panier.hasOwnProperty(product._id)) {
        displayCart(product)
      }
    }
    totalCart()
  })
  .catch(function(error) {
    alert("Serveur indisponible")
  })


  function displayCart(product){
    const templateElt = document.querySelector("#templateProduct")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.querySelector(".productName span").innerHTML = `${product.name}`
    cloneElt.querySelector(".productPrice span").innerHTML = `${product.price/100} €`

    let quantity = panier[product._id]
    cloneElt.querySelector(".quantity").value = quantity;

    cloneElt.querySelector(".total").textContent = `${product.price/100 * quantity} €`

    let btnQuantity = cloneElt.querySelectorAll(".group-quantity .btn");
    for (let i = 0; i < btnQuantity.length; i++ ) {
      let button = btnQuantity[i];
      button.addEventListener("click", function(event) {
        let element = button.closest("tr")
        let quantity = Number(element.querySelector(".quantity").value)
        if (button.classList.contains("btn-less")) {
          quantity = quantity == 1? 1 : quantity - 1;
        } else {
          quantity = quantity + 1
        }
        element.querySelector(".quantity").value = quantity;
        element.querySelector(".total").textContent =  `${product.price/100 * quantity} €`;

        panier[product._id] = quantity
        localStorage.setItem('cart', JSON.stringify(panier))

        totalCart()
      })
    }

    cloneElt.querySelector(".delete").addEventListener("click", (event) => {
      deleteProduct(product._id)
    })

    document.getElementById("cart").appendChild(cloneElt)
  }

  function totalCart(){
    let totalProduct = document.querySelectorAll(".total")
    let totalCart = 0;
    for (var i = 0; i < totalProduct.length; i++){
      let price = totalProduct[i].textContent
      totalCart += Number(price.substr(0, price.length-2));
    }
    document.querySelector(".totalPrice").innerHTML = `${totalCart} €`

  }

  function deleteProduct(id) {
    delete panier[id]
    localStorage.setItem("cart", JSON.stringify(panier))
    window.location.reload()
  }

  btnEmpty.addEventListener("click", (event) => {
    localStorage.removeItem('cart')
  })



})
