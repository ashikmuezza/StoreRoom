import { Box, Tab, Tabs} from '@mui/material';
import { useState,React } from 'react';
import {Input,Upload} from '../../components';
import './Create.css'


const Create = () => {

    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (event, newTabIndex) => {
      setTabIndex(newTabIndex);
    };

  return (
    <div className='create' >
            <Box sx={{ display:'flex'}}>
                <Tabs
                      value={tabIndex}
                      onChange={handleTabChange}
                      orientation="vertical"
                      variant="fullWidth"
                      sx={{
                        '& .MuiTabs-indicator': { backgroundColor: "#fa816b" },
                        '& .MuiTab-root': { color: "#81AFDD", fontFamily :"Manrope" },
                        '& .Mui-selected': { color: "#fa816b  " },
                      }}
                  >
                    <Tab label="Upload" />
                    <Tab label="Input" />
                </Tabs>

                <Box sx={{ margin: 2 }}>
                    {tabIndex === 0 && (
                      <Box>           
                        <Upload/>
                      </Box>
                    )}
                    {tabIndex === 1 && (
                      <Box>
                        <Input/>
                      </Box>
                    )}

                </Box>

            </Box>
    </div>
  )
}

export default Create