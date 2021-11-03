import Textimonial from "../../../common/testimonial/Textimonial";
import Videomonial from "../../../common/testimonial/Videomonial";

const TestimonialWall = ({ testimonials }) => {
  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-screen-xl">
      {testimonials
        .sort((a, b) => b.created_on - a.created_on)
        .map((t, i) => (
          <div key={i}>
            {t.text && (
              <Textimonial
                key={i}
                testimonial={t}
                updateTestimonial={() => {}}
              />
            )}
            {t.video_url && (
              <Videomonial
                key={i}
                testimonial={t}
                updateTestimonial={() => {}}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default TestimonialWall;
