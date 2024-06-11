import React, { useState } from 'react';
import CustomSelect from './CustomSelect';
import MemDataService from '../services/MemDataService'

const MyComponent = () => {
  // const initialData = [
  //   { id: 1, name: 'John Doe', email: 'john@example.com' },
  //   { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  //   { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  // ];
  const [initialData, setInitialData] = useState([]);
  const [filteredData, setFilteredData] = useState();
  const tableColumns = ['MEMID','Name', 'MEMTYPE']
  const displayColumn = 'Name'
  const selectColumn = 'MEMID'
  const [selectedRow, setselectedRow] = useState('');
  const ds = new MemDataService()
  const getMemdata = async () => {
    const res = await ds.get()
    setFilteredData(res);
    setInitialData(res);
  }


  React.useEffect(() => {
    getMemdata()
  }, [])


  const handleFilter = (value) => {
    console.log(value);
    const filtered = initialData.filter(item =>
      item.MEMTYPE.toLowerCase().includes(value.toLowerCase()) ||
      item.Name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <>
      <h1>Custom Component with Filterable Table</h1>
      <CustomSelect data={filteredData} onFilter={handleFilter} 
        tableColumns={tableColumns}
        setselectedRow={setselectedRow}
        selectedRow={selectedRow}
        displayColumn={displayColumn}/>
        <button onClick={() => console.log()}>TEST</button>
      <pre>
        {/* selectedRow: {JSON.stringify(selectedRow, null, 2)}  */}
      </pre>
    </>
  );
};

export default MyComponent;
