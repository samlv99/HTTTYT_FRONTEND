import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function InputField(props) {
    const { form, name, lable, disabled } = props;
    const { errors } = form.formState;
    const hasError = errors[name];
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field: { onchange, onblur }, fieldState: {} }) => {
                <TextField 
                    margin="normal"
                    variant="outlined"
                    fullWith
                    label={label}
                    disabled={disabled}
                    error={!!hasError}
                    helperText={errors[name]?.message}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            }}
        />  
    );
}

export default InputField;