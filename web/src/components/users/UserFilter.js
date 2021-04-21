import { useState } from 'react';

function UsersFilter({ className, onSearch, loading }) {

  const [search, setSearch] = useState('');

  const handleChange = (user) => {
    const { value } = user.target;
    setSearch(value);
    onSearch(value);
  }

  return (
    <div className={`row row-cols-1 ${className}`}>
      <div className="col">
        <div className="input-group mb-2">
          <span className="input-group-text">
            <i className={`fa fa-${loading ? 'refresh fa-spin': 'search'}`}></i>
          </span>
          <input type="text" name="title" className="form-control" placeholder="Search by title..."
            value={search} onChange={handleChange} />
        </div>
      </div>
    </div>
  )
}

UsersFilter.defaultProps = {
  loading: false,
  className: '',
  onSearch: () => {}
}

export default UsersFilter;
