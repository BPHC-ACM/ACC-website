import Image from "next/image"

export default function AboutUs() {
  return (
    <section id="about" className="about">
      <div className="about-bg"></div>

      {/* Decorative elements */}
      <div className="blob blob-4"></div>

      <div className="container">
        <h2 className="section-title">About Us</h2>

        <div className="about-container">
          <div className="about-card">
            <h3 className="about-title">
              We are here to help <span className="about-highlight">as many people</span> as possible
            </h3>

            <p className="about-text">
              The Academic Counseling Cell is committed to supporting students in achieving their academic and career
              goals. We understand that every student has unique aspirations, strengths, and challenges. Our mission is
              to provide personalized guidance, support, and resources to help you navigate your academic journey and
              make informed decisions about your future.
            </p>

            <div className="about-tags">
              <div className="about-tag">Academic Guidance</div>
              <div className="about-tag">Career Planning</div>
              <div className="about-tag">Skill Development</div>
              <div className="about-tag">Personal Growth</div>
            </div>
          </div>

          <div className="about-image">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Academic Counselling"
              fill
              className="object-cover"
            />
            <div className="about-image-overlay">
              <div className="overlay-content">
                <h4 className="overlay-title">Join Our Community</h4>
                <p className="overlay-text">Become part of a supportive network of students and educators</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

