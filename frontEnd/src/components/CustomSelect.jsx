import React, { useState, useEffect, useRef } from 'react';
import './CustomSelect.css'; // Import CSS file for styles

const CustomSelect = ({ data, onFilter, tableColumns, selectedRow, setselectedRow, displayColumn }) => {

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const tableRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setSelectedIndex(-1); // Reset selected index when filter changes  
  }, []);

  const handleInputChange = (e) => {

    const value = e.target.value;
    setselectedRow(value);
    onFilter(value);
    setIsVisible(true); // Show table when input changes
  };

  const handleKeyDown = (e) => {

    const div1 = document.querySelector('.customSelectTable');
    const selectedrow = document.querySelector(`[data-index = "${selectedIndex}"]`);
    const rowheight = selectedrow ? selectedrow.offsetTop : 0;

    console.log("rowheight", rowheight);

    if (e.key === 'ArrowDown') {

      if (selectedIndex > 8) {
        div1.scrollTop = rowheight;
        // selectedrow.style.top = '0px';
      }

      e.preventDefault();
      if (isVisible) {
        setSelectedIndex(prevIndex =>
          Math.min(prevIndex + 1, data.length - 1)
        );
      } else {
        setIsVisible(true);
      }

    } else if (e.key === 'ArrowUp') {
      if (selectedIndex > 8) {
        div1.scrollTop -= 19;
        // selectedrow.style.bottom = '0px';

      } else {
        div1.scrollTop = 0;
      }

      e.preventDefault();
      if (isVisible) {
        setSelectedIndex(prevIndex =>
          Math.max(prevIndex - 1, -1)
        );
      } else {
        setIsVisible(true);
      }
    } else if (e.key === 'Enter' && selectedIndex !== -1) {
      e.preventDefault();

      console.log("Selected item: ", data[selectedIndex]);
      // Handle Enter key press
      setselectedRow(data[selectedIndex]);

      // console.log("Selected item: ", data[selectedIndex]);
      setIsVisible(false); // Hide table when Enter is pressed
    }
  };

  const handleInputFocus = () => {
    setIsVisible(true); // Show table when input is focused
  };

  const handleInputBlur = () => {
    // setIsVisible(false); // Hide table when input loses focus

  };

  return (
    <div className="inline">
      <pre>
        selectedIndex: {JSON.stringify(selectedIndex, null, 2)}
      </pre>
      <input
        type="text"
        placeholder="Filter..."
        value={selectedRow[displayColumn]}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
      />
      {isVisible && (
        <div className='customSelectTable' >

          <table ref={tableRef} >
            <thead>
              <tr>
                {data[0] && tableColumns.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  data-index={index}
                  key={index}
                  className={index === selectedIndex ? 'selected' : ''}
                  onClick={() => setSelectedIndex(index)}
                >
                  {tableColumns.map((col, index) => (
                    <td key={index}>{item[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
