import React from "react";
import styled from "styled-components";
import { Plus } from "lucide-react";

const TimesheetContainer = styled.div`
  padding: 1.5rem;
`;

const TimesheetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const TimesheetTitle = styled.h2`
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

const CurrentTimesheetCard = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const TimesheetWeek = styled.h3`
  font-weight: 600;
  margin-bottom: 1rem;
`;

const TimesheetTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e2e8f0;

  th,
  td {
    border: 1px solid #e2e8f0;
    padding: 0.5rem 1rem;
  }

  th {
    background-color: #f8fafc;
    font-weight: 500;
  }

  tr:last-child {
    background-color: #f8fafc;
    font-weight: 600;
  }
`;

const TimeInput = styled.input`
  width: 3rem;
  padding: 0.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  text-align: center;
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const SubmitButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;

const PreviousTimesheetsCard = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardTitle = styled.h3`
  font-weight: 600;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const PreviousTimesheetsTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    padding: 0.75rem 1.5rem;
    text-align: left;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    color: #64748b;
    letter-spacing: 0.05em;
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  td {
    padding: 1rem 1.5rem;
    white-space: nowrap;
    border-bottom: 1px solid #e2e8f0;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const StatusBadge = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background-color: #dcfce7;
  color: #166534;
`;

const ActionLink = styled.span`
  color: #3b82f6;
  cursor: pointer;

  &:hover {
    color: #2563eb;
  }
`;

function TimesheetManager({ currentUser, tasks, timesheets, getProjectById }) {
  const assignedTasks = tasks.filter((t) => t.assignee === currentUser.id);

  // Calculate total hours from first timesheet
  let totalHours = 0;
  if (timesheets.length > 0) {
    const firstTimesheet = timesheets[0];
    firstTimesheet.tasks.forEach((taskEntry) => {
      Object.values(taskEntry.hours).forEach((hours) => {
        totalHours += hours;
      });
    });
  }

  return (
    <TimesheetContainer>
      <TimesheetHeader>
        <TimesheetTitle>Timesheets</TimesheetTitle>
        <AddButton>
          <Plus size={16} />
          New Timesheet
        </AddButton>
      </TimesheetHeader>

      <CurrentTimesheetCard>
        <TimesheetWeek>Current Week (April 7 - April 11, 2025)</TimesheetWeek>

        <TimesheetTable>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Engagement</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {assignedTasks.map((task) => {
              const taskTimesheet = timesheets[0]?.tasks.find(
                (t) => t.taskId === task.id
              );
              const hours = taskTimesheet?.hours || {};
              const totalHours = Object.values(hours).reduce(
                (a, b) => a + b,
                0
              );

              return (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{getProjectById(task.projectId)?.name}</td>
                  <td>
                    <TimeInput
                      type="number"
                      min="0"
                      max="24"
                      step="0.5"
                      defaultValue={hours?.Monday || 0}
                    />
                  </td>
                  <td>
                    <TimeInput
                      type="number"
                      min="0"
                      max="24"
                      step="0.5"
                      defaultValue={hours?.Tuesday || 0}
                    />
                  </td>
                  <td>
                    <TimeInput
                      type="number"
                      min="0"
                      max="24"
                      step="0.5"
                      defaultValue={hours?.Wednesday || 0}
                    />
                  </td>
                  <td>
                    <TimeInput
                      type="number"
                      min="0"
                      max="24"
                      step="0.5"
                      defaultValue={hours?.Thursday || 0}
                    />
                  </td>
                  <td>
                    <TimeInput
                      type="number"
                      min="0"
                      max="24"
                      step="0.5"
                      defaultValue={hours?.Friday || 0}
                    />
                  </td>
                  <td>{totalHours}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan="7" style={{ textAlign: "right" }}>
                Total Hours
              </td>
              <td>{totalHours}</td>
            </tr>
          </tbody>
        </TimesheetTable>

        <SubmitButtonContainer>
          <SubmitButton>Submit Timesheet</SubmitButton>
        </SubmitButtonContainer>
      </CurrentTimesheetCard>

      <PreviousTimesheetsCard>
        <CardTitle>Previous Timesheets</CardTitle>

        <PreviousTimesheetsTable>
          <thead>
            <tr>
              <th>Week</th>
              <th>Total Hours</th>
              <th>Status</th>
              <th>Approved By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>March 31 - April 4, 2025</td>
              <td>28</td>
              <td>
                <StatusBadge>Approved</StatusBadge>
              </td>
              <td>Vikram Singh</td>
              <td>
                <ActionLink>View</ActionLink>
              </td>
            </tr>
            <tr>
              <td>March 24 - March 28, 2025</td>
              <td>32</td>
              <td>
                <StatusBadge>Approved</StatusBadge>
              </td>
              <td>Priya Sharma</td>
              <td>
                <ActionLink>View</ActionLink>
              </td>
            </tr>
          </tbody>
        </PreviousTimesheetsTable>
      </PreviousTimesheetsCard>
    </TimesheetContainer>
  );
}

export default TimesheetManager;
