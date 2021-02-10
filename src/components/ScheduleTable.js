import React, { useState, useRef, useEffect } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'

const ScheduleTable = (props) => {
    const [skills, setSkills] = useState(props.skills)
    const [tasks, setTasks] = useState(props.tasks)
    const [addBtnText, setAddBtnText] = useState('Add Skill')
    const [addTaskBtn, setAddTaskBtn] = useState('Add Task')

    const skillRef = useRef()
    const taskRef = useRef()
    const durationRef = useRef()
    const taskSkillRef = useRef()

    useEffect(() => {
        setSkills(props.skills)
        setTasks(props.tasks)
    }, [props])


    useEffect(()=>{
        props.setData({skills:skills, tasks:tasks})
    }, [tasks, skills])

    const handleAddSkill = () => {
        if (addBtnText === 'Add Skill') {
            const temp = [...skills]
            temp.push(
                <input type="text" placeholder="Skill Name" ref={skillRef} />
            )
            setSkills(temp)

            setAddBtnText('Save')
        } else {
            setAddBtnText('Add Skill')
            const temp = [...skills]
            const skillName = skillRef.current.value
            temp[temp.length - 1] = skillName
            setSkills(temp)
        }
    }

    const calculateScore = (skill) => {
        let score = 0
        tasks.forEach((task) => {
            if (task.skills[skill]) score += task.skills[skill]
        })
        return score
    }

    const calulateTaskScore = (Task) => {
        let sum = 0
        Object.values(Task.skills).forEach((skill) => {
            sum += skill
        })
        return sum
    }

    const handleDeleteTask = (ind) => {
        const temp = [...tasks]
        temp.splice(ind, 1)
        setTasks(temp)
    }

    const handleAddTask = () => {
        if (addTaskBtn === 'Add Task') {
            const temp = [...tasks]
            temp.push({
                name: (
                    <input
                        type="text"
                        ref={taskRef}
                        placeholder="New Task Name"
                    />
                ),
                duration: 0,
                skills: {}
            })
            setTasks(temp)
            setAddTaskBtn('Save Task')
        } else {
            setAddTaskBtn('Add Task')
            const obj = { name: taskRef.current.value, duration: 0, skills: {} }
            const temp = [...tasks]
            temp[temp.length - 1] = obj
            setTasks(temp)
        }
    }

    const handleEditDuration = (ind) => {
        const temp = [...tasks]
        temp[ind].duration = (
            <input type="text" placeholder="Duration (m)" ref={durationRef} />
        )
        setTasks(temp)
    }

    const handleDurationSave = (ind) => {
        const temp = [...tasks]
        temp[ind].duration = parseInt(durationRef.current.value)
        setTasks(temp)
    }
    const handleTaskSkillEdit = (taskInd, skillInd) => {
        const temp = [...tasks]
        temp[taskInd].skills[skillInd] = (
            <input type="text" placeholder="Skill Score" ref={taskSkillRef} />
        )
        setTasks(temp)
    }

    const handleSkillSave = (taskInd, skillInd) => {
        const temp = [...tasks]
        temp[taskInd].skills[skillInd] = parseInt(taskSkillRef.current.value)
        setTasks(temp)
    }
    return (
        <tbody>
            <tr>
                <td></td>
                <td></td>
                <td>
                    <b>Duration</b>
                </td>
                {skills.map((skill, ind) => (
                    <td key={ind}>
                        <b>{skill}</b>
                    </td>
                ))}
                <td>
                    <b>Total</b>
                </td>
                <td>
                    <button onClick={handleAddSkill}>{addBtnText}</button>
                </td>
            </tr>
            {tasks.map((task, ind) => (
                <tr key={ind}>
                    <td className="icon-td">
                        <div
                            onClick={() => handleDeleteTask(ind)}
                            className="deleteIcon"
                        >
                            <DeleteIcon />
                        </div>
                    </td>
                    <td>
                        <b>{task.name}</b>
                    </td>
                    <td
                        onClick={() => handleEditDuration(ind)}
                        onBlur={() => {
                            handleDurationSave(ind)
                        }}
                    >
                        {task.duration}
                    </td>
                    {skills.map((skill, i) => (
                        <td
                            key={i}
                            onClick={() => handleTaskSkillEdit(ind, skill)}
                            onBlur={() => handleSkillSave(ind, skill)}
                        >
                            {task.skills[skill]}
                        </td>
                    ))}
                    <td>{calulateTaskScore(task)}</td>
                </tr>
            ))}
            <tr className="lastRow">
                <td></td>
                <td>
                    <button onClick={handleAddTask}>{addTaskBtn}</button>
                </td>
                <td>
                    <b>Total</b>
                </td>
                {skills.map((skill, i) => {
                    return <td key={i}>{calculateScore(skill)}</td>
                })}
            </tr>
        </tbody>
    )
}

export default ScheduleTable
