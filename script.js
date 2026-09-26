const $ = (id) => document.getElementById(id);

Object.entries(siteConfig.colors).forEach(([name, value]) => {
  document.documentElement.style.setProperty(`--${name}`, value);
});

document.title = siteConfig.businessName;
["brandName","footerName","copyrightName"].forEach(id => $(id).textContent = siteConfig.businessName);
["brandMark","footerMark"].forEach(id => $(id).textContent = siteConfig.logoText);
$("heroEyebrow").textContent = siteConfig.eyebrow;
$("heroDescription").textContent = siteConfig.description;
$("heroTitle").firstChild.textContent = siteConfig.businessName;
$("footerPhone").textContent = siteConfig.footer.phone;
$("footerHours").textContent = siteConfig.footer.hours;
$("footerTagline").textContent = siteConfig.slogan;
$("navOrder").href = siteConfig.links.order;
$("heroOrder").href = siteConfig.links.order;
$("googleReviews").href = siteConfig.links.googleReviews;
$("heroBg").style.backgroundImage = `url("${siteConfig.heroImage}")`;
$("yearNow").textContent = new Date().getFullYear();

function renderMenu(category = "All") {
  const categories = ["All", ...new Set(siteConfig.menu.map(item => item.category))];
  $("categoryTabs").innerHTML = categories.map(c =>
    `<button class="${c===category?'active':''}" data-category="${c}">${c}</button>`).join("");
  const items = category === "All" ? siteConfig.menu : siteConfig.menu.filter(i => i.category === category);
  $("menuGrid").innerHTML = items.map(item => `
    <article class="menu-card">
      <div class="menu-image" style="background-image:url('${item.image}')">${item.popular ? '<span class="tag">POPULAR</span>' : ""}</div>
      <div class="menu-info"><div class="menu-top"><h3>${item.name}</h3><span class="price">${item.price}</span></div><p>${item.description}</p></div>
    </article>`).join("");
}
renderMenu();
$("categoryTabs").addEventListener("click", e => {
  if(e.target.matches("button")) renderMenu(e.target.dataset.category);
});

$("featuredGrid").innerHTML = siteConfig.featured.map(item => `
  <article class="featured-card" style="background-image:url('${item.image}')">
    <div class="featured-info"><h3>${item.name}</h3><p>${item.description}</p></div>
  </article>`).join("");

$("schedule").innerHTML = siteConfig.locations.map(item => `
  <div class="schedule-row">
    <strong>${item.date}</strong><strong>${item.location}</strong>
    <span>${item.address}<br>${item.event}</span><strong>${item.time}</strong>
  </div>`).join("");

$("galleryGrid").innerHTML = siteConfig.gallery.map(item =>
  `<div class="gallery-item" style="background-image:url('${item.image}')"><span class="gallery-label">${item.label}</span></div>`).join("");

$("reviewGrid").innerHTML = siteConfig.reviews.map(item =>
  `<article class="review-card"><div class="stars">★★★★★</div><p>“${item.text}”</p><small>— ${item.author}</small></article>`).join("");

$("menuToggle").addEventListener("click", () => {
  const open = $("navLinks").classList.toggle("open");
  $("menuToggle").setAttribute("aria-expanded", open);
  $("menuToggle").setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => {
  $("navLinks").classList.remove("open");
  $("menuToggle").setAttribute("aria-expanded", "false");
  $("menuToggle").setAttribute("aria-label", "Open menu");
}));

window.addEventListener("scroll", () => $("top").classList.toggle("scrolled", window.scrollY > 20));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if(entry.isIntersecting) entry.target.classList.add("visible");
}), {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
