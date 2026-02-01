  async function loadJSON(path){
  const res = await fetch(path);
  return await res.json();
}

async function render(id, path, makeHTML){
  const el = document.getElementById(id);
  if(!el) return;
  const data = await loadJSON(path);
  el.innerHTML = data.map(makeHTML).join("");
}


// ===== PAGE CONTENT =====
document.addEventListener("DOMContentLoaded", ()=>{

  // --- Members ---
  render("membersList", "/static/data/members.json", m => `
    <div class="item">
      <img class="member-photo" src="${m.image}" alt="${m.name}">
      <div class="item-body">
        <div class="item-title">${m.name}</div>
        <div class="item-sub">${m.part}</div>
        <p>${m.bio}</p>
        <a class="ig-link" href="${m.links[0].url}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
         <img class="ig-icon" src="/static/img/instagram.png" alt="">
        </a>

      </div>
    </div>
  `);

  // --- Instruments ---
  render("instrumentsList", "/static/data/instruments.json", i => `
  <div class="item">
    <img class="instrument-photo" src="${i.image}" alt="${i.name}">
    <div class="item-body">
      <div class="item-title">${i.name}</div>
      <div class="item-sub">${i.player}</div>
      <p>${i.note}</p>
      <a href="${i.url}" target="_blank" rel="noopener noreferrer">商品ページ</a>
    </div>
  </div>
`);



  // ===== HERO SLIDER with DOTS + SWIPE + PAUSE =====
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const slider = document.querySelector(".hero-slider");
  const dotsContainer = document.querySelector(".hero-dots");

  if (slides.length === 0) return;

  let current = 0;
  let timer = null;
  const dots = [];

  // --- dots generate ---
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = "hero-dot" + (i === 0 ? " active" : "");
      dot.addEventListener("click", () => {
        goTo(i);
        startTimer();
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
  }

  function setActive(i){
    slides.forEach(s => s.classList.remove("active"));
    slides[i].classList.add("active");

    dots.forEach(d => d.classList.remove("active"));
    if (dots[i]) dots[i].classList.add("active");
  }

  function goTo(i){
    current = (i + slides.length) % slides.length;
    setActive(current);
  }

  function next(){ goTo(current + 1); }
  function prev(){ goTo(current - 1); }

  function stopTimer(){
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function startTimer(){
    stopTimer();
    timer = setInterval(next, 4000);
  }

  // 初期化
  setActive(0);
  startTimer();

  // --- swipe ---
  if (slider) {
    let startX = 0;

    slider.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
      stopTimer();
    }, { passive: true });

    slider.addEventListener("touchend", e => {
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) prev();
        else next();
      }
      startTimer();
    });

    // PC hover pause
    slider.addEventListener("mouseenter", stopTimer);
    slider.addEventListener("mouseleave", startTimer);
  }

});

render("goodsList", "/static/data/goods.json", g => `
  <div class="item">
    <img class="instrument-photo" src="${g.image}" alt="${g.name}">
    <div class="item-body">
      <div class="item-title">${g.name}</div>
      <p>${g.note}</p>
      <a class="btn" href="${g.contact}" target="_blank" rel="noopener">
        Instagramで連絡
      </a>
    </div>
  </div>
`);

