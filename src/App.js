import React, { useState, useEffect } from "react";
import "./App.css";
import ScheduleTable from "./components/ScheduleTable";
import Signup from "./components/Signup";
import firebase from "firebase";

const weekDays = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
const data = require("./components/schema.json");

const App = () => {
  const date = new Date();
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [user, setUser] = useState({});
  const [currentDate, setCurrentDate] = useState(
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
  );
  console.log("current date : ", currentDate);

  useEffect(() => {
    const createUserInDB = async () => {
      if (user.uid) {
        if (
          firebase.auth().currentUser.metadata.lastSignInTime ===
          firebase.auth().currentUser.metadata.creationTime
        ) {
          try {
            await fetch("/API/users/create", {
              method: "POST",
              body: JSON.stringify({ uid: user.uid }),
              headers: {
                "Content-Type": "application/json",
              },
            });
          } catch (error) {
            console.log("User Creation Error: ", error);
          }
        }
      }
    };
    createUserInDB();
  }, [user]);

  const handleSelectDay = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className="App">
      {!user.uid ? (
        <div className="glassBackground">
          <Signup setUser={setUser} />
        </div>
      ) : (
        <>
          {/* {data.users.daysData[currentDate].map()} */}
          <div>
            <div className="weekDays">
            {/* <div className="head">{currentDate}</div> */}
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
                tasks={[
                  {
                    name: "Task 1",
                    duration: 100,
                    skills: {  "skill 2": 34 },
                  },
                  {
                    name: "Task 3",
                    duration: 100,
                    skills: { "skill 1": 67, "skill 2": 44 },
                  },
                  {
                    name: "Task 3",
                    duration: 100,
                    skills: { "skill 1": 83, "skill 2": 34 },
                  },
                ]}
              />
            </table>
            <button
              onClick={() => firebase.auth().signOut()}
              className="signOut"
            >
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
