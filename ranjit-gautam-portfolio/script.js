const nav = document.getElementById("navLinks");
const menu = document.getElementById("menuToggle");
menu.addEventListener("click", () => nav.classList.toggle("open"));

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const sections = [...document.querySelectorAll("main section[id]")];
const navItems = [...document.querySelectorAll("#navLinks a")];

const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
  if (!visible) return;
  navItems.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + visible.target.id));
}, {rootMargin:"-30% 0px -55% 0px", threshold:[0,.2,.5,1]});

sections.forEach(section => observer.observe(section));

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

document.querySelectorAll(".learning-card").forEach(card => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.title;
    modalText.textContent = card.dataset.text;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden","false");
  });
});

function closeModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
}
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if(e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });
