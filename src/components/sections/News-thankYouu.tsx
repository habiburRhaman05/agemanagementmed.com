 "use client"
import React from 'react'
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="social-icon" fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.9.3-1.5 1.6-1.5H16.5V4.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10.5H7.5v3H9.8V21H13.5Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="social-icon" fill="currentColor" aria-hidden="true">
    <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 5.7a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4Zm4.5-8.6a4 4 0 0 1 4 4v6.8a4 4 0 0 1-4 4H7.5a4 4 0 0 1-4-4V9.6a4 4 0 0 1 4-4h9Zm0 1.3H7.5a2.7 2.7 0 0 0-2.7 2.7v6.8a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7V9.6a2.7 2.7 0 0 0-2.7-2.7Zm1-.9a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="social-icon" fill="currentColor" aria-hidden="true">
    <path d="M6.9 8.4H4V19h2.9V8.4ZM5.4 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20 12.7c0-3-1.6-4.4-3.8-4.4a3.3 3.3 0 0 0-3 1.6V8.4H10.3V19h2.9v-5.9c0-1.6.3-3.1 2.2-3.1s1.7 1.7 1.7 3.2V19H20v-6.3Z" />
  </svg>
);

const NewsThankyou = () => {
    

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
     <div className=''>
  
      <section className="thank-you-section pt-20">
        <div className="thank-you-content">
          <h1 className="thank-you-title">
            <span>Thank You!</span>
            Would You Like To Hear From Us?
          </h1>

          <p className="thank-you-description">
            If you'd like to hear from us, enter your phone number below and one of our team
            <br className="desktop-break" />
            members will reach out to you shortly.
          </p>

          <form className="phone-form" onSubmit={handleSubmit}>
            <input
              type="tel"
              placeholder="Phone Number"
              aria-label="Phone Number"
            />

            <button type="submit">
              <span>SUBMIT</span>
              <span className="arrow">→</span>
            </button>
          </form>

          <div className="social-section">
            <h2>Follow Us On Social:</h2>

            <div className="social-links">
              <a
                href="https://www.facebook.com/SavannahAgeManagementMedicine"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>

              <a
                href="https://www.instagram.com/savannah_age_management/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>

              <a
                href="https://www.linkedin.com/company/savannah-age-management-medicine/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .thank-you-section {
          width: 100%;
          min-height: 772px;
          background:
            radial-gradient(
              circle at 50% 42%,
              rgba(55, 70, 112, 0.22) 0%,
              rgba(35, 48, 80, 0.08) 35%,
              transparent 70%
            ),
            #202d4d;
          border-bottom: 5px solid rgba(255, 255, 255, 0.05);
          border-radius: 0 0 22px 22px;
          color: #f4f1ed;
          display: flex;
          justify-content: center;
          overflow: hidden;
        }

        .thank-you-content {
          width: 100%;
          max-width: 900px;
          text-align: center;
          padding: 100px 24px 70px;
        }

        .thank-you-title {
          margin: 0;
          color: #f2f0ec;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 56px;
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -1px;
        }

        .thank-you-title span {
          display: block;
          margin-bottom: 2px;
        }

        .thank-you-description {
          margin: 22px auto 0;
          color: #f5f3ef;
          font-family: Arial, sans-serif;
          font-size: 20px;
          font-weight: 400;
          line-height: 1.55;
        }

        .phone-form {
          width: 100%;
          max-width: 802px;
          margin: 49px auto 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .phone-form input {
          width: 100%;
          height: 59px;
          box-sizing: border-box;
          border: 1px solid rgba(232, 234, 237, 0.7);
          border-radius: 11px;
          outline: none;
          background: rgba(255, 255, 255, 0.01);
          color: #ffffff;
          padding: 0 24px;
          font-family: Arial, sans-serif;
          font-size: 16px;
        }

        .phone-form input::placeholder {
          color: #f3f0ec;
          opacity: 0.95;
        }

        .phone-form button {
          width: 169px;
          height: 51px;
          margin-top: 41px;
          border: 0;
          border-radius: 999px;
          background: #5b9099;
          color: #f5f1eb;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 13px;
          font-family: Arial, sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 4px;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .phone-form button:hover {
          background: #669ca5;
          transform: translateY(-1px);
        }

        .phone-form .arrow {
          font-size: 23px;
          font-weight: 400;
          line-height: 1;
          letter-spacing: 0;
          margin-top: -2px;
        }

        .social-section {
          margin-top: 98px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 53px;
        }

        .social-section h2 {
          margin: 0;
          color: #f2f0ec;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 29px;
          font-weight: 400;
          line-height: 1;
        }

        .social-links {
          display: flex;
          align-items: center;
          gap: 17px;
        }

        .social-links a {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #f5f3ef;
          color: #263554;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .social-links a:hover {
          background: #ffffff;
          transform: translateY(-2px);
        }

        .social-icon {
          width: 21px;
          height: 21px;
        }

        @media (max-width: 768px) {
          .thank-you-section {
            min-height: 100vh;
            border-radius: 0;
          }

          .thank-you-content {
            padding: 75px 20px 60px;
          }

          .thank-you-title {
            font-size: 40px;
            line-height: 1.15;
          }

          .thank-you-description {
            font-size: 17px;
          }

          .desktop-break {
            display: none;
          }

          .phone-form {
            margin-top: 38px;
          }

          .social-section {
            margin-top: 75px;
            flex-direction: column;
            gap: 25px;
          }

          .social-section h2 {
            font-size: 27px;
          }
        }

        @media (max-width: 480px) {
          .thank-you-title {
            font-size: 34px;
          }

          .thank-you-description {
            font-size: 16px;
          }

          .phone-form input {
            height: 56px;
          }
        }
      `}</style>
    </div>
  )
}

export default NewsThankyou