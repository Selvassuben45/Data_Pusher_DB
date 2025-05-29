import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 220 },
  { field: 'url', headerName: 'url', width: 250 },
  { field: 'httpMethod', headerName: 'httpMethod', width: 150 },

  { field: 'createdAt', headerName: 'Created At', width: 180 }
];

const DestinationTable = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);



useEffect(() => {
  const url = 'http://localhost:3000/api/destinations';
  console.log('📦 Making GET request to:', url);

  axios.get(url)
    .then(res => {
      console.log('✅ Response:', res.data);
      setDestinations(res.data);
    })
    .catch(err => {
      console.error('❌ Error fetching destinations:', err);
    });
}, []);
  return (
    <div style={{ height: 500, width: '100%' }}>
      <h2>Destinations</h2>
      <DataGrid
        rows={destinations}
        columns={columns}
        // loading={loading}
        // pageSize={5}
        rowsPerPageOptions={[5, 10]}
      />
    </div>
  );
};

export default DestinationTable;
