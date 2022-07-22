import './table.styles.scss'


function Table({title, keys, values}) {
  return (
   <table className='table'>
    <tbody>
        <tr>
            <th>{title}</th>
        </tr>
    {
        keys.map((key, index)=>(
            <tr>
                <td className='key'>{key}</td>
                <td className='value'>{values[index]}</td>
            </tr>
        ))
    }
    </tbody>
   </table>
  )
}

export default Table;
