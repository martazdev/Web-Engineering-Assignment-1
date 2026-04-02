# NexusID — Sign-Up & Login Form Pages

## What Was Built

Premium authentication form templates (front-end only) with a modern dark-themed design, built for the group project by **Martaz Ahmad**, **Danial Ahmad Khadim**, and **Danial Ahmad Anwar**.

---

## Pages Created

### 1. Sign-Up Page (`signup.html`)

Multi-step registration form with 3 stages:

| Step | Name | Fields |
|------|------|--------|
| 1 | Personal | First Name, Last Name, Username, Date of Birth, Gender (radio cards) |
| 2 | Contact | Email, Phone, Country (dropdown), Address |
| 3 | Security | Password (with strength meter), Confirm Password, Terms checkbox, Newsletter opt-in |

### 2. Login Page (`login.html`)

Standard login form with:
- Email/Username and Password fields
- "Remember me" checkbox
- "Forgot password?" link → opens a reset password modal
- Social login buttons (Google, Facebook, GitHub)
- Success toast notification on login

---

## Screenshots

````carousel
![Sign-Up Page — Step 1: Personal Information](C:\Users\marta\.gemini\antigravity\brain\867f0572-e877-4cd5-9732-da655f3bd52d\signup_page_preview_1775150847913.png)
<!-- slide -->
![Login Page — Sign In with avatar and social options](C:\Users\marta\.gemini\antigravity\brain\867f0572-e877-4cd5-9732-da655f3bd52d\login_page_preview_1775151124959.png)
````

---

## Key Features

### Design & Visual
- **Dark glassmorphism theme** with animated gradient orbs in background
- **Floating particle effects** for depth
- **Gradient accents** (purple → pink) across buttons, progress bar, and highlights
- **Google Fonts** — Inter + Space Grotesk for premium typography
- **Micro-animations** — hover effects, input focus borders, feature card slides
- **Responsive design** — adapts from desktop to mobile

### Interactive Features
- **3-step progress bar** with animated fill and checkmark completion
- **Real-time form validation** with error messages and shake animation
- **Password strength meter** — 4-bar visual indicator (Weak → Strong)
- **Password requirements checklist** — live checkmarks for each criterion
- **Username availability simulation** — shows ✓ Available or ✗ Taken
- **Show/hide password toggle** on all password fields
- **Gender selection cards** — styled radio buttons
- **Success modal** (Sign-Up) with SVG checkmark animation
- **Toast notification** (Login) with progress bar auto-dismiss
- **Forgot Password modal** with email input and simulated submission

### Code Architecture
- **3 files** — clean separation of concerns:
  - `signup.html` — Sign-up page structure
  - `login.html` — Login page structure
  - `styles.css` — Complete design system with CSS custom properties
  - `script.js` — All interactivity, validation, and animations

---

## Files

| File | Purpose |
|------|---------|
| [signup.html](file:///c:/Users/marta/OneDrive/Documents/Antigravity%20Skills/signup.html) | Multi-step registration form |
| [login.html](file:///c:/Users/marta/OneDrive/Documents/Antigravity%20Skills/login.html) | Login form with forgot password |
| [styles.css](file:///c:/Users/marta/OneDrive/Documents/Antigravity%20Skills/styles.css) | Design system & all styles |
| [script.js](file:///c:/Users/marta/OneDrive/Documents/Antigravity%20Skills/script.js) | Validation, animations, interactivity |

> [!NOTE]
> These are **front-end templates only**. PHP backend integration will be added later as specified.
