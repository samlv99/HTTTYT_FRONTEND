import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../../Auth/authSlice';
import RegisterForm from '../RegisterForm';

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const payload = { email: values.email, password: values.password };
      const action = register(payload);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      // close Dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
      enqueueSnackbar('Register successfully.', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
