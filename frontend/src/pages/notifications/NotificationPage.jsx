import React, { useEffect, useState } from 'react';
import { getNotifications, markNotificationRead } from '../../api/notificationApi';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  const load = async () => {
    const data = await getNotifications();
    setNotifications(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleRead = async (id) => {
    await markNotificationRead(id);
    await load();
  };

  return (
    <div>
      <h1>Notifications</h1>
      <ul className="notification-list">
        {notifications.map((n) => (
          <li
            key={n._id}
            style={{
              padding: 8,
              borderBottom: '1px solid #e5e7eb',
              background: n.isRead ? '#fff' : '#dbeafe'
            }}
          >
            <strong>{n.title}</strong>
            <p>{n.message}</p>
            <small>{new Date(n.createdAt).toLocaleString()}</small>
            {!n.isRead && (
              <button onClick={() => handleRead(n._id)} style={{ marginLeft: 8 }}>
                Mark as read
              </button>
            )}
          </li>
        ))}
        {notifications.length === 0 && <p>No notifications</p>}
      </ul>
    </div>
  );
};

export default NotificationPage;
