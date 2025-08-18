import api from "./api";

export const getHabits = ()=>{
    return api.get('/habits/')
}

export const markHabit = (habitId)=>{
    return api.patch(`/habits/${habitId}/toggle`);
}

export const getHabitScore = ()=>{
    return api.get('/habits/score');
}