// Partner API configuration. Keep mock mode until the partner group confirms its contract.
// Never put secrets in source control; use environment variables in real deployments.
function clean(value, fallback) {
  const v = String(value || '').trim();
  return v && !/^NOT_YET_SPECIFIED$/i.test(v) ? v : fallback;
}
function safeBaseUrl(value) {
  const candidate = clean(value, '');
  if (!candidate) return null;
  try {
    const parsed = new URL(candidate);
    if (!['http:', 'https:'].includes(parsed.protocol)) return null;
    return parsed.toString().replace(/\/$/, '');
  } catch { return null; }
}
const registrarBaseUrl = safeBaseUrl(process.env.REGISTRAR_BASE_URL);
const financeBaseUrl = safeBaseUrl(process.env.FINANCE_BASE_URL);
module.exports = {
  registrar: {
    mode: 'mock', // Switch only after implementing and testing the agreed live adapter.
    baseUrl: registrarBaseUrl,
    studentLookupPath: clean(process.env.REGISTRAR_STUDENT_LOOKUP_PATH, null),
    apiKey: clean(process.env.REGISTRAR_API_KEY, null)
  },
  finance: {
    mode: 'mock', // Switch only after implementing and testing the agreed live adapter.
    baseUrl: financeBaseUrl,
    penaltiesPath: clean(process.env.FINANCE_PENALTIES_PATH, null),
    paymentStatusPath: clean(process.env.FINANCE_PAYMENT_STATUS_PATH, null),
    apiKey: clean(process.env.FINANCE_API_KEY, null)
  }
};
