import React from "react";
import styled from "styled-components";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  budgetData,
  taskDistributionData,
  hoursLoggedData,
} from "../data/initialData";

const DashboardContainer = styled.div`
  padding: 1.5rem;
`;

const DashboardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
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

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ChartCard = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h3 {
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;

const LargeChartCard = styled(ChartCard)`
  grid-column: 1 / -1;
`;

function Dashboard({ projects, tasks }) {
  return (
    <DashboardContainer>
      <DashboardTitle>Analytics Dashboard</DashboardTitle>

      <StatsGrid>
        <StatCard>
          <h3>Total Engagements</h3>
          <p>{projects.length}</p>
        </StatCard>
        <StatCard>
          <h3>Open Activities</h3>
          <p>{tasks.filter((t) => t.status !== "Done").length}</p>
        </StatCard>
        <StatCard>
          <h3>Hours Logged (This Week)</h3>
          <p>28</p>
        </StatCard>
      </StatsGrid>

      <ChartsGrid>
        <ChartCard>
          <h3>Budget Utilization</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="budget" fill="#8884d8" name="Total Budget (₹)" />
              <Bar dataKey="used" fill="#82ca9d" name="Used Budget (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard>
          <h3>Engagement Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taskDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </ChartsGrid>

      <LargeChartCard>
        <h3>Hours Logged Per Engagement</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hoursLoggedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="hours" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </LargeChartCard>
    </DashboardContainer>
  );
}

export default Dashboard;
