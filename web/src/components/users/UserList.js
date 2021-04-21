import { useState, useEffect } from 'react';
import UserItem from './UserItem';

import UsersService from '../../services/users-service';
import { Fragment } from 'react';
import UsersFilter from './UserFilter';

function UserList({ minSearchChars }) {

  const [state, setState] = useState({
    Users: [],
    loading: false
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    // componentDidMount

    async function fetchUsers() {
      
      setState(state => ({
        ...state,
        loading: true
      }))
      const Users = await UsersService.list(search);

      if (!isUnmounted) {
        setState({
          Users: Users,
          loading: false
        })
      }
    }

    let isUnmounted = false;

    if (search.length >= minSearchChars || search.length === 0) {
      fetchUsers();
    }

    return () => {
      // componentWillUnmount
      isUnmounted =  true;
    }
  }, [search, minSearchChars]); // tiene como dependencia el buscador, para que siempre que cambie de valor se ejecute

  const handleSearch = search => setSearch(search);
  
  const { Users, loading } = state;

  return (
    <Fragment>
      <UsersFilter className="mb-3" onSearch={handleSearch} loading={loading} />
      <div className="row row-cols-4">
        {Users.map(user => (
          <div key={user.id} className="col mb-4"><UserItem user={user} /></div>
        ))}
      </div>
    </Fragment>
    
  )
}

UserList.defaultProps = {
  minSearchChars: 4
}

export default UserList;
