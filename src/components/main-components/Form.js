import { useFormik } from "formik";
import * as yup from "yup";
import moment from 'moment';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from "react";

const validationSchema = yup.object({
  task: yup.string("Ingresa una nueva tarea").required("Es necesario ingresar una tarea"),
});

const Form = ({ task, setTask, list, setList, contador, setContador }) => {
  const formik = useFormik({
    initialValues: {
      task: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm} ) => {
      setTask(values.task);
      resetForm({ values: ''});
    },
  });

  useEffect( () => {
    if(task !== ''){
      setContador(contador + 1)
    list.push( {task: task, id: contador, date: moment().toArray()})
    setList(list);
    }
  }, [task]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        columnSpacing={2}
        direction={{ xs: "column", md: "row"}}
        justifyContent="center"
        alignItems="center"
        mt={{ xs: 1, sm: 2}}
        mb={{ xs: 1, sm: 2}}
      >
        <Grid item sx={{ width:1/2 }} mb={{ xs: 4, sm: 3, md: 0}}>
          <TextField
            color="primary"
            id="task"
            name="task"
            label="Nueva tarea"
            placeholder="Agrega una nueva tarea"
            fullWidth
            value={formik.values.task}
            onChange={formik.handleChange}
            error={formik.touched.task && Boolean(formik.errors.task)}
            helperText={formik.touched.task && formik.errors.task}
          />
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" size="large" type="submit" endIcon={<AddIcon />}>
            Agregar tarea
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
