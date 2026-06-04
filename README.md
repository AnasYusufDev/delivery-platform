# AllEats

A food delivery app I built from scratch — users can browse nearby restaurants and place orders from their phone.

## 🔗 Live Demo
[Visit AllEats](https://delivery-platform-cyan.vercel.app)

---

## Stack
**Frontend** — React Native (Expo) + TypeScript, using Expo Router for navigation.
**Backend** — Spring Boot (Java), exposing a REST API.

---

## Project Structure

app/
├── frontend/    # React Native mobile app
└── backend/     # Spring Boot API

---

## Running locally

### Frontend

cd frontend
npm install
npx expo start --tunnel

Scan the QR code with Expo Go on your phone.

### Backend

cd backend
./mvnw spring-boot:run

API runs on http://localhost:8080.

---

## Environment
Create a .env in the frontend folder:

API_URL=http://localhost:8080

---

## Status
MVP is complete. Core ordering flow, menu browsing, cart and order confirmation are all done.

## Next steps
Authentication, payments, and general improvements to the app.

Built by [Anas Yusuf](https://github.com/AnasYusufDev)
