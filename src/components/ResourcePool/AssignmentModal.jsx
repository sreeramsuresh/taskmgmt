import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormGroup,
  FormRow,
  Label,
  Input,
  Select,
  ButtonGroup,
  CancelButton,
  SaveButton,
  AssignmentTable,
} from "./ResourcePoolStyles";

const AssignmentModal = ({
  resource,
  assignment,
  setAssignment,
  projects,
  getProjectById,
  getResourceTotalAllocation,
  onSave,
  onCancel,
}) => {
  const totalAllocation = getResourceTotalAllocation(resource.assignments);
  const newTotalAllocation =
    totalAllocation + parseInt(assignment.allocation || 0);
  const isOverallocated = newTotalAllocation > 100;

  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          <h3>Add Assignment</h3>
          <button onClick={onCancel}>&times;</button>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <FormRow>
              <Label>Resource</Label>
              <Input type="text" value={resource.name} readOnly />
            </FormRow>
            <FormRow>
              <Label htmlFor="project">Project</Label>
              <Select
                id="project"
                value={assignment.projectId}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    projectId: e.target.value,
                  })
                }
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </Select>
            </FormRow>
            <FormRow>
              <Label htmlFor="allocation">Allocation (%)</Label>
              <Input
                type="number"
                id="allocation"
                min="0"
                max="100"
                value={assignment.allocation}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    allocation: parseInt(e.target.value),
                  })
                }
              />
            </FormRow>
            <FormRow>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                type="date"
                id="startDate"
                value={assignment.startDate}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    startDate: e.target.value,
                  })
                }
              />
            </FormRow>
            <FormRow>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                type="date"
                id="endDate"
                value={assignment.endDate}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    endDate: e.target.value,
                  })
                }
              />
            </FormRow>

            <div style={{ marginTop: "1rem" }}>
              <p style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
                Current Assignments
              </p>
              {resource.assignments.length > 0 ? (
                <AssignmentTable>
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Allocation</th>
                      <th>Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resource.assignments.map((assignment, index) => {
                      const project = getProjectById(assignment.projectId);
                      return (
                        <tr key={index}>
                          <td>{project?.name}</td>
                          <td>{assignment.allocation}%</td>
                          <td>
                            {assignment.startDate} to {assignment.endDate}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </AssignmentTable>
              ) : (
                <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
                  No current assignments
                </p>
              )}
            </div>

            <div
              style={{
                marginTop: "1rem",
                padding: "0.75rem",
                backgroundColor: "#f1f5f9",
                borderRadius: "0.25rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: "500" }}>
                Current Total Allocation:
              </span>
              <span>{totalAllocation}%</span>
            </div>

            <div
              style={{
                marginTop: "0.5rem",
                padding: "0.75rem",
                backgroundColor: isOverallocated ? "#fee2e2" : "#dcfce7",
                borderRadius: "0.25rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: "500" }}>New Total Allocation:</span>
              <span>{newTotalAllocation}%</span>
            </div>

            {isOverallocated && (
              <div
                style={{
                  color: "#dc2626",
                  fontSize: "0.875rem",
                  marginTop: "0.5rem",
                }}
              >
                Warning: Total allocation exceeds 100%
              </div>
            )}
          </FormGroup>

          <ButtonGroup>
            <CancelButton onClick={onCancel}>Cancel</CancelButton>
            <SaveButton onClick={onSave} disabled={isOverallocated}>
              Save Assignment
            </SaveButton>
          </ButtonGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AssignmentModal;
