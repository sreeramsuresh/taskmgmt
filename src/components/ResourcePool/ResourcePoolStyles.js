import styled from "styled-components";

export const ResourcePoolContainer = styled.div`
  padding: 1.5rem;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const PageTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
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

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1.5rem;
`;

export const Tab = styled.button`
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.$active ? "#3b82f6" : "transparent")};
  color: ${(props) => (props.$active ? "#1e293b" : "#64748b")};
  font-weight: ${(props) => (props.$active ? "600" : "normal")};
  cursor: pointer;

  &:hover {
    color: #1e293b;
  }
`;

export const ControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 24rem;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const SearchInput = styled.input`
  padding: 0.5rem 0.5rem 0.5rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  width: 100%;

  &:focus {
    border-color: #3b82f6;
    outline: none;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
`;

export const FiltersContainer = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const Select = styled.select`
  border: 1px solid #e2e8f0;
  padding: 0.5rem;
  border-radius: 0.25rem;

  &:focus {
    border-color: #3b82f6;
    outline: none;
  }
`;

export const TableContainer = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 1.5rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;

  th {
    padding: 0.75rem 1.5rem;
    text-align: left;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    color: #64748b;
    letter-spacing: 0.05em;
  }
`;

export const TableBody = styled.tbody`
  background-color: white;

  tr {
    border-bottom: 1px solid #e2e8f0;

    &:last-child {
      border-bottom: none;
    }
  }

  td {
    padding: 1rem 1.5rem;
    white-space: nowrap;
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  padding: 0.25rem;
  border-radius: 0.25rem;

  &:hover {
    background-color: #f1f5f9;
    color: #1e293b;
  }
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Badge = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;

  ${(props) => {
    if (props.status === "Active")
      return `
        background-color: #dcfce7;
        color: #166534;
      `;
    if (props.status === "Inactive")
      return `
        background-color: #fef3c7;
        color: #92400e;
      `;
    if (props.status === "On Leave")
      return `
        background-color: #f3e8ff;
        color: #6b21a8;
      `;
    return `
      background-color: #dbeafe;
      color: #1e40af;
    `;
  }}
`;

export const ChargeabilityBadge = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;

  ${(props) => {
    const value = parseInt(props.value);
    if (value >= 80)
      return `
        background-color: #dcfce7;
        color: #166534;
      `;
    if (value >= 60)
      return `
        background-color: #fef3c7;
        color: #92400e;
      `;
    return `
      background-color: #fee2e2;
      color: #991b1b;
    `;
  }}
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 32rem;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;

  h3 {
    font-weight: 600;
    font-size: 1.25rem;
  }

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #64748b;

    &:hover {
      color: #1e293b;
    }
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;

  @media (min-width: 768px) {
    width: 10rem;
    margin-bottom: 0;
  }
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  width: 100%;

  &:focus {
    border-color: #3b82f6;
    outline: none;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

export const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #f8fafc;
  }
`;

export const SaveButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #3b82f6;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;

export const AssignmentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  border: 1px solid #e2e8f0;

  th,
  td {
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    text-align: left;
  }

  th {
    background-color: #f8fafc;
    font-weight: 500;
    font-size: 0.875rem;
  }

  tbody tr:nth-child(even) {
    background-color: #f8fafc;
  }
`;

export const StatsCard = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h4 {
    color: #64748b;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.875rem;
    font-weight: bold;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const ResourceUtilizationCard = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  padding: 1.5rem;
`;

export const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
`;
