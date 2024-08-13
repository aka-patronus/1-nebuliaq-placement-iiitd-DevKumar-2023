import React, { useState, useMemo } from 'react';
import { data } from '../data';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Box
} from '@mui/material';

const Dashboard = () => {
    const [filter, setFilter] = useState({ service: '', side: '' });
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending', side: '' });
  
  
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Service Dashboard
        </Typography>
        
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ cursor: 'pointer' }}>Service</TableCell>
                <TableCell>Side</TableCell>
                <TableCell sx={{ cursor: 'pointer' }}>Requests</TableCell>
                <TableCell sx={{ cursor: 'pointer' }}>Rate</TableCell>
                <TableCell sx={{ cursor: 'pointer' }}>P75</TableCell>
                <TableCell sx={{ cursor: 'pointer' }}>P90</TableCell>
                <TableCell sx={{ cursor: 'pointer' }}>P99</TableCell>
                <TableCell sx={{ cursor: 'pointer' }}>Error</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <React.Fragment key={row.service}>
                  {['client', 'server'].map((side) => (
                    row[side] && (
                      <TableRow key={`${row.service}-${side}`} hover>
                        {side === 'client' && (
                          <TableCell rowSpan={2} sx={{ fontWeight: 'bold' }}>{row.service}</TableCell>
                        )}
                        <TableCell>{side}</TableCell>
                        <TableCell>{row[side].requests}</TableCell>
                        <TableCell>{row[side].rate}</TableCell>
                        <TableCell>{row[side].p75}</TableCell>
                        <TableCell>{row[side].p90}</TableCell>
                        <TableCell>{row[side].p99}</TableCell>
                        <TableCell>{row[side].error}</TableCell>
                      </TableRow>
                    )
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  
  export default Dashboard;
  