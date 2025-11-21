# NIAT × Base44 Hackathon Website

A modern, single-page event website for the **NIAT × Base44 Hackathon** taking place on **27 November 2025** at **MRV Vishwavidyapeeth**.

## 🎨 Design Features

- **Brand Palette**: NIAT Blue (#0066CC), Base44 Black (#1A1A1A), White, Light Grey
- **Clean & Bold Design**: WIX/Base44-inspired geometric headings
- **Fully Responsive**: Optimized for desktop, tablet, and mobile
- **Fast Loading**: Static HTML/CSS/JS with optimized performance
- **SEO Ready**: Meta tags and Open Graph support

## 📁 Project Structure

```
HackthonVs/
├── index.html          # Main HTML file
├── styles.css          # Complete styling
├── script.js           # Interactive features
├── README.md           # This file
└── assets/             # Asset folder (create this)
    ├── niat-logo.png
    ├── base44-logo.png
    ├── mrv-logo.png
    ├── registration-qr.png
    ├── whatsapp-qr.png
    └── og-image.png
```

## 🚀 Quick Start

### 1. Add Required Assets

Create an `assets` folder and add the following images:

- **Logos**: `niat-logo.png`, `base44-logo.png`, `mrv-logo.png`
- **QR Codes**: `registration-qr.png`, `whatsapp-qr.png`
- **Social Preview**: `og-image.png` (1200x630px for social media sharing)

### 2. Update Links

Open `script.js` and update these URLs:

```javascript
// Line 68: Registration form URL
const registrationURL = 'YOUR_GOOGLE_FORM_OR_REGISTRATION_LINK';

// Line 77: WhatsApp group invite URL
const whatsappURL = 'YOUR_WHATSAPP_GROUP_INVITE_LINK';
```

### 3. Open the Website

Simply open `index.html` in your web browser:
- Double-click `index.html`, or
- Right-click → Open with → Your Browser

### 4. Test on Local Server (Optional)

For better testing, run a local server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

**Using VS Code Live Server:**
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

## 📝 Customization Guide

### Update Event Details

Edit `index.html` to modify:
- Event dates and times (search for "27 November")
- Venue information (search for "MRV Vishwavidyapeeth")
- Contact information (footer section)

### Change Colors

Edit CSS variables in `styles.css` (top of file):

```css
:root {
    --niat-blue: #0066CC;
    --base44-black: #1A1A1A;
    --white: #FFFFFF;
    --light-grey: #F5F5F5;
}
```

### Modify Schedule

Update the schedule table in `index.html` (search for "schedule-table"):

```html
<tr>
    <td>9:00–9:30 AM</td>
    <td>Your Activity</td>
</tr>
```

### Add/Remove Themes

Edit the themes section in `index.html` (search for "themes-grid"):

```html
<div class="theme-card">
    <div class="theme-icon">🎯</div>
    <h3>Your Theme</h3>
    <p>Description here</p>
</div>
```

### Update Google Maps

Replace the Google Maps embed in `index.html` (search for "iframe"):

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your venue
3. Click "Share" → "Embed a map"
4. Copy the iframe code and replace the existing one

## 🎯 Key Sections

1. **Hero Section**: Event title, date, time, venue with CTA buttons
2. **About**: Brief description of the hackathon
3. **Schedule**: Detailed event timeline in table format
4. **Themes**: 7 problem statement categories
5. **Prizes**: Rewards and recognition for participants
6. **Registration**: Team registration with QR code
7. **WhatsApp**: Group join section with QR code
8. **Rules**: Eligibility and competition rules
9. **FAQ**: Common questions and answers
10. **Venue**: Location details with Google Maps
11. **Footer**: Partner logos and contact information

## ✨ Features

### Interactive Elements
- Smooth scroll navigation
- FAQ accordion
- Mobile responsive menu
- Scroll animations
- Active navigation highlighting

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation support
- High contrast ratios

### Performance
- Optimized CSS
- Minimal JavaScript
- Lazy image loading
- Fast page load times

## 📱 Mobile Responsiveness

The website is fully responsive with breakpoints at:
- Desktop: > 768px
- Tablet: 481px - 768px
- Mobile: ≤ 480px

## 🔧 Technical Stack

- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Custom Properties
- **Vanilla JavaScript**: No frameworks required
- **Google Fonts**: Inter font family

## 📊 SEO Optimization

The website includes:
- Meta descriptions
- Open Graph tags for social media
- Semantic HTML structure
- Descriptive alt texts
- Mobile-friendly design

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📅 Deployment Options

### Option 1: GitHub Pages (Free)
1. Create a GitHub repository
2. Upload all files
3. Go to Settings → Pages
4. Select main branch
5. Your site will be live at `username.github.io/repo-name`

### Option 2: Netlify (Free)
1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop your folder
3. Site goes live instantly

### Option 3: Vercel (Free)
1. Create account at [vercel.com](https://vercel.com)
2. Import your GitHub repo or upload files
3. Auto-deploys on every update

### Option 4: Traditional Web Hosting
Upload all files to your web hosting via FTP:
- Upload to public_html or www folder
- Ensure index.html is in the root

## 🎨 Asset Creation Tips

### Logo Specifications
- Format: PNG with transparent background
- Resolution: At least 500px wide
- Colors: Should work on both light and dark backgrounds

### QR Code Generation
1. Use [QR Code Generator](https://www.qr-code-generator.com/)
2. Create codes for:
   - Registration form link
   - WhatsApp group invite
3. Download as PNG (high resolution)
4. Size: 300x300px minimum

### Social Preview Image (og-image.png)
- Size: 1200 x 630 pixels
- Include: Event logo, date, venue
- Format: PNG or JPG
- Keep text large and readable

## 📞 Contact & Support

**Project Owner**: NIAT Student Success Department

**Email**: events@niat.edu  
**Phone**: +91 98765 43210

## ⏰ Timeline

- **First Draft**: Ready now ✅
- **Asset Integration**: Add logos and QR codes
- **Testing**: 2-3 days for revisions
- **Final Live**: Before 23 November 2025

## 📋 Pre-Launch Checklist

- [ ] Add all logo images to assets folder
- [ ] Add registration QR code
- [ ] Add WhatsApp group QR code
- [ ] Update registration form URL in script.js
- [ ] Update WhatsApp group URL in script.js
- [ ] Verify Google Maps embed shows correct location
- [ ] Test all links and buttons
- [ ] Check mobile responsiveness
- [ ] Update contact information in footer
- [ ] Test on multiple browsers
- [ ] Add social preview image
- [ ] Deploy to hosting platform

## 🔄 Future Enhancements (Optional)

- Add countdown timer to hero section
- Integrate live registration form
- Add participant testimonials
- Include photo gallery from previous events
- Add sponsors section
- Implement newsletter signup

## 📄 License

This website is created for the NIAT × Base44 Hackathon event.

---

**Built with ❤️ for the NIAT × Base44 Hackathon**

*Think. Design. Prototype. — No Code Needed.*
