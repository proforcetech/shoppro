import { useEffect, useState } from 'react';
import { api } from '../../api/client';

type SupportTicket = {
  id: string;
  subject: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  message: string;
};

export const SupportList = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  useEffect(() => {
    api.get('/support').then(res => {
      setTickets(res.data);
    });
  }, []);

const updateStatus = async (id: string, status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED') => {
  await api.patch(`/support/${id}`, { status });
  setTickets(tickets.map((t) => t.id === id ? { ...t, status } : t));
};


  return (
    <div className="p-4 bg-white border rounded shadow-sm space-y-4">
      <h2 className="text-xl font-bold">Support Requests</h2>
      {tickets.length === 0 && <p className="text-sm text-gray-500">No tickets found.</p>}
      {tickets.map((ticket) => (
        <div key={ticket.id} className="border p-3 rounded">
          <p className="font-bold">{ticket.subject}</p>
          <p className="text-sm text-gray-500">{ticket.message}</p>
          <p className="text-xs text-gray-400">Status: {ticket.status}</p>

<select
  value={ticket.status}
  onChange={(e) =>
    updateStatus(ticket.id, e.target.value as 'OPEN' | 'IN_PROGRESS' | 'CLOSED')
  }
  className="input mt-2"
>

            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      ))}
    </div>
  );
};
