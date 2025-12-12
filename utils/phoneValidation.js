/**
 * Phone Validation Utilities for Moldova (+373)
 * Format: +373 XX XXX XXX (8 digits after country code)
 */

export const MD_PHONE_REGEX = /^\+373\d{8}$/;

/**
 * Validates Moldova phone number
 * @param {string} value - Phone number to validate
 * @returns {boolean} - True if valid
 */
export function isValidMoldovaPhone(value) {
  const cleaned = String(value).replace(/\s+/g, '');
  return MD_PHONE_REGEX.test(cleaned);
}

/**
 * Formats input to Moldova phone format
 * @param {string} value - Raw phone input
 * @returns {string} - Formatted as +373 XX XXX XXX
 */
export function formatMoldovaPhone(value) {
  // Remove all non-digit characters
  const digits = String(value).replace(/[^\d]/g, '');
  
  // If starts with 373, remove it
  const body = digits.startsWith('373') ? digits.slice(3) : digits;
  
  // Limit to 8 digits
  const clean = body.slice(0, 8);
  
  // Format as XX XXX XXX
  const p1 = clean.slice(0, 2);
  const p2 = clean.slice(2, 5);
  const p3 = clean.slice(5, 8);
  
  // Build formatted string
  return ['+373', p1 && ' ' + p1, p2 && ' ' + p2, p3 && ' ' + p3]
    .filter(Boolean)
    .join('');
}

/**
 * Auto-format phone input on typing
 * @param {Event} event - Input event
 */
export function handlePhoneInput(event) {
  const input = event.target;
  const cursorPosition = input.selectionStart;
  const oldValue = input.value;
  const newValue = formatMoldovaPhone(oldValue);
  
  input.value = newValue;
  
  // Preserve cursor position
  if (cursorPosition) {
    const diff = newValue.length - oldValue.length;
    input.setSelectionRange(cursorPosition + diff, cursorPosition + diff);
  }
}
