import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Contact from '../../components/sections/Contact';

export default function AutomationPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header
        onScrollToContact={() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onScrollToPortfolio={() => navigate('/#portfolio')}
      />

      <main className="service-page">
        <section className="service-hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1>Автоматизация бизнес-процессов в Молдове</h1>
              <p className="subtitle">
                Автоматизируем рутинные задачи: обработка заявок, рассылки, интеграции между сервисами,
                парсинг данных и многое другое.
              </p>
              <div className="service-price">
                <span className="price-tag">от $100</span>
                <button className="btn btn--primary" onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Обсудить проект
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="service-benefits">
          <div className="container">
            <h2>Что можно автоматизировать</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <h3>📧 Email-рассылки</h3>
                <p>Автоматические email-кампании и уведомления</p>
              </div>
              <div className="benefit-card">
                <h3>🔗 Интеграции API</h3>
                <p>Связь между разными сервисами и системами</p>
              </div>
              <div className="benefit-card">
                <h3>📊 Сбор данных</h3>
                <p>Парсинг сайтов, агрегация информации</p>
              </div>
              <div className="benefit-card">
                <h3>⚡ Webhook обработка</h3>
                <p>Реакция на события в реальном времени</p>
              </div>
              <div className="benefit-card">
                <h3>📝 Генерация отчетов</h3>
                <p>Автоматические отчеты в Excel, PDF, Google Sheets</p>
              </div>
              <div className="benefit-card">
                <h3>🔄 Синхронизация данных</h3>
                <p>Автосинхронизация между CRM, базами данных, таблицами</p>
              </div>
              <div className="benefit-card">
                <h3>🤖 Чат-боты для поддержки</h3>
                <p>Автоответчики для Telegram, WhatsApp, сайта</p>
              </div>
              <div className="benefit-card">
                <h3>📈 Мониторинг и алерты</h3>
                <p>Отслеживание метрик и уведомления о проблемах</p>
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <Footer />
    </>
  );
}
