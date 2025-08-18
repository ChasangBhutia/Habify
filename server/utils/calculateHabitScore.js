module.exports.calculateScore = (allHabits)=>{
    const habitCount = allHabits.length;
    if(habitCount === 0) return 0;
    const doneCount = allHabits.filter(h=>h.done).length;
    if(doneCount === 0) return 0;
    if(habitCount === doneCount) return 100;
    return Number(((doneCount / habitCount) * 100).toFixed(1));
}


module.exports.calculateColor = (score)=>{
    if(score<=10) return '#033718ff';
    else if(score<=30) return '#044b21ff';
    else if(score<=50) return '#06672dff';
    else if(score<=70) return '#06923E';
    else if(score<=90) return '#06a043ff';
    return '#11e365ff';
}
