import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { notifyTelegram } from '../services/notify';
import {
  formatMoldovaPhone,
  isValidMoldovaPhone
} from '../utils/phoneValidation';
import './BriefModal.css';

export default function BriefModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '+373 ',
    projectType: '',
    budget: '',
    timeline: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Введите имя';
    if (!isValidMoldovaPhone(formData.phone))
      newErrors.phone = 'Неверный формат телефона';
    if (!formData.projectType) newErrors.projectType = 'Выберите тип проекта';
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
      // Формируем расширенное сообщение с данными брифа
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
          onClose();
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="brief-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="brief-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <button className="brief-modal__close" onClick={onClose}>
              ✕
            </button>

            <h2 className="brief-modal__title">Онлайн консультация</h2>
            <p className="brief-modal__subtitle">
              Заполните краткий бриф, и мы свяжемся с вами в течение 30 минут
            </p>

            <form onSubmit={handleSubmit} className="brief-form">
              {/* Имя */}
              <div className="form-group">
                <label htmlFor="brief-name">Ваше имя *</label>
                <input
                  id="brief-name"
                  type="text"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={errors.name ? 'error' : ''}
                  placeholder="Иван Иванов"
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>

              {/* Телефон */}
              <div className="form-group">
                <label htmlFor="brief-phone">Телефон *</label>
                <input
                  id="brief-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="+373 XX XXX XXX"
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>

              {/* Тип проекта */}
              <div className="form-group">
                <label htmlFor="brief-type">Тип проекта *</label>
                <select
                  id="brief-type"
                  value={formData.projectType}
                  onChange={e =>
                    setFormData({ ...formData, projectType: e.target.value })
                  }
                  className={errors.projectType ? 'error' : ''}
                >
                  <option value="">Выберите тип проекта</option>
                  <option value="Интернет-магазин">Интернет-магазин</option>
                  <option value="Лендинг">Лендинг (одностраничник)</option>
                  <option value="Чат-бот">Чат-бот (Telegram/WhatsApp)</option>
                  <option value="Таргетированная реклама">
                    Таргетированная реклама
                  </option>
                  <option value="Автоматизация">Автоматизация процессов</option>
                  <option value="Другое">Другое</option>
                </select>
                {errors.projectType && (
                  <span className="error-message">{errors.projectType}</span>
                )}
              </div>

              {/* Бюджет */}
              <div className="form-group">
                <label htmlFor="brief-budget">Бюджет *</label>
                <select
                  id="brief-budget"
                  value={formData.budget}
                  onChange={e =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  className={errors.budget ? 'error' : ''}
                >
                  <option value="">Выберите бюджет</option>
                  <option value="До $300">До $300</option>
                  <option value="$300 - $700">$300 - $700</option>
                  <option value="От $700">От $700</option>
                  <option value="Обсудим">Обсудим индивидуально</option>
                </select>
                {errors.budget && (
                  <span className="error-message">{errors.budget}</span>
                )}
              </div>

              {/* Сроки */}
              <div className="form-group">
                <label htmlFor="brief-timeline">Сроки *</label>
                <select
                  id="brief-timeline"
                  value={formData.timeline}
                  onChange={e =>
                    setFormData({ ...formData, timeline: e.target.value })
                  }
                  className={errors.timeline ? 'error' : ''}
                >
                  <option value="">Выберите сроки</option>
                  <option value="Срочно (1-2 недели)">
                    Срочно (1-2 недели)
                  </option>
                  <option value="Средне (2-4 недели)">
                    Средне (2-4 недели)
                  </option>
                  <option value="Не спешу (1-2 месяца)">
                    Не спешу (1-2 месяца)
                  </option>
                </select>
                {errors.timeline && (
                  <span className="error-message">{errors.timeline}</span>
                )}
              </div>

              {/* Описание */}
              <div className="form-group">
                <label htmlFor="brief-description">Описание проекта *</label>
                <textarea
                  id="brief-description"
                  rows="4"
                  value={formData.description}
                  onChange={e =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className={errors.description ? 'error' : ''}
                  placeholder="Опишите ваш проект: что нужно сделать, какие функции необходимы..."
                />
                {errors.description && (
                  <span className="error-message">{errors.description}</span>
                )}
              </div>

              {/* Кнопка отправки */}
              <button
                type="submit"
                className="btn btn--primary"
                disabled={status === 'loading'}
                style={{ width: '100%', marginTop: '8px' }}
              >
                {status === 'loading' ? (
                  <>
                    <div className="spinner" />
                    Отправка...
                  </>
                ) : (
                  'Отправить бриф'
                )}
              </button>

              {/* Статусы */}
              {status === 'success' && (
                <div className="success-message" role="alert">
                  ✅ Бриф отправлен! Мы свяжемся с вами в ближайшее время.
                </div>
              )}

              {status === 'error' && (
                <div className="error-message" role="alert">
                  ❌ Ошибка отправки. Попробуйте позже или позвоните нам.
                </div>
              )}
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
