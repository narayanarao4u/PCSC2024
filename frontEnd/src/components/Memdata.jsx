import React from 'react'
import Select from 'react-select';
import MemDataService from '../services/MemDataService'
import MyComponent from './MyComponent';


function Memdata() {
  const [memID, setMemID] = React.useState([])
  const [data, setData] = React.useState([])

  const ds = new MemDataService()
  const getMemdata = async () => {
    const res = await ds.get()
    let optiondata = res.map((item) => ({ value: `${item.Name}`, label: <MemLabel data={item} /> }))
    setData(optiondata)
  }

  const handleChange = (e) => {
    setMemID(e.label.props.data.Name)
  }
  React.useEffect(() => {
    getMemdata()
  }, [])



  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      const currentTabIndex = event.target.tabIndex;
      const nextInput = event.target.form.elements[currentTabIndex];

      if (nextInput) {
        nextInput.focus();
      } else {
        // Handle no next control available (e.g., submit the form)
        console.log('No next control available, submitting form...');
        event.target.form.submit();
      }
    }
  }

  return (
    <>
      <div>Memdata</div>
      <MyComponent />
      
      <div className='grid grid-cols-2'>
        <div>
          <Select options={data} onChange={handleChange} value={memID} />
        </div>

        <pre>
          {JSON.stringify(memID, null, 2)}
        </pre>

      </div>

      <form onSubmit={(e) => { e.preventDefault() }}>
        <input type="text" tabIndex="1" onKeyDown={handleKeyDown} />
        <input type="text" tabIndex="2" onKeyDown={handleKeyDown} />
        <input type="text" tabIndex="3" onKeyDown={handleKeyDown} />
        <input type="text" tabIndex="4" onKeyDown={handleKeyDown} />
        <input type="text" tabIndex="5" onKeyDown={handleKeyDown} />
        <button type="submit" tabIndex="6">Submit</button>
      </form>



    </>

  )
}

function MemLabel({ data }) {

  return (
    <div className='grid grid-cols-2'>
      <div>{data.Name}</div>
      <div>{data.Genlno}</div>
    </div>

  )
}

export default Memdata