<div align="center">
# 🗳️ PollApp
 
**Collect Feedback, Unlock Ideas**
 
Create and share surveys in minutes – from team events to workplace culture.
Collect opinions, engage your audience and watch the results come in live.
 
<img width="820" height="420" alt="landingpage" src="https://github.com/user-attachments/assets/85b8ccb4-4c71-4db1-bc0f-599549197ade" />
</div>
---
 
## 📑 Table of Contents
 
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
---
 
## ✨ Features
 
- 📝 **Create surveys** – name, optional description, category and end date
- ❓ **Flexible questions** – add as many questions and answers as you need, with optional multiple choice
- ⏳ **Ending soon** – the surveys that close next are highlighted on the start page
- 🗂️ **Filter & sort** – switch between active and past surveys and sort by category
- 📊 **Live results** – votes are shown instantly as percentage bars next to the survey
- 📱 **Responsive** – works on desktop and mobile
- ☁️ **Supabase backend** – surveys, questions and votes are stored in the cloud
---
 
## 📸 Screenshots
 
### Survey overview
 
Ending-soon highlights, active / past filter and category sorting.
 
<img width="780" height="779" alt="survey-overview" src="https://github.com/user-attachments/assets/e9a63718-3bf0-4753-a081-f9781842b3ee" />
### Create a new survey
 
Add a name, category, end date, description and any number of questions and answers.
 
<img width="816" height="680" alt="create-survey" src="https://github.com/user-attachments/assets/aafc331e-aa85-4f4a-b20c-59d1fa90f64c" />
### Vote & live results
 
Answer the questions and follow the results live.
 
<img width="836" height="839" alt="survey-details" src="https://github.com/user-attachments/assets/82e1d884-e6c6-4299-9f0a-46b150431f23" />
---
 
## 🛠️ Tech Stack
 
| Area     | Technology                                                |
| -------- | --------------------------------------------------------- |
| Frontend | [Angular 19](https://angular.dev) (standalone components) |
| Language | TypeScript                                                |
| Styling  | SCSS (abstracts, base & component partials)               |
| Backend  | [Supabase](https://supabase.com) (PostgreSQL)             |
| Testing  | Jasmine & Karma                                           |
 
---
 
## 🚀 Getting Started
 
### Prerequisites
 
- [Node.js](https://nodejs.org) (LTS)
- [Angular CLI](https://angular.dev/tools/cli) – `npm install -g @angular/cli`
### Installation
 
```bash
# Clone the repository
git clone https://github.com/MarcoHantel/PollApp.git
cd PollApp
 
# Install dependencies
npm install
 
# Start the development server
ng serve
```
 
Then open **http://localhost:4200/** in your browser. The app reloads automatically when you change a source file.
 
---
 
## 📂 Project Structure
 
```text
src/
├── app/
│   ├── interfaces/          # Data models (Survey, Question, Answer)
│   ├── pages/
│   │   ├── landingpage/     # Hero, "Your surveys", survey overview
│   │   ├── create-survey/   # Form to create a new survey
│   │   └── survey/          # Survey details, voting & live results
│   ├── service/             # Supabase client & survey services
│   └── shared/header/       # App header
└── styles/                  # Colours, breakpoints, fonts, buttons
```
 
### Routes
 
| Path                  | Page               |
| --------------------- | ------------------ |
| `/`                   | Landing page       |
| `/create-survey`      | Create a survey    |
| `/survey-details/:id` | Vote & see results |
 
---
 
## 📜 Available Scripts
 
| Command    | Description                                      |
| ---------- | ------------------------------------------------ |
| `ng serve` | Start the dev server on `http://localhost:4200/` |
| `ng build` | Production build into `dist/`                    |
| `ng test`  | Run unit tests with Karma                        |
 
---
 
<div align="center">
Made with ☕ and Angular at the [Developer Akademie München](https://developerakademie.com/) by [Marco Hantel](https://github.com/MarcoHantel)
 
</div>
