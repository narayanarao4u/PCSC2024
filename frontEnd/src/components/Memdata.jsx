import React from 'react'
import Select from 'react-select';
import MemDataService from '../services/MemDataService'


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

  return (
    <>
      <div>Memdata</div>
      <div className='grid grid-cols-2'>
        <div>
          <Select options={data} onChange={handleChange} value={memID} />
        </div>

        <pre>
          {JSON.stringify(memID, null, 2)}
        </pre>

      </div>


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