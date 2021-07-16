window.addEventListener('DOMContentLoaded', ()=> {

  const localStorageCart = localStorage.getItem("cart");
  const panier = localStorageCart ? JSON.parse(localStorageCart) : {}
  const productId = (Object.keys(panier))
  const btnEmpty = document.querySelector('#btn-empty')
  const btnSubmit = document.querySelector('#submitButton')
  const euroSign = ` €`;

  if (productId.length === 0) {
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
    cloneElt.querySelector(".productPrice span").innerHTML = `${product.price/100}${euroSign}`

    let quantity = panier[product._id]
    cloneElt.querySelector(".quantity").value = quantity;

    cloneElt.querySelector(".total").textContent = `${product.price/100 * quantity}${euroSign}`

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
        element.querySelector(".total").textContent =  `${product.price/100 * quantity}${euroSign}`;

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
      totalCart += Number(price.substr(0, price.length-euroSign.length));
    }
    document.querySelector(".totalPrice").innerHTML = `${totalCart}${euroSign}`

  }


  function deleteProduct(id) {
    delete panier[id]
    localStorage.setItem("cart", JSON.stringify(panier))
    window.location.reload()
  }

  btnEmpty.addEventListener("click", (event) => {
    localStorage.removeItem('cart')
  })

  let form = document.querySelector('.needs-validation');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add('was-validated');
    } else {
      let contact = {firstName: document.querySelector("#inputFirstName").value, lastName: document.querySelector("#inputName").value, address: document.querySelector("#inputAdress").value, city:	document.querySelector("#inputCity").value, email:	document.querySelector("#inputEmail").value}
      let products = [Object.keys(panier)]
      let order = {contact, products}

      fetch('http://localhost:3000/api/cameras/order', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        localStorage.setItem('customerFirstName', Object.values(data.contact)[0])
        localStorage.setItem('customerEmail', Object.values(data.contact)[4])

        localStorage.removeItem('cart')
        document.location.href=`./confirmation.html?orderid=${Object.values(data)[2]}`
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  })



  /**  function storeCommandInfo() {
  btnSubmit.addEventListener("click", (event) => {
    debugger
    let customerName = document.getElementById("inputFirstName").value;
    let customerEmail = document.getElementById("inputEmail").value;
    alert(customerName)

    if (panier.hasOwnProperty(idProduct)) {
    panier[idProduct] += Number(quantity)
  } else {
  panier[idProduct] = Number(quantity)
}

localStorage.setItem('cart', JSON.stringify(panier))
})
}
})
} **/

})
