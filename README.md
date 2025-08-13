# Tech Stack Demo

A modern web application built with Astro, Vue, and deployed on Cloudflare, featuring Appwrite as the backend service.

## 🚀 Tech Stack

- **Frontend Framework**: [Astro](https://astro.build/) - The web framework for content-driven websites
- **UI Framework**: [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
- **State Management**: [Nanostores](https://github.com/nanostores/nanostores) - Tiny state manager
- **Backend**: [Appwrite](https://appwrite.io/) - Open-source backend server
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/) - JAMstack platform
- **Language**: TypeScript - Type-safe JavaScript

## 📁 Project Structure

```
/
├── public/          # Static assets
├── src/
│   ├── components/  # Vue components
│   ├── composable/  # Vue composables
│   ├── lib/         # Utility libraries
│   ├── pages/       # Astro pages (file-based routing)
│   ├── schemas/     # Data validation schemas
│   ├── stores/      # Nanostores state management
│   └── views/       # Vue views/pages
├── functions/       # Cloudflare Workers functions
└── dist/           # Built site (auto-generated)
```

## 🛠️ Development

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd tech-stack-demo

# Install dependencies
pnpm install
```

### Development Server

```bash
# Start the development server
pnpm dev
```

The site will be available at `http://localhost:4321`

### Build

```bash
# Build for production
pnpm build

# Preview the build
pnpm preview
```

## 🚀 Deployment

This project is configured for deployment on Cloudflare Pages with Cloudflare Workers for serverless functions.

### Environment Variables

Create a `.env` file in the root directory with your configuration:

```env
# Add your environment variables here
# Example:
# APPWRITE_ENDPOINT=https://your-appwrite-endpoint
# APPWRITE_PROJECT_ID=your-project-id
```

## 📝 Features

- Server-side rendering with Astro
- Interactive components with Vue 3
- Type-safe development with TypeScript
- Modern state management with Nanostores
- Backend integration with Appwrite
- Serverless functions with Cloudflare Workers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
