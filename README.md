# EduConnect - MTN South Africa Education Solutions

A modern, responsive web portal for MTN South Africa's education connectivity solutions, built with Hono, TypeScript, and deployed on Cloudflare Pages.

## 🌟 Features

- **Authentication**: OTP-based login via phone or email with smart redirect
- **User Onboarding**: 4-step KYC wizard with document upload
- **Solution Builder**: Three-panel configuration tool with AI assistant
- **Build History**: Manage multiple builds with status tracking
- **Configuration Wizard**: Multi-step form (Persons → Sites → Assets → Review)
- **AI Assistant**: Real-time configuration suggestions and recommendations
- **MTN Branding**: Full MTN brand identity with custom fonts and colors
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Modern UI/UX**: Clean, professional interface with smooth animations
- **Demo Mode**: Console-based OTP logging for development

## 🚀 Live Demo

**Staging**: https://3000-imicgew3ou1gczsoru91u-6532622b.e2b.dev

## 📸 Screenshots

### Landing Page
Professional hero section with MTN branding and login options.

### OTP Verification
6-digit OTP input with countdown timer and auto-advance.

## 🛠️ Tech Stack

- **Runtime**: Cloudflare Workers (Edge)
- **Framework**: Hono (TypeScript)
- **Build Tool**: Vite
- **Process Manager**: PM2 (development)
- **Styling**: Custom CSS + Tailwind CSS (CDN)
- **Fonts**: MTN Brighter Sans (Regular, Light, Bold)

## 📁 Project Structure

```
educonnect/
├── src/
│   └── index.tsx           # Main Hono application
├── public/
│   └── static/
│       ├── css/
│       │   └── design-system.css  # MTN design system
│       ├── fonts/
│       │   ├── MTNBrighterSans-Regular.ttf
│       │   ├── MTNBrighterSans-Light.ttf
│       │   └── MTNBrighterSans-Bold.ttf
│       └── images/
│           ├── logos/
│           │   └── mtn-educonnect-logo.png
│           └── hero/
│               └── classroom-hero.jpg
├── vite.config.ts         # Vite configuration
├── wrangler.jsonc         # Cloudflare configuration
├── ecosystem.config.cjs   # PM2 configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Design System

### Colors
- **MTN Yellow**: `#FFCB00`
- **MTN Black**: `#000000`
- **MTN White**: `#FFFFFF`

### Typography
- **Font Family**: MTN Brighter Sans
- **Weights**: Light (300), Regular (400), Bold (700)

### Components
- Buttons (primary, secondary, outline)
- Form inputs with focus states
- Cards with shadows
- Modal dialogs
- OTP input fields

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/amper8and/educonnect_v01.git
cd educonnect_v01

# Install dependencies
npm install

# Build project
npm run build

# Start development server
pm2 start ecosystem.config.cjs

# Or use npm script
npm run dev:sandbox
```

### Available Scripts

```bash
npm run dev              # Start Vite dev server
npm run dev:sandbox      # Start Wrangler dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run deploy           # Deploy to Cloudflare Pages
npm run clean-port       # Kill process on port 3000
npm test                 # Test local server
```

## 🔐 Authentication Flow

1. **Login**: User enters phone number or email
2. **OTP Request**: System generates 6-digit OTP (logged to console in demo mode)
3. **OTP Verification**: User enters OTP code
4. **Success**: Redirect to dashboard

### Demo Mode
- Any phone number or email accepted
- OTP logged to console (check PM2 logs)
- Any 6-digit OTP code accepted for verification

### Test Accounts
- **New User**: Any phone/email → redirects to onboarding
- **Admin**: +27123456789 or admin@educonnect.mtn.co.za → redirects to dashboard
- **Account Manager**: +27987654321 or account@school.co.za → redirects to dashboard

## 🔨 Solution Builder

### Features
- **Three-Panel Layout**: Build history, configuration wizard, AI assistant
- **Build Management**: Create, save, and load builds with status tracking
- **Multi-Step Wizard**: 
  1. **Persons**: Configure users (learners, educators, admins, parents)
  2. **Sites**: Define campus locations and coverage requirements
  3. **Assets**: Select hardware and bandwidth requirements
  4. **Review**: Summary of configuration with coverage verification
- **AI Assistant**: Real-time chat with configuration recommendations
- **LocalStorage**: Builds saved locally for demo mode
- **Mobile Responsive**: Collapsible sidebars for mobile devices

### Build Statuses
- **Draft**: Work in progress
- **Saved**: Configuration completed
- **Offered**: Proposal sent to customer
- **Active**: Deployed and active

### API Endpoints
```
GET    /api/builds           # List all builds
GET    /api/builds/:id       # Get specific build
POST   /api/builds           # Create new build
PUT    /api/builds/:id       # Update existing build
DELETE /api/builds/:id       # Delete build
POST   /api/ai/chat          # AI assistant chat
POST   /api/coverage/check   # Check network coverage
```

## 🌐 Deployment

### Cloudflare Pages

```bash
# Build project
npm run build

# Deploy to Cloudflare
npm run deploy
```

### Environment Variables
No environment variables required for demo mode.

## 📊 Current Status

**Version**: 1.0.1  
**Status**: ✅ Solution Builder Complete  
**Last Updated**: 2026-02-06

### Completed Features
- ✅ Landing page with hero section
- ✅ Phone/email login forms  
- ✅ OTP modal with 6-digit input
- ✅ OTP API endpoints (demo mode)
- ✅ User state tracking (new vs returning)
- ✅ Success modal with redirect
- ✅ 4-step KYC onboarding wizard
- ✅ Document upload (drag & drop)
- ✅ Dashboard with navigation
- ✅ **Solution Builder** (Three-panel layout)
  - ✅ Left panel: Build history with status badges
  - ✅ Center panel: Configuration wizard (4 steps)
  - ✅ Right panel: AI assistant chat
  - ✅ Mobile responsive design
- ✅ Build management API endpoints
- ✅ AI assistant API (mock responses)
- ✅ Coverage check API
- ✅ MTN brand identity
- ✅ Responsive design
- ✅ Custom fonts loaded

### Upcoming Features
- ⏳ Commercials & pricing page
- ⏳ Checkout flow with payment
- ⏳ Orders management
- ⏳ Admin panel
- ⏳ Analytics dashboard
- ⏳ Production OTP delivery
- ⏳ Database integration
- ⏳ Real AI integration

## 🤝 Contributing

This is a private project for MTN South Africa.

## 📄 License

Proprietary - All rights reserved by MTN South Africa

## 👥 Contact

**Project**: EduConnect  
**Client**: MTN South Africa  
**Repository**: https://github.com/amper8and/educonnect_v01

---

**Built with ❤️ for Education in South Africa**
