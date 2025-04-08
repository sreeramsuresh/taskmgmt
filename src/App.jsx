import React, { useState } from "react";
import styled from "styled-components";
import {
  CheckSquare,
  LogOut,
  Settings as SettingsIcon,
  Users,
} from "lucide-react";

// Components
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import ActivityBoard from "./components/ActivityBoard";
import ClientList from "./components/ClientList";
import ClientDetails from "./components/ClientDetails";
import EngagementList from "./components/EngagementList";
import TimesheetManager from "./components/TimesheetManager";
import Settings from "./components/Settings";
import ResourcePool from "./components/ResourcePool/ResourcePool"; // Import the new ResourcePool component

// Data
import {
  initialUsers,
  initialClients,
  initialProjects,
  initialTasks,
  initialTimesheets,
} from "./data/initialData";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f1f5f9;
`;

const MainContent = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

function App() {
  const [currentUser, setCurrentUser] = useState(initialUsers[0]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [clients, setClients] = useState(initialClients);
  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);
  const [timesheets, setTimesheets] = useState(initialTimesheets);
  const [selectedClient, setSelectedClient] = useState(null);
  const [kanbanFilter, setKanbanFilter] = useState({
    project: null,
    assignee: null,
    priority: null,
  });

  // Function to move task between kanban columns
  const moveTask = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const getProjectById = (projectId) => {
    return projects.find((project) => project.id === projectId);
  };

  const getClientById = (clientId) => {
    return clients.find((client) => client.id === clientId);
  };

  const getUserById = (userId) => {
    return initialUsers.find((user) => user.id === userId);
  };

  return (
    <AppContainer>
      <Sidebar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <MainContent>
        {activeTab === "dashboard" && (
          <Dashboard projects={projects} tasks={tasks} />
        )}

        {activeTab === "kanban" && (
          <ActivityBoard
            tasks={tasks}
            projects={projects}
            kanbanFilter={kanbanFilter}
            setKanbanFilter={setKanbanFilter}
            getProjectById={getProjectById}
            getUserById={getUserById}
            moveTask={moveTask}
          />
        )}

        {activeTab === "clients" && !selectedClient && (
          <ClientList
            clients={clients}
            projects={projects}
            getUserById={getUserById}
            setSelectedClient={setSelectedClient}
          />
        )}

        {activeTab === "clients" && selectedClient && (
          <ClientDetails
            client={selectedClient}
            projects={projects.filter((p) => p.clientId === selectedClient.id)}
            tasks={tasks}
            getUserById={getUserById}
            getProjectById={getProjectById}
            setSelectedClient={setSelectedClient}
          />
        )}

        {activeTab === "projects" && (
          <EngagementList
            projects={projects}
            tasks={tasks}
            getUserById={getUserById}
            getClientById={getClientById}
          />
        )}

        {activeTab === "timesheets" && (
          <TimesheetManager
            currentUser={currentUser}
            tasks={tasks}
            timesheets={timesheets}
            getProjectById={getProjectById}
          />
        )}

        {activeTab === "settings" && <Settings currentUser={currentUser} />}

        {activeTab === "resources" && (
          <ResourcePool
            users={initialUsers}
            projects={projects}
            tasks={tasks}
          />
        )}
      </MainContent>
    </AppContainer>
  );
}

export default App;
