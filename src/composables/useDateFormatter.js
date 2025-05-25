import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/en';
import 'dayjs/locale/uk';
import 'dayjs/locale/fr';

import {useI18n} from "vue-i18n";

const localeDatesFormats = {
  en: 'DD MMM YYYY, HH:mm',
  ru: 'DD MMM YYYY, HH:mm',
  fr: 'DD MMM YYYY, HH:mm',
  uk: 'DD MMM YYYY, HH:mm'
}

export default function useDateFormatter() {
  const { locale } = useI18n();

  const formatDate = (date, format = 'DD.MMM.YYYY, HH:mm') => {
    return dayjs(date).locale(locale.value).format(localeDatesFormats[locale.value])
  }

  return {
    formatDate,
  }
}
