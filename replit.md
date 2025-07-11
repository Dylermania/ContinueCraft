# CompatHub - Mobile App Compatibility Checker

## Overview

CompatHub is a mobile-first web application designed to help users determine app compatibility with their devices and provide emulation solutions when apps are incompatible. Built as a Progressive Web App (PWA), it offers a native-like mobile experience while maintaining cross-platform compatibility.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS with shadcn/ui component library for modern, responsive design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for fast development and optimized production builds
- **PWA Support**: Service worker implementation for offline capabilities

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for consistency across the stack
- **API Pattern**: RESTful API design with structured error handling
- **Development Integration**: Vite middleware for seamless development experience

### Mobile-First Design
- **Target Platform**: Mobile devices (Android-first approach)
- **UI Framework**: Responsive design using Tailwind CSS breakpoints
- **Component Library**: Radix UI primitives with custom styling via shadcn/ui
- **Navigation**: Bottom navigation for mobile-optimized user experience

## Key Components

### Core Features
1. **Device Detection**: Automated scanning of device specifications including OS version, CPU architecture, RAM, GPU, and storage
2. **App Compatibility Checking**: Analysis of app requirements against device capabilities
3. **Emulation Options**: Virtual container solutions for incompatible apps
4. **App Management**: Personal library of tested apps with compatibility history

### Database Schema
- **Users**: User profiles and authentication data
- **Devices**: Device specifications and performance metrics
- **Apps**: Application metadata including system requirements
- **Compatibility Checks**: Historical compatibility test results

### UI/UX Components
- **Glassmorphism Design**: Modern glass-like visual effects throughout the interface
- **Progressive Loading**: Smooth transitions and loading states
- **Responsive Cards**: Flexible layout components for different screen sizes
- **Interactive Elements**: Touch-optimized buttons and controls

## Data Flow

### User Journey
1. **Splash Screen** → Initial app loading with branding
2. **Home Dashboard** → Overview of compatibility statistics and quick actions
3. **Device Scanning** → Automated detection of device specifications
4. **App Selection** → Choose from popular apps or upload custom APK
5. **Compatibility Analysis** → Real-time compatibility assessment
6. **Results & Solutions** → Display compatibility status with emulation options if needed

### API Communication
- **Device Detection**: POST /api/devices/detect
- **App Search**: GET /api/apps/search?q={query}
- **Popular Apps**: GET /api/apps/popular
- **Compatibility Check**: Real-time analysis using device and app data

## External Dependencies

### Core Libraries
- **React Ecosystem**: React 18, React Query, React Hook Form
- **UI Components**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Development**: Vite, TypeScript, ESBuild

### Database & Storage
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless database
- **Schema Management**: Drizzle Kit for migrations

### Mobile PWA Features
- **Service Worker**: Custom implementation for offline functionality
- **Web Manifest**: Progressive Web App configuration
- **Responsive Design**: Mobile-first approach with desktop compatibility

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized static assets to dist/public
- **Backend**: ESBuild bundles server code for production deployment
- **Development**: Integrated dev server with HMR via Vite middleware

### Environment Configuration
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Development**: Local development with hot module replacement
- **Production**: Optimized builds with static asset serving

### Performance Optimizations
- **Code Splitting**: Lazy loading for optimal bundle sizes
- **Asset Optimization**: Minified CSS and JavaScript
- **Caching Strategy**: Service worker implementation for offline capabilities
- **Mobile Performance**: Touch-optimized interactions and animations

The application follows modern web development best practices with a focus on mobile user experience, type safety, and maintainable architecture. The glassmorphism design system provides a cohesive visual identity while the component-based architecture ensures scalability and reusability.