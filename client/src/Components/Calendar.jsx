import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect } from "react";
import { getHabitScore } from "../services/habitServices";

export default function MyCalendar() {

  const [habitScore, setHabitScore] = useState([]);

  useEffect(()=>{
    const fetchData = async()=>{
        try{
          let response = await getHabitScore();
          if(response.data.success){
            setHabitScore(response.data.scores);
          }
        }catch(err){
          console.log(err.message);
        }
    }
    fetchData();
    console.log(habitScore);
    
  },[]);

  const [events] = useState([
    { title: 10, date: "2025-08-01", score: 10,backgroundColor:10>10?'red':10>25?'blue':'green' },
    { title: 70, date: "2025-08-02", score: 70,backgroundColor:70>10?'red':70>25?'blue':'green' },
    { title: 90, date: "2025-08-03", score: 90,backgroundColor:90>10?'red':90>25?'blue':'green' },
  ]);

  // custom rendering for each event
  const renderEventContent = (eventInfo) => {
    const score = eventInfo.event.extendedProps.score || eventInfo.event.title;

    return (
      <div className="w-15 h-15 mx-auto">
        <CircularProgressbar
          value={score}
          text={`${score||0}%`}
          styles={buildStyles({
            textSize: "35px",
            pathColor:
              score < 30 ? "#f53c57ff" : score < 71 ? "#3b82f6" : "#1ac12eff",
            textColor: "#111827",
            trailColor: "#e5e7eb",
          })}
        />
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-xl">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={habitScore}
        height="auto"
        eventContent={renderEventContent} // 👈 custom renderer
      />
    </div>
  );
}
