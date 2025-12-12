import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './FAQ.css';

export default function FAQ() {
  const { t } = useTranslation();
  const faqs = t('faq.items', { returnObjects: true });
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = id => setOpenId(openId === id ? null : id);

  return (
    <section className='faq' id='faq'>
      <div className='container'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='faq__title text-center'>{t('faq.title')}</h2>
          <p className='faq__subtitle subtitle text-center'>
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <div className='faq__list'>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`faq-item ${openId === index ? 'faq-item--open' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <button
                className='faq-item__question'
                onClick={() => toggleFAQ(index)}
                aria-expanded={openId === index}
              >
                <span>{faq.question}</span>
                <svg
                  className='faq-item__icon'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                >
                  <path
                    d='M19 9l-7 7-7-7'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>

              <AnimatePresence>
                {openId === index && (
                  <motion.div
                    className='faq-item__answer'
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
