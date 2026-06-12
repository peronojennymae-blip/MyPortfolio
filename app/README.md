# Portfolio Landing Page

A modern, responsive portfolio landing page built with HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Navigation Menu**: Sticky navigation bar with smooth scrolling
- **Hero Section**: Eye-catching header with call-to-action button
- **About Section**: Space to introduce yourself and your background
- **Projects Section**: Showcase your work with project cards
- **Badges & Certificates**: Display your achievements and credentials
- **Achievements Section**: Highlight your accomplishments
- **Contact Section**: Contact information and contact form
- **Mobile Menu**: Hamburger menu for mobile devices
- **Animations**: Smooth scroll animations and transitions

## File Structure

```
.
├── index.html       # Main HTML file
├── styles.css       # Styling and responsive design
├── script.js        # JavaScript for interactivity
└── README.md        # This file
```

## How to Customize

### 1. Update Your Name and Information
In `index.html`:
- Replace "Your Name" in the logo section (line 18)
- Update your email address in the contact section (line 170)
- Update your phone number in the contact section (line 176)
- Update your location in the contact section (line 182)
- Update social media links in the contact section (lines 186-190)

### 2. Update the Hero Section
In `index.html` (lines 27-33):
- Change "Welcome to My Portfolio" to your own title
- Update "Your tagline or profession goes here" with your tagline

### 3. Add Your Bio
In `index.html` (lines 42-49):
- Replace the placeholder text in the About section with your biography

### 4. Add Your Projects
In `index.html` (lines 60-95):
- Add your project cards by updating:
  - Project image URL (replace placeholder)
  - Project title
  - Project description
  - Project link

### 5. Add Your Certificates and Badges
In `index.html` (lines 107-140):
- Update certificate titles
- Update issuing organizations
- Add dates
- Change emoji icons as needed

### 6. Add Your Achievements
In `index.html` (lines 151-178):
- Add your achievements with descriptions

### 7. Update Footer
In `index.html` (line 197):
- Replace "2024 Your Name" with current year and your name

### 8. Customize Colors
In `styles.css` (lines 7-13):
- Change `--primary-color` to your preferred primary color
- Change `--secondary-color` for secondary elements
- Modify other CSS variables as needed

## Running the Portfolio

1. Open `index.html` in your web browser
2. Or use a local server:
   - With Python 3: `python -m http.server`
   - With Python 2: `python -m SimpleHTTPServer`
   - Then navigate to `http://localhost:8000`

## Features in Detail

### Responsive Navigation
- Desktop: Full horizontal navigation menu
- Mobile: Hamburger menu that appears on screens smaller than 768px

### Smooth Scrolling
- All navigation links use smooth scroll behavior
- Active link highlighting as you scroll through sections

### Form
- Contact form with name, email, and message fields
- Form validation and success message

### Animations
- Fade-in animations as you scroll through sections
- Hover effects on project and certificate cards
- Button scale animations on hover

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Tips

- Use high-quality images for your projects
- Keep descriptions concise and professional
- Update dates regularly
- Test on mobile devices before publishing
- Consider adding real project links

## Next Steps

1. Replace placeholder images with your own
2. Add real project links
3. Update all personal information
4. Customize colors to match your brand
5. Add your own unique touch and styling
6. Deploy to a hosting service

Enjoy your new portfolio!
