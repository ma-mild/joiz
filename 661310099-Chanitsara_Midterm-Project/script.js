let selectedGenres = [];
let backgroundImages = {
    "POP": "url('https://via.placeholder.com/420x356.png?')",
    "ROCK": "url('https://via.placeholder.com/420x356.png?')",
    "COUNTRY": "url('https://via.placeholder.com/420x356.png?')",
    "HIP-HOP": "url('https://via.placeholder.com/420x356.png?')",
    "ACOUSTIC": "url('https://via.placeholder.com/420x356.png?')",
    "EDM": "url('https://via.placeholder.com/420x356.png?')",
    "R&B": "url('https://via.placeholder.com/420x356.png?')",
    "INDIE": "url('https://via.placeholder.com/420x356.png?')",
    "PUNK": "url('https://via.placeholder.com/420x356.png?')",
    "JAZZ": "url('https://via.placeholder.com/420x356.png?')",
    "CLASSIC": "url('https://via.placeholder.com/420x356.png?')",
    "LATIN": "url('https://via.placeholder.com/420x356.png?')",
    "SOUL": "url('https://via.placeholder.com/420x356.png?')"
};

let genreLinks = {
    "POP": "https://example.com/pop",
    "ROCK": "https://example.com/rock",
    "COUNTRY": "https://example.com/country",
    "HIP-HOP": "https://example.com/hip-hop",
    "ACOUSTIC": "https://example.com/acoustic",
    "EDM": "https://example.com/edm",
    "R&B": "https://example.com/rb",
    "INDIE": "https://example.com/indie",
    "PUNK": "https://example.com/punk",
    "JAZZ": "https://example.com/jazz",
    "CLASSIC": "https://example.com/classic",
    "LATIN": "https://example.com/latin",
    "SOUL": "https://example.com/soul"
};

function selectGenre(element) {
    if (selectedGenres.length < 5 && !selectedGenres.includes(element.textContent)) {
        selectedGenres.push(element.textContent);

        if (selectedGenres.length <= 2) {
            element.classList.add('selected-1');
        } else {
            element.classList.add('selected-2');
        }

        if (selectedGenres.length === 5) {
            displayRecommendations();
        }
    }
}

function displayRecommendations() {
    const recommendationContainer = document.getElementById('recommendationContainer');
    recommendationContainer.innerHTML = '';

    selectedGenres.forEach((genre, index) => {
        const link = document.createElement('a');
        link.href = genreLinks[genre];
        link.className = 'recommendation';
        link.classList.add(index < 3 ? 'small' : 'large');
        link.style.backgroundImage = backgroundImages[genre];
        link.textContent = genre;
        link.target = "_blank"; // เปิดลิงก์ในแท็บใหม่

        // สร้างกล่องที่มีลูกศร
        const arrowBox = document.createElement('div');
        arrowBox.className = 'arrow-box';

        const arrow = document.createElement('i');
        arrow.className = 'fas fa-arrow-up arrow'; // ใช้ไอคอนลูกศรจาก Font Awesome

        arrowBox.appendChild(arrow);
        link.appendChild(arrowBox);

        recommendationContainer.appendChild(link);
    });
}

