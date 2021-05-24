import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    position: 'relative',
  },

  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },

  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: 'center',
  },

  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },
  process: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

function LoginForm(props) {
  const classes = useStyles();

  const schema = yup.object().shape({
    email: yup.string().required('Vui lòng nhập email.').email('Vui lòng nhập đúng email.'),
    password: yup.string().required('Vui lòng nhập mật khẩu.').min(6, 'Vui lòng nhập ít nhất 6 ký tự.'),
  });

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    // form.reset();
  };

  const { isSubmitting } = form.formState;
  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.process} />}

      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography className={classes.title} component="h3" variant="h5">
        Đăng nhập
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Mật khẩu" form={form} />

        <Button
          className={classes.submit}
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
          size="large"
        >
          Đăng nhập
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
