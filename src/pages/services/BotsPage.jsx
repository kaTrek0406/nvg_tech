import { motion } from 'framer-motion';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Contact from '../../components/sections/Contact';
import './ServicePage.css';

export default function BotsPage() {
  return (
    <>
      <Header />

      <main className="service-page">
        <section className="service-hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1>Разработка Telegram ботов в Молдове</h1>
              <p className="subtitle">
                Автоматизируйте бизнес-процессы с помощью чат-ботов. Прием заказов, консультации,
                рассылки и интеграция с CRM системами.
              </p>
              <div className="service-price">
                <span className="price-tag">от $50</span>
                <button className="btn btn--primary" onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Заказать бота
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="service-benefits">
          <div className="container">
            <h2>Возможности Telegram бота</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <h3>💬 Прием заявок 24/7</h3>
                <p>Автоматический прием заказов и обращений клиентов</p>
              </div>
              <div className="benefit-card">
                <h3>📋 Сбор данных</h3>
                <p>Анкеты, опросы, формы заказа с валидацией</p>
              </div>
              <div className="benefit-card">
                <h3>🔔 Уведомления</h3>
                <p>Мгновенные уведомления о новых заявках</p>
              </div>
              <div className="benefit-card">
                <h3>📊 Интеграция с Google Sheets</h3>
                <p>Автоматическая запись данных в таблицы</p>
              </div>
              <div className="benefit-card">
                <h3>🤝 Подключение к AmoCRM</h3>
                <p>Создание сделок и контактов в CRM</p>
              </div>
              <div className="benefit-card">
                <h3>📤 Рассылки</h3>
                <p>Массовые рассылки для ваших подписчиков</p>
              </div>
              <div className="benefit-card">
                <h3>💳 Прием платежей</h3>
                <p>Интеграция с платежными системами</p>
              </div>
              <div className="benefit-card">
                <h3>⚙️ Инструкция + поддержка</h3>
                <p>Документация и техподдержка после запуска</p>
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
