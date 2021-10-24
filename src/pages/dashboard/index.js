import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { getIdToken } from "@firebase/auth";
import { baseUrl } from "../../config";
import { useUser } from "../../contexts/user";
import TestimonialWall from "./components/TestimonialWall";

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
    <div>
      <TestimonialWall testimonials={testimonials} />
    </div>
  );
};

export default DashboardPage;
