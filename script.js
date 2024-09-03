let cart = [];
let cartTotal = 0;
let paymentMethod = '';

function addToCart(productName, productPrice) {
    let product = cart.find(item => item.name === productName);

    if (product) {
        product.quantity++;
        product.totalPrice = product.quantity * product.unitPrice;
    } else {
        cart.push({
            name: productName,
            unitPrice: productPrice,
            quantity: 1,
            totalPrice: productPrice
        });
    }

    updateCartDisplay();
}

function removeFromCart(productName) {
    let productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    let cartItems = document.getElementById('cart-items');
    let cartTotalElement = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    cartTotal = 0;

    cart.forEach(item => {
        cartTotal += item.totalPrice;
        let li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <span>${item.name} - R$ ${item.totalPrice.toFixed(2)} (${item.quantity}x)</span>
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)" />
            <button onclick="removeFromCart('${item.name}')">Remover</button>
        `;
        cartItems.appendChild(li);
    });

    cartTotalElement.textContent = cartTotal.toFixed(2);
}

function updateQuantity(productName, newQuantity) {
    let product = cart.find(item => item.name === productName);

    if (product) {
        newQuantity = parseInt(newQuantity, 10);
        if (newQuantity > 0) {
            product.quantity = newQuantity;
            product.totalPrice = product.quantity * product.unitPrice;
            updateCartDisplay();
        }
    }
}

function showCheckout() {
    document.getElementById('cart').style.display = 'none';
    document.getElementById('checkout').style.display = 'block';
}

function completePurchase() {
    let paymentMethodElement = document.querySelector('input[name="payment-method"]:checked');
    if (!paymentMethodElement) {
        alert('Por favor, selecione um método de pagamento.');
        return;
    }

    paymentMethod = paymentMethodElement.value;

    let invoiceContent = document.getElementById('invoice-content');
    invoiceContent.innerHTML = '';

    cart.forEach(item => {
        let div = document.createElement('div');
        div.className = 'invoice-item';
        div.innerHTML = `
            <p>${item.name}</p>
            <p>R$ ${item.unitPrice.toFixed(2)}</p>
            <p>${item.quantity}x</p>
            <p>R$ ${item.totalPrice.toFixed(2)}</p>
        `;
        invoiceContent.appendChild(div);
    });

    let totalDiv = document.createElement('div');
    totalDiv.className = 'invoice-item total';
    totalDiv.innerHTML = `<p>Total Final</p><p>R$ ${cartTotal.toFixed(2)}</p>`;
    invoiceContent.appendChild(totalDiv);

    document.getElementById('payment-method').textContent = paymentMethod;
    document.getElementById('checkout').style.display = 'none';
    document.getElementById('invoice').style.display = 'block';
}

function resetCart() {
    cart = [];
    cartTotal = 0;
    document.getElementById('cart').style.display = 'block';
    document.getElementById('checkout').style.display = 'none';
    document.getElementById('invoice').style.display = 'none';
    updateCartDisplay();
}

function goToHome() {
    window.location.href = 'home.html'; 
}    