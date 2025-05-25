import { createI18n } from 'vue-i18n';
import en from '@/i18n/locales/en/index.json';
import ru from '@/i18n/locales/ru/index.json';
import fr from '@/i18n/locales/fr/index.json';
import uk from '@/i18n/locales/uk/index.json';

export default createI18n({
  locale: localStorage.getItem('locale') || 'en',
  fallback: 'en',
  globalInjection: true,
  legacy: false,
  messages: { en, ru, fr, uk }
});
