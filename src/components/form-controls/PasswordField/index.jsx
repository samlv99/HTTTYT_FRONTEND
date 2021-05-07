import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import FormHelperText from '@material-ui/core/FormHelperText';

PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function PasswordField(props) {
    const { form, name, label, disabled } = props;
    const { errors } = form.formState;
    const hasError = errors[name];

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword((x) => !x);
    };

    return (
        <>
            <FormControl
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!hasError}
            >
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <Controller
                    control={form.control}
                    name={name}
                    render={({
                        field: { onChange, onBlur },
                        fieldState: {},
                    }) => (
                        <OutlinedInput
                            id={name}
                            label={label}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            disabled={disabled}
                            onChange={onChange}
                            onBlur={onBlur}
                        />
                    )}
                />
                <FormHelperText>{errors[name]?.message}</FormHelperText>
            </FormControl>
        </>
    );
}

export default PasswordField;
