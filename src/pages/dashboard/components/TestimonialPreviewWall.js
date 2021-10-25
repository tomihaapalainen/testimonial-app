import Textimonial from "../../../common/testimonial/Textimonial";
import Videomonial from "../../../common/testimonial/Videomonial";

const TestimonialPreviewWall = ({ testimonials }) => {
  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-screen-lg">
      {testimonials
        .sort((a, b) => b.created_on - a.created_on)
        .map((t, i) => (
          <div>
            {t.text && <Textimonial key={i} testimonial={t} preview />}
            {t.video_url && <Videomonial key={i} testimonial={t} preview />}
          </div>
        ))}
    </div>
  );
};

export default TestimonialPreviewWall;
