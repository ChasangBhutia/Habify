import api from "./api"

export const getHabits = ()=>{
    return api.get("/habits/");
}

export const createHabit = (habitData)=>{;
    return api.post("/habits/", habitData)
}

export const markHabit = (habitId, dayIndex, weekIndex, weekId) =>{
    return api.put(`/habits/${habitId}`, {dayIndex, weekIndex, weekId});
}

export const getTodayScore = () =>{
    return api.get("/habits/today/score");
}

export const getWeekScore = () =>{
    return api.get("/habits/week/score");
}