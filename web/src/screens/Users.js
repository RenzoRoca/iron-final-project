import { Fragment } from "react";
import { useTranslation } from 'react-i18next';
import UserList from "../components/users/UserList";


function Users() {
  const { t } = useTranslation()
  return (
    <Fragment>
      <h3 className="mb-3">{t('Users.name')}</h3>
      <UserList />
    </Fragment>
  );
}

export default Users;
