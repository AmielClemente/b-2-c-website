# Filipino Food Store

A B2C e-commerce platform showcasing Filipino food products. This is the first iteration focusing on client-side features using Next.js and TailwindCSS.

## Features

- Product listing with search functionality
- Category filtering (dishes, desserts, snacks)
- Product detail pages
- Shopping cart with local storage
- Responsive design with Filipino-inspired color scheme

## Tech Stack

- Next.js (React-based framework)
- TypeScript
- TailwindCSS for styling
- Local Storage for cart management

## Getting Started

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Home page with product listing
│   ├── cart/
│   │   └── page.tsx            # Shopping cart page
│   ├── categories/
│   │   └── [category]/
│   │       └── page.tsx        # Category filtering page
│   └── products/
│       └── [productName]/
│           └── page.tsx        # Product detail page
├── data/
│   └── products.ts             # Mock product data
└── ...
```

## Color Scheme

The project uses a Filipino-inspired color scheme:
- Gold (Amber) - Primary color
- Brown - Secondary color
- White - Background color

## Future Iterations

- Backend integration
- User authentication
- Payment processing
- Admin dashboard
- Order management
- Real-time inventory tracking
