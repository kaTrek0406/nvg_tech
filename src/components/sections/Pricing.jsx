import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PricingModal from '../PricingModal';
import './Pricing.css';

export default function Pricing() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      name: `${t('pricing.plans.0.name')}`,
      price: `${t('pricing.plans.0.price')}`,
      features: [
        `${t('pricing.plans.0.features.0')}`,
        `${t('pricing.plans.0.features.1')}`,
        `${t('pricing.plans.0.features.2')}`
      ],
      recommended: false
    },
    {
      name: `${t('pricing.plans.1.name')}`,
      price: `${t('pricing.plans.1.price')}`,
      features: [
        `${t('pricing.plans.1.features.0')}`,
        `${t('pricing.plans.1.features.1')}`,
        `${t('pricing.plans.1.features.2')}`,
        `${t('pricing.plans.1.features.3')}`,
        `${t('pricing.plans.1.features.4')}`
      ],
      recommended: true
    },
    {
      name: `${t('pricing.plans.2.name')}`,
      price: `${t('pricing.plans.2.price')}`,
      features: [
        `${t('pricing.plans.2.features.0')}`,
        `${t('pricing.plans.2.features.1')}`,
        `${t('pricing.plans.2.features.2')}`,
        `${t('pricing.plans.2.features.3')}`,
        `${t('pricing.plans.2.features.4')}`,
        `${t('pricing.plans.2.features.5')}`
      ],
      recommended: false
    }
  ];
  return (
    <section className='pricing' id='pricing'>
      <div className='container'>
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='pricing__title text-center'>{t('pricing.title')}</h2>
          <p className='pricing__subtitle subtitle text-center'>
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <div className='pricing__grid'>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`pricing-card glass ${
                plan.recommended ? 'pricing-card--recommended' : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {plan.recommended && (
                <div className='pricing-card__badge'>{t('pricing.badge')}</div>
              )}

              <h3 className='pricing-card__name'>{plan.name}</h3>
              <div className='pricing-card__price'>{plan.price}</div>

              <ul className='pricing-card__features'>
                {plan.features.map(feature => (
                  <li key={feature}>
                    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
                      <path
                        d='M16.6 5L7.5 14.1L3.4 10'
                        stroke='var(--success)'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`btn ${
                  plan.recommended ? 'btn--primary' : 'btn--secondary'
                }`}
                onClick={() => {
                  setSelectedPlan(plan);
                  setIsModalOpen(true);
                }}
              >
                {t('pricing.button')}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <PricingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </section>
  );
}
