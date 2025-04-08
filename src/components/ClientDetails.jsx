import React from "react";
import styled from "styled-components";

const ClientDetailsContainer = styled.div`
  padding: 1.5rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  margin-right: 1rem;
  padding: 0.5rem;
  background-color: #e2e8f0;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #cbd5e1;
  }
`;

const ClientTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ClientInfoContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ClientInfoItem = styled.div`
  span:first-child {
    color: #64748b;
    margin-right: 0.5rem;
  }

  span:last-child {
    font-weight: 600;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StatCard = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h3 {
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
  }

  p {
    font-size: 1.875rem;
    font-weight: bold;
  }
`;

const BudgetCard = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;

  h3 {
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;

const BudgetInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
`;

const BudgetBar = styled.div`
  width: 100%;
  height: 1rem;
  background-color: #e2e8f0;
  border-radius: 9999px;
  overflow: hidden;

  div {
    height: 100%;
    background-color: #3b82f6;
    border-radius: 9999px;
  }
`;

const TableContainer = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 1.5rem;
`;

const TableTitle = styled.h3`
  font-weight: 600;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;

  th {
    padding: 0.75rem 1.5rem;
    text-align: left;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    color: #64748b;
    letter-spacing: 0.05em;
  }
`;

const TableBody = styled.tbody`
  background-color: white;

  tr {
    border-bottom: 1px solid #e2e8f0;

    &:last-child {
      border-bottom: none;
    }
  }

  td {
    padding: 1rem 1.5rem;
    white-space: nowrap;
  }
`;

const ProgressCell = styled.td`
  .progress-container {
    display: flex;
    align-items: center;

    .progress-bar {
      width: 100%;
      height: 0.625rem;
      background-color: #e2e8f0;
      border-radius: 9999px;
      margin-right: 0.5rem;
      overflow: hidden;

      .progress {
        height: 100%;
        background-color: #3b82f6;
        border-radius: 9999px;
      }
    }
  }
`;

const StatusBadge = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;

  ${(props) => {
    if (props.status === "Done")
      return `
      background-color: #dcfce7;
      color: #166534;
    `;
    if (props.status === "In Progress")
      return `
      background-color: #dbeafe;
      color: #1e40af;
    `;
    if (props.status === "Review")
      return `
      background-color: #f3e8ff;
      color: #6b21a8;
    `;
    return `
      background-color: #fef3c7;
      color: #92400e;
    `;
  }}
`;

function ClientDetails({
  client,
  projects,
  tasks,
  getUserById,
  getProjectById,
  setSelectedClient,
}) {
  const clientTasks = tasks.filter((task) => {
    const project = projects.find((p) => p.id === task.projectId);
    return project && project.clientId === client.id;
  });

  const totalHours = clientTasks.reduce(
    (total, task) => total + task.hoursLogged,
    0
  );

  // In a real app, these would be fetched from the server
  const totalBudget = 500000;
  const usedBudget = totalHours * 100;

  return (
    <ClientDetailsContainer>
      <HeaderContainer>
        <TitleContainer>
          <BackButton onClick={() => setSelectedClient(null)}>Back</BackButton>
          <ClientTitle>{client.name}</ClientTitle>
        </TitleContainer>

        <ClientInfoContainer>
          <ClientInfoItem>
            <span>Budget Code:</span>
            <span>{client.budgetCode}</span>
          </ClientInfoItem>
          <ClientInfoItem>
            <span>PAN:</span>
            <span>{client.pan}</span>
          </ClientInfoItem>
          <ClientInfoItem>
            <span>GSTIN:</span>
            <span>{client.gstin}</span>
          </ClientInfoItem>
        </ClientInfoContainer>
      </HeaderContainer>

      <StatsGrid>
        <StatCard>
          <h3>Total Engagements</h3>
          <p>{projects.length}</p>
        </StatCard>
        <StatCard>
          <h3>Total Activities</h3>
          <p>{clientTasks.length}</p>
        </StatCard>
        <StatCard>
          <h3>Total Hours Logged</h3>
          <p>{totalHours}</p>
        </StatCard>
      </StatsGrid>

      <BudgetCard>
        <h3>Budget Utilization</h3>
        <BudgetInfo>
          <span>Budget Used</span>
          <span>
            ₹{usedBudget.toLocaleString()} / ₹{totalBudget.toLocaleString()}
          </span>
        </BudgetInfo>
        <BudgetBar>
          <div style={{ width: `${(usedBudget / totalBudget) * 100}%` }} />
        </BudgetBar>
      </BudgetCard>

      <TableContainer>
        <TableTitle>Engagements</TableTitle>
        <Table>
          <TableHead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Manager</th>
              <th>Progress</th>
              <th>Activities</th>
            </tr>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="font-medium">{project.name}</td>
                <td>{project.type}</td>
                <td>{getUserById(project.manager)?.name}</td>
                <ProgressCell>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span>{project.progress}%</span>
                  </div>
                </ProgressCell>
                <td>
                  {tasks.filter((t) => t.projectId === project.id).length}
                </td>
              </tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer>
        <TableTitle>Recent Activities</TableTitle>
        <Table>
          <TableHead>
            <tr>
              <th>Activity</th>
              <th>Engagement</th>
              <th>Status</th>
              <th>Assignee</th>
              <th>Hours</th>
            </tr>
          </TableHead>
          <TableBody>
            {clientTasks.slice(0, 5).map((task) => (
              <tr key={task.id}>
                <td className="font-medium">{task.title}</td>
                <td>{getProjectById(task.projectId)?.name}</td>
                <td>
                  <StatusBadge status={task.status}>{task.status}</StatusBadge>
                </td>
                <td>{getUserById(task.assignee)?.name}</td>
                <td>
                  {task.hoursLogged}/{task.hoursEstimated}
                </td>
              </tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ClientDetailsContainer>
  );
}

export default ClientDetails;
