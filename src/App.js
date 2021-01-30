import "./App.css";
import ScheduleTable from "./components/ScheduleTable";

function App() {
  return (
    <div className="App">
      <table>
        <ScheduleTable skills={["skill 1", "skill 2"]} />
      </table>
    </div>
  );
}

export default App;
