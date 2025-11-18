import React, { useEffect, useState } from 'react';
import { uploadInvoice, getInvoices } from '../../api/invoiceApi';

const InvoiceUploadPage = () => {
  const [file, setFile] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [message, setMessage] = useState('');

  const load = async () => {
    const data = await getInvoices();
    setInvoices(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setMessage('');
    try {
      await uploadInvoice(file);
      setMessage('Invoice uploaded and parsed');
      setFile(null);
      await load();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div>
      <h1>Invoices</h1>
      <form onSubmit={handleUpload} style={{ marginBottom: 16 }}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" disabled={!file}>
          Upload
        </button>
      </form>
      {message && <p>{message}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>HSN</th>
            <th>GST %</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv._id}>
              <td>{inv.invoiceNumber}</td>
              <td>{inv.date && new Date(inv.date).toLocaleDateString()}</td>
              <td>{inv.customerName}</td>
              <td>{inv.amount}</td>
              <td style={{ color: inv.hsnCode ? 'inherit' : 'red' }}>
                {inv.hsnCode || 'Missing'}
              </td>
              <td>{inv.gstRate}</td>
            </tr>
          ))}
          {invoices.length === 0 && (
            <tr>
              <td colSpan="6">No invoices</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceUploadPage;
