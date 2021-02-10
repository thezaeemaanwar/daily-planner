import React, { useState, useEffect } from 'react'
import ScheduleTable from './ScheduleTable'
import DeleteIcon from '@material-ui/icons/Delete'

const Session = ({ ind, data, deleteSession, updateSession }) => {
    const [sessionName, setSessionName] = useState(data.session_name)
    const [sessionData, setSessionData] = useState({
        skills: data.skills,
        tasks: data.tasks
    })

    useEffect(() => {
        setSessionName(data.session_name)
        setSessionData({ skills: data.skills, tasks: data.tasks })
    }, [data])

    useEffect(() => {
        if (
            data.tasks !== sessionData.tasks ||
            data.skills !== sessionData.skills
        ) {
            updateSession(ind, {
                session_name: sessionName,
                skills: sessionData.skills,
                tasks: sessionData.tasks
            })
        }
    }, [sessionData])

    return (
        <div className="sessionTable">
            <div className="sessionTitle">
                <h1>{sessionName}</h1>
                <div>
                    {/* <span className="iconBtn" onClick={handleEdit}>
                        <EditIcon />
                    </span> */}
                    <span className="iconBtn" onClick={deleteSession}>
                        <DeleteIcon />
                    </span>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <td></td>
                    </tr>
                </thead>
                <col style={{ width: '5%' }} />

                <ScheduleTable
                    skills={sessionData.skills}
                    tasks={sessionData.tasks}
                    setData={setSessionData}
                />
            </table>
        </div>
    )
}

export default Session
