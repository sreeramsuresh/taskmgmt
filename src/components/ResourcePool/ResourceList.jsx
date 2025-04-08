import React from "react";
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
  Badge,
  ChargeabilityBadge,
} from "./ResourcePoolStyles";
import { User, Plus, Edit2, Trash2, Search } from "lucide-react";

const ResourceList = ({
  resources,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  roleFilter,
  setRoleFilter,
  chargeabilityFilter,
  setChargeabilityFilter,
  statuses,
  roles,
  getResourceTotalAllocation,
  onViewDetails,
  onAddAssignment,
  onEditResource,
  onDeleteResource,
}) => {
  return (
    <>
      <ControlsRow>
        <SearchContainer>
          <SearchIcon>
            <Search size={18} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>

        <FiltersContainer>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Status: All</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>

          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">Role: All</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Select>

          <Select
            value={chargeabilityFilter}
            onChange={(e) => setChargeabilityFilter(e.target.value)}
          >
            <option value="">Chargeability: All</option>
            <option value="high">High (≥80%)</option>
            <option value="medium">Medium (60-79%)</option>
            <option value="low">Low (&lt;60%)</option>
          </Select>
        </FiltersContainer>
      </ControlsRow>

      <TableContainer>
        <Table>
          <TableHead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Chargeability</th>
              <th>Hourly Rate (₹)</th>
              <th>Current Allocation</th>
              <th>Actions</th>
            </tr>
          </TableHead>
          <TableBody>
            {resources.map((resource) => (
              <tr key={resource.id}>
                <td>{resource.name}</td>
                <td>{resource.role}</td>
                <td>
                  <Badge status={resource.status}>{resource.status}</Badge>
                </td>
                <td>
                  <ChargeabilityBadge value={resource.chargeability}>
                    {resource.chargeability}%
                  </ChargeabilityBadge>
                </td>
                <td>₹{resource.hourlyRate}</td>
                <td>{getResourceTotalAllocation(resource.assignments)}%</td>
                <td>
                  <ActionButtonsContainer>
                    <ActionButton
                      onClick={() => onViewDetails(resource)}
                      title="View Details"
                    >
                      <User size={16} />
                    </ActionButton>
                    <ActionButton
                      onClick={() => onAddAssignment(resource)}
                      title="Add Assignment"
                    >
                      <Plus size={16} />
                    </ActionButton>
                    <ActionButton
                      onClick={() => onEditResource(resource)}
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </ActionButton>
                    <ActionButton
                      onClick={() => onDeleteResource(resource.id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </ActionButton>
                  </ActionButtonsContainer>
                </td>
              </tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ResourceList;
