"use strict";

const yearEl = document.getElementById("year");
const toastEl = document.getElementById("toast");
const toastBtn = document.getElementById("demoToastBtn");

const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

const leadForm = document.getElementById("leadForm");
const planInput = document.getElementById("plan");
const successBox = document.getElementById("successBox");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

yearEl.textContent = String(new Date().getFullYear());

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");

  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2400);
}

function isValidEmail(value) {
  // Simple, practical check (not perfect, but good for front-end)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function setError(el, errorEl, msg) {
  if (msg) {
    el.setAttribute("aria-invalid", "true");
    errorEl.textContent = msg;
  } else {
    el.removeAttribute("aria-invalid");
    errorEl.textContent = "";
  }
}

function validateForm() {
  let ok = true;

  const nameVal = nameInput.value.trim();
  const emailVal = emailInput.value.trim();
  const msgVal = messageInput.value.trim();

  if (nameVal.length < 2) {
    setError(nameInput, nameError, "Please enter your full name.");
    ok = false;
  } else {
    setError(nameInput, nameError, "");
  }

  if (!isValidEmail(emailVal)) {
    setError(emailInput, emailError, "Please enter a valid email address.");
    ok = false;
  } else {
    setError(emailInput, emailError, "");
  }

  if (msgVal.length < 10) {
    setError(messageInput, messageError, "Please add a short message (10+ characters).");
    ok = false;
  } else {
    setError(messageInput, messageError, "");
  }

  return ok;
}

/* Nav toggle for mobile */
navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

/* Close mobile menu when clicking a link */
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A" && nav.classList.contains("open")) {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* Pricing buttons set plan */
document.querySelectorAll("[data-plan]").forEach((btn) => {
  btn.addEventListener("click", () => {
    planInput.value = btn.getAttribute("data-plan") || "Business";
    showToast(`Selected plan: ${planInput.value}`);
  });
});

/* Demo action button */
toastBtn.addEventListener("click", () => {
  showToast("Demo action complete. Your site feels alive now.");
});

/* Form submit */
leadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  successBox.style.display = "none";

  if (!validateForm()) {
    showToast("Please fix the highlighted fields.");
    return;
  }

  // Simulate a successful submit
  const payload = {
    plan: planInput.value,
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    message: messageInput.value.trim()
  };

  console.log("Lead form payload (demo):", payload);

  successBox.style.display = "block";
  leadForm.reset();

  // keep plan default after reset
  planInput.value = "Business";

  showToast("Request sent successfully (demo).");
});
