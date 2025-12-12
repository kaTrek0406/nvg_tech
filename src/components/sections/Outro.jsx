import { motion } from 'framer-motion';
import './Outro.css';
import { useTranslation } from 'react-i18next';
export default function Outro() {
  const { t } = useTranslation();

  return (
    <section className='outro'>
      <div className='container'>
        <motion.div
          className='outro__content'
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <svg
            className='outro__logo'
            width='120'
            height='120'
            viewBox='0 0 120 120'
            fill='none'
          >
            <text
              x='50%'
              y='50%'
              dy='.35em'
              textAnchor='middle'
              fontSize='48'
              fontFamily='Space Grotesk, sans-serif'
              fontWeight='700'
              fill='url(#outro-gradient)'
            >
              NVG
            </text>
            <defs>
              <linearGradient
                id='outro-gradient'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'
              >
                <stop offset='0%' stopColor='#7A33FF' />
                <stop offset='50%' stopColor='#9F6AFF' />
                <stop offset='100%' stopColor='#CBA3FF' />
              </linearGradient>
            </defs>
          </svg>

          <h3 className='outro__tagline'>{t('outro.tagline')}</h3>

          <p className='outro__contact'>
            {t('outro.contact', { email: 'hello@nvg.digital' })}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
