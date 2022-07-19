module.exports.defaultScoreDocument = () => {
  let document = [
    { 
      // number:1,
      notes: [
        {
          type: 'quarter',
          rest: null,
        },
        {
          type: 'quarter',
          rest: null,
        },
        {
          type: 'quarter',
          rest: null,
        },
      ]},
  ]
  
  for (let i = 0; i < 9; i++) {
    document.push({...JSON.parse(JSON.stringify(document[i%1])), number: i})
  }

  document[0].clef = {sign: 'bass'}
  document[0].timeSig = {beats: 4, beatsType: 4}

  return document
}