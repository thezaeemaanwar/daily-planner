import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Signup from './components/Signup'
import firebase from 'firebase'
import Session from './components/Session'

const weekDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat']

const App = () => {
    const date = new Date()
    const [user, setUser] = useState({})
    const [allPlans, setAllPlans] = useState([])
    const [currentDate, setCurrentDate] = useState(
        date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
    )
    const cDate = new Date(date)
    const [selectedDay, setSelectedDay] = useState(weekDays[cDate.getDay()])

    const sessionRef = useRef()

    // GET DATA FOR USER AND SELECTED DATE
    useEffect(() => {
        const reqData = async () => {
            try {
                const res = await fetch('/API/data', {
                    method: 'POST',
                    body: JSON.stringify({
                        uid: user.uid,
                        date: currentDate
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await res.json()
                if (data.plans) setAllPlans(data.plans.data)
                else setAllPlans([])
            } catch (error) {
                console.log('Data retrieval error: ', error)
            }
        }
        if (user.uid) {
            reqData()
        }
    }, [user, currentDate])

    // USER CREATION IN DB
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

    // SEND CHANGES TO DB IF ANY
    const sendToDB = async () => {
        try {
            await fetch('/API/data/send', {
                method: 'POST',
                body: JSON.stringify({
                    uid: user.uid,
                    date: currentDate,
                    data: allPlans
                }),
                headers: { 'Content-Type': 'Application/json' }
            })
        } catch (e) {
            console.log('Data Save Error : ', e)
        }
    }

    // ON PAGE LEAVE
    useEffect(() => {
        return () => {
            sendToDB()
        }
    }, [])

    const handleSelectDay = (dayInd) => {
        const pInd = weekDays.findIndex((day) => day === selectedDay)
        const dist = dayInd - pInd
        const date1 = new Date(currentDate)
        var nextDay = new Date(date1)
        nextDay.setDate(date1.getDate() + dist)
        setSelectedDay(weekDays[dayInd])
        setCurrentDate(
            nextDay.getMonth() +
                1 +
                '/' +
                nextDay.getDate() +
                '/' +
                nextDay.getFullYear()
        )
        sendToDB()
    }

    const handleWeekChange = (dist) => {
        const date1 = new Date(currentDate)
        var nextDay = new Date(date1)
        nextDay.setDate(date1.getDate() + dist)
        setCurrentDate(
            nextDay.getMonth() +
                1 +
                '/' +
                nextDay.getDate() +
                '/' +
                nextDay.getFullYear()
        )
        sendToDB()
    }

    const addSession = () => {
        const temp = [...allPlans]
        temp.push({
            session_name: sessionRef.current.value,
            skills: [],
            tasks: []
        })
        sessionRef.current.value = ''
        setAllPlans(temp)
    }

    const handleDeleteSession = (i) => {
        const temp = [...allPlans]
        temp.splice(i, 1)
        setAllPlans(temp)
    }

    const updateSession = (ind, session) => {
        const temp = [...allPlans]
        temp[ind] = session
        setAllPlans(temp)
    }

    return (
        <div className="App">
            <div className="circle" id="circle2"></div>
            <div className="circle" id="circle1"></div>
            {!user.uid ? (
                <div className="glassBackground">
                    <Signup setUser={setUser} />
                </div>
            ) : (
                <>
                    <div className="glassBackground">
                        <div className="weekDays">
                            {weekDays.map((day, ind) => (
                                <div
                                    key={ind}
                                    className={
                                        day === selectedDay
                                            ? 'headSelected'
                                            : 'head'
                                    }
                                    onClick={() => handleSelectDay(ind)}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>
                        <div className="date-bar">
                            <div
                                className="head"
                                onClick={() => handleWeekChange(-7)}
                            >
                                Prev. Week
                            </div>
                            <div className="head">{currentDate}</div>
                            <div
                                className="head"
                                onClick={() => handleWeekChange(7)}
                            >
                                Next Week
                            </div>
                        </div>

                        {allPlans ? (
                            // null
                            allPlans.map((sessionData, i) => (
                                <Session
                                    key={i}
                                    ind={i}
                                    data={sessionData}
                                    deleteSession={() => handleDeleteSession(i)}
                                    updateSession={updateSession}
                                />
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
                    </div>
                    <button
                        onClick={() => {
                            firebase.auth().signOut()
                            sendToDB()
                        }}
                        className="signOut"
                    >
                        Sign Out
                    </button>
                </>
            )}
        </div>
    )
}

export default App
