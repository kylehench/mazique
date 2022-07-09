import React, { useState } from 'react'

const StaffLines = (props) => {
  const { x, y, xEnd } = props.staff
  
  return (
    <>
      <polyline className="StaffLines" fill="none" stroke="#000000" strokeWidth="2.73" strokeLinejoin="bevel" points={`${336.61+x},${386.22+y} ${336.61+xEnd},${386.22+y}`} />
      <polyline className="StaffLines" fill="none" stroke="#000000" strokeWidth="2.73" strokeLinejoin="bevel" points={`${336.61+x},${411.024+y} ${336.61+xEnd},${411.024+y}`} />
      <polyline className="StaffLines" fill="none" stroke="#000000" strokeWidth="2.73" strokeLinejoin="bevel" points={`${336.61+x},${435.827+y} ${336.61+xEnd},${435.827+y}`} />
      <polyline className="StaffLines" fill="none" stroke="#000000" strokeWidth="2.73" strokeLinejoin="bevel" points={`${336.61+x},${460.63+y} ${336.61+xEnd},${460.63+y}`} />
      <polyline className="StaffLines" fill="none" stroke="#000000" strokeWidth="2.73" strokeLinejoin="bevel" points={`${336.61+x},${485.433+y} ${336.61+xEnd},${485.433+y}`} />
      
    </>
  )
}

export default StaffLines