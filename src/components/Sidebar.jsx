import React from "react";
import styled from "styled-components";
import {
  Home,
  BarChart2,
  Briefcase,
  FileText,
  Clock,
  Settings,
  LogOut,
  CheckSquare,
  User,
  Users,
} from "lucide-react";

const SidebarContainer = styled.div`
  width: 64px;
  background-color: #1e293b;
  color: white;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width: 250px;
  }
`;

const Logo = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #334155;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }

  h1 {
    display: none;
    font-size: 1.25rem;
    font-weight: bold;

    @media (min-width: 768px) {
      display: block;
      margin-left: 0.5rem;
    }
  }
`;

const UserProfile = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #334155;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .user-avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 9999px;
    background-color: #3b82f6;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .user-info {
    display: none;

    @media (min-width: 768px) {
      display: block;
    }

    .user-name {
      font-weight: 600;
    }

    .user-role {
      font-size: 0.75rem;
      color: #94a3b8;
    }
  }
`;

const Navigation = styled.nav`
  flex-grow: 1;
  padding: 1rem;

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  li button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.25rem;
    background: none;
    border: none;
    color: white;
    cursor: pointer;

    &.active {
      background-color: #3b82f6;
    }

    &:hover:not(.active) {
      background-color: #334155;
    }

    span {
      display: none;

      @media (min-width: 768px) {
        display: block;
      }
    }
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.5rem;
  color: #94a3b8;
  background: none;
  border: none;
  cursor: pointer;
  margin: 1rem 0;

  &:hover {
    color: white;
  }

  span {
    display: none;

    @media (min-width: 768px) {
      display: block;
    }
  }
`;

function Sidebar({ currentUser, activeTab, setActiveTab }) {
  return (
    <SidebarContainer>
      <Logo>
        <CheckSquare size={24} />
        <h1>CA Practice Manager</h1>
      </Logo>

      <UserProfile>
        <div className="user-avatar">{currentUser.name.charAt(0)}</div>
        <div className="user-info">
          <div className="user-name">{currentUser.name}</div>
          <div className="user-role">{currentUser.role}</div>
        </div>
      </UserProfile>

      <Navigation>
        <ul>
          <li>
            <button
              className={activeTab === "dashboard" ? "active" : ""}
              onClick={() => setActiveTab("dashboard")}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </button>
          </li>
          <li>
            <button
              className={activeTab === "kanban" ? "active" : ""}
              onClick={() => setActiveTab("kanban")}
            >
              <BarChart2 size={20} />
              <span>Activity Board</span>
            </button>
          </li>
          <li>
            <button
              className={activeTab === "clients" ? "active" : ""}
              onClick={() => setActiveTab("clients")}
            >
              <Briefcase size={20} />
              <span>Clients</span>
            </button>
          </li>
          <li>
            <button
              className={activeTab === "projects" ? "active" : ""}
              onClick={() => setActiveTab("projects")}
            >
              <FileText size={20} />
              <span>Engagements</span>
            </button>
          </li>
          <li>
            <button
              className={activeTab === "resources" ? "active" : ""}
              onClick={() => setActiveTab("resources")}
            >
              <Users size={20} />
              <span>Resource Pool</span>
            </button>
          </li>
          <li>
            <button
              className={activeTab === "timesheets" ? "active" : ""}
              onClick={() => setActiveTab("timesheets")}
            >
              <Clock size={20} />
              <span>Timesheets</span>
            </button>
          </li>
          <li>
            <button
              className={activeTab === "settings" ? "active" : ""}
              onClick={() => setActiveTab("settings")}
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
          </li>
        </ul>
      </Navigation>

      <LogoutButton>
        <LogOut size={20} />
        <span>Logout</span>
      </LogoutButton>
    </SidebarContainer>
  );
}

export default Sidebar;
