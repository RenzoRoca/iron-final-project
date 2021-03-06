import { Fragment } from "react";
import { useTranslation } from 'react-i18next';
import AdsList from '../components/ads/AdList';

function Ads() {
  const { t } = useTranslation()
  return (
    <Fragment>
      <h3 className="mb-3">{t('Ads.title')}</h3>
      <AdsList />
    </Fragment>
  );
}

export default Ads;
