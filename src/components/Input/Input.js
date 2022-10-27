import React from 'react'
import { TextareaAutosize } from '@mui/material';
import { makeStyles } from '@material-ui/styles';

import './Input.css'

const handleSubmit = async (e) => {
  e.preventDefault();

};

const useStyles = makeStyles({
    field: {
      backgroundColor: "#dae7f5",
      fontFamily: "Manrope",
      color:"black",
    }});


    const Input = () => {
    const classes = useStyles()
  return (
        <div className='input'>
             <TextareaAutosize className={classes.field}
                aria-label="minimum height"
                minRows={10}
                placeholder="Give your input"
            />

          <div className="input-button">
              <button onClick={handleSubmit}>Create paste</button>
          </div>

        </div>
  )
}

export default Input