import React from "react";
import styled from "styled-components";
import { Plus } from "lucide-react";

const ClientListContainer = styled.div`
  padding: 1.5rem;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ListTitle = styled.h2`
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

const TableContainer = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
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

const TableBody = styled.tbody`
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

const ActionLink = styled.td`
  color: #3b82f6;
  cursor: pointer;

  &:hover {
    color: #2563eb;
  }
`;

function ClientList({ clients, projects, getUserById, setSelectedClient }) {
  return (
    <ClientListContainer>
      <ListHeader>
        <ListTitle>Clients</ListTitle>
        <AddButton>
          <Plus size={16} />
          Add Client
        </AddButton>
      </ListHeader>

      <TableContainer>
        <Table>
          <TableHead>
            <tr>
              <th>Name</th>
              <th>PAN</th>
              <th>GSTIN</th>
              <th>Budget Code</th>
              <th>Partner</th>
              <th>Engagements</th>
              <th>Actions</th>
            </tr>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.pan}</td>
                <td>{client.gstin}</td>
                <td>{client.budgetCode}</td>
                <td>{getUserById(client.partner)?.name}</td>
                <td>
                  {projects.filter((p) => p.clientId === client.id).length}
                </td>
                <ActionLink onClick={() => setSelectedClient(client)}>
                  View Details
                </ActionLink>
              </tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ClientListContainer>
  );
}

export default ClientList;
