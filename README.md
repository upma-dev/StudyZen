# StudyZen - AI-Powered Study Management Application

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase" alt="Firebase">
</p>

> Learn Smarter with AI-Powered Study Assistance

## ✨ Features

### 📚 Core Features
- **Task Management** - Create, organize, and track your study tasks with priorities and due dates
- **Notes Editor** - Rich text note-taking with markdown support
- **Focus Mode** - Distraction-free study sessions with timer and AI assistance

### 🤖 AI-Powered Features
- **AI Assistant Chatbot** - Get instant answers to academic questions
- **Study Coach** - Receive personalized study tips and motivation
- **Focus Mode Assistant** - AI-guided focus sessions with breaks

### 🔐 Authentication
- **Google Sign-In** - Secure authentication via Firebase Google OAuth

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [TailwindCSS](https://tailwindcss.com/) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) |
| Authentication | [Firebase Auth](https://firebase.google.com/docs/auth) |
| Icons | [Lucide React](https://lucide.dev/) |
| AI Integration | [Google Genkit](https://genkit.google/) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Firebase project (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
task-manager/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── focus/             # Focus mode page
│   │   ├── notes/             # Notes page
│   │   └── tasks/              # Tasks page
│   ├── ai/                    # AI flows and integrations
│   │   └── flows/             # Genkit AI flows
│   ├── components/            # React components
│   │   ├── auth/              # Authentication components
│   │   ├── dashboard/         # Dashboard components
│   │   ├── focus/             # Focus mode components
│   │   ├── home/              # Home page components
│   │   ├── layout/            # Layout components
│   │   ├── notes/             # Notes components
│   │   ├── tasks/             # Task components
│   │   ├── ui/                # UI components (shadcn/ui)
│   │   └── providers/          # Context providers
│   ├── contexts/              # React contexts
│   │   └── AuthContext.tsx    # Authentication context
│   ├── hooks/                 # Custom React hooks
│   └── lib/                   # Utility libraries
│       ├── firebase.ts        # Firebase configuration
│       ├── types.ts           # TypeScript types
│       └── utils.ts           # Utility functions
├── public/                    # Static assets
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts       # TailwindCSS configuration
└── package.json             # Dependencies
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 📱 Pages

- **`/`** - Landing page / Dashboard (authenticated)
- **`/tasks`** - Task management
- **`/notes`** - Note taking
- **`/focus`** - Focus mode with timer

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">Built with ❤️ using Next.js and Firebase</p>
