import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import authApi from '../../api/authApi';
import commons from '../../constants/common';

export const register = createAsyncThunk('/auth/register', async (payload) => {
  const data = await authApi.register(payload);

  Cookies.set('token', data?.data?.token?.token);
  Cookies.set('refreshToken', data?.data?.token?.refreshToken);

  localStorage.setItem(commons.MEMBER, JSON.stringify(data?.data?.member));

  return { member: data?.data?.member };
});

export const login = createAsyncThunk('/auth/login', async (payload) => {
  const data = await authApi.login(payload);

  Cookies.set(commons.TOKEN, data?.data?.token?.token);
  Cookies.set(commons.REFRESH_TOKEN, data?.data?.token?.refreshToken);

  localStorage.setItem(commons.MEMBER, JSON.stringify(data?.data?.member));

  return { member: data?.data?.member };
});

const authSlice = createSlice({
  name: 'member',
  initialState: {
    current: JSON.parse(localStorage.getItem(commons.MEMBER)) || {},
    setting: {},
  },
  reducers: {
    logout(state) {
      Cookies.remove(commons.TOKEN);
      Cookies.remove(commons.REFRESH_TOKEN);

      localStorage.removeItem(commons.MEMBER);

      state.current = {};
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      //  action.payload = data return login createAsyncThunk
      state.current = action.payload;
    },

    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { reducer, actions } = authSlice;
export const { logout } = actions;

export default reducer;
