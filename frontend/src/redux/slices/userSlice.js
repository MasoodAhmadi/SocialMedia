import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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

export const signin = createAsyncThunk(
  'user/signin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/signin', data);
      console.log('response', response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (data, { rejectWithValue }) => {
    try {
      await axios.post('api/auth/user/change-password', data);
      return;
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

export const logout = createAction('logout');

const isPendingAction = (action) => {
  return action.type.startsWith('user/') && action.type.endsWith('/pending');
};
const isRejectedAction = (action) => {
  return action.type.startsWith('user/') && action.type.endsWith('/rejected');
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    errors: false,
    data: null,
    user: null,
    users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // LOAD
      .addCase(loadUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loading = false;
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
      // LOGIN
      .addCase(signin.fulfilled, (state, action) => {
        const token = action.payload.token;
        window.localStorage.setItem('access-token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        state.data = action.payload;
        state.loading = false;
      })

      // GET USER INFO / RELOGIN
      // .addCase(getUserInfo.fulfilled, (state, action) => {
      //   const token = action.payload.token;
      //   window.localStorage.setItem('access-token', token);
      //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      //   state.data = action.payload;
      //   state.loading = false;
      // })

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

      // // UPDATE
      // .addCase(updateUser.fulfilled, (state, action) => {
      //   state.data = action.payload.user;
      //   state.loading = false;
      // })

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

// export const getUserInfo = createAsyncThunk(
//   'user/getUserInfo',
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('access-token');
//       if (token) {
//         const response = await axios.get('/users', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//       }
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const updateUser = createAsyncThunk(
//   'user/updateUser',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await axios.patch(`/api/users/${data.id}`, data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
