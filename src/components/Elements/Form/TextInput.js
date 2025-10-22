import React from "react";
import TextField from "@material-ui/core/TextField";
import { useField } from "formik";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      variant="outlined"
      label={label}
      {...field}
      {...props}
      {...(meta.touched && meta.error ? { error: true } : {})}
      helperText={meta.touched && meta.error ? meta.error : ""}
      inputProps={{
        ...props.inputProps,
        autoComplete: "new-password",
        form: {
          autoComplete: "off",
          ...props?.inputProps?.form,
        },
      }}
    />
  );
};

export default TextInput;
