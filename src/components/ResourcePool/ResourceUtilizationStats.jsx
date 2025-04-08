import React from "react";
import {
  ResourceUtilizationCard,
  SectionTitle,
  StatsGrid,
  StatsCard,
} from "./ResourcePoolStyles";

const ResourceUtilizationStats = ({ stats }) => {
  return (
    <ResourceUtilizationCard>
      <SectionTitle>Resource Utilization Overview</SectionTitle>
      <StatsGrid>
        <StatsCard>
          <h4>Total Resources</h4>
          <p>{stats.totalResources}</p>
        </StatsCard>
        <StatsCard>
          <h4>Fully Allocated</h4>
          <p>{stats.fullyAllocated}</p>
        </StatsCard>
        <StatsCard>
          <h4>Partially Allocated</h4>
          <p>{stats.partiallyAllocated}</p>
        </StatsCard>
        <StatsCard>
          <h4>Unallocated</h4>
          <p>{stats.unallocated}</p>
        </StatsCard>
      </StatsGrid>
    </ResourceUtilizationCard>
  );
};

export default ResourceUtilizationStats;
