import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Contact from '../../components/sections/Contact';

export default function EcommercePage() {
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
              <h1>Создание интернет-магазинов в Молдове</h1>
              <p className="subtitle">
                Полноценный интернет-магазин на Shopify с интеграцией оплаты, доставки и аналитики.
                Готовое решение для старта продаж онлайн.
              </p>
              <div className="service-price">
                <span className="price-tag">от $450</span>
                <button className="btn btn--primary" onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Заказать магазин
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="service-benefits">
          <div className="container">
            <h2>Что входит в разработку</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <h3>🛍️ Shopify магазин (5-7 секций)</h3>
                <p>Полнофункциональный магазин на платформе Shopify</p>
              </div>
              <div className="benefit-card">
                <h3>📦 Загрузка 30-50 товаров</h3>
                <p>Добавление ваших товаров с описаниями и фото</p>
              </div>
              <div className="benefit-card">
                <h3>💳 Интеграция оплаты</h3>
                <p>Подключение платежных систем для приема оплат</p>
              </div>
              <div className="benefit-card">
                <h3>🚚 Настройка доставки</h3>
                <p>Конфигурация зон доставки и тарифов</p>
              </div>
              <div className="benefit-card">
                <h3>🤖 CRM интеграция</h3>
                <p>Telegram бот + Google Sheets или AmoCRM</p>
              </div>
              <div className="benefit-card">
                <h3>📊 Meta Pixel + GA4</h3>
                <p>Полная аналитика: ViewContent, AddToCart, Purchase</p>
              </div>
              <div className="benefit-card">
                <h3>🛠️ Поддержка 1 месяц</h3>
                <p>Техподдержка и правки после запуска</p>
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
