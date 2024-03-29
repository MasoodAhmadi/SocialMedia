import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import addNotificationSlice from './slices/addNotificationSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    // modal: modalSlice,
    // confirm: confirmSlice,
    notifications: addNotificationSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'notifications/addNotification',
          'confirm/showConfirm',
          'modal/openModal',
        ],
        ignoredPaths: [
          'notifications.items',
          'confirm.onConfirm',
          'modal.content',
        ],
      },
      immutableCheck: {
        ignoredPaths: ['notifications.items', 'modal.content'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
