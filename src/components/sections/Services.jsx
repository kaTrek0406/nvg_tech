import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Services.css';

export default function Services() {
  const sectionRef = useRef(null);
  const { t } = useTranslation();
  const services = [
    {
      title: t('services.items.0.title'),
      description: t('services.items.0.description'),
      icon: (
        <svg
          width='48'
          height='48'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
        >
          <circle cx='12' cy='12' r='3' />
          <path d='M12 1v6m0 6v6m5.2-14.2l-3 3m-4.4 4.4l-3 3m12.4 0l-3-3m-4.4-4.4l-3-3' />
        </svg>
      )
    },
    {
      title: t('services.items.1.title'),
      description: t('services.items.1.description'),
      icon: (
        <svg
          width='48'
          height='48'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
        >
          <rect x='2' y='3' width='20' height='14' rx='2' />
          <path d='M8 21h8m-4-4v4' />
        </svg>
      )
    },
    {
      title: t('services.items.2.title'),
      description: t('services.items.2.description'),
      icon: (
        <svg
          width='48'
          height='48'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
        >
          <path d='M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z' />
        </svg>
      )
    }
  ];
  return (
    <section ref={sectionRef} className='services' id='services'>
      <div className='container'>
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='services__title text-center'>{t('services.title')}</h2>
          <p className='services__subtitle subtitle text-center'>
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className='services__grid grid-auto'>
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className='service-card glass card'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className='service-card__icon'>{service.icon}</div>
              <h3 className='service-card__title'>{service.title}</h3>
              <p className='service-card__description'>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
