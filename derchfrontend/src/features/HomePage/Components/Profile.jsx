import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Settings,
  Edit3,
  Camera,
  Badge,
  Building,
  Globe,
} from "lucide-react";
import { color } from "framer-motion";
import { themes } from "../../../constants/colors";

export const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const mode = themes.lightMode;

  // Sample user data
  const [userData, setUserData] = useState({
    id: "USR-001",
    name: "Alexandra Chen",
    email: "alexandra.chen@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "2023-01-15",
    lastLogin: "2024-12-15",
    role: "Senior Product Manager",
    department: "Product Development",
    company: "TechCorp Inc.",
    bio: "Passionate product manager with 8+ years of experience in building user-centric digital products. Love turning complex problems into simple, elegant solutions.",
    skills: [
      "Product Strategy",
      "User Research",
      "Agile Development",
      "Data Analysis",
      "Team Leadership",
    ],
    avatar: null,
    status: "Active",
    timezone: "PST (UTC-8)",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log("User data saved:", userData);
  };

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition"
                style={{ backgroundColor: mode.buttonBg }}
              >
                <Edit3 size={16} />
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Side - Avatar and Basic Info */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            {/* Avatar */}
            <div className="relative">
              <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              {isEditing && (
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-700">
                  <Camera size={14} />
                </button>
              )}
            </div>

            {/* Name & Role */}
            <div className="mt-4">
              {isEditing ? (
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="text-xl font-semibold text-center md:text-left w-full border rounded-lg px-3 py-1 mb-2"
                />
              ) : (
                <h2 className="text-xl font-semibold text-gray-900">
                  {userData.name}
                </h2>
              )}

              {isEditing ? (
                <input
                  type="text"
                  value={userData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className="text-gray-600 text-center md:text-left w-full border rounded-lg px-3 py-1"
                />
              ) : (
                <p className="text-gray-600">{userData.role}</p>
              )}
            </div>

            {/* Status */}
            <div className="mt-3">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                  userData.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    userData.status === "Active"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                ></div>
                {userData.status}
              </span>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="md:col-span-2 flex flex-col justify-center space-y-5">
            <div className="flex items-center gap-3 text-gray-600">
              <Mail size={16} />
              {isEditing ? (
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="flex-1 border rounded px-2 py-1 text-sm"
                />
              ) : (
                <span className="text-sm">{userData.email}</span>
              )}
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <Phone size={16} />
              {isEditing ? (
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="flex-1 border rounded px-2 py-1 text-sm"
                />
              ) : (
                <span className="text-sm">{userData.phone}</span>
              )}
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <MapPin size={16} />
              {isEditing ? (
                <input
                  type="text"
                  value={userData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="flex-1 border rounded px-2 py-1 text-sm"
                />
              ) : (
                <span className="text-sm">{userData.location}</span>
              )}
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <Calendar size={16} />
              <span className="text-sm">
                Joined {new Date(userData.joinDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
