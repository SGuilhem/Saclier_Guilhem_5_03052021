window.addEventListener('DOMContentLoaded', ()=> {

  const panier = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {}
  const btns = document.querySelector('#btn-to-cart')

  const parsedUrl = new URL(window.location.href);
  const idProduct = parsedUrl.searchParams.get("id");
  fetch(`http://localhost:3000/api/cameras/${idProduct}`)
    .then(function(httpBodyResponse) {
      return httpBodyResponse.json();
    })
    .then(function(product) {
      displayProductSheet(product)
    })
    .catch(function(error) {
      alert(error)
    })


btns.addEventListener("click", (event) => {
  let $product = event.target.parentElement.parentElement
  let quantity = $product.querySelector('input[name="quantity"]').value
  let lensePicked = document.getElementById("lenseChoice").value;

  if (lensePicked === "") {
    event.preventDefault();
    alert("Veuillez choisir un objectif.");
    return false;
  }

  if (panier.hasOwnProperty(idProduct)) {
    panier[idProduct] += Number(quantity)
  } else {
    panier[idProduct] = Number(quantity)
  }

  localStorage.setItem('cart', JSON.stringify(panier))
})

function displayProductSheet(product){
  document.getElementById("cameraImg").innerHTML = `<img class="card-img-top"src="${product.imageUrl}" alt="Camera">`
  document.getElementById("cameraName").innerHTML = product.name
  document.getElementById("cameraDescription").innerHTML = product.description
  document.querySelector("#btn-to-cart span").innerHTML = `${product.price/100} €`


  for (var i = 0; i < product.lenses.length; i++) {
    document.querySelector(".lenseChoice").innerHTML += `<option value="${i}">${product.lenses[i]}</option>`
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
    document.querySelector("#btn-to-cart span").innerHTML =  product.price/100 * quantity + ` €`;
  })
}
}
})
