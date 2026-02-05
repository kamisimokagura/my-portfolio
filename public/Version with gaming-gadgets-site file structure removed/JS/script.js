/* ==================== JAVASCRIPT FILE (script.js) ==================== */

// Global variables
let currentPage = 'home';
let gadgetData = {
    'gaming-mouse': {
        title: 'プロゲーミングマウス X1',
        price: '¥8,980',
        rating: 4.8,
        description: '究極のゲーミング体験を提供する高性能マウス',
        features: [
            '16000 DPI センサー',
            'RGB ライティング',
            '軽量 65g設計',
            'プログラマブルボタン×8',
            '1000Hz ポーリングレート'
        ],
        specs: {
            'センサー': 'PMW3366',
            '解像度': '100-16000 DPI',
            '重量': '65g',
            '寸法': '127×67×42mm',
            '接続': 'USB 2.0',
            '保証': '2年間'
        },
        video: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    'gaming-keyboard': {
        title: 'メカニカルキーボード Pro',
        price: '¥12,800',
        rating: 4.5,
        description: 'プロ仕様のメカニカルスイッチ搭載キーボード',
        features: [
            'Cherry MX Red スイッチ',
            'フルRGBバックライト',
            'アルミフレーム',
            'N-Key ロールオーバー',
            'マクロ機能'
        ],
        specs: {
            'スイッチ': 'Cherry MX Red',
            'キー数': '104キー',
            'バックライト': 'RGB',
            '寸法': '440×135×35mm',
            '重量': '1.2kg',
            '保証': '2年間'
        },
        video: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    'gaming-headset': {
        title: 'サラウンドヘッドセット Elite',
        price: '¥15,600',
        rating: 4.9,
        description: '7.1chサラウンドサウンド対応の高音質ヘッドセット',
        features: [
            '7.1ch バーチャルサラウンド',
            'ノイズキャンセリングマイク',
            '50mmドライバー',
            'USB接続',
            '快適なイヤーパッド'
        ],
        specs: {
            'ドライバー': '50mm',
            '周波数特性': '20Hz-20kHz',
            'インピーダンス': '32Ω',
            '感度': '108dB',
            '重量': '350g',
            '保証': '2年間'
        },
        video: 'https://www.w3schools.com/html/mov_bbb.mp4'
    }
};

// Page navigation functionality
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
    
    currentPage = pageId;
}

// Modal functionality
function openGadgetModal(gadgetId) {
    const gadget = gadgetData[gadgetId];
    if (!gadget) return;
    
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <div class="gadget-image mb-6" style="height: 300px;">
                    <i class="fas fa-${getGadgetIcon(gadgetId)} text-8xl"></i>
                </div>
                <div class="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <video controls playsinline webkit-playsinline class="w-full h-full rounded-lg">
                        <source src="${gadget.video}" type="video/mp4">
                        デモ動画が利用できません
                    </video>
                </div>
            </div>
            <div>
                <h2 class="text-3xl font-bold mb-4">${gadget.title}</h2>
                <div class="text-2xl font-bold text-purple-600 mb-4">${gadget.price}</div>
                <div class="flex items-center gap-2 mb-6">
                    <div class="stars text-yellow-500">
                        ${generateStars(gadget.rating)}
                    </div>
                    <span>(${gadget.rating}/5)</span>
                </div>
                <p class="text-gray-600 mb-6">${gadget.description}</p>
                
                <h3 class="text-xl font-semibold mb-3">主な特徴</h3>
                <ul class="space-y-2 mb-6">
                    ${gadget.features.map(feature => `<li><i class="fas fa-check text-green-500 mr-2"></i>${feature}</li>`).join('')}
                </ul>
                
                <h3 class="text-xl font-semibold mb-3">仕様</h3>
                <div class="space-y-2 mb-6">
                    ${Object.entries(gadget.specs).map(([key, value]) => `
                        <div class="flex justify-between py-2 border-b">
                            <span class="font-medium">${key}</span>
                            <span>${value}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="flex gap-4">
                    <button class="btn flex-1">
                        <i class="fas fa-shopping-cart"></i>
                        カートに追加
                    </button>
                    <button class="btn bg-gray-500 hover:bg-gray-600">
                        <i class="fas fa-heart"></i>
                        お気に入り
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('gadget-modal').classList.add('active');
}

function closeGadgetModal() {
    document.getElementById('gadget-modal').classList.remove('active');
}

function getGadgetIcon(gadgetId) {
    const icons = {
        'gaming-mouse': 'mouse',
        'gaming-keyboard': 'keyboard',
        'gaming-headset': 'headphones'
    };
    return icons[gadgetId] || 'gamepad';
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Category detail functionality
function showCategoryDetail(category) {
    const categoryDetail = document.getElementById('category-detail');
    const categoryTitle = document.getElementById('category-title');
    const categoryContent = document.getElementById('category-content');
    
    const categoryData = {
        mouse: {
            title: 'ゲーミングマウス',
            items: [
                {
                    name: 'エントリーマウス',
                    price: '¥3,980',
                    description: '初心者向けの高コスパモデル',
                    icon: 'mouse'
                },
                {
                    name: 'プロマウス',
                    price: '¥8,980',
                    description: 'プロゲーマー仕様の高性能モデル',
                    icon: 'mouse'
                },
                {
                    name: 'ワイヤレスマウス',
                    price: '¥12,800',
                    description: '遅延ゼロの無線ゲーミングマウス',
                    icon: 'mouse'
                }
            ]
        },
        keyboard: {
            title: 'ゲーミングキーボード',
            items: [
                {
                    name: 'メンブレンキーボード',
                    price: '¥4,500',
                    description: '静音性に優れたメンブレン式',
                    icon: 'keyboard'
                },
                {
                    name: 'メカニカルキーボード',
                    price: '¥12,800',
                    description: 'Cherry MXスイッチ搭載',
                    icon: 'keyboard'
                },
                {
                    name: '光学式キーボード',
                    price: '¥18,900',
                    description: '光学スイッチで超高速応答',
                    icon: 'keyboard'
                }
            ]
        }
    };
    
    const data = categoryData[category];
    if (!data) return;
    
    categoryTitle.textContent = data.title;
    categoryContent.innerHTML = data.items.map(item => `
        <div class="gadget-card">
            <div class="gadget-image">
                <i class="fas fa-${item.icon}"></i>
            </div>
            <div class="gadget-content">
                <h3 class="gadget-title">${item.name}</h3>
                <p class="gadget-description">${item.description}</p>
                <div class="gadget-price">${item.price}</div>
                <button class="btn">
                    <i class="fas fa-info-circle"></i>
                    詳細を見る
                </button>
            </div>
        </div>
    `).join('');
    
    categoryDetail.style.display = 'block';
    categoryDetail.scrollIntoView({ behavior: 'smooth' });
}

function hideCategoryDetail() {
    document.getElementById('category-detail').style.display = 'none';
}

// Special detail functionality
function showSpecialDetail() {
    const specialDetail = document.getElementById('special-detail');
    specialDetail.style.display = 'block';
    specialDetail.scrollIntoView({ behavior: 'smooth' });
}

function hideSpecialDetail() {
    document.getElementById('special-detail').style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Navigation click handlers
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // Modal close on background click
    document.getElementById('gadget-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeGadgetModal();
        }
    });
    
    // Form submission
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('お問い合わせありがとうございます！後日ご連絡いたします。');
            this.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC key to close modal
    if (e.key === 'Escape') {
        closeGadgetModal();
        hideCategoryDetail();
        hideSpecialDetail();
    }
    
    // Number keys for quick navigation
    const pageKeys = {
        '1': 'home',
        '2': 'categories',
        '3': 'special',
        '4': 'news',
        '5': 'contact',
        '6': 'file-structure'
    };
    
    if (pageKeys[e.key] && !e.ctrlKey && !e.altKey) {
        showPage(pageKeys[e.key]);
    }
});

// Animation on scroll
function animateOnScroll() {
    const cards = document.querySelectorAll('.gadget-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Console welcome message
console.log(`
🎮 ゲームガジェットサイトへようこそ！

ファイル構成:
📁 gaming-gadgets-site/
├── 📄 index.html (メインHTML)
├── 📁 css/
│   └── 📄 styles.css (スタイルシート)
├── 📁 js/
│   └── 📄 script.js (JavaScript機能)
├── 📁 images/ (画像ファイル)
└── 📁 videos/ (動画ファイル)

キーボードショートカット:
1-6: ページ切り替え
ESC: モーダル・詳細パネルを閉じる
`);