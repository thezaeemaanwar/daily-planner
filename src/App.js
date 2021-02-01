import React, { useState, useEffect } from "react";
import "./App.css";
import ScheduleTable from "./components/ScheduleTable";

const weekDays = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
function App() {
  const GOOGLE_BUTTON_ID = "google-sign-in-button";
  const [selectedDay, setSelectedDay] = useState("");
  const handleSelectDay = (day) => {
    setSelectedDay(day);
  };
  const [user, setUser] = useState(null);
  const onSuccess = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    console.log(profile);
  };
  useEffect(() => {
    try {
      window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
        width: 200,
        height: 50,
        onsuccess: onSuccess,
      });
    } catch (e) {
      console.log("Caught an error : ", e);
    }
  }, []);
  return (
    <div className="App">
      {!user ? (
        // <div className="g-signin2" data-onsuccess={() => onSignIn}></div>
        <div id={GOOGLE_BUTTON_ID} />
      ) : (
        <>
          <div className="weekDays">
            {weekDays.map((day) => (
              <div
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
        </>
      )}
    </div>
  );
}

export default App;
