const firstName = localStorage.customerFirstName
const orderId = localStorage.orderId
const email = localStorage.customerEmail

document.getElementById("customerName").innerHTML = firstName
document.getElementById("commandNumber").innerHTML = `N° ${orderId}`
document.getElementById("customerMail").innerHTML = email
