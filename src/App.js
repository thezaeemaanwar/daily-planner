import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Signup from './components/Signup'
import firebase from 'firebase'
import Session from './components/Session'

const weekDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat']
const data = require('./components/schema.json')

const App = () => {
    const date = new Date()
    const [user, setUser] = useState({})
    const [allPlans, setAllPlans] = useState(data.users.daysData)
    const [currentDate, setCurrentDate] = useState(
        '0/12/2021'
        // date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
    )
    const cDate = new Date(currentDate)
    const [selectedDay, setSelectedDay] = useState(weekDays[cDate.getDay()])

    const sessionRef = useRef()

    useEffect(() => {
        const createUserInDB = async () => {
            if (user.uid) {
                if (
                    firebase.auth().currentUser.metadata.lastSignInTime ===
                    firebase.auth().currentUser.metadata.creationTime
                ) {
                    try {
                        await fetch('/API/users/create', {
                            method: 'POST',
                            body: JSON.stringify({ uid: user.uid }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                    } catch (error) {
                        console.log('User Creation Error: ', error)
                    }
                }
            }
        }
        createUserInDB()
    }, [user])

    const handleSelectDay = (day) => {
        setSelectedDay(day)
    }
    const addSession = () => {
        const obj = {}
        if (allPlans[currentDate]) obj[currentDate] = allPlans[currentDate]
        else obj[currentDate] = []
        obj[currentDate].push({
            session_name: sessionRef.current.value,
            skills: [],
            tasks: []
        })
        sessionRef.current.value = ''
        setAllPlans(obj)
    }

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
                            className={
                                day === selectedDay ? 'headSelected' : 'head'
                            }
                            onClick={() => handleSelectDay(day)}
                        >
                            {day}
                        </div>
                    ))}
                </div>
                <div className="head">{currentDate}</div>

                {allPlans[currentDate] ? (
                    allPlans[currentDate].map((sessionData, i) => (
                        <Session key={i} data={sessionData} />
                    ))
                ) : (
                    <div>No Scheduled Tasks</div>
                )}
                <div className="addSessionForm">
                    <input
                        type="text"
                        placeholder="New Session Name"
                        ref={sessionRef}
                    />

                    <button onClick={addSession}>Add Session</button>
                </div>

                <button
                    onClick={() => firebase.auth().signOut()}
                    className="signOut"
                >
                    Sign Out
                </button>
            </>
        </div>
    )
}

export default App
