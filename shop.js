// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cartButtons = document.querySelectorAll('.add-to-cart');

    cartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.currentTarget.closest('.pro');
            const productId = product.getAttribute('data-id');
            const productName = product.getAttribute('data-name');
            const productPrice = product.getAttribute('data-price');
            const productImage = product.querySelector('img').src;

            const cartItem = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };

            addToCart(cartItem);
        });
    });

    function addToCart(item) {
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        const existingItem = cart.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(item);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }
});
