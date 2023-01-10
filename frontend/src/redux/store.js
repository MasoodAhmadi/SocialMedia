import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    // modal: modalSlice,
    // confirm: confirmSlice,
    // notifications: notificationSlice,
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
