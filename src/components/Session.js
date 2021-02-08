import React, { useState, useEffect } from 'react'
import ScheduleTable from './ScheduleTable'
import {DeleteIcon, EditIcon} from '@material-ui/icons/'


const Session = ({ data }) => {
    console.log('Inside session component : ', data)
    const [sessionName, setSessionName] = useState(data.session_name)

    useEffect(() => {
        setSessionName(data.session_name)
    }, [data.session_name])

    return (
        <div className="sessionTable">
            <div className = "sessionTitle">
                <h1>{sessionName}</h1>
                <DeleteIcon/>
            </div>
            <table>
                <thead>
                    <tr>
                        <td></td>
                    </tr>
                </thead>
                <col style={{ width: '5%' }} />

                <ScheduleTable skills={data.skills} tasks={data.tasks} />
            </table>
        </div>
    )
}

export default Session
