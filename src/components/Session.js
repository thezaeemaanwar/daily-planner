import React from "react";
import ScheduleTable from "./ScheduleTable";

const Session = ({ data }) => {
  return (
    <div className="sessionTable">
      <h1>{data.session_name}</h1>
      <table>
        <thead>
          <tr>
            <td></td>
          </tr>
        </thead>
        <col style={{ width: "5%" }} />

        <ScheduleTable skills={data.skills} tasks={data.tasks} />
      </table>
    </div>
  );
};

export default Session;
