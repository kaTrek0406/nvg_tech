import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Testimonials.css';

export default function Testimonials() {
  const { t } = useTranslation();
  const testimonials = [
    {
      id: 1,
      name: `${t('testimonials.items.0.name')}`,
      role: `${t('testimonials.items.0.role')}`,
      avatar: 'IP',
      rating: 5,
      text: `${t('testimonials.items.0.text')}`
    },
    {
      id: 2,
      name: `${t('testimonials.items.1.name')}`,
      role: `${t('testimonials.items.1.role')}`,
      avatar: 'MA',
      rating: 5,
      text: `${t('testimonials.items.1.text')}`
    },
    {
      id: 3,
      name: `${t('testimonials.items.2.name')}`,
      role: `${t('testimonials.items.2.role')}`,
      avatar: 'AC',
      rating: 5,
      text: `${t('testimonials.items.2.text')}`
    }
  ];
  return (
    <section className='testimonials'>
      <div className='container'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='testimonials__title text-center'>
            {t('testimonials.title')}
          </h2>
          <p className='testimonials__subtitle subtitle text-center'>
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className='testimonials__grid'>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className='testimonial-card glass'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className='testimonial-card__rating'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              <p className='testimonial-card__text'>"{testimonial.text}"</p>

              <div className='testimonial-card__author'>
                <div className='testimonial-card__avatar'>
                  {testimonial.avatar}
                </div>
                <div className='testimonial-card__author-info'>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
