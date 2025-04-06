let cart = []; // Store selected items

function addToOrder() {
    const productSelect = document.getElementById("productSelect");
    const selectedValue = productSelect.value;
    const selectedText = productSelect.options[productSelect.selectedIndex].text;

    if (!selectedValue) {
        alert("Please select a product before adding to the cart.");
        return;
    }

    console.log("Selected Text:", selectedText); // Debugging line
    console.log("Selected Value:", selectedValue); // Debugging line

    // Use regex to extract product name and price
    const productParts = selectedText.match(/(.*?)\s*-\s*\$?([\d.]+)/);

    if (productParts) {
        const productName = productParts[1].trim();
        const productPrice = parseFloat(productParts[2]); // Ensure it's a valid float

        console.log("Extracted Product Name:", productName); // Debugging line
        console.log("Extracted Product Price:", productPrice); // Debugging line

        if (isNaN(productPrice)) {
            alert("Error: Invalid product price format.");
            return;
        }

        // Add item to cart array
        cart.push({ name: productName, price: productPrice, link: selectedValue });

        // Update order list display
        updateOrderList();
    } else {
        alert("Error: Could not extract product price. Please check the format.");
    }
}

function updateOrderList() {
    const orderList = document.getElementById("orderList");
    const totalAmount = document.getElementById("totalAmount");
    orderList.innerHTML = ""; // Clear list before updating

    let total = 0.0; // Ensure total is handled as a float

    cart.forEach((item, index) => {
        total += item.price;
        orderList.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <a href="${item.link}" target="_blank" class="text-decoration-none">${item.name} - $${item.price.toFixed(2)}</a>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
            </li>
        `;
    });

    console.log("Total Price Before Display:", total); // Debugging line

    totalAmount.innerHTML = `Total: $${total.toFixed(2)}`; // Display as float with 2 decimal places
}

function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from cart array
    updateOrderList(); // Refresh display
}

function cancelOrder() {
    if (cart.length === 0) {
        alert("Your cart is already empty.");
        return;
    }
    
    if (confirm("Are you sure you want to cancel the order?")) {
        cart = []; // Clear cart
        updateOrderList(); // Refresh display
        alert("Order has been canceled.");
    }
}

function submitOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before submitting the order.");
        return;
    }

    alert("Thank you for your purchase! Your order has been placed.");
    cart = []; // Clear cart after submission
    updateOrderList();
}
