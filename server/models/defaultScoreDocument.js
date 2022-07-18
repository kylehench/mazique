module.exports.defaultScoreDocument = () => {
  let document = [
    { number:1,
      clef: {sign: 'bass'},
      timeSig: {beats: 4, beatsType: 4},
      notes: [
        {
          type: 'whole',
          rest: null,
        },
      ]},
  ]
  
  for (let i = 0; i < 9; i++) {
    document.push({...JSON.parse(JSON.stringify(document[i%1])), number: i})
  }

  for (let measure of document) {
    delete measure.number
  }

  return document
}