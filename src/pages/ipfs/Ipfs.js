import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { Create, Dashboard } from '../../components';
import './Ipfs.css'

const Ipfs = () => {

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
<div className='content'>
      <Box sx={{ width: '100%',height: '100%' }} >
        <Tabs 
          value={tabIndex}
          onChange={handleTabChange}
          orientation="horizontal"
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': { backgroundColor: "#fa816b" },
            '& .MuiTab-root': { color: "#81AFDD", fontFamily :"Manrope" },
            '& .Mui-selected': { color: "#fa816b", },
          }}
        >
          <Tab label="New " />
          <Tab label="Dashboard" />
        </Tabs>
        <Box sx={{ margin: 2,}}>
          {tabIndex === 0 && (
            <Box>
             <Create/>
            </Box>
          )}
          {tabIndex === 1 && (
            <Box>
              <Dashboard/>
            </Box>
          )}

        </Box>
      </Box>
</div>
  );
      
}

export default Ipfs


