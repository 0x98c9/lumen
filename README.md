# Lumen – Shadow Self Journal

Lumen is a privacy-first journaling and mood tracking web app designed to help you reflect, grow, and improve your emotional well-being. All your data stays on your device—no accounts, no cloud storage, no tracking. Lumen is free, beautiful, and simple to use.

## ✨ Features

- **Journaling**: Write daily entries in a distraction-free, rich text editor. Organize your thoughts with tags and search through your reflections easily.
- **Mood Tracking**: Record your mood each day, add notes, and visualize patterns over time to better understand your emotional journey.
- **Self-Discovery**: Gain insights from your journal and mood data to foster personal growth and self-awareness.
- **Complete Privacy**: All data is stored locally in your browser. No data ever leaves your device.
- **No Accounts Required**: Use Lumen instantly—no sign-up, no login, no cloud.
- **Modern UI**: Enjoy a beautiful, responsive, and accessible interface with smooth animations and thoughtful design.

## 🛡️ Privacy Promise

Lumen is built with privacy at its core. Everything you write stays private—only on your device. There are no accounts, no cloud storage, and no tracking. Your thoughts and feelings are yours alone.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [Bun](https://bun.sh/) (if you prefer Bun over npm/yarn)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/0x98c9/lumen.git
   cd lumen
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   bun install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   # or
   bun run dev
   ```
4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## 🖥️ Project Structure

- `src/pages/` – Main pages (Index, Journal, MoodTracker, Stats, etc.)
- `src/components/` – UI components (Button, Card, MotionSection, etc.)
- `src/lib/` – Utility and storage logic
- `public/` – Static assets

## 🧩 Tech Stack
- **React** (with Vite)
- **TypeScript**
- **Framer Motion** (animations)
- **Tailwind CSS** (styling)
- **Lucide Icons** (iconography)

## 📝 Usage
- **Start Writing**: Click "Start Writing" to create a new journal entry.
- **Track Mood**: Click "Track Mood" to log your current emotional state.
- **View Insights**: Explore the "Stats" page for patterns and self-discovery.
- **Privacy**: All data is stored in your browser's local storage. Clearing your browser data will erase your journal and mood history.

## 💡 Who Is This For?
- Self-growth enthusiasts
- Privacy-conscious users
- Mental wellness seekers
- Anyone looking to improve self-awareness and emotional intelligence

## 📦 Building for Production
```sh
npm run build
# or
bun run build
```
The output will be in the `dist/` folder. Deploy to any static hosting provider (Vercel, Netlify, GitHub Pages, etc).

## 🤝 Contributing
Pull requests and suggestions are welcome! Please open an issue or submit a PR for improvements or bug fixes.

## 📄 License
MIT License. See [LICENSE](LICENSE) for details.

---

**Lumen** – Your private space for reflection and emotional well-being.
