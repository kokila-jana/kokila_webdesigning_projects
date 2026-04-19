let cart = [];
let total = 0;

// Add to cart
function addToCart(name, price) {
    cart.push({name, price});
    total += price;
    updateCart();
}

// Update cart
function updateCart() {
    let cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";

    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];

        let li = document.createElement("li");
        li.innerHTML = item.name + " - ₹" + item.price +
        " <button onclick='removeItem(" + i + ")'>❌</button>";

        cartItems.appendChild(li);
    }

    document.getElementById("total").innerText = "Total: ₹" + total;
}

// Remove item
function removeItem(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

// Checkout
function checkout() {
    alert("Order placed successfully 🎉");
    cart = [];
    total = 0;
    updateCart();
}

// Search
function searchProduct() {
    let input = document.getElementById("search").value.toLowerCase();
    let products = document.getElementsByClassName("product");

    for (let i = 0; i < products.length; i++) {
        let title = products[i].getElementsByTagName("h3")[0].innerText.toLowerCase();

        if (title.includes(input)) {
            products[i].style.display = "block";
        } else {
            products[i].style.display = "none";
        }
    }
}

// Scroll to products
function scrollToProducts() {
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}