import axios from 'axios';
import { api } from '../../config';
import jwt_decode from 'jwt-decode';
import { getUser, getUsers, saveUser, removeUser } from '../../services';
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';

export const loadUser = createAsyncThunk(
  'user/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUser();
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      return rejectWithValue(error.response.data);
    }
  }
);

export const loadUsers = createAsyncThunk(
  'user/loadUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUsers();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addUser = createAsyncThunk(
  'user/addUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await saveUser(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editUser = createAsyncThunk(
  'video/editUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await saveUser(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'video/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await removeUser(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signInUser = createAsyncThunk(
  'user/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.userSignIn, data);
      localStorage.setItem('token', response.data.token);
      return jwt_decode(response.data.token);
    } catch (error) {
      localStorage.removeItem('token');
      return rejectWithValue(error.response.data);
    }
  }
);

const isPendingAction = (action) => {
  return action.type.startsWith('user/') && action.type.endsWith('/pending');
};

const isRejectedAction = (action) => {
  return action.type.startsWith('user/') && action.type.endsWith('/rejected');
};
export const logout = createAction('logout');

const userSlice = createSlice({
  name: 'user',
  initialState: {
    errors: false,
    loading: false,
    user: null,
    users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOAD
      .addCase(loadUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loadinloadUsersg = false;
      })
      .addCase(loadUsers.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.loading = false;
      })

      // ADD / ACCESS
      .addCase(signInUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loading = false;
      })
      .addCase(addUser.fulfilled, (state, { payload }) => {
        state.users = [...state.users, payload];
        state.loading = false;
      })

      .addCase(logout, (state) => {
        window.localStorage.removeItem('token');
        state.loading = false;
        state.errors = false;
        state.user = null;
      })
      // EDIT
      .addCase(editUser.fulfilled, (state, { payload }) => {
        state.users = state.users.map((user) => {
          if (user.id === payload.id) user = payload;
          return user;
        });
        state.loading = false;
      })
      // DELETE
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.users = state.users.filter((user) => user.id !== payload.id);
        state.loading = false;
      })
      // LOADING / PENDING
      .addMatcher(isPendingAction, (state) => {
        state.loading = true;
        state.errors = false;
      })
      // ERROR /FAILURE / REJECTED
      .addMatcher(isRejectedAction, (state, { payload }) => {
        state.loading = false;
        state.errors = payload;
      });
  },
});

export default userSlice.reducer;
