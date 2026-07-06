# Code by Thirdy — Developer Portfolio

This repository contains the personal portfolio website for Angelito P. Decatoria III, also known as Thirdy. The site is built as a modern, animated Next.js application that showcases his background, projects, certifications, tech stack, and gallery.

## What this project includes

The portfolio is structured as a single-page experience with multiple sections and dedicated pages:

- Hero section with animated intro, preloader experience, and polished navigation
- About section highlighting his focus areas and developer identity
- Works section featuring selected projects such as Seelai, AlgoVerse, ODCI Tracker, and Jayann's Store
- Certifications section for training and professional development highlights
- Tech stack section summarizing his tools and technologies
- Journey/Gallery section that presents milestones and visual content
- Additional pages for projects, certificate details, gallery, and tech stack information
- A built-in AI chatbot powered by the Google AI SDK that answers questions about his profile and work

## Main technologies

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion for animations and transitions
- Lenis for smooth scrolling
- next-themes for dark/light mode support
- lucide-react for icons
- AI SDK and Google AI integration for the chatbot

## Project structure

- app/page.tsx — main landing page and portfolio experience
- app/layout.tsx — global layout, metadata, and theme provider setup
- app/components/ — reusable UI pieces such as navigation, footer, chatbot, theme toggle, cursor, and magnetic effects
- app/sections/ — major section components for the homepage
- app/api/chat/route.ts — API endpoint for the portfolio chatbot
- app/projects, app/gallery, app/certificate, app/tech-stack — route-based informational pages

## Features

- Animated loading experience for first-time visitors
- Responsive navigation with a mobile menu
- Custom cursor and motion-rich interface
- Dark/light theme toggle with view-transition styling
- SEO-friendly metadata and custom favicon
- AI assistant integrated into the portfolio for visitor questions

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open http://localhost:3000 in your browser.

## Environment setup

The chatbot feature uses the Google AI SDK. If you want the chat endpoint to work locally, make sure the required Google AI environment variable is configured in your environment.

## Contact

- Email: angelitodecatoriaa@gmail.com
- GitHub: github.com/onetwothird
- LinkedIn: linkedin.com/in/angelito-decatoria
