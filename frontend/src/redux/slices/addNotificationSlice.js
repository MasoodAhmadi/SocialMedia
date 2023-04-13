import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const isRejectedAction = (action) => {
  return action.type.endsWith('/rejected');
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: [],
  },
  reducers: {
    addNotification: (state, action) => {
      const newNotification = { ...action.payload, notificationId: uuidv4() };
      let newItems = state.items.slice();
      newItems = newItems.filter(
        (i) => i.notificationId !== action.payload.notificationId
      );
      newItems = newItems.filter(
        (i) => i.identifier !== action.payload.identifier
      );
      newItems = newItems.concat(newNotification);
      state.items = newItems;
    },
    removeNotification: (state, action) => {
      let newItems = state.items.slice();
      newItems = newItems.filter((i) => i.notificationId !== action.payload);
      newItems = newItems.filter((i) => i.identifier !== action.payload);
      state.items = newItems;
    },
  },
  extraReducers: (builder) => {
    builder
      //Error /failure
      .addMatcher(isRejectedAction, (state, action) => {
        const actionLabel = action.type.splite('/')?.[0] || null;
        const message =
          action.payload.message ||
          action.payload.error.message ||
          action.payload;

        if (
          message &&
          actionLabel !== 'user' &&
          !state.items.find((i) => i.title === message)
        ) {
          const content = {
            identifier: actionLabel || null,
            content: message || 'general.error',
            notificationId: uuidv4(),
            localize: true,
          };
          let newItems = state.items.slice();
          newItems = newItems.filter(
            (i) => i.notificationId !== content?.notificationId
          );
          newItems = newItems.filter(
            (i) => i.identifier !== content?.identifier
          );
          newItems = newItems.concat(content);

          state.items = newItems;
        }
      });
  },
});

export default notificationSlice.reducer;
export const { addNotification, removeNotification } =
  notificationSlice.actions;
