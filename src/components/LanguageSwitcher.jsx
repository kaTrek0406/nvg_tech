import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const languages = [
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' }
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage =
    languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = langCode => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='language-switcher' ref={dropdownRef}>
      <button
        className='language-switcher-btn'
        onClick={() => setIsOpen(!isOpen)}
        aria-label='Select language'
      >
        <span className='flag'>{currentLanguage.flag}</span>
        <span className='lang-code'>{currentLanguage.code.toUpperCase()}</span>
        <svg
          className={`chevron ${isOpen ? 'open' : ''}`}
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
        >
          <path
            d='M4 6L8 10L12 6'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>

      {isOpen && (
        <div className='language-dropdown'>
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`language-option ${
                lang.code === i18n.language ? 'active' : ''
              }`}
              onClick={() => changeLanguage(lang.code)}
            >
              <span className='flag'>{lang.flag}</span>
              <span className='lang-name'>{lang.name}</span>
              {lang.code === i18n.language && (
                <svg
                  className='check-icon'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                >
                  <path
                    d='M3 8L6.5 11.5L13 5'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
