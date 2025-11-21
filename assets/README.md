# Asset Placeholders

This folder contains all images and media assets for the NIAT × Base44 Hackathon website.

## Required Assets

### Logos (PNG format, transparent background)
- **niat-logo.png** - NIAT institution logo
- **base44-logo.png** - Base44 organization logo  
- **mrv-logo.png** - MRV Vishwavidyapeeth logo

### QR Codes (PNG format, 300x300px minimum)
- **registration-qr.png** - QR code linking to team registration form
- **whatsapp-qr.png** - QR code for WhatsApp group invite

### Social Media
- **og-image.png** - Open Graph image for social media sharing (1200x630px)
  - Should include: Event branding, date (27 Nov 2025), venue name

## Image Specifications

### Logos
- Format: PNG with transparent background
- Recommended size: 500px width minimum
- Color: Should work on light/dark backgrounds
- Usage: Navigation, hero section, footer

### QR Codes
- Format: PNG
- Size: 300x300px or larger
- High contrast (black on white)
- Test before adding to ensure they scan correctly

### Social Preview
- Format: PNG or JPG
- Size: Exactly 1200x630 pixels
- Safe zone: Keep important content 120px from edges
- File size: Under 1MB for fast loading

## How to Add Assets

1. Save your logo/QR code files with the exact names listed above
2. Place them in this `assets` folder
3. No code changes needed - file paths are already configured

## Temporary Placeholders

Until you add the actual images, the website will:
- Hide missing logos gracefully
- Show placeholder text for QR codes
- Continue to function normally

## Testing Your Assets

After adding images:
1. Open index.html in a browser
2. Check that all logos display correctly
3. Scan QR codes to verify they work
4. Test social media preview using [Facebook Debugger](https://developers.facebook.com/tools/debug/) or [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

**Note**: All assets should be optimized for web before uploading to keep load times fast.
