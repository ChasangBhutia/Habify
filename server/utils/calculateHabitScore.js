module.exports.calculateTodaysScore = (allHabits) => {
    let score = 0;
    const doneHabits = allHabits.filter(habit => habit.done);
    if (allHabits.length === 0) return 0;
    score = Math.round((doneHabits.length / allHabits.length) * 100);
    return score;
}

module.exports.calculateWeekScore = (weeks) => {
    if (!weeks.length) return 0;

    let totalDone = 0;
    const totalDays = weeks.length * 7; // 7 days per week

    // Count done days directly
    for (const week of weeks) {
        for (const day of week.days) {
            if (day.done) totalDone++;
        }
    }

    // Calculate percentage
    let percentage = (totalDone / totalDays) * 100;

    // Round to 2 decimal places
    return Math.round(percentage * 100) / 100;
};

