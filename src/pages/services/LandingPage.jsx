import { motion } from 'framer-motion';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Contact from '../../components/sections/Contact';
import './ServicePage.css';

export default function LandingPage() {
  return (
    <>
      <Header />

      <main className="service-page">
        {/* Hero Section */}
        <section className="service-hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1>Создание лендингов в Молдове</h1>
              <p className="subtitle">
                Профессиональная разработка продающих лендингов для вашего бизнеса.
                От дизайна до запуска — под ключ за 7-14 дней.
              </p>
              <div className="service-price">
                <span className="price-tag">от $100</span>
                <button className="btn btn--primary" onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Заказать лендинг
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="service-benefits">
          <div className="container">
            <h2>Что входит в разработку</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <h3>✨ Современный дизайн</h3>
                <p>Уникальный дизайн с учетом вашего бренда и целевой аудитории</p>
              </div>
              <div className="benefit-card">
                <h3>📱 Адаптивная верстка</h3>
                <p>Идеальное отображение на всех устройствах — от смартфонов до десктопов</p>
              </div>
              <div className="benefit-card">
                <h3>🚀 Быстрая загрузка</h3>
                <p>Оптимизация скорости загрузки для лучшей конверсии</p>
              </div>
              <div className="benefit-card">
                <h3>📊 Meta Pixel</h3>
                <p>Подключение Meta Pixel для отслеживания рекламы Facebook/Instagram</p>
              </div>
              <div className="benefit-card">
                <h3>🌐 Настройка домена</h3>
                <p>Подключение вашего домена и хостинга</p>
              </div>
              <div className="benefit-card">
                <h3>🛠️ Поддержка 1 месяц</h3>
                <p>Техническая поддержка и правки после запуска</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="service-process">
          <div className="container">
            <h2>Как мы работаем</h2>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h3>Бриф и ТЗ</h3>
                <p>Созвон 30 минут, понимаем вашу задачу</p>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <h3>Дизайн</h3>
                <p>Разработка уникального дизайна, 3-5 дней</p>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <h3>Разработка</h3>
                <p>Верстка и программирование, 5-7 дней</p>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <h3>Запуск</h3>
                <p>Настройка домена, хостинга и поддержка</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <Contact />
      </main>

      <Footer />

      <style>{`
        .service-page {
          padding-top: 80px;
        }

        .service-hero {
          padding: 80px 0;
          background: linear-gradient(180deg, transparent, rgba(159, 106, 255, 0.05));
        }

        .service-hero h1 {
          font-size: 48px;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #9F6AFF, #7C3AED);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .service-hero .subtitle {
          font-size: 20px;
          color: var(--text-dim);
          margin-bottom: 40px;
          max-width: 700px;
        }

        .service-price {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .price-tag {
          font-size: 36px;
          font-weight: 700;
          color: var(--glow);
        }

        .service-benefits {
          padding: 80px 0;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-top: 40px;
        }

        .benefit-card {
          padding: 32px;
          background: rgba(159, 106, 255, 0.05);
          border: 1px solid var(--border);
          border-radius: 16px;
        }

        .benefit-card h3 {
          font-size: 20px;
          margin-bottom: 12px;
        }

        .service-process {
          padding: 80px 0;
          background: linear-gradient(180deg, rgba(159, 106, 255, 0.03), transparent);
        }

        .process-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 32px;
          margin-top: 40px;
        }

        .process-step {
          text-align: center;
        }

        .step-number {
          width: 60px;
          height: 60px;
          margin: 0 auto 16px;
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .service-hero h1 {
            font-size: 32px;
          }

          .service-price {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}
