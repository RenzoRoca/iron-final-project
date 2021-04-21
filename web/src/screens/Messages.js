import { Fragment } from "react";
import { useTranslation } from 'react-i18next';
import MessagesList from '../components/messages/MessagesList';

function Messages() {
  const { t } = useTranslation()
  return (
    <Fragment>
      <h3 className="mb-3">{t('Messages.title')}</h3>
      <MessagesList />
    </Fragment>
  );
}

export default Messages;
