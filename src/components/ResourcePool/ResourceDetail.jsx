import React from "react";
import styled from "styled-components";
import {
  DollarSign,
  User,
  Calendar,
  Clock,
  Edit2,
  Trash2,
  Plus,
} from "lucide-react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  ActionButtonsContainer,
  ActionButton,
  Badge,
  AddButton,
  SectionTitle,
} from "./ResourcePoolStyles";

const ResourceDetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 16rem 1fr;
  }
`;

const ResourceSummary = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const ResourceProfileImage = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;

  span {
    font-size: 2.5rem;
    color: #64748b;
  }
`;

const ResourceName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const ResourceRole = styled.p`
  color: #64748b;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ResourceStats = styled.div`
  border-top: 1px solid #e2e8f0;
  padding-top: 1rem;

  .stat-row {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;

    svg {
      color: #64748b;
      margin-right: 0.75rem;
    }

    .stat-title {
      font-size: 0.875rem;
      color: #64748b;
    }

    .stat-value {
      margin-left: auto;
      font-weight: 500;
    }
  }
`;

const ResourceDetailsContent = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const ResourceDetail = ({
  resource,
  getProjectById,
  handleAddAssignment,
  handleDeleteAssignment,
  getResourceTotalAllocation,
}) => {
  return (
    <ResourceDetailContainer>
      <ResourceSummary>
        <ResourceProfileImage>
          <span>{resource.name.charAt(0)}</span>
        </ResourceProfileImage>
        <ResourceName>{resource.name}</ResourceName>
        <ResourceRole>{resource.role}</ResourceRole>

        <ResourceStats>
          <div className="stat-row">
            <User size={16} />
            <span className="stat-title">Status</span>
            <span className="stat-value">{resource.status}</span>
          </div>
          <div className="stat-row">
            <DollarSign size={16} />
            <span className="stat-title">Hourly Rate</span>
            <span className="stat-value">₹{resource.hourlyRate}</span>
          </div>
          <div className="stat-row">
            <Calendar size={16} />
            <span className="stat-title">Join Date</span>
            <span className="stat-value">{resource.joinDate}</span>
          </div>
          <div className="stat-row">
            <Clock size={16} />
            <span className="stat-title">Allocation</span>
            <span className="stat-value">
              {getResourceTotalAllocation(resource.assignments)}%
            </span>
          </div>
        </ResourceStats>
      </ResourceSummary>

      <ResourceDetailsContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <SectionTitle>Assignments</SectionTitle>
          <AddButton onClick={() => handleAddAssignment(resource)}>
            <Plus size={16} />
            Add Assignment
          </AddButton>
        </div>

        <TableContainer>
          <Table>
            <TableHead>
              <tr>
                <th>Project</th>
                <th>Allocation</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </TableHead>
            <TableBody>
              {resource.assignments.length > 0 ? (
                resource.assignments.map((assignment, index) => {
                  const project = getProjectById(assignment.projectId);
                  return (
                    <tr key={index}>
                      <td>{project?.name}</td>
                      <td>{assignment.allocation}%</td>
                      <td>{assignment.startDate}</td>
                      <td>{assignment.endDate}</td>
                      <td>
                        <ActionButtonsContainer>
                          <ActionButton>
                            <Edit2 size={16} />
                          </ActionButton>
                          <ActionButton
                            onClick={() =>
                              handleDeleteAssignment(resource.id, index)
                            }
                          >
                            <Trash2 size={16} />
                          </ActionButton>
                        </ActionButtonsContainer>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "center", padding: "1rem" }}
                  >
                    No assignments yet
                  </td>
                </tr>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle style={{ marginTop: "2rem" }}>Skills</SectionTitle>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {resource.skills.length > 0 ? (
            resource.skills.map((skill, index) => (
              <Badge key={index} status="Active">
                {skill}
              </Badge>
            ))
          ) : (
            <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
              No skills added
            </p>
          )}
        </div>

        <SectionTitle style={{ marginTop: "2rem" }}>Chargeability</SectionTitle>
        <div
          style={{
            width: "100%",
            height: "1.5rem",
            backgroundColor: "#e2e8f0",
            borderRadius: "9999px",
            overflow: "hidden",
            marginBottom: "0.5rem",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${resource.chargeability}%`,
              backgroundColor:
                resource.chargeability >= 80
                  ? "#10b981"
                  : resource.chargeability >= 60
                  ? "#f59e0b"
                  : "#ef4444",
              borderRadius: "9999px",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.875rem", color: "#64748b" }}>
            Target: 80%
          </span>
          <span style={{ fontSize: "0.875rem", fontWeight: "600" }}>
            Current: {resource.chargeability}%
          </span>
        </div>
      </ResourceDetailsContent>
    </ResourceDetailContainer>
  );
};

export default ResourceDetail;
