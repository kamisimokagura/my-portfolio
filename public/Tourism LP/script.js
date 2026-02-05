let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    const slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    if (slides[slideIndex-1]) {
        slides[slideIndex-1].style.display = "block";
    }
    setTimeout(showSlides, 3000); // 3秒ごとに画像を切り替え
}

function checkFadeIn() {
    const fadeIns = document.querySelectorAll('.fade-in');
    fadeIns.forEach(fadeIn => {
        const rect = fadeIn.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= windowHeight - 100) {
            fadeIn.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkFadeIn);
checkFadeIn();

function checkFadeIn() {
    const fadeIns = document.querySelectorAll('.fade-in');
    fadeIns.forEach(fadeIn => {
        const rect = fadeIn.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        // 要素の上端が画面の下端より手前に来たら表示
        if (rect.top <= windowHeight - 100) {
            fadeIn.classList.add('active');
        }
    });
}

// スクロール時にフェードインのチェックを行う
window.addEventListener('scroll', checkFadeIn);

// 初回ロード時にもチェック
checkFadeIn();