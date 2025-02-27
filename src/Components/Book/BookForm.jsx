import {
  Button,
  Card,
  FormControl,
  Input,
  InputLabel,
  styled,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function BookForm(props) {
  var mimeSet = new Set(["image/png", "image/jpeg", "image/jpg"]);
  const [currentYear, SetCurrentYear] = React.useState("");
  function handleUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    formik.setFieldValue("image", file);
  }
  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Required";
    }
    if (!values.author) {
      errors.author = "Required";
    }
    if (!values.publisher) {
      errors.publisher = "Required";
    }
    if (!values.year) {
      errors.year = "Required";
    } else if (!props.validateOnlyNumbers(values.year)) {
      errors.year = "Invalid year";
    } else if (values.year.length !== 4) {
      if (currentYear !== "") {
        if (values.year !== currentYear) {
          errors.year = "Please enter a valid year, eg: 2012";
        }
      } else {
        errors.year = "Please enter a valid year, eg: 2012";
      }
    }
    if (values.image) {
      let imageType = values.image.type;
      if (!mimeSet.has(imageType)) {
        errors.image = "Please select a PNG, JPG and JPEG file";
      }
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      publisher: "",
      year: "",
      image: "",
    },
    validate: validate,
    onSubmit: (values) => {
      console.log(values);
      props.handleSubmit(values);
    },
  });
  React.useEffect(() => {
    if (props.book) {
      formik.setFieldValue("title", props.book.title);
      formik.setFieldValue("author", props.book.author);
      formik.setFieldValue("publisher", props.book.publisher);
      formik.setFieldValue("year", props.book.year);
      formik.setFieldValue("image", props.book.image);
      SetCurrentYear(props.book.year);
    }
  }, [props.book]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Card
        sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2, boxShadow: 5 }}
        className="input-form"
        maxWidth="sm"
      >
        <Typography variant="h3" textTransform='uppercase'>{props.title}</Typography>
        {/* <h1>Add Member</h1> */}
        <FormControl>
          <InputLabel htmlFor="my-input">Title</InputLabel>
          <Input
            error={formik.errors.title}
            name="title"
            type="text"
            aria-describedby="my-helper-text"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.errors.title ? (
            <div className="error">{formik.errors.title}</div>
          ) : null}
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Author</InputLabel>
          <Input
            error={formik.errors.author}
            name="author"
            type="text"
            aria-describedby="my-helper-text"
            value={formik.values.author}
            onChange={formik.handleChange}
          />
          {formik.errors.author ? (
            <div className="error">{formik.errors.author}</div>
          ) : null}
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Publisher</InputLabel>
          <Input
            error={formik.errors.publisher}
            name="publisher"
            type="text"
            aria-describedby="my-helper-text"
            value={formik.values.publisher}
            onChange={formik.handleChange}
          />
          {formik.errors.publisher ? (
            <div className="error">{formik.errors.publisher}</div>
          ) : null}
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Year</InputLabel>
          <Input
            error={formik.errors.year}
            name="year"
            type="text"
            aria-describedby="my-helper-text"
            value={formik.values.year}
            onChange={formik.handleChange}
          />
          {formik.errors.year ? (
            <div className="error">{formik.errors.year}</div>
          ) : null}
        </FormControl>
        <FormControl>
          {/* <Input
            error={formik.errors.image}
            className="form-input"
            name="image"
            type="file"
            aria-describedby="my-helper-text"
            onChange={handleUpload}
          /> */}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={handleUpload}
              multiple
            />
          </Button>
          {formik.errors.image ? (
            <div className="error">{formik.errors.image}</div>
          ) : null}
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          {props.title}
        </Button>
      </Card>
    </form>
  );
}
