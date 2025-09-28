function normalizeToDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Example: build 7 days array starting from given start date (Monday)
function buildWeekDaysHabit(startDate) {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push({
      date: normalizeToDay(date),
      score: 0,
      done: false,
    });
  }
  return days;
}

function buildWeekDaysScore(startDate) {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push({
      date: normalizeToDay(date),
      score: 0,
    });
  }
  return days;
}

// Helpers to get week range
function startOfWeekMonday(date) {
  const d = new Date(date);
  const day = d.getDay(); // Sunday = 0, Monday = 1
  const diff = (day === 0 ? -6 : 1) - day; // move to Monday
  d.setDate(d.getDate() + diff);
  return normalizeToDay(d);
}

function endOfWeekSunday(start) {
  const d = new Date(start);
  d.setDate(start.getDate() + 6);
  d.setHours(0,0,0,0); // end of Sunday
  return d;
}

module.exports = { startOfWeekMonday, endOfWeekSunday, buildWeekDaysHabit, normalizeToDay, buildWeekDaysScore };
