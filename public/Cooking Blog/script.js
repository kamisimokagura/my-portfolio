document.addEventListener("DOMContentLoaded", () => {
    console.log("star kitchin ロード完了");
  });

  document.addEventListener("DOMContentLoaded", () => {
    // フェードインアニメーション
    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach(el => {
      el.classList.add("active");
    });
  
    // フォーム送信確認
    const form = document.getElementById("contactForm");
    if (form) {
      form.addEventListener("submit", e => {
        e.preventDefault();
        alert("お問い合わせありがとうございます！");
        form.reset();
      });
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".recipe-card");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, {
      threshold: 0.2
    });
  
    items.forEach(item => observer.observe(item));
  });
  