import React, { useState, useEffect } from "react";
import "./App.css";
import Signup from "./components/Signup";
import firebase from "firebase";
import Session from "./components/Session";

const weekDays = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
const data = require("./components/schema.json");

const App = () => {
  const date = new Date();
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [user, setUser] = useState({});
  const [allPlans, setAllPlans] = useState(data.users.daysData);
  const [currentDate, setCurrentDate] = useState(
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
  );

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

  console.log("current date : ", currentDate);
  console.log("Plans : ", allPlans);
  console.log("Current date plan : ", allPlans[currentDate]);

  return !user.uid ? (
    <div className="App">
      <div className="glassBackground">
        <Signup setUser={setUser} />
      </div>
    </div>
  ) : (
    <div className="App">
      <>
        {/* {data.users.daysData[currentDate].map()} */}

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
        <div className="head">
          {currentDate}
        </div>

        {allPlans[currentDate].map((sessionData, i) => (
          <Session key={i} data={sessionData} />
        ))}

        <button onClick={() => firebase.auth().signOut()} className="signOut">
          Sign Out
        </button>
      </>
    </div>
  );
};

export default App;
