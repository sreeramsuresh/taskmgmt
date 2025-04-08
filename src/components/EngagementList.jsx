import React from "react";
import styled from "styled-components";
import { Plus } from "lucide-react";

const EngagementListContainer = styled.div`
  padding: 1.5rem;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ListTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;

const EngagementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const EngagementCard = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const EngagementHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const EngagementTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  h3 {
    font-weight: 600;
    font-size: 1.125rem;
  }
`;

const TypeBadge = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;

  ${(props) => {
    if (props.type === "Audit")
      return `
      background-color: #dbeafe;
      color: #1e40af;
    `;
    if (props.type === "Tax Filing")
      return `
      background-color: #dcfce7;
      color: #166534;
    `;
    return `
      background-color: #f3e8ff;
      color: #6b21a8;
    `;
  }}
`;

const ClientName = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.25rem;
`;

const EngagementBody = styled.div`
  padding: 1rem;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.625rem;
  background-color: #e2e8f0;
  border-radius: 9999px;
  overflow: hidden;

  div {
    height: 100%;
    background-color: #3b82f6;
    border-radius: 9999px;
  }
`;

const EngagementInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.875rem;

  .label {
    color: #64748b;
  }
`;

const ViewDetailsButton = styled.div`
  background-color: #f8fafc;
  padding: 0.75rem;
  text-align: center;
  border-top: 1px solid #e2e8f0;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background-color: #f1f5f9;
  }
`;

function EngagementList({ projects, tasks, getUserById, getClientById }) {
  return (
    <EngagementListContainer>
      <ListHeader>
        <ListTitle>Engagements</ListTitle>
        <AddButton>
          <Plus size={16} />
          Add Engagement
        </AddButton>
      </ListHeader>

      <EngagementGrid>
        {projects.map((project) => {
          const client = getClientById(project.clientId);
          const manager = getUserById(project.manager);
          const projectTasks = tasks.filter((t) => t.projectId === project.id);
          const completedTasks = projectTasks.filter(
            (t) => t.status === "Done"
          ).length;

          return (
            <EngagementCard key={project.id}>
              <EngagementHeader>
                <EngagementTitle>
                  <h3>{project.name}</h3>
                  <TypeBadge type={project.type}>{project.type}</TypeBadge>
                </EngagementTitle>
                <ClientName>Client: {client?.name}</ClientName>
              </EngagementHeader>

              <EngagementBody>
                <ProgressLabel>
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </ProgressLabel>
                <ProgressBar>
                  <div style={{ width: `${project.progress}%` }} />
                </ProgressBar>

                <EngagementInfo>
                  <div>
                    <div className="label">Manager:</div>
                    <p>{manager?.name}</p>
                  </div>
                  <div>
                    <div className="label">Activities:</div>
                    <p>
                      {completedTasks}/{projectTasks.length} completed
                    </p>
                  </div>
                </EngagementInfo>
              </EngagementBody>

              <ViewDetailsButton>View Details</ViewDetailsButton>
            </EngagementCard>
          );
        })}
      </EngagementGrid>
    </EngagementListContainer>
  );
}

export default EngagementList;
