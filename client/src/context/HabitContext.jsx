import { createContext, useContext, useEffect, useState } from "react";
import { createHabit, getHabits, markHabit, getTodayScore, getWeekScore } from "../services/habitServices";
import { useAlertContext } from "./AlertContext";

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {

    const { success, setSuccess, error, setError, refresh, setRefresh } = useAlertContext();

    const [habits, setHabits] = useState([]);
    const [todayHabits, setTodayHabits] = useState([]);
    const [habitScores, setHabitScores] = useState([]);
    const [todayScore, setTodayScore] = useState(0);
    const [weekScore, setWeekScores] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await getHabits();
                if (response.data.success) {
                    setHabits(response.data.habits);
                    setTodayHabits(response.data.todayHabits);
                }
            } catch (err) {
                console.error(`Error fetching data: ${err.message}`);
            }
        }
        fetchData();
    }, [refresh])

    useEffect(() => {
        const fetchScore = async () => {
            try {
                let response = await getTodayScore();
                if (response.data.success) {
                    setTodayScore(response.data.todayScore);
                }
            } catch (err) {
                console.error(`Error fetching score: ${err.message}`);
            }
        }
        fetchScore();
    }, [refresh]);

    useEffect(() => {
        const fetchScore = async () => {
            try {
                let response = await getWeekScore();
                if (response.data.success) {
                    setWeekScores(response.data.weekScore);
                }
            } catch (err) {
                console.error(`Error fetching score: ${err.message}`);
            }
        }
        fetchScore();
    }, [refresh]);


    const createNewHabit = async (title, type, color) => {
        try {
            let response = await createHabit({ title, type, color });
            if (response.data.success) {
                setSuccess(response.data.message);
                setTimeout(() => {
                    setSuccess(null);
                }, 3000)
            }
            setRefresh(prev => prev + 1)
        } catch (err) {
            setError(err.message);
            setTimeout(() => {
                setError(null);
            }, 3000)
            console.error(`Error creating data: ${err.message}`)
        }
    }

    const toggleHabit = async (habitId, dayIndex, weekIndex, weekId) => {
        try {
            let response = await markHabit(habitId, dayIndex, weekIndex, weekId);
            if (response.data.success) {
                setSuccess(response.data.message);
                setTimeout(() => {
                    setSuccess(null);
                }, 3000)
            }
            setRefresh(prev => prev + 1);
        } catch (err) {
            setError(err.message);
            setTimeout(() => {
                setError(null);
            }, 3000)
            console.error(`Error marking habit: ${err.message}`)
        }
    }



    return (
        <HabitContext.Provider value={{todayHabits, weekScore, todayScore, habits, createNewHabit, habitScores, toggleHabit }}>
            {children}
        </HabitContext.Provider>
    )
}

export const useHabitContext = () => {
    return useContext(HabitContext)
}