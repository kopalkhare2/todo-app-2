import React from 'react';

const FilterBar = ({ currentFilter, setFilter }) => {
  return (
    <div className="filter-bar">
      {['All', 'Active', 'Completed'].map(type => (
        <button
          key={type}
          onClick={() => setFilter(type)}
          className={currentFilter === type ? 'active' : ''}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;