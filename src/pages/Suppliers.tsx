import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Supplier {
  id: number;
  name: string;
  contact: string;
  address: string;
}

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [name, setName] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get<Supplier[]>('/api/suppliers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuppliers(response.data);
      } catch (error) {
        console.error("Failed to fetch suppliers:", error);
      }
    };
    fetchSuppliers();
  }, []);

  const handleAddSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const newSupplier: Omit<Supplier, 'id'> = { name, contact, address };
    try {
      const response = await axios.post<Supplier>('/api/suppliers', newSupplier, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuppliers([...suppliers, response.data]);
      setName('');
      setContact('');
      setAddress('');
    } catch (error) {
      console.error("Failed to add supplier:", error);
    }
  };

  return (
    <div className="max-w-3xl p-4 mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h1 className="mb-4 text-2xl font-semibold text-center text-gray-800">Manage Suppliers</h1>
      <form onSubmit={handleAddSupplier} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="submit"
          className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
        >
          Add Supplier
        </button>
      </form>
      <div className="space-y-4">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="p-4 bg-gray-100 rounded-md shadow">
            <h2 className="text-lg font-semibold">{supplier.name}</h2>
            <p>Contact: {supplier.contact}</p>
            <p>Address: {supplier.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suppliers;
