
// Basic interactivity: mobile menu, populate products, modal product detail, cart counter.

const products = [
    { id: 1, title: "Signature Tee", price: 799, img: "images/tee.png", desc: "100% cotton tee with tailored fit." },
    { id: 2, title: "Urban Jacket", price: 3499, img: "images/Urban jacket.png", desc: "Water-resistant shell with quilted lining." },
    { id: 3, title: "Classic Shirt", price: 1299, img: "images/Classic Shirt.png", desc: "Soft oxford cloth. Perfect for semi-formal wear." },
    { id: 4, title: "Denim Relaxed", price: 1999, img: "images/Denim Relaxed.png", desc: "Comfort stretch denim with vintage wash." },
    { id: 5, title: "Hooded Sweat", price: 1499, img: "images/Hooded Sweat.png", desc: "Brushed interior, roomy hood." },
    { id: 6, title: "Jogger Pants", price: 999, img: "images/Jogger Pants.png", desc: "Lightweight knit, tapered fit." },
    { id: 7, title: "Graphic Tee", price: 899, img: "images/Graphic Tee.png", desc: "Bold front print, relaxed fit." },
    { id: 8, title: "Leather Belt", price: 599, img: "images/Leather Belt.png", desc: "Full-grain leather with matte buckle." }

    
  

];



const productGrid = document.getElementById('product-grid');
const cartCountEl = document.getElementById('cart-count');
const modal = document.getElementById('product-modal');
const modalContent = document.getElementById('modal-content');
let cartCount = 0;

function renderProducts() {
    productGrid.innerHTML = products.map(p => `
    <div class="product-card" data-id="${p.id}">
      <img src="${p.img}" alt="${p.title}">
      <div class="product-info">
        <h4 class="product-title">${p.title}</h4>
        <div class="product-price">₹ ${p.price}</div>
        <div style="margin-top:10px; display:flex; gap:8px">
          <button class="btn add-btn" data-id="${p.id}">Add to cart</button>
          <button class="btn ghost view-btn" data-id="${p.id}">Quick view</button>
        </div>
      </div>
    </div>
  `).join('');
}

function bindEvents() {
    // mobile menu
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    menuToggle.addEventListener('click', () => nav.classList.toggle('open'));

    // product actions (delegate)
    productGrid.addEventListener('click', (e) => {
        const addBtn = e.target.closest('.add-btn');
        const viewBtn = e.target.closest('.view-btn');

        if (addBtn) {
            const id = Number(addBtn.dataset.id);
            addToCart(id);
        }

        if (viewBtn) {
            const id = Number(viewBtn.dataset.id);
            openModal(id);
        }
    });

    document.getElementById('modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // populate year
    document.getElementById('year').textContent = new Date().getFullYear();
}

function addToCart(id) {
    cartCount++;
    cartCountEl.textContent = cartCount;
    // small visual feedback
    const el = document.querySelector(`.product-card[data-id="${id}"]`);
    if (el) {
        el.animate([{ transform: "scale(1)" }, { transform: "scale(0.98)" }, { transform: "scale(1)" }], { duration: 220 });
    }
}

function openModal(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    modalContent.innerHTML = `
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:18px; align-items:start">
      <img src="${p.img}" alt="${p.title}" style="width:100%; border-radius:10px;"/>
      <div>
        <h2 style="margin-top:0">${p.title}</h2>
        <p class="text-muted">₹ ${p.price}</p>
        <p style="margin-top:12px">${p.desc}</p>
        <div style="margin-top:18px; display:flex; gap:10px">
          <button class="btn" id="modal-add">Add to cart</button>
          <button class="btn ghost" id="modal-close-2">Close</button>
        </div>
      </div>
    </div>
  `;
    modal.setAttribute('aria-hidden', 'false');

    // bind modal buttons
    document.getElementById('modal-add').addEventListener('click', () => {
        addToCart(id);
        closeModal();
    });

    document.getElementById('modal-close-2').addEventListener('click', closeModal);
}

function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
}

renderProducts();
bindEvents();



// Sign In Modal Controls
const signinBtn = document.getElementById("signin-btn");
const signinModal = document.getElementById("signin-modal");
const signinClose = document.getElementById("signin-close");

signinBtn.addEventListener("click", () => {
    signinModal.classList.add("open");
    signinModal.setAttribute("aria-hidden", "false");
});

signinClose.addEventListener("click", () => {
    signinModal.classList.remove("open");
    signinModal.setAttribute("aria-hidden", "true");
});

// Close modal when background clicked
signinModal.addEventListener("click", (e) => {
    if (e.target === signinModal) {
        signinModal.classList.remove("open");
        signinModal.setAttribute("aria-hidden", "true");
    }
});

// Dummy login handler
document.getElementById("signin-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("signin-email").value;
    const pass = document.getElementById("signin-password").value;

    alert("Logged in as: " + email);  
    signinModal.classList.remove("open");
});






// Sign Up Modal Controls
const signupBtn = document.getElementById("signup-btn");
const signupModal = document.getElementById("signup-modal");
const signupClose = document.getElementById("signup-close");

if (signupBtn) {
    signupBtn.addEventListener("click", () => {
        signupModal.classList.add("open");
        signupModal.setAttribute("aria-hidden", "false");
    });
}

signupClose.addEventListener("click", () => {
    signupModal.classList.remove("open");
    signupModal.setAttribute("aria-hidden", "true");
});

// Background close
signupModal.addEventListener("click", (e) => {
    if (e.target === signupModal) {
        signupModal.classList.remove("open");
    }
});

// Switch from Sign In → Sign Up
document.getElementById("signup-link").addEventListener("click", (e) => {
    e.preventDefault();
    signinModal.classList.remove("open");
    signupModal.classList.add("open");
});

// Switch from Sign Up → Sign In
document.getElementById("go-to-signin").addEventListener("click", (e) => {
    e.preventDefault();
    signupModal.classList.remove("open");
    signinModal.classList.add("open");
});

// Dummy signup handler
document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;

    alert("Account Created for: " + name + " (" + email + ")");
    signupModal.classList.remove("open");
});






