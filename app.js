const products = [
  {
    id: 1,
    name: "Forge Compression Tee",
    category: "tops",
    price: 58,
    description: "Sweat-wicking, sculpted fit for high-output sessions.",
  },
  {
    id: 2,
    name: "Night Shift Hoodie",
    category: "tops",
    price: 92,
    description: "Heavyweight fleece with stealth reflective trims.",
  },
  {
    id: 3,
    name: "Momentum Joggers",
    category: "bottoms",
    price: 76,
    description: "Tapered silhouette built for mobility and recovery.",
  },
  {
    id: 4,
    name: "Steel Horizon Shorts",
    category: "bottoms",
    price: 54,
    description: "4-way stretch, layered storage, no distractions.",
  },
  {
    id: 5,
    name: "Focus Grip Set",
    category: "accessories",
    price: 28,
    description: "Training grips to lock in your lifts.",
  },
  {
    id: 6,
    name: "Discipline Bottle",
    category: "accessories",
    price: 24,
    description: "Insulated stainless steel, 24-hour cold hold.",
  },
];

const quotes = [
  {
    text: "Small steps done daily become unstoppable momentum.",
    author: "Disciplined Collective",
  },
  {
    text: "Discipline is choosing the long game over the easy win.",
    author: "Jocko Willink",
  },
  {
    text: "We are what we repeatedly do. Excellence, then, is a habit.",
    author: "Aristotle",
  },
  {
    text: "Suffer the pain of discipline or the pain of regret.",
    author: "Jim Rohn",
  },
  {
    text: "Confidence is built in the reps no one sees.",
    author: "Disciplined Coaches",
  },
  {
    text: "The body achieves what the mind is trained to finish.",
    author: "Focus Lab",
  },
];

const coaches = [
  {
    id: 1,
    name: "Amara Cross",
    title: "Personal Trainer",
    location: "Los Angeles, CA",
    contact: "amara@disciplined.co",
    specialties: "Strength, hypertrophy, performance programming",
    bio: "Amara is a former collegiate athlete who builds relentless training systems. Her clients focus on strength, injury resilience, and peak performance habits.",
  },
  {
    id: 2,
    name: "Malik Reeves",
    title: "Life Coach",
    location: "Austin, TX",
    contact: "malik@disciplined.co",
    specialties: "Habit design, mindset reset, productivity",
    bio: "Malik helps founders and athletes set daily discipline rituals. He blends mindset coaching with tactical action plans that make consistency automatic.",
  },
  {
    id: 3,
    name: "Serena Vale",
    title: "Performance Nutrition Coach",
    location: "Miami, FL",
    contact: "serena@disciplined.co",
    specialties: "Macro planning, recovery fuel, supplement guidance",
    bio: "Serena builds nutrition systems for high achievers. Expect clean, sustainable protocols that keep energy steady and recovery optimized.",
  },
  {
    id: 4,
    name: "Eli Park",
    title: "Mobility + Recovery Coach",
    location: "Seattle, WA",
    contact: "eli@disciplined.co",
    specialties: "Mobility, flexibility, breathwork",
    bio: "Eli guides disciplined athletes through mobility and recovery routines. His programs improve longevity, posture, and daily movement quality.",
  },
];

const productGrid = document.getElementById("productGrid");
const cartPanel = document.getElementById("cartPanel");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartSubtotal = document.getElementById("cartSubtotal");
const checkoutModal = document.getElementById("checkoutModal");
const confirmation = document.getElementById("confirmation");
const quoteContent = document.getElementById("quoteContent");
const coachGrid = document.getElementById("coachGrid");
const coachModal = document.getElementById("coachModal");
const coachModalBody = document.getElementById("coachModalBody");

let cart = [];
let activeFilter = "all";
let quoteIndex = 0;

const renderProducts = () => {
  productGrid.innerHTML = "";
  const filtered = products.filter((product) =>
    activeFilter === "all" ? true : product.category === activeFilter
  );

  filtered.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-tile";
    card.innerHTML = `
      <div class="product-image">${product.name}</div>
      <div>
        <h3>${product.name}</h3>
        <p class="lead">${product.description}</p>
      </div>
      <div class="product-meta">
        <span>${product.category.toUpperCase()}</span>
        <strong>$${product.price}</strong>
      </div>
      <button class="accent" data-id="${product.id}">Add to cart</button>
    `;
    productGrid.appendChild(card);
  });
};

const updateCart = () => {
  cartItems.innerHTML = "";
  let subtotal = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p class=\"fineprint\">Your cart is empty. Add gear to get started.</p>";
  }

  cart.forEach((item) => {
    subtotal += item.price * item.qty;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <span>Qty ${item.qty}</span>
      </div>
      <div>
        <strong>$${item.price * item.qty}</strong>
        <button class="ghost" data-remove="${item.id}">Remove</button>
      </div>
    `;
    cartItems.appendChild(row);
  });

  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  cartSubtotal.textContent = `$${subtotal}`;
};

const addToCart = (id) => {
  const product = products.find((item) => item.id === id);
  if (!product) return;
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
};

const removeFromCart = (id) => {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
};

const generateConfirmation = () => {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `DISC-${timestamp}-${random}`;
};

const updateQuote = () => {
  const { text, author } = quotes[quoteIndex];
  quoteContent.innerHTML = `
    <p class="quote-text">"${text}"</p>
    <span class="quote-author">- ${author}</span>
  `;
};

const renderCoaches = () => {
  coachGrid.innerHTML = "";
  coaches.forEach((coach) => {
    const card = document.createElement("div");
    card.className = "coach-card";
    card.dataset.coachId = coach.id;
    card.innerHTML = `
      <div class="coach-avatar">${coach.title} Photo</div>
      <div>
        <h3>${coach.name}</h3>
        <p class="lead">${coach.title}</p>
      </div>
      <div class="coach-meta">
        <span>${coach.location}</span>
        <span>View profile</span>
      </div>
    `;
    coachGrid.appendChild(card);
  });
};

const openCoachModal = (coachId) => {
  const coach = coaches.find((item) => item.id === coachId);
  if (!coach) return;
  coachModalBody.innerHTML = `
    <div class="coach-avatar">${coach.title} Photo</div>
    <div>
      <h4>${coach.name}</h4>
      <p class="lead">${coach.title}</p>
    </div>
    <div class="coach-detail">
      <strong>Location</strong>
      <span>${coach.location}</span>
    </div>
    <div class="coach-detail">
      <strong>Contact</strong>
      <span>${coach.contact}</span>
    </div>
    <div class="coach-detail">
      <strong>Specialties</strong>
      <span>${coach.specialties}</span>
    </div>
    <div class="coach-detail">
      <strong>About ${coach.name.split(" ")[0]}</strong>
      <span>${coach.bio}</span>
    </div>
    <button class="accent">Book a session</button>
  `;
  coachModal.classList.add("open");
};

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const id = Number(button.dataset.id);
  if (id) addToCart(id);
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const id = Number(button.dataset.remove);
  if (id) removeFromCart(id);
});

coachGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".coach-card");
  if (!card) return;
  openCoachModal(Number(card.dataset.coachId));
});

const toggleCart = (state) => {
  cartPanel.classList.toggle("open", state);
};

document.getElementById("openCart").addEventListener("click", () => toggleCart(true));
document.getElementById("closeCart").addEventListener("click", () => toggleCart(false));
document.getElementById("heroShop").addEventListener("click", () => {
  document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
  checkoutModal.classList.add("open");
});

document.getElementById("closeCheckout").addEventListener("click", () => {
  checkoutModal.classList.remove("open");
  confirmation.classList.remove("show");
});

const closeCoach = document.getElementById("closeCoach");
if (closeCoach) {
  closeCoach.addEventListener("click", () => {
    coachModal.classList.remove("open");
  });
}

document.getElementById("confirmOrder").addEventListener("click", () => {
  if (cart.length === 0) {
    confirmation.textContent = "Add items before confirming your order.";
    confirmation.classList.add("show");
    return;
  }
  const code = generateConfirmation();
  confirmation.innerHTML = `
    <strong>Order confirmed.</strong><br />
    Confirmation #: ${code}<br />
    Invoice: Sent to your email address on file.
  `;
  confirmation.classList.add("show");
  cart = [];
  updateCart();
});

document.getElementById("nextQuote").addEventListener("click", () => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  updateQuote();
});

const filterButtons = document.querySelectorAll(".filter");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    renderProducts();
  });
});

renderProducts();
updateCart();
updateQuote();
renderCoaches();
