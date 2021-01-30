import React, { useState } from "react";

const ScheduleTable = (props) => {
  const [skills, setSkills] = useState(props.skills);

  const handleAddSkill = () => {};

  console.log(props.skills);
  return (
    <tbody>
      <tr>
        <td>Duration</td>
        {skills.map((skill, ind) => (
          <td key = {ind}>{skill}</td>
        ))}
        <td>
          <button onClick={handleAddSkill}>Add</button>
        </td>
      </tr>
    </tbody>
  );
};

export default ScheduleTable;
