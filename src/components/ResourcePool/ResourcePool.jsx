import React, { useState, useEffect } from "react";
import ResourceList from "./ResourceList";
import AssignmentList from "./AssignmentList";
import ResourceDetail from "./ResourceDetail";
import ResourceModal from "./ResourceModal";
import AssignmentModal from "./AssignmentModal";
import ResourceUtilizationStats from "./ResourceUtilizationStats";
import {
  PageHeader,
  PageTitle,
  AddButton,
  TabsContainer,
  Tab,
  ResourcePoolContainer,
} from "./ResourcePoolStyles";
import { Plus } from "lucide-react";

function ResourcePool({ users, projects, tasks }) {
  const [activeTab, setActiveTab] = useState("resources");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [chargeabilityFilter, setChargeabilityFilter] = useState("");
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [currentResource, setCurrentResource] = useState(null);
  const [newAssignment, setNewAssignment] = useState({
    projectId: "",
    allocation: 50,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 6))
      .toISOString()
      .split("T")[0],
  });

  // Initialize resources with user data
  useEffect(() => {
    // In a real app, this data would come from an API
    const initialResources = users.map((user) => ({
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
      status: "Active",
      hourlyRate: Math.floor(Math.random() * 50) + 100, // Random rate between 100-150
      chargeability: Math.floor(Math.random() * 40) + 60, // Random between 60-100%
      skills: ["Tax Advisory", "Audit", "GST", "Financial Advisory"].slice(
        0,
        Math.floor(Math.random() * 3) + 1
      ),
      joinDate: "2023-01-01",
      assignments: [
        {
          projectId: 1,
          allocation: 70,
          startDate: "2024-01-15",
          endDate: "2025-06-30",
        },
        {
          projectId: 2,
          allocation: 30,
          startDate: "2024-03-01",
          endDate: "2025-04-30",
        },
      ],
    }));

    setResources(initialResources);
  }, [users]);

  const filteredResources = resources.filter((resource) => {
    // Apply search filter
    if (
      searchQuery &&
      !resource.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Apply status filter
    if (statusFilter && resource.status !== statusFilter) {
      return false;
    }

    // Apply role filter
    if (roleFilter && resource.role !== roleFilter) {
      return false;
    }

    // Apply chargeability filter
    if (chargeabilityFilter) {
      const chargeability = parseInt(resource.chargeability);
      if (chargeabilityFilter === "high" && chargeability < 80) return false;
      if (
        chargeabilityFilter === "medium" &&
        (chargeability < 60 || chargeability >= 80)
      )
        return false;
      if (chargeabilityFilter === "low" && chargeability >= 60) return false;
    }

    return true;
  });

  const roles = [...new Set(resources.map((r) => r.role))];
  const statuses = ["Active", "Inactive", "On Leave", "Training"];

  const handleAddResource = () => {
    setCurrentResource({
      id: resources.length + 1,
      name: "",
      email: "",
      role: "",
      status: "Active",
      hourlyRate: 100,
      chargeability: 80,
      skills: [],
      joinDate: new Date().toISOString().split("T")[0],
      assignments: [],
    });
    setShowResourceModal(true);
  };

  const handleEditResource = (resource) => {
    setCurrentResource({ ...resource });
    setShowResourceModal(true);
  };

  const handleAddAssignment = (resource) => {
    setCurrentResource({ ...resource });
    setNewAssignment({
      projectId: "",
      allocation: 50,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 6))
        .toISOString()
        .split("T")[0],
    });
    setShowAssignmentModal(true);
  };

  const handleViewResourceDetails = (resource) => {
    setSelectedResource(resource);
    setActiveTab("resourceDetail");
  };

  const handleSaveResource = () => {
    if (resources.find((r) => r.id === currentResource.id)) {
      // Update existing resource
      setResources(
        resources.map((r) =>
          r.id === currentResource.id ? currentResource : r
        )
      );
    } else {
      // Add new resource
      setResources([...resources, currentResource]);
    }
    setShowResourceModal(false);
  };

  const handleSaveAssignment = () => {
    if (!newAssignment.projectId) {
      alert("Please select a project");
      return;
    }

    // Check for total allocation
    const currentTotal = getResourceTotalAllocation(
      currentResource.assignments
    );
    if (currentTotal + newAssignment.allocation > 100) {
      alert(
        `Cannot add assignment. Total allocation would exceed 100% (${
          currentTotal + newAssignment.allocation
        }%)`
      );
      return;
    }

    const updatedResource = {
      ...currentResource,
      assignments: [
        ...currentResource.assignments,
        {
          projectId: parseInt(newAssignment.projectId),
          allocation: parseInt(newAssignment.allocation),
          startDate: newAssignment.startDate,
          endDate: newAssignment.endDate,
        },
      ],
    };

    setResources(
      resources.map((r) => (r.id === updatedResource.id ? updatedResource : r))
    );

    if (selectedResource && selectedResource.id === updatedResource.id) {
      setSelectedResource(updatedResource);
    }

    setShowAssignmentModal(false);
  };

  const handleDeleteResource = (id) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      setResources(resources.filter((r) => r.id !== id));
    }
  };

  const handleDeleteAssignment = (resourceId, index) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      const resource = resources.find((r) => r.id === resourceId);
      if (resource) {
        const updatedAssignments = [...resource.assignments];
        updatedAssignments.splice(index, 1);

        const updatedResource = {
          ...resource,
          assignments: updatedAssignments,
        };

        setResources(
          resources.map((r) => (r.id === resourceId ? updatedResource : r))
        );

        if (selectedResource && selectedResource.id === resourceId) {
          setSelectedResource(updatedResource);
        }
      }
    }
  };

  const getProjectById = (projectId) => {
    return projects.find((p) => p.id === projectId);
  };

  const getResourceTotalAllocation = (assignments) => {
    return assignments.reduce(
      (total, assignment) => total + assignment.allocation,
      0
    );
  };

  const getResourceUtilizationStats = () => {
    const totalResources = resources.length;
    const fullyAllocated = resources.filter(
      (r) => getResourceTotalAllocation(r.assignments) >= 90
    ).length;
    const partiallyAllocated = resources.filter((r) => {
      const allocation = getResourceTotalAllocation(r.assignments);
      return allocation > 0 && allocation < 90;
    }).length;
    const unallocated = resources.filter(
      (r) => getResourceTotalAllocation(r.assignments) === 0
    ).length;

    return {
      totalResources,
      fullyAllocated,
      partiallyAllocated,
      unallocated,
    };
  };

  return (
    <ResourcePoolContainer>
      <PageHeader>
        <PageTitle>Resource Pool</PageTitle>
        {activeTab === "resources" && (
          <AddButton onClick={handleAddResource}>
            <Plus size={16} />
            Add Resource
          </AddButton>
        )}
        {activeTab === "resourceDetail" && (
          <AddButton onClick={() => setActiveTab("resources")}>
            Back to Resources
          </AddButton>
        )}
      </PageHeader>

      {activeTab !== "resourceDetail" && (
        <TabsContainer>
          <Tab
            $active={activeTab === "resources"}
            onClick={() => setActiveTab("resources")}
          >
            Resources
          </Tab>
          <Tab
            $active={activeTab === "assignments"}
            onClick={() => setActiveTab("assignments")}
          >
            Assignments
          </Tab>
        </TabsContainer>
      )}

      {activeTab === "resources" && (
        <>
          <ResourceUtilizationStats stats={getResourceUtilizationStats()} />
          <ResourceList
            resources={filteredResources}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            chargeabilityFilter={chargeabilityFilter}
            setChargeabilityFilter={setChargeabilityFilter}
            statuses={statuses}
            roles={roles}
            getResourceTotalAllocation={getResourceTotalAllocation}
            onViewDetails={handleViewResourceDetails}
            onAddAssignment={handleAddAssignment}
            onEditResource={handleEditResource}
            onDeleteResource={handleDeleteResource}
          />
        </>
      )}

      {activeTab === "assignments" && (
        <AssignmentList
          resources={resources}
          projects={projects}
          getProjectById={getProjectById}
          handleDeleteAssignment={handleDeleteAssignment}
        />
      )}

      {activeTab === "resourceDetail" && selectedResource && (
        <ResourceDetail
          resource={selectedResource}
          getProjectById={getProjectById}
          handleAddAssignment={handleAddAssignment}
          handleDeleteAssignment={handleDeleteAssignment}
          getResourceTotalAllocation={getResourceTotalAllocation}
        />
      )}

      {showResourceModal && (
        <ResourceModal
          resource={currentResource}
          setResource={setCurrentResource}
          onSave={handleSaveResource}
          onCancel={() => setShowResourceModal(false)}
        />
      )}

      {showAssignmentModal && (
        <AssignmentModal
          resource={currentResource}
          assignment={newAssignment}
          setAssignment={setNewAssignment}
          projects={projects}
          getProjectById={getProjectById}
          getResourceTotalAllocation={getResourceTotalAllocation}
          onSave={handleSaveAssignment}
          onCancel={() => setShowAssignmentModal(false)}
        />
      )}
    </ResourcePoolContainer>
  );
}

export default ResourcePool;
