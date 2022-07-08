import React from 'react'

const BarLine = (props) => {
  const { x, y, type } = props

  const renderBarline = () => {
    if (type==='end') {
      return <>
        <polyline
          className="BarLine"
          fill="none" stroke="#000000" strokeWidth="4.46" stroke-linejoin="bevel" points={`${313.6+x},${384.856+y} ${313.6+x},${486.797+y}`}
        />
        <polyline
          className="BarLine"
          fill="none" stroke="#000000" strokeWidth="13.64" stroke-linejoin="bevel" points={`${330.96+x},${384.856+y} ${330.96+x},${486.797+y}`}
        />
      </>
    } else {
      return <polyline
        className="BarLine"
        fill="none" stroke="#000000" stroke-width="4.46" strokeLinejoin="bevel" points={`${337+x},${384.856+y} ${337+x},${486.797+y}`}
      />
    }
  }
  
  return ( <>
    { renderBarline() }
  </> )
}

export default BarLine