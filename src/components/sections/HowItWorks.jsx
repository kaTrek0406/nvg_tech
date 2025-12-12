import { motion } from 'framer-motion';
import './HowItWorks.css';
import { useTranslation } from 'react-i18next';

export default function HowItWorks() {
  const { t } = useTranslation();
  const steps = [
    {
      number: '01',
      title: t('process.steps.0.title'),
      description: t('process.steps.0.description'),
      duration: t('process.steps.0.duration'),
      icon: (
        <svg
          width='32'
          height='32'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
        >
          <path
            d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )
    },
    {
      number: '02',
      title: t('process.steps.1.title'),
      description: t('process.steps.1.description'),
      duration: t('process.steps.1.duration'),
      icon: (
        <svg
          width='32'
          height='32'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
        >
          <path
            d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M14 2v6h6M16 13H8M16 17H8M10 9H8'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )
    },
    {
      number: '03',
      title: t('process.steps.2.title'),
      description: t('process.steps.2.description'),
      duration: t('process.steps.2.duration'),
      icon: (
        <svg
          width='32'
          height='32'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
        >
          <path
            d='M16 18l2-2 4 4M12 2v6m0 0L9 5m3 3l3-3'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <rect x='3' y='8' width='18' height='12' rx='2' strokeWidth='2' />
        </svg>
      )
    },
    {
      number: '04',
      title: t('process.steps.3.title'),
      description: t('process.steps.3.description'),
      duration: t('process.steps.3.duration'),
      icon: (
        <svg
          width='32'
          height='32'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
        >
          <path
            d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )
    }
  ];

  return (
    <section className='how-it-works' id='process'>
      <div className='container'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='how-it-works__title text-center'>
            {t('process.title')}
          </h2>
          <p className='how-it-works__subtitle subtitle text-center'>
            {t('process.subtitle')}
          </p>
        </motion.div>

        <div className='how-it-works__timeline'>
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className='how-it-works__step'
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className='how-it-works__step-number'>{step.number}</div>

              <div className='how-it-works__step-content glass'>
                <div className='how-it-works__step-icon'>{step.icon}</div>

                <div className='how-it-works__step-info'>
                  <h3 className='how-it-works__step-title'>{step.title}</h3>
                  <p className='how-it-works__step-description'>
                    {step.description}
                  </p>
                </div>

                <div className='how-it-works__step-duration'>
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                  >
                    <circle cx='12' cy='12' r='10' strokeWidth='2' />
                    <path
                      d='M12 6v6l4 2'
                      strokeWidth='2'
                      strokeLinecap='round'
                    />
                  </svg>
                  <span>{step.duration}</span>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className='how-it-works__step-connector'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                  >
                    <path
                      d='M12 5v14m0 0l-7-7m7 7l7-7'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
