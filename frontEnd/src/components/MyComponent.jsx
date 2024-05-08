import React, { useState } from 'react';
import CustomSelect from './CustomSelect';

const MyComponent = () => {
  const initialData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];

  const [filteredData, setFilteredData] = useState(initialData);

  const handleFilter = (value) => {
    const filtered = initialData.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <h1>Custom Component with Filterable Table</h1>
      <CustomSelect data={filteredData} onFilter={handleFilter} />
    </div>
  );
};

export default MyComponent;
