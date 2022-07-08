
const positionNotes = (measures) => {
  let x = 30
  measures.forEach((measure, mIdx) => {
    measures[mIdx].notes.forEach((note, nIdx) => {
      measures[mIdx].notes[nIdx].loc = {x: x, y: 0}
      x += 100
    })
  })
  return measures
}
// const positionNotes = (measures) => {
//   return measures.map(measure => {
//     return {
//       ...measure,
//       notes: measure.notes.map(note => {
//         return {
//           ...note,
//           loc: {
//             x: 0,
//             y: 0
//           }
//         }
//       }),
//     }
//   })
// }

export default positionNotes