import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import WorkoutPlans from './pages/WorkoutPlans';
import Exercises from './pages/Exercises';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import FiveByFivePlan from "./pages/FiveByFivePlan";
import PushPullRoutine from "./pages/PushPullRoutine";
import ThreeHundredWorkout from "./pages/ThreeHundredWorkout";
import BodybuildingPlan from "./pages/BodybuildingPlan";
import AdvancedWorkout from "./pages/AdvancedWorkout"; 
import ScrollToTopButton from "./components/ScrollToTopButton"; 
import Feedback from "./pages/Feedback";
import Supplements from "./pages/Supplements";
import WhatsApp from "./pages/WhatsApp"; 
import Loader from './components/Loader'; 
import ChatBot from './components/ChatBot'; 

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const hideWhatsApp =
    location.pathname === "/login" || location.pathname === "/register";

const hideChatBot =
    location.pathname === "/login" || location.pathname === "/register";
    

  return (
    <AuthProvider>
      {loading && <Loader />} {/* ✅ Fitness loader active */}

      <Navbar />

      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/workout-plans" element={<WorkoutPlans />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/supplements" element={<Supplements />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/plans/5x5" element={<FiveByFivePlan />} />
          <Route path="/plans/push-pull" element={<PushPullRoutine />} />
          <Route path="/plans/300" element={<ThreeHundredWorkout />} />
          <Route path="/plans/bodybuilding" element={<BodybuildingPlan />} />
          <Route path="/plans/advanced" element={<AdvancedWorkout />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </main>

      <Footer />
      <ScrollToTopButton />

      {/* ✅ WhatsApp Floating Button  */}
      {!hideWhatsApp && <WhatsApp />}

      {/* ✅ ChatBot Floating Button */}
      {!hideChatBot && <ChatBot />}
    </AuthProvider>
  );
}