import React, { useEffect, useState } from 'react';
import { getMyCompany, upsertCompany } from '../../api/companyApi';

const CompanySetupPage = () => {
  const [form, setForm] = useState({
    name: '',
    type: 'PROPRIETORSHIP',
    turnover: '',
    state: '',
    gstNumber: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMyCompany();
        if (data) {
          setForm({
            name: data.name || '',
            type: data.type || 'PROPRIETORSHIP',
            turnover: data.turnover || '',
            state: data.state || '',
            gstNumber: data.gstNumber || ''
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await upsertCompany({ ...form, turnover: Number(form.turnover) || 0 });
      setMessage('Company details saved');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to save');
    }
  };

  return (
    <div>
      <h1>Company Setup</h1>
      <form onSubmit={handleSubmit} className="form">
        <input name="name" placeholder="Company Name" value={form.name} onChange={handleChange} />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="PROPRIETORSHIP">Proprietorship</option>
          <option value="PARTNERSHIP">Partnership</option>
          <option value="PVT_LTD">Private Limited</option>
          <option value="LLP">LLP</option>
          <option value="OTHER">Other</option>
        </select>
        <input
          name="turnover"
          type="number"
          placeholder="Annual Turnover"
          value={form.turnover}
          onChange={handleChange}
        />
        <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
        <input name="gstNumber" placeholder="GSTIN (optional)" value={form.gstNumber} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CompanySetupPage;
