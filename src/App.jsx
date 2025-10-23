import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import WorkoutPlans from './pages/WorkoutPlans';
import Exercises from './pages/Exercises';
import ExerciseDetail from './pages/ExerciseDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import FiveByFivePlan from "./pages/FiveByFivePlan";
import PushPullRoutine from "./pages/PushPullRoutine";
import ThreeHundredWorkout from "./pages/ThreeHundredWorkout";
import BodybuildingPlan from "./pages/BodybuildingPlan";
import ScrollToTopButton from "./components/ScrollToTopButton"; 
import Feedback from "./pages/Feedback";
import Supplements from "./pages/Supplements";


export default function App() {
  return (
    <AuthProvider>
      <Navbar />

      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/workout-plans" element={<WorkoutPlans />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
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
          <Route path="/feedback" element={<Feedback />} />


        </Routes>
      </main>

      <Footer />
      <ScrollToTopButton />
    </AuthProvider>
  );
}
