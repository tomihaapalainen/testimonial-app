import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { baseUrl } from "../../config";

import TestimonialWall from "./components/TestimonialWall";

const Testimonial = () => {
  const { id } = useParams();

  const [testimonials, setTestimonials] = useState([]);

  const fetchAllTestimonials = useCallback(() => {
    axios.get(`${baseUrl}/testimonial/business/${id}`).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        setTestimonials(response.data);
      }
    });
  }, [id]);

  useEffect(() => {
    fetchAllTestimonials();
  }, [fetchAllTestimonials]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <TestimonialWall
        testimonials={testimonials}
        setTestimonials={setTestimonials}
      />
    </div>
  );
};

export default Testimonial;
