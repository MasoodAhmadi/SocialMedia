import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  'auth/signin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('api/auth/signin', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  'users',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('access-token');
      if (token) {
        const response = await axios.get('api/users', {
          headers: { Auth: `Bearer ${token}` },
        });
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/users/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  'users/changePassword',
  async (data, { rejectWithValue }) => {
    try {
      await axios.post('api/auth/user/change-password', data);
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAction('logout');

const isPendingAction = (action) => {
  return action.type.startsWith('user/') && action.type.endsWith('/pending');
};
const isRejectedAction = (action) => {
  return action.type.startsWith('user/') && action.type.endsWith('/rejected');
};

const userSlice = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    errors: false,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.fulfilled, (state, action) => {
        const token = action?.payload?.token;
        window.localStorage.setItem('access-token', token);
        axios.defaults.headers.common['Auth'] = `Bearer ${token}`;
        state.data = action.payload;
        state.loading = false;
      })

      // GET USER INFO / RELOGIN
      .addCase(getUserInfo.fulfilled, (state, action) => {
        const token = action?.payload?.token;
        window.localStorage.setItem('access-token', token);
        axios.defaults.headers.common['Auth'] = `Bearer ${token}`;
        state.data = action.payload;
        state.loading = false;
      })

      // CHANGE PASSWORD
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
      })

      // LOGOUT
      .addCase(logout, (state) => {
        window.localStorage.removeItem('access-token');
        axios.defaults.headers.common['Auth'] = null;
        state.loading = false;
        state.errors = false;
        state.data = null;
      })

      // UPDATE
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loading = false;
      })

      // LOADING / PENDING
      .addMatcher(isPendingAction, (state) => {
        state.loading = true;
        state.errors = false;
      })

      // ERROR /FAILURE / REJECTED
      .addMatcher(isRejectedAction, (state, action) => {
        window.localStorage.removeItem('access-token');
        axios.defaults.headers.common['Auth'] = null;

        state.loading = false;
        state.data = null;
        state.errors = action.payload;
      });
  },
});

export default userSlice.reducer;
