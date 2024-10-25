import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';

interface Column {
  key: string;
  label: string;
}

interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
  category: string;
}

interface DataTableProps {
  data: Supplier[];
  columns: Column[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-6 py-3">
                {column.label}
              </th>
            ))}
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4">
                  {item[column.key as keyof Supplier]}
                </td>
              ))}
              <td className="px-6 py-4 flex gap-2">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Suppliers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data - replace with actual data fetching
  const suppliers = [
    { id: 1, name: 'Supplier Co.', contact: 'Alice Brown', email: 'alice@supplier.com', category: 'Electronics' },
    { id: 2, name: 'Tech Parts Ltd.', contact: 'Mike Wilson', email: 'mike@techparts.com', category: 'Hardware' },
    { id: 3, name: 'Global Goods', contact: 'Sarah Lee', email: 'sarah@globalgoods.com', category: 'Software' },
  ];

  const columns = [
    { key: 'name', label: 'Company' },
    { key: 'contact', label: 'Contact' },
    { key: 'email', label: 'Email' },
    { key: 'category', label: 'Category' },
  ];

  const handleEdit = (supplier: unknown) => {
    console.log('Edit supplier:', supplier);
  };

  const handleDelete = (id: unknown) => {
    console.log('Delete supplier:', id);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-r from-indigo-500">
      <div className="flex items-start justify-center w-full h-full p-8 text-gray-600">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Suppliers</h1>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Plus size={20} />
                Add Supplier
              </button>
            </div>
            
            <div className="mb-6 relative">
              <input
                type="text"
                placeholder="Search suppliers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>

            <DataTable
              data={suppliers}
              columns={columns}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;