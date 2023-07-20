// import { Select } from "antd";
import React, { Children } from "react";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { styled } from '@mui/system';
// const useStyles = makeStyles({
//   fullWidth: {
//     width: '100%',
//     border: '1px solid gray',
//     borderRadius: '4px',
//     padding: '8px',
//   },
//   datePicker: {
//     '& .MuiOutlinedInput-notchedOutline': {
//       borderColor: 'red', // Default border color
//     },
//   },
//   error: {
//     '& .MuiOutlinedInput-notchedOutline': {
//       borderColor: 'red', // Error border color
//     },
//   },
// });



const DatePickers = styled(DatePicker)(({ theme, error }) => ({
  
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: error ? 'red' :'gray',
    },
    '&:hover fieldset': {
      borderColor: error ? 'red' :  'gray',
    },
    '&.Mui-focused fieldset': {
      borderColor: error ? 'red' :  'gray',
    },
  },
  
}));

const Selects = styled(Select)(({ theme, error }) => ({
  
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: error ? 'red' :'gray',
    },
    '&:hover fieldset': {
      borderColor: error ? 'red' :  'gray',
    },
    '&.Mui-focused fieldset': {
      borderColor: error ? 'red' :  'gray',
    },
  },
  
}));

export default function TextInput(props) {
  let { type, label, textArea, isSelect, onChange, value, options, error } = props;
  //const classes = useStyles();
  const inputClasses =
    'w-full px-4 py-2 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-blue-500';

  const errorClasses =
    'border-red-500 focus:ring-red-500';


  const render = () => {
    switch (type) {
      case "textarea":
        return (<textarea
          {...props}
          autoComplete="none"
          label={label}
          className={`text_area ${props.className} ${error ? errorClasses : ''}`}
        ></textarea>)

      case "select":
        return (<FormControl fullWidth className="h-[90px] flex justify-center">
          <InputLabel id="demo-simple-select-label" className="mt-[15px]"> {label}</InputLabel>
          <Selects
            error={error}
            labelId="demo-simple-select-label"
            // id="demo-simple-select"
            label={label}
            value={value}
            className={`${error ? errorClasses : ''}`}
            onChange={onChange}
          >
            {options?.map((option) => (
              <MenuItem value={option.value}>{option.label}</MenuItem>
            ))}
          </Selects>
        </FormControl>)

      case "date":
        return (<LocalizationProvider dateAdapter={AdapterDateFns}>
          
            <DatePickers
              error={error}
              label={label}
              value={value}
              onChange={onChange}
              className={`h-[70px] w-[100%]  ${error ? errorClasses : ''}`}
              renderInput={(params) => <TextField className={`  ${error ? errorClasses : ''}`}   {...params}
              
              />}
            />
          
        </LocalizationProvider>)

      default:
        return (<TextField
          {...props}
           autoComplete="none"
          fullWidth
          sx={{ m: 1, maxWidth: "100%" }}
          className={`flex justify-center ${error ? errorClasses : ''}`}
          required
        />);
    }

  }

  return (
    <div className="input_container">
      {render()}
    </div>
  );
}
