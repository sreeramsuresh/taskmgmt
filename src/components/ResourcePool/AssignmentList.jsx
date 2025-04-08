import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  ControlsRow,
  SearchContainer,
  SearchInput,
  SearchIcon,
  FiltersContainer,
  Select,
  ActionButtonsContainer,
  ActionButton,
} from "./ResourcePoolStyles";
import { Edit2, Trash2, Search } from "lucide-react";

const AssignmentList = ({
  resources,
  projects,
  getProjectById,
  handleDeleteAssignment,
}) => {
  const [projectFilter, setProjectFilter] = useState("");
  const [resourceFilter, setResourceFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter assignments based on selected filters
  const filteredAssignments = resources
    .flatMap((resource) =>
      resource.assignments.map((assignment, index) => ({
        resource,
        assignment,
        index,
        project: getProjectById(assignment.projectId),
      }))
    )
    .filter((item) => {
      // Apply search filter
      if (searchQuery) {
        const projectName = item.project?.name.toLowerCase() || "";
        const resourceName = item.resource.name.toLowerCase();
        if (
          !projectName.includes(searchQuery.toLowerCase()) &&
          !resourceName.includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
      }

      // Apply project filter
      if (projectFilter && item.project?.id.toString() !== projectFilter) {
        return false;
      }

      // Apply resource filter
      if (resourceFilter && item.resource.id.toString() !== resourceFilter) {
        return false;
      }

      return true;
    });

  return (
    <>
      <ControlsRow>
        <SearchContainer>
          <SearchIcon>
            <Search size={18} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>

        <FiltersContainer>
          <Select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
          >
            <option value="">Project: All</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </Select>

          <Select
            value={resourceFilter}
            onChange={(e) => setResourceFilter(e.target.value)}
          >
            <option value="">Resource: All</option>
            {resources.map((resource) => (
              <option key={resource.id} value={resource.id}>
                {resource.name}
              </option>
            ))}
          </Select>
        </FiltersContainer>
      </ControlsRow>

      <TableContainer>
        <Table>
          <TableHead>
            <tr>
              <th>Project</th>
              <th>Resource</th>
              <th>Allocation</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Hourly Rate (₹)</th>
              <th>Actions</th>
            </tr>
          </TableHead>
          <TableBody>
            {filteredAssignments.map((item, mainIndex) => (
              <tr key={`${item.resource.id}-${item.index}-${mainIndex}`}>
                <td>{item.project?.name}</td>
                <td>{item.resource.name}</td>
                <td>{item.assignment.allocation}%</td>
                <td>{item.assignment.startDate}</td>
                <td>{item.assignment.endDate}</td>
                <td>₹{item.resource.hourlyRate}</td>
                <td>
                  <ActionButtonsContainer>
                    <ActionButton title="Edit">
                      <Edit2 size={16} />
                    </ActionButton>
                    <ActionButton
                      onClick={() =>
                        handleDeleteAssignment(item.resource.id, item.index)
                      }
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </ActionButton>
                  </ActionButtonsContainer>
                </td>
              </tr>
            ))}

            {filteredAssignments.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "2rem" }}
                >
                  No assignments found
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AssignmentList;
