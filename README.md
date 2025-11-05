# Email Signatures Project

This project contains the email signature page that was moved from `/Users/tyler/Documents/Websites/website_UNB`.

## Files

- `src/pages/email-signature.tsx` - Main email signature component
- `assets/` - All image assets required by the email signature page

## Dependencies

The email signature component uses the following dependencies:

### UI Components
- `@/components/ui/button` - Button component
- `@/hooks/use-toast` - Toast notification hook

### External Libraries
- `lucide-react` - Icons (Mail, Phone, Globe, MapPin, Download)
- `html-to-image` - For converting HTML to PNG (toPng function)
- `jszip` - For creating ZIP files
- `file-saver` - For downloading files

### Assets Required
All assets are in the `assets/` directory:
- University_of_New_Brunswick_Logo.svg_1755912478863.png
- Irving_Oil.svg_1755913265895.png
- RBC-Logo_1755913716813.png
- Toronto-Dominion_Bank_logo.svg_1755913265896.png
- BMO_Logo.svg_1755913265896.png
- fiscal_ai_logo_new.png
- Untitled design (1)_1755896187722.png (profile image)
- 73-strings-logo.webp
- mcgill_1755923720192.png
- queens_university_logo.png
- rotman.png

## Original Location

This code was originally located at:
- Page: `/Users/tyler/Documents/Websites/website_UNB/client/src/pages/email-signature.tsx`
- Route: `/email_signature` in website_UNB's App.tsx
- Assets: `/Users/tyler/Documents/Websites/website_UNB/attached_assets/`

## Notes

- The component uses `@assets/` path alias which should be configured to point to the `assets/` directory
- The component was removed from website_UNB and is now standalone in this directory


