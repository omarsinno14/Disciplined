const coaches = [
  {
    id: 1,
    name: "Amara Cross",
    title: "Personal Trainer",
    location: "Los Angeles, CA",
    contact: "amara@disciplined.co",
    specialties: "Strength, hypertrophy, performance programming",
    bio: "Amara is a former collegiate athlete who builds relentless training systems. Her clients focus on strength, injury resilience, and peak performance habits.",
    rate: 120,
  },
  {
    id: 2,
    name: "Malik Reeves",
    title: "Life Coach",
    location: "Austin, TX",
    contact: "malik@disciplined.co",
    specialties: "Habit design, mindset reset, productivity",
    bio: "Malik helps founders and athletes set daily discipline rituals. He blends mindset coaching with tactical action plans that make consistency automatic.",
    rate: 140,
  },
  {
    id: 3,
    name: "Serena Vale",
    title: "Performance Nutrition Coach",
    location: "Miami, FL",
    contact: "serena@disciplined.co",
    specialties: "Macro planning, recovery fuel, supplement guidance",
    bio: "Serena builds nutrition systems for high achievers. Expect clean, sustainable protocols that keep energy steady and recovery optimized.",
    rate: 110,
  },
  {
    id: 4,
    name: "Eli Park",
    title: "Mobility + Recovery Coach",
    location: "Seattle, WA",
    contact: "eli@disciplined.co",
    specialties: "Mobility, flexibility, breathwork",
    bio: "Eli guides disciplined athletes through mobility and recovery routines. His programs improve longevity, posture, and daily movement quality.",
    rate: 95,
  },
];

const calendarSlots = [
  { day: "Mon", date: "Mar 18", times: ["7:00 AM", "12:00 PM", "6:00 PM"] },
  { day: "Tue", date: "Mar 19", times: ["9:00 AM", "2:00 PM", "7:30 PM"] },
  { day: "Wed", date: "Mar 20", times: ["6:30 AM", "1:00 PM", "5:30 PM"] },
  { day: "Thu", date: "Mar 21", times: ["8:00 AM", "3:00 PM", "8:00 PM"] },
  { day: "Fri", date: "Mar 22", times: ["10:00 AM", "4:00 PM", "7:00 PM"] },
];

const coachGrid = document.getElementById("coachGrid");
const coachModal = document.getElementById("coachModal");
const coachModalBody = document.getElementById("coachModalBody");
const bookingModal = document.getElementById("bookingModal");
const bookingBody = document.getElementById("bookingBody");

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
    <div class="coach-detail">
      <strong>Session rate</strong>
      <span>$${coach.rate} / 60 min</span>
    </div>
    <button class="accent" data-book="${coach.id}">Book now</button>
  `;
  coachModal.classList.add("open");
};

const renderBooking = (coachId) => {
  const coach = coaches.find((item) => item.id === coachId);
  if (!coach) return;
  bookingBody.innerHTML = `
    <div>
      <h4>${coach.name}</h4>
      <p class="lead">${coach.title} • ${coach.location}</p>
    </div>
    <div class="calendar-grid" id="calendarGrid">
      ${calendarSlots
        .map(
          (slot, index) => `
        <div class="calendar-day" data-day-index="${index}">
          <h5>${slot.day}</h5>
          <p>${slot.date}</p>
          ${slot.times
            .map((time) => `<button class="calendar-time" data-time="${time}">${time}</button>`)
            .join("")}
        </div>`
        )
        .join("")}
    </div>
    <label class="booking-field">
      Your name
      <input type="text" id="bookerName" placeholder="Your full name" />
    </label>
    <label class="booking-field">
      Your email
      <input type="email" id="bookerEmail" placeholder="you@email.com" />
    </label>
    <label class="booking-field">
      Note to coach (optional)
      <textarea id="bookerNote" placeholder="Share your goals, schedule, or questions."></textarea>
    </label>
    <div class="payment-options">
      <label class="payment-option">
        <input type="radio" name="payment" value="pay-now" checked /> Pay now ($${coach.rate})
      </label>
      <label class="payment-option">
        <input type="radio" name="payment" value="cash" /> Pay cash on arrival
      </label>
    </div>
    <button class="accent" id="confirmBooking" data-coach="${coach.id}">Confirm booking</button>
    <div class="confirmation" id="bookingConfirmation"></div>
  `;
  bookingModal.classList.add("open");
};

const generateBookingRef = () => {
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  const timestamp = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  return `COACH-${timestamp}-${random}`;
};

const handleBookingConfirmation = (coachId) => {
  const coach = coaches.find((item) => item.id === coachId);
  if (!coach) return;
  const selectedTime = bookingBody.querySelector(".calendar-time.selected");
  const name = bookingBody.querySelector("#bookerName").value.trim();
  const email = bookingBody.querySelector("#bookerEmail").value.trim();
  const note = bookingBody.querySelector("#bookerNote").value.trim();
  const paymentChoice = bookingBody.querySelector("input[name='payment']:checked").value;
  const confirmation = bookingBody.querySelector("#bookingConfirmation");

  if (!selectedTime || !name || !email) {
    confirmation.textContent = "Select a time slot and enter your name + email to confirm.";
    confirmation.classList.add("show");
    return;
  }

  const dayCard = selectedTime.closest(".calendar-day");
  const dayIndex = Number(dayCard.dataset.dayIndex);
  const day = calendarSlots[dayIndex];
  const bookingRef = generateBookingRef();
  const amountPaid = paymentChoice === "pay-now" ? `$${coach.rate}` : "$0 (cash due)";

  confirmation.innerHTML = `
    <strong>Booking confirmed.</strong><br />
    Booking ref: ${bookingRef}<br />
    Coach: ${coach.name} (${coach.title})<br />
    Time: ${day.day}, ${day.date} @ ${selectedTime.dataset.time}<br />
    Location: ${coach.location}<br />
    Coach contact: ${coach.contact}<br />
    Your contact: ${name} • ${email}<br />
    Amount paid: ${amountPaid}<br />
    Note: ${note || "No note provided"}<br />
    <span class="fineprint">Confirmation emails will be sent to both you and the coach after integrations are enabled.</span>
  `;
  confirmation.classList.add("show");
};

coachGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".coach-card");
  if (!card) return;
  openCoachModal(Number(card.dataset.coachId));
});

coachModal.addEventListener("click", (event) => {
  const bookButton = event.target.closest("button[data-book]");
  if (!bookButton) return;
  coachModal.classList.remove("open");
  renderBooking(Number(bookButton.dataset.book));
});

bookingModal.addEventListener("click", (event) => {
  const timeButton = event.target.closest(".calendar-time");
  if (timeButton) {
    bookingBody.querySelectorAll(".calendar-time").forEach((btn) => btn.classList.remove("selected"));
    timeButton.classList.add("selected");
  }

  const confirmButton = event.target.closest("#confirmBooking");
  if (confirmButton) {
    handleBookingConfirmation(Number(confirmButton.dataset.coach));
  }
});

document.getElementById("closeCoach").addEventListener("click", () => {
  coachModal.classList.remove("open");
});

document.getElementById("closeBooking").addEventListener("click", () => {
  bookingModal.classList.remove("open");
});

renderCoaches();
