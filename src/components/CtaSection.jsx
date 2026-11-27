import React from 'react'

export default function CtaSection() {
  return (
    <section data-wf-component-id="e87b4952-ad5e-44ce-0cf0-ee20c0885c3e" data-wf-variant-state="base" className="section-cta_component">
      <div className="section-cta_container">
        {/* Background image that scales up from center on scroll */}
        <div className="section-cta_image-wrapper">
          <img
            sizes="100vw"
            src="https://cdn.prod.website-files.com/69e5ea8d86a2ce4cb8ddf9dc/6a1335e4117bd9c5fdfe22a1_45890c340678131ced08f99d35e80240_ChatGPT%20Image%20May%2025%2C%202026%2C%2001_31_04%20AM.webp"
            alt="Green plant casting shadow on beige wall with curved architectural shapes and soft lighting."
            loading="lazy"
            className="section-cta_image"
          />
          <div className="image-overlay-dark"></div>
        </div>

        {/* Center Headline that fades out as you scroll */}
        <div className="section-cta_headline-wrapper">
          <div className="section-cta_headline">
            <h2>A better dental experience <span className="text-style-serif">begins here.</span></h2>
          </div>
        </div>

        {/* Card that reveals on top of the image */}
        <div className="section-cta_card-wrapper">
          <div className="section-cta_card">
            <div className="section-cta_card-image-wrapper">
              <img
                sizes="100vw"
                src="https://cdn.prod.website-files.com/69e5ea8d86a2ce4cb8ddf9dc/69e92804a669f8df9edcb8b0_ff796b0f52f1b31eb305a8c696d02b84_Smiling%20Woman%20with%20Aligner%20%281%29.webp"
                alt="Smiling woman holding a clear dental aligner near her face against a beige background."
                loading="lazy"
                className="section-cta_card-image"
              />
            </div>
            <div className="section-cta_card-content">
              <div className="section-cta_card-heading">
                <div className="section-cta_card-headline">
                  <h3>Start Your Journey <br />to Better Dental Care</h3>
                </div>
                <div className="section-cta_card-subheadline">
                  <p>Experience dental care designed around comfort, precision, and natural results.</p>
                </div>
              </div>
              <div className="section-cta_card-cta">
                <a
                  data-wf--button--variant="primary"
                  data-wf-component-id="8a4fc2d7-ec1c-4c7d-2018-717fb3f38790"
                  data-wf-variant-state="base"
                  href="https://acuityscheduling.com/"
                  className="button is-button w-inline-block"
                >
                  <div className="button_text-wrapper">
                    <div className="button_text is-static"><div>Book Appointment</div></div>
                    <div className="button_text is-absolute"><div>Book Appointment</div></div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
