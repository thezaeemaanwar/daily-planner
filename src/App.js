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
        <div className="glassBackground">
          <Signup setUser={setUser} />
        </div>
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
              skills={["skill 1", "skill 2", "skill 3"]}
              tasks={[
                { name: "Task 1", duration: 23, "skill 1": 25, "skill 2": 34 },
                { name: "Task 3", duration: 40, "skill 1": 67, "skill 2": 44 },
                { name: "Task 3", duration: 30, "skill 1": 83, "skill 2": 34 },
              ]}
            />
          </table>
          <button onClick={() => firebase.auth().signOut() } className="signOut">Sign Out</button>
        </>
      )}
    </div>
  );
};

export default App;
