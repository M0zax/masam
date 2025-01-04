function addToCart(productName, category, price, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.productName === productName);
    
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        cart.push({
            productName,
            category,
            price,
            quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your cart!`);
}

function displayCart() {
    const cartBody = document.getElementById('cart-body');
    const totalPriceElement = document.getElementById('total-price');
    cartBody.innerHTML = ''; 
    let totalPrice = 0;

    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    storedCart.forEach(item => {
        const total = item.price * item.quantity;
        totalPrice += total;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.productName}</td>
            <td>${item.category}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${total.toFixed(2)}</td>
        `;
        cartBody.appendChild(row);
    });

    totalPriceElement.innerText = `Total Price: $${totalPrice.toFixed(2)}`;
}

function clearCart() {
    localStorage.removeItem('cart'); 
    displayCart();
    alert("Your cart has been cleared!");
}
document.addEventListener('DOMContentLoaded', displayCart);
document.getElementById('clear-cart-button').addEventListener('click', clearCart);