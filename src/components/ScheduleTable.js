import React, { useState } from "react";

const ScheduleTable = (props) => {
  const [skills, setSkills] = useState(props.skills);
  const [tasks, setTasks] = useState(props.tasks);
  const handleAddSkill = () => {};

  console.log(props.skills);
  return (
    <tbody>
      <tr>
        <td></td>
        <td>Duration</td>
        {skills.map((skill, ind) => (
          <td key={ind}>{skill}</td>
        ))}
        <td>
          <button onClick={handleAddSkill}>Add</button>
        </td>
      </tr>
      {tasks.map((task) => (
        <tr>
          <td>{task}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default ScheduleTable;
