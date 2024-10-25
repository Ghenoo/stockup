import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Client {
  id: number;
  name: string;
  contact: string;
  address: string;
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/clients', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(response.data);
    };
    fetchClients();
  }, []);

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const newClient = { name, contact, address };
    const response = await axios.post('/api/clients', newClient, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setClients([...clients, response.data]);
    setName('');
    setContact('');
    setAddress('');
  };

  return (
    <div>
      <h1>Manage Clients</h1>
      <form onSubmit={handleAddClient}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Add Client</button>
      </form>
      <div className="client-list">
        {clients.map((client) => (
          <div key={client.id} className="client-card">
            <h2>{client.name}</h2>
            <p>Contact: {client.contact}</p>
            <p>Address: {client.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clients;
