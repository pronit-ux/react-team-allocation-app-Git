import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Employees from "./Employees";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GroupedTeamMembers from "./GroupedTeamMembers";
import Navbar from "./Navbar";
import NotFound from "./NotFound";

function App() {
  const [selectedTeam, setSelectedTeam] = useState(
    JSON.parse(localStorage.getItem("selectedTeam")) || "TeamA"
  );

  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem("employeeList")) || [
      {
        id: 1,
        fullName: "Amelia Lawson",
        designation: "HTML Developer",
        gender: "female",
        teamName: "TeamA",
      },
      {
        id: 2,
        fullName: "Benjamin Brooks",
        designation: "JavaScript Developer",
        gender: "male",
        teamName: "TeamA",
      },
      {
        id: 3,
        fullName: "Chloe Ramirez",
        designation: "React Developer",
        gender: "female",
        teamName: "TeamA",
      },
      {
        id: 4,
        fullName: "Daniel Patel",
        designation: "Frontend Developer",
        gender: "male",
        teamName: "TeamB",
      },
      {
        id: 5,
        fullName: "Emily Johnson",
        designation: "Backend Developer",
        gender: "female",
        teamName: "TeamB",
      },
      {
        id: 6,
        fullName: "Finn Morgan",
        designation: "UI/UX Designer",
        gender: "male",
        teamName: "TeamB",
      },
      {
        id: 7,
        fullName: "Grace Chen",
        designation: "Node Developer",
        gender: "female",
        teamName: "TeamC",
      },
      {
        id: 8,
        fullName: "Henry Scott",
        designation: "Java Developer",
        gender: "male",
        teamName: "TeamC",
      },
      {
        id: 9,
        fullName: "Isabella Khan",
        designation: "DotNet Developer",
        gender: "female",
        teamName: "TeamC",
      },
      {
        id: 10,
        fullName: "Jackson Lee",
        designation: "SQA Server DBA",
        gender: "male",
        teamName: "TeamD",
      },
      {
        id: 11,
        fullName: "Kaitlyn Nguyen",
        designation: "Angular Developer",
        gender: "female",
        teamName: "TeamD",
      },
      {
        id: 12,
        fullName: "Liam Wilson",
        designation: "API Developer",
        gender: "male",
        teamName: "TeamD",
      },
    ]
  );

  useEffect(() => {
    localStorage.setItem("employeeList", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem("selectedTeam", JSON.stringify(selectedTeam));
  }, [selectedTeam]);

  const handleTeamSelectionChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handleEmployeeCardClick = (event) => {
    const transformedEmployees = employees.map((employee) =>
      employee.id === parseInt(event.currentTarget.id)
        ? employee.teamName === selectedTeam
          ? { ...employee, teamName: "" }
          : { ...employee, teamName: selectedTeam }
        : employee
    );
    setEmployees(transformedEmployees);
  };

  return (
    <Router>
      <Navbar />
      <Header
        selectedTeam={selectedTeam}
        teamMemberCount={
          employees.filter((employee) => employee.teamName === selectedTeam)
            .length
        }
      />
      <Routes>
        <Route
          path="/"
          element={
            <Employees
              selectedTeam={selectedTeam}
              employees={employees}
              handleTeamSelectionChange={handleTeamSelectionChange}
              handleEmployeeCardClick={handleEmployeeCardClick}
            />
          }
        ></Route>
        <Route
          path="/GroupedTeamMembers"
          element={
            <GroupedTeamMembers
              employees={employees}
              selectedTeam={selectedTeam}
              setSelectedTeam={setSelectedTeam}
            />
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
