# OceanExplorer - Educational Marine Research Platform

## Overview

OceanExplorer is a comprehensive educational marine research platform that combines real marine biology data with advanced AI capabilities. The application features a comprehensive fish database, floating OceanRobot AI assistant powered by both OpenAI and Google Gemini, and interactive ocean zone exploration. Built with modern web technologies, it provides scientifically accurate marine life information suitable for learners of all ages.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type safety and modern component patterns
- **Tailwind CSS** for utility-first styling with custom ocean-themed design system
- **Wouter** as a lightweight routing solution
- **TanStack Query** for efficient data fetching, caching, and state management
- **Minimal UI Components** approach using Radix UI primitives with custom styling
- **Vite** for fast development and optimized builds

### Backend Architecture
- **Express.js** with TypeScript for robust API server
- **RESTful API** design with structured endpoints for marine data
- **Session-based architecture** with PostgreSQL session storage
- **Modular service layer** separating AI services, data management, and business logic
- **Real-time AI integration** with both OpenAI and Google Gemini APIs

### Database Architecture
- **PostgreSQL** as the primary database for persistent storage
- **Drizzle ORM** for type-safe database operations and schema management
- **Relational data model** with normalized tables for marine species, research papers, ocean zones, and conservation data
- **Automated seeding** of real marine biology data for development environments

## Key Components

### AI Services
- **OpenAI GPT-4o-mini** for primary chat functionality with full tool access
- **Google Gemini 2.5 Flash** for enhanced research insights and image analysis
- **Unified AI response system** combining both models for comprehensive answers
- **Web search integration** for accessing current marine research
- **Specialized AI tools** for species identification, conservation planning, and educational content generation

### Data Management
- **Marine Species Database** with comprehensive species information including conservation status, habitat data, and behavioral characteristics
- **Research Papers Repository** for current oceanographic discoveries
- **Ocean Zones Data** with detailed environmental conditions and species distribution
- **Conservation Tips** for marine protection efforts

### User Interface Components
- **Species Cards** with detailed marine life information and conservation status indicators
- **Ocean Zones Visualization** with interactive zone exploration
- **Floating AI Assistant** (OceanRobot) with chat interface
- **Search and Filtering** capabilities across all data types
- **Responsive Design** optimized for both desktop and mobile experiences

## Data Flow

### Client-Server Communication
1. **Client requests** are made through TanStack Query for efficient caching
2. **API endpoints** handle data retrieval and AI service orchestration
3. **Database queries** are executed through Drizzle ORM with type safety
4. **Real-time AI processing** combines multiple AI models for enhanced responses
5. **Response caching** at both client and server levels for optimal performance

### AI Processing Pipeline
1. **User input** is processed and categorized by type (species, research, etc.)
2. **OpenAI API** provides primary research and analysis capabilities
3. **Google Gemini** enhances responses with additional insights and image analysis
4. **Web search integration** adds current research and discoveries
5. **Unified response** combines all sources for comprehensive answers

## External Dependencies

### AI Services
- **OpenAI API** (GPT-4o-mini) for primary chat functionality
- **Google Gemini API** (2.5 Flash) for enhanced insights and image analysis

### Database Services
- **PostgreSQL** for data persistence (via Neon serverless)
- **Connection pooling** for efficient database resource management

### Development Tools
- **Vite** for development server and build optimization
- **TypeScript** for static type checking across the entire stack
- **Tailwind CSS** for utility-first styling
- **Drizzle Kit** for database migrations and schema management

## Deployment Strategy

### Development Environment
- **Replit integration** with automatic environment setup
- **Hot module replacement** for rapid development
- **Automatic database seeding** with real marine data
- **Environment variable management** for API keys and database connections

### Production Deployment
- **Autoscale deployment** target for dynamic resource allocation
- **Build optimization** with Vite for frontend assets
- **esbuild** for backend bundling and optimization
- **Static asset serving** with Express for production builds

### Database Management
- **Drizzle migrations** for schema versioning
- **Automated seeding** for initial data population
- **Connection pooling** for production scalability

## Changelog

- June 24, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.