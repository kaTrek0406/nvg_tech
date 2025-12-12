import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { notifyTelegram } from '../services/notify';
import {
  formatMoldovaPhone,
  isValidMoldovaPhone
} from '../utils/phoneValidation';
import './QuickContactForm.css';

export default function QuickContactForm({ isOpen, onClose, buttonRef }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '+373 '
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const formRef = useRef(null);

  // Закрывать при клике вне формы
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef]);

  // Закрывать по Escape
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handlePhoneChange = e => {
    const formatted = formatMoldovaPhone(e.target.value);
    setFormData({ ...formData, phone: formatted });
    if (errors.phone) {
      setErrors({ ...errors, phone: '' });
    }
  };

  const handleNameChange = e => {
    setFormData({ ...formData, name: e.target.value });
    if (errors.name) {
      setErrors({ ...errors, name: '' });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('quickForm.errors.name');
    }

    if (!isValidMoldovaPhone(formData.phone)) {
      newErrors.phone = t('quickForm.errors.phone');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('loading');

    try {
      const result = await notifyTelegram({
        name: formData.name,
        phone: formData.phone,
        message: t('quickForm.title') + ' из Header'
      });

      if (result.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '+373 ' });

        // Закрыть форму через 2 секунды
        setTimeout(() => {
          onClose();
          setStatus('idle');
        }, 2000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={formRef}
          className='quick-contact-form'
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className='quick-contact-form__arrow' />

          {status === 'success' ? (
            <div className='quick-contact-form__success'>
              <svg width='48' height='48' viewBox='0 0 48 48' fill='none'>
                <circle
                  cx='24'
                  cy='24'
                  r='20'
                  stroke='var(--success)'
                  strokeWidth='2'
                />
                <path
                  d='M16 24l6 6 10-12'
                  stroke='var(--success)'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <h3>{t('quickForm.sentTitle')}</h3>
              <p>{t('quickForm.sentText')}</p>
            </div>
          ) : (
            <>
              <div className='quick-contact-form__header'>
                <h3>{t('quickForm.title')}</h3>
                <p>{t('quickForm.subtitle')}</p>
              </div>

              <form
                onSubmit={handleSubmit}
                className='quick-contact-form__form'
              >
                <div className='quick-contact-form__field'>
                  <input
                    type='text'
                    placeholder={t('quickForm.namePlaceholder')}
                    value={formData.name}
                    onChange={handleNameChange}
                    className={errors.name ? 'error' : ''}
                    disabled={status === 'loading'}
                  />
                  {errors.name && (
                    <span className='quick-contact-form__error'>
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className='quick-contact-form__field'>
                  <input
                    type='tel'
                    placeholder={t('quickForm.phonePlaceholder')}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={errors.phone ? 'error' : ''}
                    disabled={status === 'loading'}
                  />
                  {errors.phone && (
                    <span className='quick-contact-form__error'>
                      {errors.phone}
                    </span>
                  )}
                </div>

                <button
                  type='submit'
                  className='btn btn--primary'
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <span className='spinner' />
                      {t('quickForm.sending')}
                    </>
                  ) : (
                    <>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                      >
                        <path
                          d='M14.5 1.5l-7 14-2-5-5-2 14-7z'
                          stroke='currentColor'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      {t('quickForm.send')}
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <div className='quick-contact-form__status error'>
                    <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                      <circle
                        cx='8'
                        cy='8'
                        r='7'
                        stroke='currentColor'
                        strokeWidth='1.5'
                      />
                      <path
                        d='M8 4v5M8 11h.01'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                      />
                    </svg>
                    {t('quickForm.errorText')}
                  </div>
                )}
              </form>

              <div className='quick-contact-form__footer'>
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                  <path
                    d='M8 1v2M8 13v2M3.93 3.93l1.41 1.41M10.66 10.66l1.41 1.41M1 8h2M13 8h2M3.93 12.07l1.41-1.41M10.66 5.34l1.41-1.41'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                  />
                  <circle
                    cx='8'
                    cy='8'
                    r='3'
                    stroke='currentColor'
                    strokeWidth='1.5'
                  />
                </svg>
                {t('quickForm.footer')}
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
