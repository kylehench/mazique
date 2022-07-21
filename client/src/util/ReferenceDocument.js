let ReferenceDocument = [
  { number:1,
    clef: {sign: 'treble'},
    timeSig: {beats: 4, beatsType: 4},
    notes: [
      {
        type: 'quarter',
        // pitch: {
        //   step: 'D',
        //   // alter: 0,
        //   octave: 4,
        // },
        dot: 1,
        rest: null,
      },
      {
        type: 'quarter',
        pitch: {
          step: 'F',
          alter: 1,
          octave: 4,
        },
        dot: 1,
      },
      {
        type: 'quarter',
        pitch: {
          step: 'D',
          // alter: 0,
          octave: 4,
        }
      },
    ]
  },
  {number:2,
    notes: [
    {
      type: 'half',
      pitch: {
        step: 'C',
        // alter: 0,
        octave: 3,
      },
    },
    {
      type: 'half',
      pitch: {
        step: 'G',
        // alter: 0,
        octave: 4,
      },
    },
  ]},
  {number:3,
    notes: [
    {
      type: 'half',
      pitch: {
        step: 'D',
        // alter: 0,
        octave: 4,
      },
    },
    {
      type: 'half',
      pitch: {
        step: 'E',
        // alter: 0,
        octave: 4,
      },
    },
  ]},
  {number:3,
    notes: [
    {
      type: 'quarter',
      pitch: {
        step: 'A',
        // alter: 0,
        octave: 4,
      },
    },
    {
      type: 'half',
      pitch: {
        step: 'D',
        // alter: 0,
        octave: 4,
      },
    },
    {
      type: 'quarter',
      pitch: {
        step: 'C',
        // alter: 0,
        octave: 4,
      },
    },
  ]},
  {number:5,
    notes: [
    {
      type: 'whole',
      pitch: {
        step: 'D',
        // alter: 0,
        octave: 4,
      },
    },
  ]},
  {number:6,
    notes: [
    {
      type: 'whole',
      rest: {_measure: 'yes'},
    },
  ]},
  {number:6,
    notes: [
    {
      type: 'half',
      rest: null,
    },
    {
      type: 'half',
      rest: null,
    },
  ]},
]

// for (let i = 5; i < 55; i++) {
//   ReferenceDocument.push({...JSON.parse(JSON.stringify(ReferenceDocument[i%4])), number: i})
// }

for (let measure of ReferenceDocument) {
  delete measure.number
}

export default ReferenceDocument