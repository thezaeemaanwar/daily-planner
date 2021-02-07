const tasks = [
  {
    name: "Task 1",
    duration: 23,
    skills: { "skill 1": 25 , "skill 2": 34 },
  },
  {
    name: "Task 3",
    duration: 40,
    skills: { "skill 1": 67 , "skill 2": 44 },
  },
  {
    name: "Task 3",
    duration: 30,
    skills: { "skill 1": 83 ,  "skill 2": 34 },
  },
];
skills = ["skill 1", "skill 2"];
tasks.forEach((task) => {
    console.log("Skills :: ", task.skills);
  skills.forEach((skill) => {
    console.log(task.skills[skill]);
  });
});
