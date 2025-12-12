import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { notifyTelegram } from '../services/notify';
import { formatMoldovaPhone, isValidMoldovaPhone } from '../utils/phoneValidation';
import './PricingModal.css';

export default function PricingModal({ isOpen, onClose, selectedPlan }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '+373 ',
    company: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  const handlePhoneChange = (e) => {
    const formatted = formatMoldovaPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = t('pricingModal.errors.name');
    }
    if (!isValidMoldovaPhone(formData.phone)) {
      newErrors.phone = t('pricingModal.errors.phone');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    const planInfo = selectedPlan 
      ? `\n📦 Тариф: ${selectedPlan.name} - ${selectedPlan.price}`
      : '';

    const result = await notifyTelegram({
      name: formData.name,
      phone: formData.phone,
      message: `Заявка из секции Pricing${planInfo}\n${formData.company ? `🏢 Компания: ${formData.company}` : ''}`
    });

    if (result.ok) {
      setStatus('success');
      setFormData({ name: '', phone: '+373 ', company: '' });
      setTimeout(() => {
        onClose();
        setTimeout(() => setStatus('idle'), 300);
      }, 2000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='pricing-modal-overlay'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            ref={modalRef}
            className='pricing-modal glass'
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <button
              className='pricing-modal__close'
              onClick={onClose}
              aria-label='Close'
            >
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M18 6L6 18M6 6l12 12'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </svg>
            </button>

            {status === 'success' ? (
              <motion.div
                className='pricing-modal__success'
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
              >
                <div className='pricing-modal__success-icon'>
                  <svg width='64' height='64' viewBox='0 0 64 64' fill='none'>
                    <circle
                      cx='32'
                      cy='32'
                      r='30'
                      stroke='var(--success)'
                      strokeWidth='3'
                    />
                    <path
                      d='M20 32l8 8 16-16'
                      stroke='var(--success)'
                      strokeWidth='3'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <h3>{t('pricingModal.sentTitle')}</h3>
                <p>{t('pricingModal.sentText')}</p>
              </motion.div>
            ) : (
              <>
                <h2 className='pricing-modal__title'>
                  {t('pricingModal.title')}
                </h2>
                {selectedPlan && (
                  <div className='pricing-modal__plan-badge'>
                    {selectedPlan.name} — {selectedPlan.price}
                  </div>
                )}
                <p className='pricing-modal__subtitle'>
                  {t('pricingModal.subtitle')}
                </p>

                <form onSubmit={handleSubmit} className='pricing-modal__form'>
                  <div className='pricing-modal__field'>
                    <input
                      ref={firstInputRef}
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('pricingModal.namePlaceholder')}
                      className={errors.name ? 'error' : ''}
                      disabled={status === 'loading'}
                    />
                    {errors.name && (
                      <span className='pricing-modal__error'>{errors.name}</span>
                    )}
                  </div>

                  <div className='pricing-modal__field'>
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder={t('pricingModal.phonePlaceholder')}
                      className={errors.phone ? 'error' : ''}
                      disabled={status === 'loading'}
                    />
                    {errors.phone && (
                      <span className='pricing-modal__error'>{errors.phone}</span>
                    )}
                  </div>

                  <div className='pricing-modal__field'>
                    <input
                      type='text'
                      name='company'
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t('pricingModal.companyPlaceholder')}
                      disabled={status === 'loading'}
                    />
                  </div>

                  {status === 'error' && (
                    <div className='pricing-modal__error-banner'>
                      {t('pricingModal.errorText')}
                    </div>
                  )}

                  <button
                    type='submit'
                    className='btn btn--primary'
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <span className='spinner'></span>
                        {t('pricingModal.sending')}
                      </>
                    ) : (
                      <>
                        <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
                          <path
                            d='M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                        {t('pricingModal.send')}
                      </>
                    )}
                  </button>

                  <p className='pricing-modal__footer'>
                    {t('pricingModal.footer')}
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
