import axios from 'axios';
import fs from 'fs';

const API_KEY = 'sk-6dfdb79cd51f4fce93f8e74945751519'; // Reemplaza esto por tu key real

const prompt = `Generate exclusively the content of a complete HTML file (index.html), without any explanations or additional text. 
Create a modern, high-end eCommerce landing page using TailwindCSS for a premium household cleaning product brand. 
The page must include:

1. A responsive navigation bar with:
   - Logo placeholder
   - Menu links (Home, Products, About, Contact)
   - Shopping cart icon with counter (FontAwesome)
   - Mobile hamburger menu

2. A hero section with:
   - High-impact headline and subheadline
   - Product image from https://picsum.photos/1200/600
   - Prominent CTA button
   - Trust indicators (badges, ratings)

3. Featured products section (3-4 products) with:
   - Product cards containing:
     - Product image (https://picsum.photos/400/400)
     - Product name
     - Price
     - Star ratings (FontAwesome icons)
     - Add to cart button
   - Responsive grid layout

4. Product features/benefits section with:
   - 4-6 key features displayed as cards
   - FontAwesome icons for each feature
   - Clean, visual presentation

5. About Us section with:
   - Company story/mission
   - Team member highlights (photos from https://picsum.photos/200/200)
   - Values/commitments

6. Testimonials section with:
   - Customer reviews
   - Star ratings
   - Customer photos (https://picsum.photos/100/100)

7. Contact form with:
   - Name, email, subject, message fields
   - Form validation (client-side only)
   - Submit button
   - Contact information (address, phone, email)

8. Google Maps iframe for location

9. Footer with:
   - Quick links
   - Social media icons (FontAwesome)
   - Newsletter signup
   - Copyright notice

Technical requirements:
- Use TailwindCSS for all styling
- Incorporate FontAwesome icons throughout
- Make fully responsive (mobile-first approach)
- Include a functional shopping cart system (client-side only using localStorage)
- Use placeholder images from picsum.photos
- Ensure all interactive elements have proper hover/focus states
- Include subtle animations/transitions where appropriate

Deliver only valid, self-contained HTML code ready to be saved as index.html, with no additional commentary or explanations.`;

async function generarLanding() {
  try {
    const response = await axios.post(
      'https://api.deepseek.com/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );
    const htmlCode = response.data.choices[0].message.content;

    fs.writeFileSync('probando.html', htmlCode);
    console.log('✅ Archivo HTML guardado como probando.html');
  } catch (error) {
    console.error('❌ Error al generar el HTML:', error.response?.data || error.message);
  }
}

generarLanding();
