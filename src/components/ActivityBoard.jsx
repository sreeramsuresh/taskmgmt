import React from "react";
import styled from "styled-components";
import { Plus, User } from "lucide-react";

const ActivityBoardContainer = styled.div`
  padding: 1.5rem;
`;

const BoardHeader = styled.div`
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

const BoardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const BoardControls = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

const Select = styled.select`
  border: 1px solid #e2e8f0;
  padding: 0.5rem;
  border-radius: 0.25rem;
`;

const Button = styled.button`
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

const BoardColumnsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding-bottom: 1rem;
`;

const BoardColumn = styled.div`
  background-color: #f1f5f9;
  padding: 1rem;
  border-radius: 0.25rem;
  min-height: 24rem;
  min-width: 16rem;
  flex-shrink: 0;
`;

const ColumnHeader = styled.h3`
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TaskCard = styled.div`
  background-color: white;
  padding: 0.75rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: move;
`;

const TaskCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TaskPriority = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: ${(props) =>
    props.priority === "High"
      ? "#fee2e2"
      : props.priority === "Medium"
      ? "#fef3c7"
      : "#dcfce7"};
  color: ${(props) =>
    props.priority === "High"
      ? "#991b1b"
      : props.priority === "Medium"
      ? "#92400e"
      : "#166534"};
`;

const TaskHours = styled.span`
  font-size: 0.75rem;
  color: #64748b;
`;

const TaskTitle = styled.h4`
  font-weight: 600;
  margin-top: 0.5rem;
`;

const TaskProject = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.25rem;
`;

const TaskFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
`;

const TaskAssignee = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
`;

const TaskDeadline = styled.span`
  font-size: 0.75rem;
`;

function ActivityBoard({
  tasks,
  projects,
  kanbanFilter,
  setKanbanFilter,
  getProjectById,
  getUserById,
  moveTask,
}) {
  const columns = ["Backlog", "To-Do", "In Progress", "Review", "Done"];

  // Filter tasks based on selected filters
  let filteredTasks = [...tasks];
  if (kanbanFilter.project) {
    filteredTasks = filteredTasks.filter(
      (task) => task.projectId === kanbanFilter.project
    );
  }
  if (kanbanFilter.assignee) {
    filteredTasks = filteredTasks.filter(
      (task) => task.assignee === kanbanFilter.assignee
    );
  }
  if (kanbanFilter.priority) {
    filteredTasks = filteredTasks.filter(
      (task) => task.priority === kanbanFilter.priority
    );
  }

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    const taskId = parseInt(e.dataTransfer.getData("taskId"));
    moveTask(taskId, status);
  };

  return (
    <ActivityBoardContainer>
      <BoardHeader>
        <BoardTitle>Activity Board</BoardTitle>

        <BoardControls>
          <Select
            value={kanbanFilter.project || ""}
            onChange={(e) =>
              setKanbanFilter({
                ...kanbanFilter,
                project: e.target.value ? parseInt(e.target.value) : null,
              })
            }
          >
            <option value="">All Engagements</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </Select>

          <Select
            value={kanbanFilter.priority || ""}
            onChange={(e) =>
              setKanbanFilter({
                ...kanbanFilter,
                priority: e.target.value || null,
              })
            }
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>

          <Button>
            <Plus size={16} />
            Add Activity
          </Button>
        </BoardControls>
      </BoardHeader>

      <BoardColumnsContainer>
        {columns.map((column) => (
          <BoardColumn
            key={column}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column)}
          >
            <ColumnHeader>
              {column} (
              {filteredTasks.filter((task) => task.status === column).length})
            </ColumnHeader>

            <TasksContainer>
              {filteredTasks
                .filter((task) => task.status === column)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                  >
                    <TaskCardHeader>
                      <TaskPriority priority={task.priority}>
                        {task.priority}
                      </TaskPriority>
                      <TaskHours>
                        {task.hoursLogged}/{task.hoursEstimated}h
                      </TaskHours>
                    </TaskCardHeader>
                    <TaskTitle>{task.title}</TaskTitle>
                    <TaskProject>
                      {getProjectById(task.projectId)?.name}
                    </TaskProject>
                    <TaskFooter>
                      <TaskAssignee>
                        <User size={14} style={{ marginRight: "4px" }} />
                        {getUserById(task.assignee)?.name}
                      </TaskAssignee>
                      <TaskDeadline>Due: {task.deadline}</TaskDeadline>
                    </TaskFooter>
                  </TaskCard>
                ))}
            </TasksContainer>
          </BoardColumn>
        ))}
      </BoardColumnsContainer>
    </ActivityBoardContainer>
  );
}

export default ActivityBoard;
