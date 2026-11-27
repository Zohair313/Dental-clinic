import React, { useState } from 'react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav data-wf--navbar--variant="homepage" className="nav_component">
      <div className="padding-global">
        <div className="nav_container">
          <div className="nav_left-content">
            <a href="/" aria-current="page" className="nav_brand w-inline-block w--current">
              <div className="nav_brand-image-wrapper is-black">
                <img
                  sizes="(max-width: 1749px) 100vw, 1749px"
                  src="https://cdn.prod.website-files.com/69e5ea8d86a2ce4cb8ddf9dc/69e7ada7a53af1e609fe493a_g3.png"
                  alt="Velour nav logo"
                  loading="lazy"
                  className="nav_brand-image"
                />
              </div>
            </a>
            <div className={`nav_menu ${mobileOpen ? 'is-open' : ''}`}>
              <a href="#about" className="nav_menu-item w-inline-block"><div>About</div></a>
              <a href="#services" className="nav_menu-item w-inline-block"><div>Services</div></a>
              <a href="#team" className="nav_menu-item w-inline-block"><div>Team</div></a>
              <a href="#contact" className="nav_menu-item w-inline-block"><div>Contact</div></a>
            </div>
          </div>

          <div className="nav_right-content">
            {/* Single Phone Link */}
            <div className="nav_phone">
              <a href="tel:+1(310)555-2486" className="nav-phone-text-icon_component w-inline-block">
                <div className="nav-phone-text-icon_container">
                  <div className="nav-phone-text-icon_icon-wrapper is-white">
                    <div className="nav-phone-text-icon_icon is-static">
                      <img
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/69e5ea8d86a2ce4cb8ddf9dc/69fb57a43e40cd72e8fcb1e1_phone-fill.svg"
                        alt=""
                        className="icon-1x1-small"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-weight-medium">+1 (310) 555-2486</div>
              </a>
            </div>

            {/* Single Book Appointment Button */}
            <div className="nav_cta">
              <a
                href="https://acuityscheduling.com/"
                className="button is-nav w-variant-717cac5e-ce00-048b-d6dd-956a1b3ec778 w-inline-block"
              >
                <div className="button_text-wrapper">
                  <div className="button_text is-static"><div>Book Appointment</div></div>
                  <div className="button_text is-absolute"><div>Book Appointment</div></div>
                </div>
                <div className="button_icon-nav">
                  <div className="button_bullet-nav w-variant-717cac5e-ce00-048b-d6dd-956a1b3ec778"></div>
                </div>
              </a>
            </div>

            {/* Mobile phone & trigger */}
            <div className="nav_phone-mobile">
              <a href="tel:+1(310)555-2486" className="button-icon_component w-inline-block">
                <div className="button-icon_icon-wrapper">
                  <div className="button-icon_icon is-static">
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/69e5ea8d86a2ce4cb8ddf9dc/69fb57a43e40cd72e8fcb1e1_phone-fill.svg"
                      alt=""
                      className="icon-1x1-medium"
                    />
                  </div>
                </div>
              </a>
            </div>

            <div
              className="nav_menu-trigger-mobile"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ cursor: 'pointer' }}
            >
              <div className="nav_menu-trigger-mobile-button">
                <div className="nav_menu-trigger-mobile-line-wrapper">
                  <div className="nav_menu-trigger-mobile-line"></div>
                  <div className="nav_menu-trigger-mobile-line is-middle"></div>
                  <div className="nav_menu-trigger-mobile-line is-bottom"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
