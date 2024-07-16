// cart.js

document.getElementById('checkout-button').addEventListener('click', function() {
    // Simulan ang proseso ng checkout dito (halimbawa, ipadala ang data sa server)
    
    // Ipakita ang alert na mensaheng "Matagumpay na na-order"
    alert('Successfully Ordered');
});



document.addEventListener('DOMContentLoaded', () => {
    const cartCountDisplay = document.getElementById('cart-count-display');

    function updateCartCountDisplay() {
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        let totalCount = 0;

        cart.forEach(item => {
            totalCount += item.quantity;
        });

        cartCountDisplay.textContent = totalCount.toString();
    }

    function loadCartItems() {
        // Your existing code to load cart items goes here
        // Ensure to call updateCartCountDisplay() at appropriate places
    }

    // Add event listeners and other functions as per your existing code

    // Initial load
    updateCartCountDisplay();
    loadCartItems();
});




document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');

    function loadCartItems() {
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            const itemSubtotal = item.price * item.quantity;
            subtotal += itemSubtotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="#" class="remove-item" data-id="${item.id}"><i class="far fa-times-circle"></i></a></td>
                <td><img src="${item.image}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>₱${item.price}</td>
                <td><input type="number" value="${item.quantity}" data-id="${item.id}" class="item-quantity"></td>
                <td>₱${itemSubtotal}</td>
            `;
            cartItemsContainer.appendChild(row);
        });

        cartSubtotal.textContent = `₱${subtotal}`;
        cartTotal.textContent = `₱${subtotal}`;

        addRemoveItemListeners();
        addQuantityChangeListeners();
    }

    function addRemoveItemListeners() {
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const itemId = event.currentTarget.getAttribute('data-id');
                removeItemFromCart(itemId);
            });
        });
    }

    function addQuantityChangeListeners() {
        const quantityInputs = document.querySelectorAll('.item-quantity');
        quantityInputs.forEach(input => {
            input.addEventListener('change', (event) => {
                const itemId = event.currentTarget.getAttribute('data-id');
                const newQuantity = parseInt(event.currentTarget.value);
                updateCartItemQuantity(itemId, newQuantity);
            });
        });
    }

    function removeItemFromCart(itemId) {
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        cart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
    }

    function updateCartItemQuantity(itemId, newQuantity) {
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        const item = cart.find(item => item.id === itemId);
        if (item) {
            item.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCartItems();
        }
    }

    loadCartItems();
    
});
