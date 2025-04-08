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
} from "./ResourcePoolStyles";

const ResourceModal = ({ resource, setResource, onSave, onCancel }) => {
  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          <h3>{resource.id ? "Edit Resource" : "Add Resource"}</h3>
          <button onClick={onCancel}>&times;</button>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <FormRow>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                value={resource.name}
                onChange={(e) =>
                  setResource({
                    ...resource,
                    name: e.target.value,
                  })
                }
              />
            </FormRow>
            <FormRow>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={resource.email}
                onChange={(e) =>
                  setResource({
                    ...resource,
                    email: e.target.value,
                  })
                }
              />
            </FormRow>
            <FormRow>
              <Label htmlFor="role">Role</Label>
              <Select
                id="role"
                value={resource.role}
                onChange={(e) =>
                  setResource({
                    ...resource,
                    role: e.target.value,
                  })
                }
              >
                <option value="">Select Role</option>
                <option value="Principal Partner">Principal Partner</option>
                <option value="Partner">Partner</option>
                <option value="Manager">Manager</option>
                <option value="Associate">Associate</option>
                <option value="Trainee">Trainee</option>
              </Select>
            </FormRow>
            <FormRow>
              <Label htmlFor="status">Status</Label>
              <Select
                id="status"
                value={resource.status}
                onChange={(e) =>
                  setResource({
                    ...resource,
                    status: e.target.value,
                  })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
                <option value="Training">Training</option>
              </Select>
            </FormRow>
            <FormRow>
              <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
              <Input
                type="number"
                id="hourlyRate"
                value={resource.hourlyRate}
                onChange={(e) =>
                  setResource({
                    ...resource,
                    hourlyRate: parseInt(e.target.value),
                  })
                }
              />
            </FormRow>
            <FormRow>
              <Label htmlFor="chargeability">Chargeability (%)</Label>
              <Input
                type="number"
                id="chargeability"
                min="0"
                max="100"
                value={resource.chargeability}
                onChange={(e) =>
                  setResource({
                    ...resource,
                    chargeability: parseInt(e.target.value),
                  })
                }
              />
            </FormRow>
            <FormRow>
              <Label htmlFor="joinDate">Join Date</Label>
              <Input
                type="date"
                id="joinDate"
                value={resource.joinDate}
                onChange={(e) =>
                  setResource({
                    ...resource,
                    joinDate: e.target.value,
                  })
                }
              />
            </FormRow>
            <FormRow>
              <Label htmlFor="skills">Skills</Label>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  width: "100%",
                }}
              >
                {[
                  "Tax Advisory",
                  "Audit",
                  "GST",
                  "Financial Advisory",
                  "Compliance",
                  "Risk Management",
                ].map((skill) => (
                  <div
                    key={skill}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      padding: "0.25rem 0.5rem",
                      backgroundColor: resource.skills.includes(skill)
                        ? "#dbeafe"
                        : "#f1f5f9",
                      borderRadius: "0.25rem",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (resource.skills.includes(skill)) {
                        setResource({
                          ...resource,
                          skills: resource.skills.filter((s) => s !== skill),
                        });
                      } else {
                        setResource({
                          ...resource,
                          skills: [...resource.skills, skill],
                        });
                      }
                    }}
                  >
                    <span style={{ fontSize: "0.875rem" }}>{skill}</span>
                    {resource.skills.includes(skill) && (
                      <span style={{ fontSize: "0.75rem", fontWeight: "bold" }}>
                        ✓
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </FormRow>
          </FormGroup>

          <ButtonGroup>
            <CancelButton onClick={onCancel}>Cancel</CancelButton>
            <SaveButton onClick={onSave}>Save</SaveButton>
          </ButtonGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ResourceModal;
