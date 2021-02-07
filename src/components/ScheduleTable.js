import React, { useState, useRef } from "react";

const ScheduleTable = (props) => {
  const [skills, setSkills] = useState(props.skills);
  const [tasks, setTasks] = useState(props.tasks);
  const [addBtnText, setAddBtnText] = useState("Add");
  const skillRef = useRef();

  const handleAddSkill = () => {
    if (addBtnText === "Add") {
      const temp = [...skills];
      temp.push(<input type="text" placeholder="New Skill" ref={skillRef} />);
      setSkills(temp);
      setAddBtnText("Save");
    } else {
      setAddBtnText("Add");
      const temp = [...skills];
      const skillName = skillRef.current.value;
      temp[temp.length - 1] = skillName;
      setSkills(temp);
    }
  };

  const calculateScore = (skill) => {
    let score = 0;
    tasks.forEach((task) => {
      if (task.skills[skill]) score += task.skills[skill];
    });
    return score;
  };

  const calulateTaskScore = (Task) => {
    let sum = 0;
    Object.values(Task.skills).forEach((skill) => {
      sum += skill;
    });
    return sum;
  };

  return (
    <tbody>
      <tr>
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
          <td>
            <b>{task.name}</b>
          </td>
          <td>{task.duration}</td>
          {skills.map((skill, i) => (
            <td key={i}>{task.skills[skill]}</td>
          ))}
          <td>{calulateTaskScore(task)}</td>
        </tr>
      ))}
      <tr className="lastRow">
        <td></td>
        <td>
          <b>Total</b>
        </td>
        {skills.map((skill, i) => {
          return <td key={i}>{calculateScore(skill)}</td>;
        })}
      </tr>
    </tbody>
  );
};

export default ScheduleTable;
