import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (user) {
      navigate("/app-store");
    } else {
      // Redirect unauthenticated users to auth page
      navigate("/auth");
    }
  }, [user, navigate]);

  return null; // This component just handles routing
};

export default Index;
