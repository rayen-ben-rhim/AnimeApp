# AnimeApp

A modern, beautiful anime discovery website built with vanilla HTML, CSS, and JavaScript.

## Features

- **Stunning Dark Theme**: Modern UI with a sleek purple/pink gradient accent design
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Subtle hover effects, scroll animations, and floating elements
- **Interactive Cards**: Click on anime cards to view detailed information in a modal
- **Real-time Search**: Filter anime by title or genre as you type
- **Genre Browsing**: Explore anime by different genres
- **Sticky Navigation**: Glassmorphism navbar that adapts on scroll

## Tech Stack

- **HTML5**: Semantic markup with accessibility in mind
- **CSS3**: Modern features including CSS Grid, Flexbox, CSS Variables, and animations
- **JavaScript (ES6+)**: Vanilla JS with no dependencies
- **Google Fonts**: Outfit font family for clean typography

## Project Structure

```
/
├── index.html      # Main HTML file
├── styles.css      # All styles and responsive design
├── script.js       # JavaScript functionality
└── README.md       # Project documentation
```

## Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. No build process or dependencies required!

### Local Development Server

For the best development experience, use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have live-server installed)
npx live-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Customization

### Colors

The color scheme can be easily customized by modifying the CSS variables in `:root`:

```css
:root {
    --accent-primary: #8b5cf6;    /* Main accent color */
    --accent-secondary: #a78bfa;  /* Secondary accent */
    --bg-primary: #0a0a0f;        /* Main background */
    /* ... more variables */
}
```

### Content

Anime data is stored in the `animeData` array in `script.js`. Add or modify entries to update the displayed content:

```javascript
const animeData = [
    {
        id: 1,
        title: "Your Anime Title",
        image: "image-url.jpg",
        rating: 9.0,
        episodes: 24,
        year: 2024,
        genre: "Action"
    },
    // ... more anime
];
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for personal or commercial purposes.
