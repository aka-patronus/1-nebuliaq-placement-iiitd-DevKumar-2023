import React, { useState, useMemo } from 'react';
import { data } from '../data';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Box
} from '@mui/material';

const Dashboard = () => {
    const [filter, setFilter] = useState({ service: '', side: '' });
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending', side: '' });
  
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSortChange = (e) => {
        const { value } = e.target;
        let direction = 'ascending';
        if (sortConfig.key === value && sortConfig.direction === 'ascending') {
          direction = 'descending';
        }
        setSortConfig({ key: value, direction, side: filter.side });
      };
    
      const sortedData = useMemo(() => {
        const side = sortConfig.side || filter.side;
        return [...data].sort((a, b) => {
          let aValue, bValue;
          if (sortConfig.key === 'service') {
            aValue = a.service;
            bValue = b.service;
          } else if (side && sortConfig.key) {
            aValue = a[side]?.[sortConfig.key];
            bValue = b[side]?.[sortConfig.key];
          }
          
          if (aValue !== undefined && bValue !== undefined) {
            if (sortConfig.direction === 'ascending') {
              return aValue > bValue ? 1 : -1;
            } else {
              return aValue < bValue ? 1 : -1;
            }
          }
          return 0;
        });
      }, [data, sortConfig, filter.side]);
    
      const filteredData = sortedData.filter((item) => {
        return (
          (!filter.service || item.service.toLowerCase().includes(filter.service.toLowerCase())) &&
          (!filter.side || item[filter.side])
        );
      });
  
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Service Dashboard
        </Typography>

        <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
          <TextField
            label="Filter by Service"
            variant="outlined"
            name="service"
            value={filter.service}
            onChange={handleFilterChange}
            fullWidth
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Filter by Side</InputLabel>    
            <Select
              label="Filter by Side"
              name="side"
              value={filter.side}
              onChange={handleFilterChange}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="client">Client</MenuItem>
              <MenuItem value="server">Server</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Sort by</InputLabel>
            <Select
              label="Sort by"
              name="sort"
              value={sortConfig.key}
              onChange={handleSortChange}
            >
              <MenuItem value="service">Service</MenuItem>
              <MenuItem value="requests">Requests</MenuItem>
              <MenuItem value="rate">Rate</MenuItem>
              <MenuItem value="p75">P75</MenuItem>
              <MenuItem value="p90">P90</MenuItem>
              <MenuItem value="p99">P99</MenuItem>
              <MenuItem value="error">Error</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
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
  