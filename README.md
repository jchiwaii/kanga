# Kanga Website

A bespoke, modern website built with HTML, SCSS, and vanilla JavaScript.

## Sections

- **Hero** - Dynamic hero section with sliding backgrounds and animated text
- **Services** - Grid layout showcasing services with hover effects
- **About** - Company information with animated features
- **Gallery** - Image gallery with overlay effects
- **Contact** - Contact form with validation and interactive elements
- **Footer** - Responsive footer with social links

## Project Structure

```
src/
├── scss/
│   ├── abstracts/      # Variables, mixins, animations
│   ├── base/           # Base styles
│   ├── components/     # Reusable components
│   ├── layout/         # Layout components
│   └── pages/          # Page-specific styles
├── js/
│   └── modules/        # JavaScript modules
└── images/            # Image assets
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/jchiwaii/kanga.git
   cd kanga
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.
