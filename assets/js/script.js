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


// Load every public project repository from the GitHub profile.
const projectList = document.getElementById("github-project-list");
const projectStatus = document.getElementById("projects-status");

async function loadGitHubProjects() {
  if (!projectList || !projectStatus) return;
  try {
    const response = await fetch("https://api.github.com/users/somankhadka3-commits/repos?type=owner&sort=updated&per_page=100");
    if (!response.ok) throw new Error("GitHub returned " + response.status);
    const repositories = await response.json();
    const projects = repositories
      .filter((repo) => !repo.private && !repo.archived && repo.name !== "soman.github.io" && !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    projectList.replaceChildren();
    if (!projects.length) {
      projectStatus.textContent = "No public project repositories found yet.";
      return;
    }

    projects.forEach((repo) => {
      const item = document.createElement("li");
      item.className = "project-item";
      const card = document.createElement("div");
      card.className = "project-card";
      const top = document.createElement("div");
      top.className = "project-card-top";
      const icon = document.createElement("div");
      icon.className = "project-icon";
      icon.textContent = (repo.name || "P").slice(0, 1).toUpperCase();
      const title = document.createElement("h4");
      title.className = "h4";
      title.textContent = repo.name.replace(/[-_]/g, " ");
      top.append(icon, title);
      const description = document.createElement("p");
      description.className = "project-description";
      description.textContent = repo.description || "A project by Soman Khadka. Visit the repository to explore its source code.";
      const meta = document.createElement("div");
      meta.className = "project-meta";
      const language = document.createElement("span");
      language.textContent = repo.language || "Code";
      const stars = document.createElement("span");
      stars.textContent = "★ " + repo.stargazers_count;
      meta.append(language, stars);
      const actions = document.createElement("div");
      actions.className = "project-actions";
      const source = document.createElement("a");
      source.href = repo.html_url;
      source.target = "_blank";
      source.rel = "noopener noreferrer";
      source.textContent = "Source code ↗";
      actions.append(source);
      if (repo.homepage) {
        const demo = document.createElement("a");
        demo.href = repo.homepage;
        demo.target = "_blank";
        demo.rel = "noopener noreferrer";
        demo.textContent = "Live demo ↗";
        actions.append(demo);
      }
      card.append(top, description, meta, actions);
      item.append(card);
      projectList.append(item);
    });
    projectStatus.textContent = projects.length + " public projects · Updated automatically from GitHub";
  } catch (error) {
    projectStatus.textContent = "Projects could not be loaded right now. You can still browse all repositories on my GitHub profile.";
  }
}
loadGitHubProjects();
