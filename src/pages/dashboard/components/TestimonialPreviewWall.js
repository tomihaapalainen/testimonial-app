import Textimonial from "../../../common/testimonial/Textimonial";
import Videomonial from "../../../common/testimonial/Videomonial";

const TestimonialPreviewWall = ({ testimonials, setTestimonials }) => {
  const updateTestimonial = (testimonial, data) => {
    let begin = testimonials.slice(
      0,
      testimonials.findIndex((elem) => elem.id === testimonial.id)
    );
    let end = testimonials.slice(
      testimonials.findIndex((elem) => elem.id === testimonial.id) + 1
    );
    let updatedTestimonials = [...begin, data, ...end];
    setTestimonials(updatedTestimonials);
  };

  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-screen-lg">
      {testimonials
        .sort((a, b) => b.created_on - a.created_on)
        .map((t, i) => (
          <div key={i}>
            {t.text && (
              <Textimonial
                key={i}
                testimonial={t}
                updateTestimonial={updateTestimonial}
                preview
              />
            )}
            {t.video_url && (
              <Videomonial
                key={i}
                testimonial={t}
                updateTestimonial={updateTestimonial}
                preview
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default TestimonialPreviewWall;
