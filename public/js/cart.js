let cart = [];
let total = 0;

// Fungsi untuk menambah item ke keranjang
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const itemName = this.parentNode.querySelector('.card-title').textContent;
        const itemPrice = 50000; // harga tetap, bisa diubah dinamis
        const existingItem = cart.find(item => item.name === itemName);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name: itemName, price: itemPrice, quantity: 1 });
        }
        total += itemPrice;
        updateCart();
        alert(itemName + " telah ditambahkan ke keranjang!");
    });
});

// Fungsi untuk menghapus item dari keranjang
function removeItem(index) {
    const item = cart[index];
    total -= item.price * item.quantity;
    cart.splice(index, 1); // Hapus item berdasarkan index
    updateCart();
}

// Fungsi untuk update keranjang
function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    cartItemsList.innerHTML = ''; // Kosongkan keranjang

    // Tampilkan item di dalam keranjang
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `
            ${item.name} - Rp ${item.price} x ${item.quantity}
            <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Hapus</button>
        `;
        cartItemsList.appendChild(li);
    });
    
    // Update total harga dan jumlah item di keranjang
    cartTotal.textContent = total;
    cartCount.textContent = cart.length;
}

// Fungsi untuk menangani proses checkout
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    
    if (name && address && phone) {
        alert("Terima kasih, " + name + "! Pesanan Anda akan segera dikirim ke " + address);
    } else {
        alert("Mohon lengkapi semua data sebelum melakukan checkout.");
    }
});
