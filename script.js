const animeData = [
    {
        id: 1,
        title: "Attack on Titan",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop",
        rating: 9.1,
        episodes: 87,
        year: 2013,
        genre: "Action"
    },
    {
        id: 2,
        title: "Demon Slayer",
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop",
        rating: 8.9,
        episodes: 44,
        year: 2019,
        genre: "Action"
    },
    {
        id: 3,
        title: "My Hero Academia",
        image: "https://images.unsplash.com/photo-1560972550-aba3456b5564?w=400&h=600&fit=crop",
        rating: 8.4,
        episodes: 138,
        year: 2016,
        genre: "Action"
    },
    {
        id: 4,
        title: "Jujutsu Kaisen",
        image: "https://images.unsplash.com/photo-1541562232579-512a21360020?w=400&h=600&fit=crop",
        rating: 8.7,
        episodes: 47,
        year: 2020,
        genre: "Action"
    },
    {
        id: 5,
        title: "One Punch Man",
        image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop",
        rating: 8.8,
        episodes: 24,
        year: 2015,
        genre: "Comedy"
    },
    {
        id: 6,
        title: "Spy x Family",
        image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=600&fit=crop",
        rating: 8.6,
        episodes: 25,
        year: 2022,
        genre: "Comedy"
    },
    {
        id: 7,
        title: "Chainsaw Man",
        image: "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=400&h=600&fit=crop",
        rating: 8.5,
        episodes: 12,
        year: 2022,
        genre: "Action"
    },
    {
        id: 8,
        title: "Cyberpunk: Edgerunners",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=600&fit=crop",
        rating: 8.7,
        episodes: 10,
        year: 2022,
        genre: "Sci-Fi"
    }
];

function createAnimeCard(anime) {
    return `
        <article class="anime-card" data-id="${anime.id}">
            <div class="anime-image-wrapper">
                <img src="${anime.image}" alt="${anime.title}" class="anime-image" loading="lazy">
                <div class="anime-rating">
                    <span>⭐</span>
                    <span>${anime.rating}</span>
                </div>
            </div>
            <div class="anime-info">
                <h3 class="anime-title">${anime.title}</h3>
                <div class="anime-meta">
                    <span>${anime.year}</span>
                    <span>${anime.episodes} eps</span>
                </div>
            </div>
        </article>
    `;
}

function renderTrendingAnime() {
    const trendingGrid = document.getElementById('trendingGrid');
    if (trendingGrid) {
        trendingGrid.innerHTML = animeData.map(createAnimeCard).join('');
    }
}

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        }
        
        lastScroll = currentScroll;
    });
}

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            
            if (navLinks) {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '72px';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'rgba(10, 10, 15, 0.98)';
                navLinks.style.padding = '20px';
                navLinks.style.borderBottom = '1px solid var(--border-color)';
            }
        });
    }
}

function initSmoothScroll() {
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
}

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filteredAnime = animeData.filter(anime => 
                anime.title.toLowerCase().includes(query) ||
                anime.genre.toLowerCase().includes(query)
            );
            
            const trendingGrid = document.getElementById('trendingGrid');
            if (trendingGrid && query.length > 0) {
                trendingGrid.innerHTML = filteredAnime.map(createAnimeCard).join('');
                if (filteredAnime.length === 0) {
                    trendingGrid.innerHTML = `
                        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-secondary);">
                            <p style="font-size: 1.25rem; margin-bottom: 8px;">No results found</p>
                            <p>Try searching for something else</p>
                        </div>
                    `;
                }
            } else if (query.length === 0) {
                renderTrendingAnime();
            }
        });
    }
}

function initCardInteractions() {
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.anime-card');
        if (card) {
            const animeId = card.dataset.id;
            const anime = animeData.find(a => a.id === parseInt(animeId));
            if (anime) {
                showAnimeModal(anime);
            }
        }
    });
}

function showAnimeModal(anime) {
    const existingModal = document.querySelector('.anime-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'anime-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close" aria-label="Close modal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
            </button>
            <div class="modal-body">
                <img src="${anime.image}" alt="${anime.title}" class="modal-image">
                <div class="modal-info">
                    <h2>${anime.title}</h2>
                    <div class="modal-meta">
                        <span class="modal-rating">⭐ ${anime.rating}</span>
                        <span>${anime.year}</span>
                        <span>${anime.episodes} Episodes</span>
                        <span class="modal-genre">${anime.genre}</span>
                    </div>
                    <p class="modal-description">
                        An epic anime that has captured the hearts of millions worldwide. 
                        Join the adventure and experience unforgettable moments, 
                        breathtaking action, and deep emotional storytelling.
                    </p>
                    <div class="modal-actions">
                        <button class="btn btn-primary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                            Watch Now
                        </button>
                        <button class="btn btn-secondary">+ Add to List</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .anime-modal {
            position: fixed;
            inset: 0;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .modal-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(8px);
        }
        
        .modal-content {
            position: relative;
            max-width: 800px;
            width: 100%;
            background: var(--bg-secondary);
            border-radius: var(--radius-xl);
            overflow: hidden;
            box-shadow: var(--shadow-lg);
            animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .modal-close {
            position: absolute;
            top: 16px;
            right: 16px;
            z-index: 10;
            padding: 8px;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            color: white;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .modal-close:hover {
            background: rgba(0, 0, 0, 0.7);
            transform: scale(1.1);
        }
        
        .modal-body {
            display: grid;
            grid-template-columns: 280px 1fr;
        }
        
        .modal-image {
            width: 100%;
            height: 420px;
            object-fit: cover;
        }
        
        .modal-info {
            padding: 32px;
        }
        
        .modal-info h2 {
            font-size: 1.75rem;
            font-weight: 700;
            margin-bottom: 16px;
        }
        
        .modal-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 20px;
            font-size: 0.9rem;
            color: var(--text-secondary);
        }
        
        .modal-rating {
            color: #fbbf24;
        }
        
        .modal-genre {
            padding: 4px 12px;
            background: var(--accent-glow);
            border-radius: 20px;
            color: var(--accent-secondary);
        }
        
        .modal-description {
            color: var(--text-secondary);
            line-height: 1.7;
            margin-bottom: 24px;
        }
        
        .modal-actions {
            display: flex;
            gap: 12px;
        }
        
        @media (max-width: 640px) {
            .modal-body {
                grid-template-columns: 1fr;
            }
            
            .modal-image {
                height: 200px;
            }
            
            .modal-info {
                padding: 20px;
            }
            
            .modal-actions {
                flex-direction: column;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    const closeModal = () => {
        modal.remove();
        document.body.style.overflow = '';
    };
    
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.anime-card, .genre-card, .feature-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderTrendingAnime();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initSearch();
    initCardInteractions();
    initActiveNavLink();
    
    setTimeout(initAnimations, 100);
    
    console.log('🎬 AnimeApp initialized successfully!');
});
