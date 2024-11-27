import React, { useState } from 'react';
import { Calculator, Scale, DollarSign, Plus, Trash2 } from 'lucide-react';
import { WeightInput } from './components/WeightInput';

interface Item {
  id: number;
  name: string;
  quantity: number;
  weight: number;
  sar: number;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 1, weight: 0, sar: 0 });
  const [weightUnit, setWeightUnit] = useState<'kg' | 'g'>('g');
  const [conversionRate, setConversionRate] = useState(77);
  const [foreignCurrency, setForeignCurrency] = useState('SAR');

  const calculateTotalWeight = () => {
    return items.reduce((total, item) => total + (item.weight * item.quantity), 0);
  };

  const calculateTotalSAR = () => {
    return items.reduce((total, item) => total + (item.sar * item.quantity), 0);
  };

  const calculateMY = (sar: number) => {
    return (sar * conversionRate).toFixed(2);
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.weight && newItem.sar) {
      setItems([...items, { ...newItem, id: Date.now() }]);
      setNewItem({ name: '', quantity: 1, weight: 0, sar: 0 });
    }
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleClearAll = () => {
    setItems([]);
    setNewItem({ name: '', quantity: 1, weight: 0, sar: 0 });
  };

  const formatWeight = (weight: number) => {
    if (weight >= 1) {
      return `${weight.toFixed(3)}kg`;
    } else {
      const grams = Math.round(weight * 1000);
      return `${grams}g`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-indigo-700 p-2 md:p-4 overflow-hidden">
      <div className="max-w-sm mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-4">
          <div className="bg-indigo-600 p-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-6 h-6 text-white" />
              <h1 className="text-lg font-bold text-white">Noah Calculator</h1>
            </div>
            <p className="text-xs text-indigo-100 mt-1">Plan your international shopping with ease. Calculate currency conversions and track luggage weight limits before you travel.</p>
          </div>

          <div className="p-2 space-y-2">
            <div className="flex items-center gap-2 bg-indigo-50 p-2 rounded-lg">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <DollarSign className="w-3 h-3 text-indigo-600" />
                  <label className="text-xs font-semibold text-indigo-900">Currency</label>
                </div>
                <input
                  type="text"
                  value={foreignCurrency}
                  onChange={(e) => setForeignCurrency(e.target.value.toUpperCase())}
                  placeholder="e.g., QAR"
                  maxLength={3}
                  className="w-16 p-1 text-sm border rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-transparent uppercase bg-white"
                />
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <DollarSign className="w-3 h-3 text-indigo-600" />
                  <label className="text-xs font-semibold text-indigo-900">My Rate</label>
                </div>
                <input
                  type="number"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="w-20 p-1 text-sm border rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-transparent bg-white"
                />
              </div>
              <button 
                onClick={handleClearAll}
                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1 h-7 mt-5"
              >
                <Trash2 className="w-3 h-3" />
                Clear All
              </button>
            </div>

            <div className="bg-gray-50 p-2 rounded-lg space-y-2">
              <div className="flex gap-2 items-end">
                <div>
                  <label className="text-xs font-medium text-gray-600">Item</label>
                  <input
                    placeholder="Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="w-full p-1 text-sm border rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-transparent bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Qty</label>
                  <input
                    type="number"
                    min="1"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: Math.max(1, Number(e.target.value)) })}
                    className="w-14 p-1 text-sm border rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>
              <div className="flex gap-2 items-end">
                <div>
                  <label className="text-xs font-medium text-gray-600">Weight</label>
                  <WeightInput
                    weight={newItem.weight}
                    unit={weightUnit}
                    onChange={(weight) => setNewItem({ ...newItem, weight })}
                    onUnitChange={setWeightUnit}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Price ({foreignCurrency})</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newItem.sar || ''}
                    onChange={(e) => setNewItem({ ...newItem, sar: Number(e.target.value) })}
                    className="w-20 p-1 text-sm border rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>
              <button
                onClick={handleAddItem}
                className="w-full p-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-1.5 text-xs font-medium text-left text-gray-500">Item</th>
                      <th className="p-1.5 text-xs font-medium text-left text-gray-500">Qty</th>
                      <th className="p-1.5 text-xs font-medium text-left text-gray-500">Weight</th>
                      <th className="p-1.5 text-xs font-medium text-left text-gray-500">Price</th>
                      <th className="p-1.5 text-xs font-medium text-left text-gray-500">Total</th>
                      <th className="p-1.5 text-xs font-medium text-left text-gray-500">MY</th>
                      <th className="p-1.5 text-xs font-medium text-left text-gray-500"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {items.map((item) => (
                      <tr key={item.id} className="text-xs hover:bg-gray-50">
                        <td className="p-1.5">{item.name}</td>
                        <td className="p-1.5">{item.quantity}</td>
                        <td className="p-1.5">{formatWeight(item.weight)}</td>
                        <td className="p-1.5">{item.sar}</td>
                        <td className="p-1.5">{(item.sar * item.quantity).toFixed(2)}</td>
                        <td className="p-1.5">{calculateMY(item.sar * item.quantity)}</td>
                        <td className="p-1.5">
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <div className="flex items-center gap-1">
                  <Scale className="w-3 h-3 text-indigo-100" />
                  <h2 className="text-xs font-semibold text-white">Total Weight</h2>
                </div>
                <p className="text-sm font-bold text-white">{formatWeight(calculateTotalWeight())}</p>
              </div>
              <div className="bg-indigo-600 p-2 rounded-lg">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-indigo-100" />
                  <h2 className="text-xs font-semibold text-white">Total Amount</h2>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{calculateTotalSAR().toFixed(2)} {foreignCurrency}</p>
                  <p className="text-xs font-bold text-indigo-200">{calculateMY(calculateTotalSAR())} MY</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ad Space */}
        <div className="bg-white p-3 rounded-xl shadow-md text-center text-gray-400 text-xs">
          Advertisement Space
        </div>
      </div>
    </div>
  );
}

export default App;