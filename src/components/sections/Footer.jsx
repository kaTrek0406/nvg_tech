import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer__main'>
          {/* Brand */}
          <div className='footer__brand'>
            <div className='footer__logo'>
              <svg width='40' height='40' viewBox='0 0 100 100' fill='none'>
                <path
                  d='M20 80V20L50 50L80 20V80'
                  stroke='url(#footer-logo-gradient)'
                  strokeWidth='6'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <defs>
                  <linearGradient
                    id='footer-logo-gradient'
                    x1='20'
                    y1='20'
                    x2='80'
                    y2='80'
                  >
                    <stop offset='0%' stopColor='#7A33FF' />
                    <stop offset='100%' stopColor='#CBA3FF' />
                  </linearGradient>
                </defs>
              </svg>
              <span>NVG</span>
            </div>
            <p className='footer__tagline'>
              Digital solutions that scale your business
            </p>

            <div className='footer__social'>
              <a
                href='https://t.me/nvg_tech'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Telegram'
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z' />
                </svg>
              </a>
              <a
                href='https://www.facebook.com/people/NVG-Tech/61583401449291/?mibextid=wwXIfr&rdid=DekYyvG026jhHjh3&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17ZWn57eFD%2F%3Fmibextid%3DwwXIfr'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Facebook'
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                </svg>
              </a>
              <a
                href='https://www.instagram.com/nvg.tech/?igsh=MTExbXAwMWpld3M3Ng%3D%3D&utm_source=qr#'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z' />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className='footer__links'>
            <div className='footer__column'>
              <h4>Services</h4>
              <a href='#services'>Landing Pages</a>
              <a href='#services'>Chat Bots</a>
              <a href='#services'>CRM Systems</a>
              <a href='#services'>Automation</a>
            </div>

            <div className='footer__column'>
              <h4>Company</h4>
              <a href='#portfolio'>Portfolio</a>
              <a href='#process'>How We Work</a>
              <a href='#pricing'>Pricing</a>
              <a href='#faq'>FAQ</a>
            </div>

            <div className='footer__column'>
              <h4>Contact</h4>
              <a href='mailto:hello@nvg.md'>hello@nvg.md</a>
              <a href='tel:+37368614535'>+373 68 614 535</a>
              <a
                href='https://t.me/nvg_tech'
                target='_blank'
                rel='noopener noreferrer'
              >
                Telegram
              </a>
            </div>
          </div>
        </div>

        <div className='footer__bottom'>
          <p>&copy; {currentYear} NVG Agency. All rights reserved.</p>
          <div className='footer__bottom-links'>
            <a href='/privacy'>Privacy Policy</a>
            <span>•</span>
            <a href='/terms'>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
