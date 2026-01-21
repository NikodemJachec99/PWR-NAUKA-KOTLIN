

# 🎓 Android Learning Platform

**An interactive learning platform for mastering Android Development & Kotlin**

[![Made with React](https://img.shields.io/badge/Made%20with-React%2019-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

---

## 📖 About

**Android Master** is an interactive web-based learning application designed to help developers master advanced Android development concepts. It features:

- 📚 **19 Comprehensive Topics** - Deep-dive content covering OOP, Kotlin, Android System, UI, and Connectivity.
- 📝 **Exam Prep Module** - Condensed "Minimum Theory" for quick review plus a dedicated 34-question exam.
- 🎯 **Interactive Quizzes** - Topic-specific tests and a cumulative "All-in-One" examination.
- 🎬 **Video Lectures** - Integrated video player for watching educational content.
- ⚡ **Enhanced Rendering** - Rich markdown support for tables, code blocks, and technical diagrams.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

### Installation & Running

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** at `http://localhost:3000`

---

## 📂 Project Structure

```
kotlin-learning/
├── components/            # React UI Library
│   ├── ExamModule.tsx     # NEW: Exam prep & dedicated quiz
│   ├── VideoPlayer.tsx    # NEW: MP4 lecture integration
│   ├── TopicViewer.tsx    # Enhanced Markdown & GFM renderer
│   ├── FlashcardsViewer.tsx
│   └── CodeBlock.tsx      # Syntax highlighting
├── data/
│   └── courseContent.ts   # 19 Topics & 150+ Quiz questions
├── types.ts               # Core data structures
└── public/videos/         # Storage for .mp4 lectures
```

---

## 📚 Course Content (19 Topics)

### OOP
- Objects & Classes: JVM Internals
- Class Taxonomy (Abstract vs Interface)
- Inheritance & Polymorphism Strategies

### Kotlin
- Data vs Enum: Bytecode Analysis
- Async: Threads vs Coroutines
- Kotlin vs Java: Interop & Safety
- Sealed Classes & Restricted Hierarchies

### Android System
- Activity Internals & Lifecycle
- Context Management & Memory Leaks
- Notification Channels & Architecture
- FCM & Push Push Mechanics

### Android UI
- Advanced Layout Rendering (Constraint vs Linear)
- Jetpack Compose: Declarative Internals
- RecyclerView: ViewHolder Pattern & Recycling
- ScrollView Performance Pitfalls

### Connectivity
- API Security & Key Management
- Google Maps: SDK Setup & Lite Mode
- OpenGL ES Rendering in Maps

---

## 💻 Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| TypeScript 5.8 | Type-safety |
| React Markdown | Rich Content Rendering |
| Remark GFM | GitHub Flavored Markdown (Tables, etc.) |
| TailwindCSS | Premium Aesthetics |

---

## 🧪 Testing Your Knowledge

1. **Topic Quizzes**: Available at the end of each module.
2. **📝 EXAM PREP**: Specialized "Minimum Form" quiz (34 Qs) and Theory.
3. **🎓 QUIZ**: Global cumulative exam pooling all questions.

---

<div align="center">

**Happy Learning! 🚀**

</div>
