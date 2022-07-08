import React, { useState } from 'react'

const StaffLines = (props) => {
  // const [xEnd, setXEnd] = useState(2764)
  const { x, y, width } = props
  
  return (
    <>
      <polyline className="StaffLines" fill="none" stroke="#000000" strokeWidth="2.73" strokeLinejoin="bevel" points={`${336.61+x},${386.22+y} ${336.61+x+width},${386.22+y}`} />
      <polyline className="StaffLines" fill="none" stroke="#000000" strokeWidth="2.73" strokeLinejoin="bevel" points={`${336.61+x},${411.024+y} ${336.61+x+width},${411.024+y}`} />
      <polyline className="StaffLines" fill="none" stroke="#000000" strokeWidth="2.73" strokeLinejoin="bevel" points={`${336.61+x},${435.827+y} ${336.61+x+width},${435.827+y}`} />
      <polyline className="StaffLines" fill="none" stroke="#000000" strokeWidth="2.73" strokeLinejoin="bevel" points={`${336.61+x},${460.63+y} ${336.61+x+width},${460.63+y}`} />
      <polyline className="StaffLines" fill="none" stroke="#000000" strokeWidth="2.73" strokeLinejoin="bevel" points={`${336.61+x},${485.433+y} ${336.61+x+width},${485.433+y}`} />
      
    </>
  )
}

export default StaffLines