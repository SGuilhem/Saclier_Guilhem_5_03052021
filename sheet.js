window.addEventListener('DOMContentLoaded', ()=> {

  var parsedUrl = new URL(window.location.href);
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

    function displayProductSheet(product){
      document.getElementById("cameraImg").innerHTML = `<img class="card-img-top"src="${product.imageUrl}" alt="Camera">`
      document.getElementById("cameraName").innerHTML = product.name
      document.getElementById("cameraDescription").innerHTML = product.description

      for (var i = 0; i < product.lenses.length; i++) {
        document.querySelector(".lenseChoice").innerHTML += `<option value="${i}">${product.lenses[i]}</option>`
      }
    }


    let btnQuantity = document.querySelectorAll(".group-quantity .btn");
    for (let i in btnQuantity) {
    btnQuantity[i].addEventListener("click", event =>{
      let quantity = Number(document.querySelector("input#quantity").value)
      if (event.target.classList.contains("btn-less")) {
        quantity = quantity == 1? 1 : quantity - 1;
      } else {
        quantity = quantity + 1
      }
      document.querySelector("#quantity").value = quantity
      document.querySelector(".btn-to-cart span").innerHTML = 599 * quantity + ` €`;
    })
  }

    document.querySelector(".btn-to-cart").addEventListener("click", event => {
      var numberOfObj = document.getElementById("quantity").value;
      if (numberOfObj <= "0") {
        alert("Aucun article à ajouter au panier.");
        event.preventDefault();
      } else {
        localStorage.setItem("cart", );
      }
    })
  })
