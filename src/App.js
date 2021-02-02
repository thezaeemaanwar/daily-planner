import React, { useState, useEffect } from "react";
import "./App.css";
import ScheduleTable from "./components/ScheduleTable";
import Signup from "./components/Signup";
import firebase from "firebase";

const weekDays = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

const App = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const [user, setUser] = useState(null);

  const handleSelectDay = (day) => {
    setSelectedDay(day);
  };
  console.log("user : ", user);
  return (
    <div className="App">
      {!user ? (
        <Signup setUser={setUser} />
      ) : (
        <>
          <div className="weekDays">
            {weekDays.map((day, ind) => (
              <div
                key={ind}
                className={day === selectedDay ? "headSelected" : "head"}
                onClick={() => handleSelectDay(day)}
              >
                {day}
              </div>
            ))}
          </div>
          <table>
            <thead>
              <tr>
                <td></td>
              </tr>
            </thead>
            <ScheduleTable
              skills={["skill 1", "skill 2"]}
              tasks={["Task 1", "Task 2", "Task 2"]}
            />
          </table>
          <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
        </>
      )}
    </div>
  );
};

export default App;
