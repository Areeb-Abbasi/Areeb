import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/profile.css";

export default function Profile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { user, loading, logout, updateUser, updateProfilePicture } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
    goal: "",
    activity: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      console.warn("⚠️ No user found, redirecting to login");
      navigate("/login", { replace: true });
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (user) {
      console.log("📝 Initializing form with user:", user);
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
        gender: user.gender || "",
        age: user.age || "",
        height: user.height || "",
        weight: user.weight || "",
        goal: user.goal || "",
        activity: user.activity || ""
      });

      if (user.profilePic) {
        console.log("🖼️ Loading profile picture from user data:", user.profilePic);
        setProfilePic(user.profilePic);
      } else {
        console.log("📸 No profile picture found in user data");
        setProfilePic(null);
      }
    }
  }, [user]);

// FIXED PDF Generation with Multi-page Support
const generatePDF = async () => {
  setIsGeneratingPDF(true);
  try {
    // Calculate all metrics
    const bmiValue = calculateBMI();
    const bmiCat = bmiValue ? getBMICategory(bmiValue) : null;
    const bmrValue = calculateBMR();
    const activityMultiplier = getActivityMultiplier();
    const dailyCal = bmrValue ? (bmrValue * activityMultiplier).toFixed(0) : null;

    // Create separate containers for each page
    const createPageContainer = (content) => {
      const container = document.createElement('div');
      container.style.cssText = `
        position: fixed;
        left: 0;
        top: 0;
        width: 794px;
        height: 1123px;
        background: white;
        padding: 40px;
        font-family: Arial, sans-serif;
        color: #333;
        line-height: 1.4;
        z-index: 9999;
        box-sizing: border-box;
        page-break-after: always;
      `;
      container.innerHTML = content;
      return container;
    };

    // Page 1: Personal Information & Health Metrics
    const page1Content = `
      <div style="width: 100%; max-width: 714px; margin: 0 auto;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #667eea;">
          <h1 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 28px; font-weight: bold;">Fitness Profile Report</h1>
          <p style="color: #7f8c8d; margin: 0; font-size: 14px;">Generated on ${new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>

        <!-- Personal Information -->
        <div style="margin-bottom: 30px; padding: 25px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
          <h2 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Personal Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6; width: 30%; font-weight: bold;">Full Name:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6;">${user.firstName || 'N/A'} ${user.lastName || ''}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">Username:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6;">@${user.username || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6;">${user.email || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">Gender:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6;">${user.gender || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">Age:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6;">${user.age || 'Not specified'} years</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">Height:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6;">${user.height ? `${user.height} cm` : 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">Weight:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6;">${user.weight ? `${user.weight} kg` : 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">Fitness Goal:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6;">${user.goal || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Activity Level:</td>
              <td style="padding: 8px 0;">${user.activity || 'Not specified'}</td>
            </tr>
          </table>
        </div>

        <!-- Health Metrics -->
        ${bmiValue ? `
        <div style="padding: 25px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
          <h2 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Health Metrics & Analysis</h2>
          
          <!-- BMI Section -->
          <div style="margin-bottom: 20px; padding: 20px; background: white; border-radius: 6px; border-left: 4px solid ${bmiCat.color};">
            <h3 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 16px;">Body Mass Index (BMI)</h3>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 24px; font-weight: bold; color: ${bmiCat.color}; margin-bottom: 5px;">${bmiValue}</div>
                <div style="color: #6c757d; font-size: 14px;">${bmiCat.category} Weight Range</div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 14px; color: #495057;">Healthy Range: 18.5 - 24.9</div>
                <div style="font-size: 12px; color: #6c757d;">Based on WHO standards</div>
              </div>
            </div>
          </div>

          <!-- Calorie Metrics -->
          <div style="display: flex; gap: 20px; margin-bottom: 20px;">
            <div style="flex: 1; padding: 20px; background: white; border-radius: 6px; border-left: 4px solid #28a745;">
              <h3 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 14px;">Basal Metabolic Rate (BMR)</h3>
              <div style="font-size: 20px; font-weight: bold; color: #28a745; margin-bottom: 5px;">${bmrValue ? bmrValue.toFixed(0) : 'N/A'} calories</div>
              <div style="color: #6c757d; font-size: 12px;">Calories burned at complete rest</div>
            </div>
            
            <div style="flex: 1; padding: 20px; background: white; border-radius: 6px; border-left: 4px solid #fd7e14;">
              <h3 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 14px;">Daily Calorie Needs</h3>
              <div style="font-size: 20px; font-weight: bold; color: #fd7e14; margin-bottom: 5px;">${dailyCal || 'N/A'} calories</div>
              <div style="color: #6c757d; font-size: 12px;">Based on ${user.activity?.toLowerCase() || 'current'} activity level</div>
            </div>
          </div>

          <!-- Activity Info -->
          <div style="padding: 15px; background: #e7f3ff; border-radius: 6px; border: 1px solid #b3d9ff;">
            <div style="font-size: 14px; color: #0066cc;">
              <strong>Activity Multiplier:</strong> ${activityMultiplier}x (${user.activity || 'Not specified'})
            </div>
          </div>
        </div>
        ` : ''}
      </div>
    `;

    // Page 2: Workout Statistics
    const page2Content = `
      <div style="width: 100%; max-width: 714px; margin: 0 auto;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #667eea;">
          <h1 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 28px; font-weight: bold;">Fitness Profile Report</h1>
          <p style="color: #7f8c8d; margin: 0; font-size: 14px;">Page 2 of 3</p>
        </div>

        <!-- Workout Statistics -->
        <div style="margin-bottom: 30px; padding: 25px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
          <h2 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Workout Statistics & History</h2>
          
          <!-- Stats Grid -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 25px;">
            <div style="text-align: center; padding: 20px; background: white; border-radius: 8px; border: 1px solid #e9ecef;">
              <div style="font-size: 28px; font-weight: bold; color: #667eea; margin-bottom: 8px;">12</div>
              <div style="color: #6c757d; font-size: 14px;">Workouts This Month</div>
            </div>
            
            <div style="text-align: center; padding: 20px; background: white; border-radius: 8px; border: 1px solid #e9ecef;">
              <div style="font-size: 28px; font-weight: bold; color: #28a745; margin-bottom: 8px;">5</div>
              <div style="color: #6c757d; font-size: 14px;">Current Streak (Days)</div>
            </div>
            
            <div style="text-align: center; padding: 20px; background: white; border-radius: 8px; border: 1px solid #e9ecef;">
              <div style="font-size: 28px; font-weight: bold; color: #fd7e14; margin-bottom: 8px;">8.2</div>
              <div style="color: #6c757d; font-size: 14px;">Avg Hours/Week</div>
            </div>
            
            <div style="text-align: center; padding: 20px; background: white; border-radius: 8px; border: 1px solid #e9ecef;">
              <div style="font-size: 28px; font-weight: bold; color: #dc3545; margin-bottom: 8px;">87%</div>
              <div style="color: #6c757d; font-size: 14px;">Completion Rate</div>
            </div>
          </div>

          <!-- Recent Workouts -->
          <div style="background: white; border-radius: 6px; padding: 20px; border: 1px solid #e9ecef;">
            <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 16px;">Recent Workout Sessions</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f8f9fa;">
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6; width: 25%;">Workout</th>
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6; width: 35%;">Details</th>
                  <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6; width: 20%;">Date</th>
                  <th style="padding: 12px; text-align: center; border-bottom: 2px solid #dee2e6; width: 20%;">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #e9ecef;">
                    <div style="font-weight: 500; color: #2c3e50;">Upper Body Strength</div>
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e9ecef;">
                    <div style="color: #6c757d;">45 minutes • Strength Training</div>
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e9ecef;">
                    <div style="color: #495057;">Today</div>
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e9ecef; text-align: center;">
                    <span style="color: #28a745; font-weight: 500;">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #e9ecef;">
                    <div style="font-weight: 500; color: #2c3e50;">Cardio Session</div>
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e9ecef;">
                    <div style="color: #6c757d;">30 minutes • Cardiovascular</div>
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e9ecef;">
                    <div style="color: #495057;">Yesterday</div>
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e9ecef; text-align: center;">
                    <span style="color: #28a745; font-weight: 500;">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #e9ecef;">
                    <div style="font-weight: 500; color: #2c3e50;">Leg Day</div>
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e9ecef;">
                    <div style="color: #6c757d;">60 minutes • Strength Training</div>
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e9ecef;">
                    <div style="color: #495057;">2 days ago</div>
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #e9ecef; text-align: center;">
                    <span style="color: #ffc107; font-weight: 500;">In Progress</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px;">
                    <div style="font-weight: 500; color: #2c3e50;">Yoga & Flexibility</div>
                  </td>
                  <td style="padding: 12px;">
                    <div style="color: #6c757d;">40 minutes • Flexibility</div>
                  </td>
                  <td style="padding: 12px;">
                    <div style="color: #495057;">Tomorrow</div>
                  </td>
                  <td style="padding: 12px; text-align: center;">
                    <span style="color: #6c757d; font-weight: 500;">Planned</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // Page 3: Recommendations
    const page3Content = `
      <div style="width: 100%; max-width: 714px; margin: 0 auto;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #667eea;">
          <h1 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 28px; font-weight: bold;">Fitness Profile Report</h1>
          <p style="color: #7f8c8d; margin: 0; font-size: 14px;">Page 3 of 3</p>
        </div>

        <!-- Recommendations -->
        <div style="margin-bottom: 30px; padding: 25px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
          <h2 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Personalized Recommendations</h2>
          
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <div style="padding: 20px; background: #e7f3ff; border-radius: 6px; border-left: 4px solid #007bff;">
              <h3 style="color: #0056b3; margin: 0 0 10px 0; font-size: 16px;">💪 Workout Plan</h3>
              <div style="color: #004085; font-size: 14px; line-height: 1.5;">
                Based on your <strong>${user.goal?.toLowerCase() || 'fitness'}</strong> goal, focus on ${
                  user.goal === 'Weight Loss' ? 'cardio and HIIT workouts 4-5 times per week' :
                  user.goal === 'Muscle Gain' ? 'strength training with progressive overload 4-5 times per week' :
                  'balanced full-body workouts 3-4 times per week'
                }.
              </div>
            </div>
            
            <div style="padding: 20px; background: #d4edda; border-radius: 6px; border-left: 4px solid #28a745;">
              <h3 style="color: #155724; margin: 0 0 10px 0; font-size: 16px;">🍎 Nutrition Advice</h3>
              <div style="color: #0c5460; font-size: 14px; line-height: 1.5;">
                Maintain daily intake of <strong>${dailyCal || 'appropriate'}</strong> calories with balanced macros: 40% protein, 30% carbs, 30% fats. Stay hydrated with 3-4 liters of water daily.
              </div>
            </div>
            
            <div style="padding: 20px; background: #fff3cd; border-radius: 6px; border-left: 4px solid #ffc107;">
              <h3 style="color: #856404; margin: 0 0 10px 0; font-size: 16px;">📊 Progress Tracking</h3>
              <div style="color: #856404; font-size: 14px; line-height: 1.5;">
                Track ${
                  user.goal === 'Weight Loss' ? 'weekly weight and measurements' :
                  user.goal === 'Muscle Gain' ? 'strength progress and take monthly photos' :
                  'overall fitness levels and endurance'
                } for optimal results. Use the app to monitor your journey and adjust as needed.
              </div>
            </div>

            <div style="padding: 20px; background: #f8d7da; border-radius: 6px; border-left: 4px solid #dc3545;">
              <h3 style="color: #721c24; margin: 0 0 10px 0; font-size: 16px;">🎯 Goal Setting</h3>
              <div style="color: #721c24; font-size: 14px; line-height: 1.5;">
                Set realistic short-term goals and celebrate milestones. Remember that consistency is more important than perfection in your fitness journey.
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding-top: 30px; border-top: 2px solid #e9ecef; color: #6c757d;">
          <p style="margin: 0 0 5px 0; font-size: 14px; font-weight: 500;">Generated by Workout Planner App</p>
          <p style="margin: 0; font-size: 12px;">Your Personal Fitness Companion • ${user.email}</p>
          <p style="margin: 5px 0 0 0; font-size: 10px; color: #adb5bd;">Report completed on ${new Date().toLocaleDateString()}</p>
        </div>
      </div>
    `;

    // Create pages
    const page1 = createPageContainer(page1Content);
    const page2 = createPageContainer(page2Content);
    const page3 = createPageContainer(page3Content);

    // Create a container for all pages
    const pdfWrapper = document.createElement('div');
    pdfWrapper.style.cssText = `
      position: fixed;
      left: 0;
      top: 0;
      width: 794px;
      background: white;
      z-index: 9999;
    `;

    pdfWrapper.appendChild(page1);
    pdfWrapper.appendChild(page2);
    pdfWrapper.appendChild(page3);

    document.body.appendChild(pdfWrapper);

    // Generate PDF for each page
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    
    // Capture and add each page
    for (let i = 0; i < pdfWrapper.children.length; i++) {
      if (i > 0) {
        pdf.addPage();
      }
      
      const page = pdfWrapper.children[i];
      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123,
        windowWidth: 794,
        windowHeight: 1123
      });

      const imgData = canvas.toDataURL('image/png');
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    }

    // Clean up
    document.body.removeChild(pdfWrapper);

    const fileName = `Fitness_Profile_${user.firstName}_${user.lastName}_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
    
    setShowSuccessMessage("📄 PDF downloaded successfully!");
    setTimeout(() => setShowSuccessMessage(""), 3000);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  } finally {
    setIsGeneratingPDF(false);
  }
};

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateProfile = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newProfilePic = e.target.result;
        console.log("🖼️ Uploading new profile picture");

        setProfilePic(newProfilePic);

        if (user?.email) {
          updateProfilePicture(user.email, newProfilePic);
          console.log("✅ Profile picture saved to user data");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      console.log("🔄 Updating profile with data:", updatedData);

      if (updateUser) {
        updateUser(updatedUser);

        const currentEmail = localStorage.getItem("fp_current");
        const users = JSON.parse(localStorage.getItem("fp_users") || "[]");
        const foundUser = users.find(u => u.email === currentEmail);
        console.log("✅ Verification - Current email:", currentEmail);
        console.log("✅ Verification - Found user after update:", foundUser);

        return true;
      } else {
        throw new Error("updateUser function not available");
      }
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      throw error;
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const success = await updateProfile(formData);

      if (success) {
        setIsEditing(false);
        // FIXED: Set specific message for profile update
        setShowSuccessMessage("✅ Profile updated successfully!");
        console.log("✅ Profile updated successfully!");

        setTimeout(() => {
          setShowSuccessMessage("");
        }, 3000);
      }

    } catch (error) {
      console.error('❌ Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        email: user.email || "",
        gender: user.gender || "",
        age: user.age || "",
        height: user.height || "",
        weight: user.weight || "",
        goal: user.goal || "",
        activity: user.activity || ""
      });
    }
    setIsEditing(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    console.log("🚪 Confirmed logout");
    setShowLogoutConfirm(false);
    logout();
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (!user) return null;

  const calculateBMI = () => {
    if (!user.height || !user.weight) return null;
    const heightInMeters = user.height / 100;
    const bmi = (user.weight / (heightInMeters * heightInMeters)).toFixed(1);
    return bmi;
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: "Underweight", color: "#ffc107" };
    if (bmi < 25) return { category: "Normal", color: "#28a745" };
    if (bmi < 30) return { category: "Overweight", color: "#fd7e14" };
    return { category: "Obese", color: "#dc3545" };
  };

  const calculateBMR = () => {
    if (!user.weight || !user.height || !user.age || !user.gender) return null;
    if (user.gender === 'Male') {
      return 88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * user.age);
    } else {
      return 447.593 + (9.247 * user.weight) + (3.098 * user.height) - (4.330 * user.age);
    }
  };

  const bmi = calculateBMI();
  const bmiCategory = bmi ? getBMICategory(bmi) : null;
  const bmr = calculateBMR();

  const getActivityMultiplier = () => {
    switch (user.activity) {
      case 'Sedentary': return 1.2;
      case 'Lightly Active': return 1.375;
      case 'Moderately Active': return 1.55;
      case 'Very Active': return 1.725;
      case 'Extremely Active': return 1.9;
      default: return 1.375;
    }
  };

  const dailyCalories = bmr ? (bmr * getActivityMultiplier()).toFixed(0) : null;

  return (
    <div className="profile-container">
      {/* FIXED: Success Message - Now shows proper text */}
      {showSuccessMessage && (
        <div className="success-message show">
          <div className="success-content">
            <span className="success-icon">
              {/* {showSuccessMessage.includes ? "✅" : "📄"} */}
            </span>
            <span className="success-text">{showSuccessMessage}</span>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="logout-confirm-overlay">
          <div className="logout-confirm-modal">
            <div className="logout-confirm-header">
              <h3>Confirm Logout</h3>
            </div>
            <div className="logout-confirm-body">
              <p>Are you sure you want to logout?</p>
            </div>
            <div className="logout-confirm-actions">
              <button
                className="btn btn-outline-secondary"
                onClick={handleCancelLogout}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleConfirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="profile-picture" />
            ) : (
              user.firstName ? user.firstName.charAt(0).toUpperCase() : "U"
            )}

            <button
              className="camera-icon-btn"
              onClick={() => document.getElementById('profile-upload').click()}
              title="Upload Profile Picture"
            >
              <FaCamera />
            </button>
          </div>

          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </div>

        <div className="profile-info">
          <h1 className="profile-name">
            {user.firstName} {user.lastName}
          </h1>
          <p className="profile-username">@{user.username}</p>
          <p className="profile-email">{user.email}</p>
        </div>
        <div className="profile-actions">
          <button
            className={`btn ${isEditing ? 'btn-secondary' : 'btn-primary'}`}
            onClick={handleEditToggle}
            disabled={isLoading}
          >
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
          <button
            className="btn btn-outline-danger ms-2"
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="profile-content">
        <div className="row">
          {/* Personal Information Card */}
          <div className="col-md-8">
            <div className="profile-card">
              <div className="card-header">
                <h3>Personal Information</h3>
                {!isEditing && (
                  <button
                    className="edit-badge"
                    onClick={handleEditToggle}
                  >
                    ✏️ Edit
                  </button>
                )}
              </div>
              <div className="card-body">
                {isEditing ? (
                  <div className="edit-form">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Enter first name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Enter last name"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Username</label>
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Enter username"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-control"
                            disabled
                          />
                          <small className="text-muted">Email cannot be changed</small>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Gender</label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="form-control"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Age</label>
                          <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            className="form-control"
                            min="1"
                            max="120"
                            placeholder="Enter age"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Height (cm)</label>
                          <input
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleInputChange}
                            className="form-control"
                            min="50"
                            max="250"
                            placeholder="Enter height"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Weight (kg)</label>
                          <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            className="form-control"
                            min="20"
                            max="300"
                            placeholder="Enter weight"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Fitness Goal</label>
                          <select
                            name="goal"
                            value={formData.goal}
                            onChange={handleInputChange}
                            className="form-control"
                          >
                            <option value="">Select Goal</option>
                            <option value="Weight Loss">Weight Loss</option>
                            <option value="Muscle Gain">Muscle Gain</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Endurance">Endurance</option>
                            <option value="General Fitness">General Fitness</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Activity Level</label>
                          <select
                            name="activity"
                            value={formData.activity}
                            onChange={handleInputChange}
                            className="form-control"
                          >
                            <option value="">Select Activity Level</option>
                            <option value="Sedentary">Sedentary</option>
                            <option value="Lightly Active">Lightly Active</option>
                            <option value="Moderately Active">Moderately Active</option>
                            <option value="Very Active">Very Active</option>
                            <option value="Extremely Active">Extremely Active</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button
                        className="btn btn-success"
                        onClick={handleSave}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={handleCancel}
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Full Name</span>
                      <span className="info-value">{user.firstName} {user.lastName}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Username</span>
                      <span className="info-value">@{user.username}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email</span>
                      <span className="info-value">{user.email}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Gender</span>
                      <span className="info-value">{user.gender || 'Not specified'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Age</span>
                      <span className="info-value">{user.age || 'Not specified'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Height</span>
                      <span className="info-value">{user.height ? `${user.height} cm` : 'Not specified'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Weight</span>
                      <span className="info-value">{user.weight ? `${user.weight} kg` : 'Not specified'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Fitness Goal</span>
                      <span className="info-value">{user.goal || 'Not specified'}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Activity Level</span>
                      <span className="info-value">{user.activity || 'Not specified'}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Workout History Card */}
            <div className="profile-card">
              <div className="card-header">
                <h3>Workout History</h3>
              </div>
              <div className="card-body">
                <div className="workout-history">
                  <div className="history-stats">
                    <div className="stat-card">
                      <div className="stat-icon">💪</div>
                      <div className="stat-content">
                        <div className="stat-number">12</div>
                        <div className="stat-label">Workouts This Month</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">🔥</div>
                      <div className="stat-content">
                        <div className="stat-number">5</div>
                        <div className="stat-label">Current Streak</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon">⏱️</div>
                      <div className="stat-content">
                        <div className="stat-number">8.2</div>
                        <div className="stat-label">Avg Hours/Week</div>
                      </div>
                    </div>
                  </div>

                  <div className="recent-workouts">
                    <h4>Recent Workouts</h4>
                    <div className="workout-list">
                      <div className="workout-item">
                        <div className="workout-date">Today</div>
                        <div className="workout-details">
                          <span className="workout-name">Upper Body Strength</span>
                          <span className="workout-duration">45 mins</span>
                        </div>
                      </div>
                      <div className="workout-item">
                        <div className="workout-date">Yesterday</div>
                        <div className="workout-details">
                          <span className="workout-name">Cardio Session</span>
                          <span className="workout-duration">30 mins</span>
                        </div>
                      </div>
                      <div className="workout-item">
                        <div className="workout-date">2 days ago</div>
                        <div className="workout-details">
                          <span className="workout-name">Leg Day</span>
                          <span className="workout-duration">60 mins</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fitness Metrics Section */}
            {bmr && (
              <div className="profile-card">
                <div className="card-header">
                  <h3>Fitness Metrics</h3>
                </div>
                <div className="card-body">
                  <div className="metrics-grid">
                    <div className="metric-item">
                      <div className="metric-label">Basal Metabolic Rate (BMR)</div>
                      <div className="metric-value">{bmr.toFixed(0)} calories</div>
                      <div className="metric-description">
                        Your body's energy requirement at complete rest
                      </div>
                    </div>
                    <div className="metric-item">
                      <div className="metric-label">Daily Calorie Needs</div>
                      <div className="metric-value">{dailyCalories} calories</div>
                      <div className="metric-description">
                        Based on your {user.activity?.toLowerCase() || 'current'} activity level
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats Sidebar */}
          <div className="col-md-4">
            {/* BMI Calculator Card */}
            {bmi && (
              <div className="stats-card">
                <div className="stats-header">
                  <h4>BMI Calculator</h4>
                </div>
                <div className="stats-body">
                  <div className="bmi-display">
                    <div className="bmi-value">{bmi}</div>
                    <div
                      className="bmi-category"
                      style={{ color: bmiCategory.color }}
                    >
                      {bmiCategory.category}
                    </div>
                  </div>
                  <div className="bmi-scale">
                    <div className="scale-item underweight">
                      <span>Underweight</span>
                      <span>&lt; 18.5</span>
                    </div>
                    <div className="scale-item normal">
                      <span>Normal</span>
                      <span>18.5 - 24.9</span>
                    </div>
                    <div className="scale-item overweight">
                      <span>Overweight</span>
                      <span>25 - 29.9</span>
                    </div>
                    <div className="scale-item obese">
                      <span>Obese</span>
                      <span>≥ 30</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fitness Goals Card */}
            <div className="stats-card">
              <div className="stats-header">
                <h4>Fitness Overview</h4>
              </div>
              <div className="stats-body">
                <div className="goal-item">
                  <span className="goal-label">Primary Goal</span>
                  <span className="goal-value">{user.goal || 'Not set'}</span>
                </div>
                <div className="goal-item">
                  <span className="goal-label">Activity Level</span>
                  <span className="goal-value">{user.activity || 'Not set'}</span>
                </div>
                <div className="goal-item">
                  <span className="goal-label">Member Since</span>
                  <span className="goal-value">
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="stats-card">
              <div className="stats-header">
                <h4>Quick Actions</h4>
              </div>
              <div className="stats-body">
                <button className="quick-action-btn" onClick={() => navigate('/workout-plans')}>
                  💪 Workout Plans
                </button>
                <button className="quick-action-btn" onClick={() => navigate('/supplements')}>
                  🧪 Supplements
                </button>
                <button className="quick-action-btn" onClick={handleUpdateProfile}>
                  ✏️ Update Profile
                </button>
                <button className="quick-action-btn" onClick={generatePDF} disabled={isGeneratingPDF}>
                  {isGeneratingPDF ? '📄 Generating PDF...' : '📄 Download PDF Report'}
                </button>
                <button className="quick-action-btn" onClick={handleLogoutClick}>
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
