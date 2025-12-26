import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { notifyTelegram } from '../services/notify';
import {
  formatMoldovaPhone,
  isValidMoldovaPhone
} from '../utils/phoneValidation';
import './PopupForms.css';

export default function PopupForms() {
  const { t } = useTranslation();
  const [showFirstPopup, setShowFirstPopup] = useState(false);
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [firstPopupShown, setFirstPopupShown] = useState(false);
  const [secondPopupShown, setSecondPopupShown] = useState(false);

  // Форма для первого попапа (30 секунд)
  const [formData1, setFormData1] = useState({
    name: '',
    phone: '+373 '
  });
  const [errors1, setErrors1] = useState({});
  const [status1, setStatus1] = useState('idle');

  // Форма для второго попапа (80 секунд)
  const [formData2, setFormData2] = useState({
    name: '',
    phone: '+373 ',
    service: ''
  });
  const [errors2, setErrors2] = useState({});
  const [status2, setStatus2] = useState('idle');

  // Таймеры для показа попапов
  useEffect(() => {
    // Первый попап через 30 секунд
    const timer1 = setTimeout(() => {
      if (!firstPopupShown) {
        setShowFirstPopup(true);
        setFirstPopupShown(true);
      }
    }, 30000); // 30 секунд

    // Второй попап через 80 секунд
    const timer2 = setTimeout(() => {
      if (!secondPopupShown) {
        setShowSecondPopup(true);
        setSecondPopupShown(true);
      }
    }, 80000); // 1 минута 20 секунд

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [firstPopupShown, secondPopupShown]);

  // Валидация первой формы
  const validate1 = () => {
    const newErrors = {};
    if (!formData1.name.trim()) newErrors.name = t('popups.first.errors.name');
    if (!isValidMoldovaPhone(formData1.phone))
      newErrors.phone = t('popups.first.errors.phone');
    setErrors1(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Валидация второй формы
  const validate2 = () => {
    const newErrors = {};
    if (!formData2.name.trim()) newErrors.name = t('popups.second.errors.name');
    if (!isValidMoldovaPhone(formData2.phone))
      newErrors.phone = t('popups.second.errors.phone');
    if (!formData2.service) newErrors.service = t('popups.second.errors.service');
    setErrors2(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Отправка первой формы
  const handleSubmit1 = async e => {
    e.preventDefault();
    if (!validate1()) return;

    setStatus1('loading');

    try {
      const message = {
        name: formData1.name,
        phone: formData1.phone,
        message: `
🔔 БЫСТРАЯ ЗАЯВКА (ПОПАП 30 СЕК)

Клиент заинтересовался услугами на сайте!
        `.trim()
      };

      const result = await notifyTelegram(message);

      if (result.ok) {
        setStatus1('success');
        setTimeout(() => {
          setShowFirstPopup(false);
          setStatus1('idle');
          setFormData1({ name: '', phone: '+373 ' });
        }, 2000);
      } else {
        setStatus1('error');
        setTimeout(() => setStatus1('idle'), 3000);
      }
    } catch (error) {
      setStatus1('error');
      setTimeout(() => setStatus1('idle'), 3000);
    }
  };

  // Отправка второй формы
  const handleSubmit2 = async e => {
    e.preventDefault();
    if (!validate2()) return;

    setStatus2('loading');

    try {
      const message = {
        name: formData2.name,
        phone: formData2.phone,
        message: `
💎 ДЕТАЛЬНАЯ ЗАЯВКА (ПОПАП 80 СЕК)

🎯 Интересует услуга: ${formData2.service}

Клиент провел на сайте более минуты - высокий интерес!
        `.trim()
      };

      const result = await notifyTelegram(message);

      if (result.ok) {
        setStatus2('success');
        setTimeout(() => {
          setShowSecondPopup(false);
          setStatus2('idle');
          setFormData2({ name: '', phone: '+373 ', service: '' });
        }, 2000);
      } else {
        setStatus2('error');
        setTimeout(() => setStatus2('idle'), 3000);
      }
    } catch (error) {
      setStatus2('error');
      setTimeout(() => setStatus2('idle'), 3000);
    }
  };

  const handlePhoneChange1 = e => {
    const formatted = formatMoldovaPhone(e.target.value);
    setFormData1({ ...formData1, phone: formatted });
  };

  const handlePhoneChange2 = e => {
    const formatted = formatMoldovaPhone(e.target.value);
    setFormData2({ ...formData2, phone: formatted });
  };

  return (
    <>
      {/* ПЕРВЫЙ ПОПАП - 30 СЕКУНД */}
      <AnimatePresence>
        {showFirstPopup && (
          <>
            <motion.div
              className="popup-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFirstPopup(false)}
            />
            <motion.div
              className="popup-modal popup-modal--first"
              initial={{ opacity: 0, scale: 0.9, x: '-50%', y: 'calc(-50% + 20px)' }}
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, scale: 0.9, x: '-50%', y: 'calc(-50% + 20px)' }}
            >
              <button
                className="popup-modal__close"
                onClick={() => setShowFirstPopup(false)}
              >
                ✕
              </button>

              <div className="popup-modal__icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h3 className="popup-modal__title">{t('popups.first.title')}</h3>
              <p className="popup-modal__subtitle">{t('popups.first.subtitle')}</p>

              <form onSubmit={handleSubmit1} className="popup-form">
                <div className="form-group">
                  <input
                    type="text"
                    value={formData1.name}
                    onChange={e =>
                      setFormData1({ ...formData1, name: e.target.value })
                    }
                    className={errors1.name ? 'error' : ''}
                    placeholder={t('popups.first.namePlaceholder')}
                  />
                  {errors1.name && (
                    <span className="error-msg">{errors1.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    value={formData1.phone}
                    onChange={handlePhoneChange1}
                    className={errors1.phone ? 'error' : ''}
                    placeholder={t('popups.first.phonePlaceholder')}
                  />
                  {errors1.phone && (
                    <span className="error-msg">{errors1.phone}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={status1 === 'loading'}
                  style={{ width: '100%' }}
                >
                  {status1 === 'loading' ? (
                    <>
                      <div className="spinner" />
                      {t('popups.first.sending')}
                    </>
                  ) : (
                    t('popups.first.button')
                  )}
                </button>

                {status1 === 'success' && (
                  <div className="success-message">
                    ✅ {t('popups.first.success')}
                  </div>
                )}

                {status1 === 'error' && (
                  <div className="error-message">
                    ❌ {t('popups.first.error')}
                  </div>
                )}
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ВТОРОЙ ПОПАП - 80 СЕКУНД */}
      <AnimatePresence>
        {showSecondPopup && (
          <>
            <motion.div
              className="popup-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSecondPopup(false)}
            />
            <motion.div
              className="popup-modal popup-modal--second"
              initial={{ opacity: 0, scale: 0.9, x: '-50%', y: 'calc(-50% + 20px)' }}
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, scale: 0.9, x: '-50%', y: 'calc(-50% + 20px)' }}
            >
              <button
                className="popup-modal__close"
                onClick={() => setShowSecondPopup(false)}
              >
                ✕
              </button>

              <div className="popup-modal__icon popup-modal__icon--gradient">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h3 className="popup-modal__title">{t('popups.second.title')}</h3>
              <p className="popup-modal__subtitle">{t('popups.second.subtitle')}</p>

              <form onSubmit={handleSubmit2} className="popup-form">
                <div className="form-group">
                  <input
                    type="text"
                    value={formData2.name}
                    onChange={e =>
                      setFormData2({ ...formData2, name: e.target.value })
                    }
                    className={errors2.name ? 'error' : ''}
                    placeholder={t('popups.second.namePlaceholder')}
                  />
                  {errors2.name && (
                    <span className="error-msg">{errors2.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    value={formData2.phone}
                    onChange={handlePhoneChange2}
                    className={errors2.phone ? 'error' : ''}
                    placeholder={t('popups.second.phonePlaceholder')}
                  />
                  {errors2.phone && (
                    <span className="error-msg">{errors2.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <select
                    value={formData2.service}
                    onChange={e =>
                      setFormData2({ ...formData2, service: e.target.value })
                    }
                    className={errors2.service ? 'error' : ''}
                  >
                    <option value="">{t('popups.second.servicePlaceholder')}</option>
                    <option value={t('popups.second.services.ecommerce')}>
                      {t('popups.second.services.ecommerce')}
                    </option>
                    <option value={t('popups.second.services.automation')}>
                      {t('popups.second.services.automation')}
                    </option>
                    <option value={t('popups.second.services.ads')}>
                      {t('popups.second.services.ads')}
                    </option>
                    <option value={t('popups.second.services.other')}>
                      {t('popups.second.services.other')}
                    </option>
                  </select>
                  {errors2.service && (
                    <span className="error-msg">{errors2.service}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={status2 === 'loading'}
                  style={{ width: '100%' }}
                >
                  {status2 === 'loading' ? (
                    <>
                      <div className="spinner" />
                      {t('popups.second.sending')}
                    </>
                  ) : (
                    t('popups.second.button')
                  )}
                </button>

                {status2 === 'success' && (
                  <div className="success-message">
                    ✅ {t('popups.second.success')}
                  </div>
                )}

                {status2 === 'error' && (
                  <div className="error-message">
                    ❌ {t('popups.second.error')}
                  </div>
                )}
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
