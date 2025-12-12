/**
 * Notification Service
 * Handles form submissions and contact requests
 */

/**
 * Sends notification with form data (stub implementation)
 * @param {Object} payload - Form data
 * @param {string} payload.name - User name
 * @param {string} payload.phone - User phone (+373)
 * @param {string} payload.message - User message
 * @returns {Promise<{ok: boolean, message?: string}>}
 */
export async function notify(payload) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 900));

  // Log for development
  console.log('📬 Form submission:', payload);

  // Simulate success
  return {
    ok: true,
    message: 'Спасибо! Мы свяжемся с вами в ближайшее время.'
  };
}

/**
 * Sends notification via Telegram Bot
 * @param {Object} payload - Form data
 * @returns {Promise<{ok: boolean}>}
 */
export async function notifyTelegram(payload) {
  const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  console.log('🔍 Telegram credentials check:', {
    hasToken: !!TELEGRAM_BOT_TOKEN,
    hasChat: !!TELEGRAM_CHAT_ID,
    token: TELEGRAM_BOT_TOKEN ? `${TELEGRAM_BOT_TOKEN.substring(0, 10)}...` : 'missing',
    chatId: TELEGRAM_CHAT_ID || 'missing'
  });

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('⚠️ Telegram credentials not configured');
    return notify(payload);
  }

  const message = `
🔔 Новая заявка с NVG Landing

👤 Имя: ${payload.name}
📞 Телефон: ${payload.phone}
💬 Сообщение: ${payload.message}

⏰ ${new Date().toLocaleString('ru-RU')}
  `.trim();

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  console.log('📤 Sending to Telegram:', {
    url: url.replace(TELEGRAM_BOT_TOKEN, 'TOKEN_HIDDEN'),
    chatId: TELEGRAM_CHAT_ID
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    const data = await response.json();
    
    console.log('📥 Telegram response:', data);

    if (data.ok) {
      console.log('✅ Message sent successfully!');
      return { ok: true, message: 'Сообщение успешно отправлено!' };
    } else {
      console.error('❌ Telegram API error:', data);
      throw new Error(data.description || 'Telegram API error');
    }
  } catch (error) {
    console.error('💥 Telegram notification error:', error);
    return { ok: false, message: 'Ошибка отправки. Попробуйте позже.' };
  }
}
