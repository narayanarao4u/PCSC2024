import React, { useState, useEffect, useRef } from 'react';
import './CustomSelect.css'; // Import CSS file for styles

const CustomSelect = ({ data, onFilter }) => {
  const [filter, setFilter] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const tableRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setSelectedIndex(-1); // Reset selected index when filter changes
  }, [filter]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    onFilter(value);
    setIsVisible(true); // Show table when input changes
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prevIndex =>
        Math.min(prevIndex + 1, data.length - 1)
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prevIndex =>
        Math.max(prevIndex - 1, -1)
      );
    } else if (e.key === 'Enter' && selectedIndex !== -1) {
      // Handle Enter key press
      console.log("Selected item: ", data[selectedIndex]);
      setIsVisible(false); // Hide table when Enter is pressed
    }
  };

  const handleInputFocus = () => {
    setIsVisible(true); // Show table when input is focused
  };

  const handleInputBlur = () => {
    setIsVisible(false); // Hide table when input loses focus
    setFilter
  };

  return (
    <div>
        <pre>

        </pre>
      <input
        type="text"
        placeholder="Filter..."
        value={filter}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
      />
      {isVisible && (
        <table ref={tableRef} className='customSelectTable'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={index === selectedIndex ? 'selected' : ''}
              >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomSelect;
