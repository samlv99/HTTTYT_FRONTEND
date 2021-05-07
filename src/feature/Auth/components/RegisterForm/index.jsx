import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';

RegisterForm.propTypes = {
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

function RegisterForm(props) {
    const classes = useStyles();

    const schema = yup.object().shape({
        name: yup
            .string()
            .required('Vui lòng nhập họ và tên.')
            .test('Cần ít nhất 2 từ.', 'Vui lòng nhập ít nhất 2 từ.', (value) => {
                return value.split(' ').length >= 2;
            }),
        email: yup.string().required('Vui lòng nhập email.').email('Vui lòng nhập đúng email.'),
        password: yup.string().required('Vui lòng nhập mật khẩu.').min(6, 'Vui lòng nhập ít nhất 6 ký tự.'),
        retypePassword: yup
            .string()
            .required('Vui lòng nhập lại mật khẩu.')
            .oneOf([yup.ref('password')], 'Mật khẩu không đúng.'),
    });

    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (value) => {
        const { onSubmit } = props;
        if (onSubmit) {
            await onSubmit(value);
        }
    };

    const { isSubmitting } = form.formState;
    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.process} />}
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>

            <Typography className={classes.title} component="h3" variant="h5">
                Đăng ký tài khoản
            </Typography>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="name" label="Họ và tên" form={form} />
                <InputField name="email" label="Email" form={form} />
                <PasswordField name="password" label="Mật khẩu" form={form} />
                <PasswordField name="retypePassword" label="Nhập lại mật khẩu" form={form} />

                <Button
                className={classes.submit}
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                size="large"
                >
                Tạo tào khoản
                </Button>
            </form>
        </div>
    )
}