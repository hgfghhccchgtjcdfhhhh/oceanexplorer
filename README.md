# OceanExplorer 🌊

An educational marine research platform with comprehensive fish database, floating OceanRobot AI assistant powered by OpenAI Agent + Gemini unified, and minimal UI components built with React and PostgreSQL.

## Features ✨

- **Comprehensive Marine Life Database**: Real fish species information with detailed characteristics, habitats, and conservation status
- **OceanRobot AI Assistant**: Floating AI assistant (Wix-style) powered by OpenAI GPT-4o-mini with ALL tools enabled + Gemini 2.5 Flash for enhanced insights
- **Interactive Ocean Zones**: Explore the 5 ocean zones with unique conditions and marine life
- **Latest Marine Research**: Access current oceanographic discoveries and research papers
- **Conservation Hub**: Learn about marine conservation efforts and how to help protect our oceans
- **Web Search Integration**: AI-powered research with web search capabilities for latest marine discoveries
- **Educational Content**: Scientifically accurate information suitable for learners of all ages

## Tech Stack 🛠️

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling with custom ocean theme
- **Wouter** for routing
- **TanStack Query** for data fetching and caching
- **Lucide React** for icons
- **Minimal UI Components** - kept lean to avoid component bloat

### Backend
- **Express.js** with TypeScript
- **PostgreSQL** with Drizzle ORM for marine life data
- **OpenAI Agent** (GPT-4o-mini) with ALL tools enabled
- **Google Gemini 2.5 Flash** for enhanced research insights
- **Web search integration** for current marine research
- **Real marine biology data** - no mock data

### Database
- **PostgreSQL** for persistent storage
- **Drizzle ORM** for type-safe database operations
- Tables for marine species, research papers, ocean zones, and conservation tips

## AI Capabilities 🤖

### OceanRobot Features
- **Species Identification**: AI-powered marine life identification from descriptions
- **Research Analysis**: Comprehensive research with web search integration
- **Conservation Planning**: Generate conservation strategies for endangered species
- **Educational Content**: Create learning materials for different skill levels
- **Image Analysis**: Analyze ocean/marine images using Gemini vision capabilities
- **Unified AI Response**: Combines OpenAI and Gemini for comprehensive answers

### AI Models Used
- **OpenAI GPT-4o-mini**: Primary research and chat capabilities with ALL tools
- **Google Gemini 2.5 Flash**: Enhanced insights and research analysis
- **Web Search Integration**: Real-time access to latest marine research

## Getting Started 🚀

### Prerequisites
- Node.js 18+
- PostgreSQL database
- OpenAI API key
- Google Gemini API key

### Environment Variables
```bash
DATABASE_URL=your_postgresql_connection_string
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
