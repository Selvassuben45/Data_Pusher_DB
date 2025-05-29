import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 220 },
  { field: 'accountId', headerName: 'accountId', width: 250 },
  { field: 'accountName', headerName: 'accountname', width: 150 },
    { field: 'appSecret', headerName: 'appSecret', width: 150 }

];

const Accounts = () => {
  const [accounts,setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const url = 'http://localhost:3000/api/accounts';
  console.log('📦 Making GET request to:', url);

  axios.get(url)
    .then(res => {
      console.log('Response:', res.data);
      setAccounts(res.data);
    })
    .catch(err => {
      console.error(' Error fetching destinations:', err);
    });
}, []);


  return (
    <div style={{ height: 500, width: '100%' }}>
      <h2>Accounts</h2>
      <DataGrid
        rows={accounts}
        columns={columns}
        // loading={loading}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

export default Accounts;
