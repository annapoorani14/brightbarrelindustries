// ===============================
// Bright Barrel Industries JS
// ===============================

document.addEventListener("DOMContentLoaded", function () {
  // -------------------------------
  // 1. Contact form -> open mail client
  // -------------------------------
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = (form.name.value || "").trim();
    const email = (form.email.value || "").trim();
    const phone = (form.phone.value || "").trim();
    const message = (form.message.value || "").trim();

    // Basic validation
    if (!name || !email) {
      alert("Please provide your name and email address.");
      return;
    }

    const subject = `Website enquiry from ${name}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "N/A"}`,
      "",
      "Message:",
      message || "No message provided",
    ];
    const body = bodyLines.join("\n");

    const mailto = `mailto:info.brightbarrel@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open the user's mail client
    window.location.href = mailto;

    // Optional: reset form
    form.reset();

    // Close mobile nav if open
    const nav = document.querySelector("nav");
    const hamburger = document.querySelector(".hamburger");
    if (nav && nav.classList.contains("active")) {
      nav.classList.remove("active");
      if (hamburger) hamburger.classList.remove("active");
    }
  });

  // -------------------------------
  // 2. Sticky shrinking header
  // -------------------------------
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // -------------------------------
  // 3. Smooth scrolling for nav links + close mobile nav
  // -------------------------------
  const navLinks = document.querySelectorAll("nav a");
  const nav = document.querySelector("nav");
  const hamburger = document.querySelector(".hamburger");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }

      // Close mobile nav after click
      if (nav && nav.classList.contains("active")) {
        nav.classList.remove("active");
        if (hamburger) hamburger.classList.remove("active");
      }
    });
  });

  // -------------------------------
  // 4. Scroll reveal animations
  // -------------------------------
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((sec) => observer.observe(sec));

  // -------------------------------
  // 5. Back-to-top button
  // -------------------------------
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.style.display = window.scrollY > 200 ? "block" : "none";
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // -------------------------------
  // 6. Hamburger toggle for mobile
  // -------------------------------
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }
});
