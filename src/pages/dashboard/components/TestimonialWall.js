import Textimonial from "./Textimonial";
import Videomonial from "./Videomonial";

const TestimonialWall = ({ testimonials }) => {
  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-screen-lg">
      {testimonials
        .filter((t) => t.video_url)
        .map((t, i) => (
          <Videomonial key={i} testimonial={t} />
        ))}
      {testimonials
        .filter((t) => t.text)
        .map((t, i) => (
          <Textimonial key={i} testimonial={t} />
        ))}
    </div>
  );
};

export default TestimonialWall;
