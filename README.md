# InsightCRM - Modern Customer Relationship Management


InsightCRM is a powerful, modern customer relationship management platform built with React and TypeScript. It helps businesses manage customer relationships, create targeted campaigns, and gain valuable insights through AI-powered analytics.

## Features

- 📊 **Interactive Dashboard** - Real-time metrics and performance insights
- 👥 **Customer Management** - Comprehensive customer profiles and segmentation
- 📈 **Smart Segmentation** - Create precise audience segments with an intuitive rule builder
- 📧 **Campaign Management** - Design and execute targeted marketing campaigns
- 🤖 **AI-Powered Insights** - Get intelligent suggestions and campaign analysis
- 📱 **Responsive Design** - Seamless experience across all devices
- 🔒 **Secure Authentication** - Google OAuth integration for secure access

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router v6
- **Charts**: Chart.js with React-Chartjs-2
- **Icons**: Lucide React
- **Authentication**: Google OAuth
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- Google OAuth Client ID

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/insight-crm.git
   cd insight-crm
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google OAuth API
4. Configure the OAuth consent screen
5. Create credentials (OAuth client ID)
6. Add authorized JavaScript origins:
   - `http://localhost:5173` (for development)
   - Your production domain (when deploying)

## Project Structure

```
src/
├── components/     # Reusable UI components
├── layouts/        # Page layouts and templates
├── pages/          # Route components
├── services/       # API and external service integrations
├── stores/         # Global state management
├── types/          # TypeScript type definitions
└── utils/         # Helper functions and utilities
```

## Features in Detail

### Dashboard
- Real-time performance metrics
- Campaign success tracking
- Customer engagement analytics
- Interactive data visualizations

### Customer Management
- Detailed customer profiles
- Activity tracking
- Purchase history
- Communication logs

### Campaign Management
- Multi-step campaign creation
- AI-powered message suggestions
- Audience targeting
- Performance tracking

### Segment Builder
- Rule-based segmentation
- Real-time audience size calculation
- Reusable segment templates
- Advanced filtering options

