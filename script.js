// 저녁 메뉴 데이터베이스
const dinnerMenus = {
    hungry: [
        {
            name: "왕 돈까스",
            description: "두툼하고 바삭한 돈까스와 함께 든든한 한 끼! 소스 듬뿍 올려서 드세요.",
            type: "일식",
            price: "₩12,000"
        },
        {
            name: "삼겹살 정식",
            description: "고소한 삼겹살과 각종 반찬들로 배부르게! 상추쌈에 싸서 드시면 최고입니다.",
            type: "한식",
            price: "₩15,000"
        },
        {
            name: "스테이크 덮밥",
            description: "육즙 가득한 스테이크와 고슬고슬한 밥의 조화! 계란 프라이를 얹어 더욱 풍성하게.",
            type: "양식",
            price: "₩13,500"
        }
    ],
    light: [
        {
            name: "샐러드 파스타",
            description: "신선한 채소와 함께하는 가벼운 파스타. 상큼한 올리브 오일 드레싱이 포인트!",
            type: "양식",
            price: "₩9,500"
        },
        {
            name: "월남쌈",
            description: "신선한 채소와 새우를 라이스페이퍼에 싸서! 땅콩소스에 찍어 드세요.",
            type: "베트남식",
            price: "₩11,000"
        },
        {
            name: "연어 포케",
            description: "신선한 연어와 각종 야채, 현미밥의 완벽한 조화. 건강하고 맛있게!",
            type: "하와이안",
            price: "₩14,000"
        }
    ],
    spicy: [
        {
            name: "매운 떡볶이",
            description: "쫄깃한 떡과 어묵이 매콤달콤한 양념에! 라면 사리 추가는 필수입니다.",
            type: "한식",
            price: "₩8,000"
        },
        {
            name: "불닭볶음면",
            description: "매운맛의 정석! 치즈와 함께 먹으면 매운맛이 중화됩니다.",
            type: "한식",
            price: "₩6,500"
        },
        {
            name: "마라탕",
            description: "얼얼하고 중독적인 맛! 원하는 재료를 넣고 맵기 조절도 가능해요.",
            type: "중식",
            price: "₩13,000"
        }
    ],
    comfort: [
        {
            name: "김치찌개",
            description: "뜨끈한 국물이 속을 풀어주는 든든한 한 끼. 밥 한 공기 뚝딱!",
            type: "한식",
            price: "₩8,500"
        },
        {
            name: "카레라이스",
            description: "부드럽고 달콤한 카레가 마음을 편안하게 해줍니다. 후쿠진즈케 곁들여서!",
            type: "일식",
            price: "₩9,000"
        },
        {
            name: "크림 파스타",
            description: "부드럽고 크리미한 소스가 입안을 감싸는 행복한 맛. 베이컨의 고소함이 포인트!",
            type: "양식",
            price: "₩12,000"
        }
    ]
};

let selectedMood = null;

// 기분 버튼 클릭 이벤트
const moodButtons = document.querySelectorAll('.mood-btn');
moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 모든 버튼에서 active 클래스 제거
        moodButtons.forEach(btn => btn.classList.remove('active'));
        // 클릭한 버튼에 active 클래스 추가
        button.classList.add('active');
        selectedMood = button.dataset.mood;
    });
});

// 메뉴 추천 버튼 클릭 이벤트
const recommendBtn = document.getElementById('recommendBtn');
const result = document.getElementById('result');

recommendBtn.addEventListener('click', () => {
    // 기분이 선택되지 않은 경우
    if (!selectedMood) {
        alert('오늘의 기분을 먼저 선택해주세요! 😊');
        return;
    }

    // 로딩 효과
    recommendBtn.classList.add('loading');
    result.classList.remove('show');

    // 1초 후 메뉴 추천
    setTimeout(() => {
        const menus = dinnerMenus[selectedMood];
        const randomMenu = menus[Math.floor(Math.random() * menus.length)];

        // 결과 표시
        document.getElementById('menuName').textContent = randomMenu.name;
        document.getElementById('menuDescription').textContent = randomMenu.description;
        document.getElementById('menuType').textContent = randomMenu.type;
        document.getElementById('menuPrice').textContent = randomMenu.price;

        // 애니메이션과 함께 결과 표시
        result.classList.add('show');
        recommendBtn.classList.remove('loading');

        // 결과 카드로 부드럽게 스크롤
        setTimeout(() => {
            result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }, 1000);
});

// 엔터키로도 추천 가능하게
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && selectedMood) {
        recommendBtn.click();
    }
});

// 초기 애니메이션
window.addEventListener('load', () => {
    document.querySelector('.glass-card').style.opacity = '0';
    document.querySelector('.glass-card').style.transform = 'translateY(30px)';

    setTimeout(() => {
        document.querySelector('.glass-card').style.transition = 'all 0.8s ease';
        document.querySelector('.glass-card').style.opacity = '1';
        document.querySelector('.glass-card').style.transform = 'translateY(0)';
    }, 100);
});
