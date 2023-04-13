import React, { useEffect } from 'react';
import { useTheme } from 'styled-components';
import { CloseButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { removeNotification } from '../../redux/slices/addNotificationSlice';
import { ClipboardStyle } from '../../styles/snackbar.style';

export default function NotificationManager() {
  const dispatch = useDispatch();
  const notificationState = useSelector((state) => state.notifications);

  return (
    <div
      className='d-flex flex-column justify-content-end align-items-end'
      style={{
        position: 'fixed',
        bottom: '0.5rem',
        right: '0.5rem',
        zIndex: '1100',
        minWidth: '20rem',
        maxWidth: 'calc(100vw- 2rem)',
        overflowY: 'auto',
        maxHeight: '100vh',
        gap: '0.25rem',
      }}
    >
      {notificationState.items.map((notification) => (
        <Notification
          key={notification.notificationId}
          remove={() =>
            dispatch(removeNotification(notification.notificationId))
          }
          data={notification}
        />
      ))}
    </div>
  );
}

function Notification({ data, remove }) {
  const { primary } = useTheme();
  let timer;
  useEffect(() => {
    if (data?.timeout) {
      timer = setTimeout(() => {
        clearTimeout(timer);
        remove();
      }, data.timeout * 1000);
    }
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <div
      className='bg-dark text-light px-3 py-2'
      style={{
        border: 'solid',
        borderColor: primary,
      }}
    >
      <div className='position-relative'>
        <div className='me-5 d-flex'>
          {data.icon && (
            <div className='me-3' style={{ color: primary }}>
              <ClipboardStyle>{data.icon}</ClipboardStyle>
            </div>
          )}
          <div>{data.content}</div>
        </div>
        <CloseButton
          variant='white'
          onClick={remove}
          style={{
            right: '0',
            top: '50%',
            position: 'absolute',
            transform: 'translateY(-50%)',
          }}
        />
      </div>
    </div>
  );
}
