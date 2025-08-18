import React from 'react'
import SideMenu from '../Components/SideMenu'
import { useState } from 'react'
import { useEffect } from 'react'
import { getHabits, markHabit } from "../services/habitServices";
import "react-circular-progressbar/dist/styles.css";
import Calendar from '../Components/Calendar'

const Home = () => {

    const [habits, setHabits] = useState([]);
    const [refresh, setRefresh] = useState(1);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await getHabits();
                console.log(response.data.habits);

                if (response.data.success) {
                    let habits = response.data.habits;
                    setHabits(habits);
                    let doneHabitsLength = habits.filter(h => h.done === true).length;
                    setScore((doneHabitsLength / habits.length) * 100);
                }
            } catch (err) {
                console.log(err.message);
            }
        }
        fetchData();
    }, [refresh])


    const handleHabitMark = async (id) => {
        try {
            let response = await markHabit(id);
            if (response.data.success) {
                alert(response.data.message);
                setRefresh(refresh + 1);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="flex bg-blue-100 h-screen w-full ">
            <SideMenu />
            <Calendar score={score}/>
        </div>
    )
}

export default Home