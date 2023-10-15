import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    '& .MuiFormControl-root': {
      margin: theme.spacing(1),
    },
    '& .MuiFormControlLabel-root': {
      margin: theme.spacing('auto', 7),
    },
  },
  paper: {
    padding: theme.spacing(2),
    margin: '6rem 20rem',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  slider: {
    width: '100%',
    margin: '2px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));
