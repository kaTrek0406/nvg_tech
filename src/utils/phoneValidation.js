/**
 * Форматирует номер телефона Moldova в формате +373 XX XXX XXX
 */
export function formatMoldovaPhone(value) {
  // Убираем все кроме цифр
  const digits = value.replace(/\D/g, '');

  // Если пользователь стер все, возвращаем префикс
  if (digits.length === 0) {
    return '+373 ';
  }

  // Убедимся что начинается с 373
  let formatted = digits.startsWith('373') ? digits : '373' + digits;

  // Ограничиваем до 11 цифр (373 + 8 цифр)
  formatted = formatted.substring(0, 11);

  // Форматируем: +373 XX XXX XXX
  let result = '+373 ';

  if (formatted.length > 3) {
    result += formatted.substring(3, 5);
  }

  if (formatted.length > 5) {
    result += ' ' + formatted.substring(5, 8);
  }

  if (formatted.length > 8) {
    result += ' ' + formatted.substring(8, 11);
  }

  return result.trim() + ' ';
}

/**
 * Проверяет валидность номера телефона Moldova
 */
export function isValidMoldovaPhone(phone) {
  // Убираем все кроме цифр
  const digits = phone.replace(/\D/g, '');

  // Должно быть ровно 11 цифр (373 + 8 цифр)
  return digits.length === 11 && digits.startsWith('373');
}
