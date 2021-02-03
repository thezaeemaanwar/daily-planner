import React, { useState } from "react";

const ScheduleTable = (props) => {
  const [skills, setSkills] = useState(props.skills);
  const [tasks, setTasks] = useState(props.tasks);
  const handleAddSkill = () => {};

  const calculateScore = (skill) => {
    let score = 0;
    tasks.forEach((task) => {
      score += task[skill];
    });
    return score;
  };

  console.log(props.skills);
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
          <button onClick={handleAddSkill}>Add</button>
        </td>
      </tr>
      {tasks.map((task, ind) => (
        <tr key={ind}>
          <td>
            <b>{task.name}</b>
          </td>
          <td>{task.duration}</td>
          {skills.map((skill, i) => (
            <td key={i}>{task[skill]}</td>
          ))}
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
