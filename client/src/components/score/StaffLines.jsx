import React, { useState } from 'react'

const StaffLines = (props) => {
  // const [xEnd, setXEnd] = useState(2764)
  const { x, y, width } = props
  
  return (
    <>
      <polyline class="StaffLines" fill="none" stroke="#000000" stroke-width="2.73" stroke-linejoin="bevel" points={`${336.614+x},${386.22+y} ${336.61+x+width},${386.22+y}`} />
      <polyline class="StaffLines" fill="none" stroke="#000000" stroke-width="2.73" stroke-linejoin="bevel" points={`${336.614+x},${411.024+y} ${336.61+x+width},${411.024+y}`} />
      <polyline class="StaffLines" fill="none" stroke="#000000" stroke-width="2.73" stroke-linejoin="bevel" points={`${336.614+x},${435.827+y} ${336.61+x+width},${435.827+y}`} />
      <polyline class="StaffLines" fill="none" stroke="#000000" stroke-width="2.73" stroke-linejoin="bevel" points={`${336.614+x},${460.63+y} ${336.61+x+width},${460.63+y}`} />
      <polyline class="StaffLines" fill="none" stroke="#000000" stroke-width="2.73" stroke-linejoin="bevel" points={`${336.614+x},${485.433+y} ${336.61+x+width},${485.433+y}`} />
      
    </>
  )
}

export default StaffLines