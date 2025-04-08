// Sample data
export const initialUsers = [
  {
    id: 1,
    name: "Raj Mehta",
    role: "Principal Partner",
    email: "raj@caassociates.in",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Partner",
    email: "priya@caassociates.in",
  },
  {
    id: 3,
    name: "Vikram Singh",
    role: "Manager",
    email: "vikram@caassociates.in",
  },
  {
    id: 4,
    name: "Ananya Patel",
    role: "Associate",
    email: "ananya@caassociates.in",
  },
];

export const initialClients = [
  {
    id: 1,
    name: "Reliance Industries Ltd.",
    budgetCode: "RIL001",
    partner: 2,
    pan: "AAACR1234F",
    gstin: "27AAACR1234F1Z1",
  },
  {
    id: 2,
    name: "Infosys Limited",
    budgetCode: "INF002",
    partner: 2,
    pan: "AABCI3596P",
    gstin: "29AABCI3596P1ZV",
  },
];

export const initialProjects = [
  {
    id: 1,
    name: "GST Audit FY 2024-25",
    clientId: 1,
    manager: 3,
    progress: 65,
    type: "Audit",
  },
  {
    id: 2,
    name: "Income Tax Filing",
    clientId: 2,
    manager: 3,
    progress: 30,
    type: "Tax Filing",
  },
  {
    id: 3,
    name: "Financial Due Diligence",
    clientId: 1,
    manager: 3,
    progress: 15,
    type: "Advisory",
  },
];

export const initialTasks = [
  {
    id: 1,
    title: "Verify GST ITC Claims",
    projectId: 1,
    assignee: 4,
    status: "In Progress",
    priority: "High",
    deadline: "2025-04-15",
    hoursLogged: 12,
    hoursEstimated: 20,
  },
  {
    id: 2,
    title: "Reconcile GSTR-3B with GSTR-1",
    projectId: 1,
    assignee: 4,
    status: "To-Do",
    priority: "Medium",
    deadline: "2025-04-20",
    hoursLogged: 0,
    hoursEstimated: 8,
  },
  {
    id: 3,
    title: "Prepare Form 3CD",
    projectId: 2,
    assignee: 4,
    status: "Done",
    priority: "Low",
    deadline: "2025-04-05",
    hoursLogged: 6,
    hoursEstimated: 5,
  },
  {
    id: 4,
    title: "Calculate Tax Provision",
    projectId: 2,
    assignee: 4,
    status: "Review",
    priority: "High",
    deadline: "2025-04-10",
    hoursLogged: 10,
    hoursEstimated: 12,
  },
  {
    id: 5,
    title: "Fixed Asset Verification",
    projectId: 3,
    assignee: 4,
    status: "Backlog",
    priority: "Medium",
    deadline: "2025-04-25",
    hoursLogged: 0,
    hoursEstimated: 15,
  },
];

export const initialTimesheets = [
  {
    id: 1,
    employeeId: 4,
    week: "2025-W14",
    status: "Approved",
    tasks: [
      {
        taskId: 1,
        hours: { Monday: 3, Tuesday: 2, Wednesday: 3, Thursday: 2, Friday: 2 },
      },
      {
        taskId: 3,
        hours: { Monday: 2, Tuesday: 1, Wednesday: 1, Thursday: 1, Friday: 1 },
      },
      {
        taskId: 4,
        hours: { Monday: 2, Tuesday: 3, Wednesday: 2, Thursday: 2, Friday: 1 },
      },
    ],
  },
];

// Analytics data
export const budgetData = [
  { name: "Reliance Industries", budget: 500000, used: 325000 },
  { name: "Infosys Limited", budget: 750000, used: 225000 },
];

export const taskDistributionData = [
  { name: "Audit", value: 12 },
  { name: "Tax Filing", value: 8 },
  { name: "Advisory", value: 5 },
];

export const hoursLoggedData = [
  { name: "GST Audit", hours: 22 },
  { name: "Income Tax Filing", hours: 6 },
];
