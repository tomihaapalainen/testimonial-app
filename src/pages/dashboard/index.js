import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { getIdToken } from "@firebase/auth";
import { baseUrl } from "../../config";
import { useUser } from "../../contexts/user";
import TestimonialPreviewWall from "./components/TestimonialPreviewWall";

const DashboardPage = () => {
  const { user } = useUser();

  const [testimonials, setTestimonials] = useState([]);

  const fetchAllTestimonials = useCallback(() => {
    if (!user) return;
    getIdToken(user).then((idToken) => {
      axios
        .get(`${baseUrl}/testimonial/all`, {
          headers: { Authorization: `Bearer ${idToken}` },
        })
        .then((response) => {
          if (response.status === 200) {
            setTestimonials(response.data);
          }
        });
    });
  }, [user]);

  useEffect(() => {
    fetchAllTestimonials();
  }, [fetchAllTestimonials]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <TestimonialPreviewWall testimonials={testimonials} />
    </div>
  );
};

export default DashboardPage;
