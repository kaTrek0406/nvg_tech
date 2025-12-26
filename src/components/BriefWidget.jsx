import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { notifyTelegram } from '../services/notify';
import {
  formatMoldovaPhone,
  isValidMoldovaPhone
} from '../utils/phoneValidation';
import './BriefWidget.css';

export default function BriefWidget() {
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

    if (!formData.name.trim()) newErrors.name = 'Введите имя';
    if (!isValidMoldovaPhone(formData.phone))
      newErrors.phone = 'Неверный формат';
    if (!formData.projectType) newErrors.projectType = 'Выберите тип';
    if (!formData.budget) newErrors.budget = 'Выберите бюджет';
    if (!formData.timeline) newErrors.timeline = 'Выберите сроки';
    if (formData.description.trim().length < 10)
      newErrors.description = 'Минимум 10 символов';

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
            <span className="brief-widget__button-text">Бриф</span>
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
                <h3>Онлайн консультация</h3>
                <p>Заполните бриф за 2 минуты</p>
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
                  placeholder="Ваше имя *"
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="+373 XX XXX XXX *"
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
                  <option value="">Тип проекта *</option>
                  <option value="Интернет-магазин">Интернет-магазин</option>
                  <option value="Лендинг">Лендинг</option>
                  <option value="Чат-бот">Чат-бот</option>
                  <option value="Таргетированная реклама">Реклама</option>
                  <option value="Автоматизация">Автоматизация</option>
                  <option value="Другое">Другое</option>
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
                  <option value="">Бюджет *</option>
                  <option value="До $300">До $300</option>
                  <option value="$300 - $700">$300 - $700</option>
                  <option value="От $700">От $700</option>
                  <option value="Обсудим">Обсудим</option>
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
                  <option value="">Сроки *</option>
                  <option value="Срочно (1-2 недели)">Срочно (1-2 нед)</option>
                  <option value="Средне (2-4 недели)">Средне (2-4 нед)</option>
                  <option value="Не спешу">Не спешу</option>
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
                  placeholder="Опишите ваш проект... *"
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
                    Отправка...
                  </>
                ) : (
                  'Отправить'
                )}
              </button>

              {status === 'success' && (
                <div className="success-message">
                  ✅ Отправлено! Свяжемся в течение 30 минут
                </div>
              )}

              {status === 'error' && (
                <div className="error-message">
                  ❌ Ошибка. Попробуйте позже
                </div>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
