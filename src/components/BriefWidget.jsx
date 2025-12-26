import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { notifyTelegram } from '../services/notify';
import {
  formatMoldovaPhone,
  isValidMoldovaPhone
} from '../utils/phoneValidation';
import './BriefWidget.css';

export default function BriefWidget() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '+373 ',
    projectType: '',
    budget: '',
    timeline: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = t('briefWidget.errors.name');
    if (!isValidMoldovaPhone(formData.phone))
      newErrors.phone = t('briefWidget.errors.phone');
    if (!formData.projectType) newErrors.projectType = t('briefWidget.errors.projectType');
    if (!formData.budget) newErrors.budget = t('briefWidget.errors.budget');
    if (!formData.timeline) newErrors.timeline = t('briefWidget.errors.timeline');
    if (formData.description.trim().length < 10)
      newErrors.description = t('briefWidget.errors.description');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('loading');

    try {
      const briefMessage = {
        name: formData.name,
        phone: formData.phone,
        message: `
📋 БРИФ НА СОЗДАНИЕ САЙТА

🎯 Тип проекта: ${formData.projectType}
💰 Бюджет: ${formData.budget}
⏱ Сроки: ${formData.timeline}

📝 Описание проекта:
${formData.description}
        `.trim()
      };

      const result = await notifyTelegram(briefMessage);

      if (result.ok) {
        setStatus('success');
        setFormData({
          name: '',
          phone: '+373 ',
          projectType: '',
          budget: '',
          timeline: '',
          description: ''
        });
        setTimeout(() => {
          setStatus('idle');
          setIsOpen(false);
        }, 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handlePhoneChange = e => {
    const formatted = formatMoldovaPhone(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  return (
    <div className="brief-widget">
      {/* Кнопка открытия */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="brief-widget__button"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2C16.75 2 21 6.25 21 11.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 11H15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M11.5 8V15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="brief-widget__button-text">{t('briefWidget.buttonText')}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Модальное окно чата */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="brief-widget__chat"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="brief-widget__header">
              <div>
                <h3>{t('briefWidget.title')}</h3>
                <p>{t('briefWidget.subtitle')}</p>
              </div>
              <button
                className="brief-widget__close"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="brief-widget__form">
              <div className="form-group">
                <input
                  type="text"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={errors.name ? 'error' : ''}
                  placeholder={t('briefWidget.namePlaceholder')}
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder={t('briefWidget.phonePlaceholder')}
                />
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <select
                  value={formData.projectType}
                  onChange={e =>
                    setFormData({ ...formData, projectType: e.target.value })
                  }
                  className={errors.projectType ? 'error' : ''}
                >
                  <option value="">{t('briefWidget.projectTypePlaceholder')}</option>
                  <option value={t('briefWidget.projectTypes.ecommerce')}>
                    {t('briefWidget.projectTypes.ecommerce')}
                  </option>
                  <option value={t('briefWidget.projectTypes.landing')}>
                    {t('briefWidget.projectTypes.landing')}
                  </option>
                  <option value={t('briefWidget.projectTypes.chatbot')}>
                    {t('briefWidget.projectTypes.chatbot')}
                  </option>
                  <option value={t('briefWidget.projectTypes.ads')}>
                    {t('briefWidget.projectTypes.ads')}
                  </option>
                  <option value={t('briefWidget.projectTypes.automation')}>
                    {t('briefWidget.projectTypes.automation')}
                  </option>
                  <option value={t('briefWidget.projectTypes.other')}>
                    {t('briefWidget.projectTypes.other')}
                  </option>
                </select>
                {errors.projectType && <span className="error-msg">{errors.projectType}</span>}
              </div>

              <div className="form-group">
                <select
                  value={formData.budget}
                  onChange={e =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  className={errors.budget ? 'error' : ''}
                >
                  <option value="">{t('briefWidget.budgetPlaceholder')}</option>
                  <option value={t('briefWidget.budgets.low')}>
                    {t('briefWidget.budgets.low')}
                  </option>
                  <option value={t('briefWidget.budgets.medium')}>
                    {t('briefWidget.budgets.medium')}
                  </option>
                  <option value={t('briefWidget.budgets.high')}>
                    {t('briefWidget.budgets.high')}
                  </option>
                  <option value={t('briefWidget.budgets.discuss')}>
                    {t('briefWidget.budgets.discuss')}
                  </option>
                </select>
                {errors.budget && <span className="error-msg">{errors.budget}</span>}
              </div>

              <div className="form-group">
                <select
                  value={formData.timeline}
                  onChange={e =>
                    setFormData({ ...formData, timeline: e.target.value })
                  }
                  className={errors.timeline ? 'error' : ''}
                >
                  <option value="">{t('briefWidget.timelinePlaceholder')}</option>
                  <option value={t('briefWidget.timelines.urgent')}>
                    {t('briefWidget.timelines.urgent')}
                  </option>
                  <option value={t('briefWidget.timelines.medium')}>
                    {t('briefWidget.timelines.medium')}
                  </option>
                  <option value={t('briefWidget.timelines.flexible')}>
                    {t('briefWidget.timelines.flexible')}
                  </option>
                </select>
                {errors.timeline && <span className="error-msg">{errors.timeline}</span>}
              </div>

              <div className="form-group">
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={e =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className={errors.description ? 'error' : ''}
                  placeholder={t('briefWidget.descriptionPlaceholder')}
                />
                {errors.description && <span className="error-msg">{errors.description}</span>}
              </div>

              <button
                type="submit"
                className="btn btn--primary"
                disabled={status === 'loading'}
                style={{ width: '100%' }}
              >
                {status === 'loading' ? (
                  <>
                    <div className="spinner" />
                    {t('briefWidget.sending')}
                  </>
                ) : (
                  t('briefWidget.button')
                )}
              </button>

              {status === 'success' && (
                <div className="success-message">
                  ✅ {t('briefWidget.success')}
                </div>
              )}

              {status === 'error' && (
                <div className="error-message">
                  ❌ {t('briefWidget.error')}
                </div>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
