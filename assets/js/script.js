'use strict';

const toggle = (element) => element && element.classList.toggle("active");
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebarBtn) sidebarBtn.addEventListener("click", () => toggle(sidebar));

const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const pageName = link.textContent.trim().toLowerCase();
    pages.forEach((page) => page.classList.toggle("active", page.dataset.page === pageName));
    navLinks.forEach((item) => item.classList.toggle("active", item === link));
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
if (form && formBtn) {
  const validate = () => { formBtn.disabled = !form.checkValidity(); };
  formInputs.forEach((input) => input.addEventListener("input", validate));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) return;
    const data = new FormData(form);
    const subject = encodeURIComponent("Website enquiry from " + data.get("fullname"));
    const body = encodeURIComponent("Name: " + data.get("fullname") + "\nEmail: " + data.get("email") + "\n\n" + data.get("message"));
    window.location.href = "mailto:khadkasoman3@gmail.com?subject=" + subject + "&body=" + body;
  });
}
