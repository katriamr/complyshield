import React, { useEffect, useState } from 'react';
import { getMyTasks, markTaskFiled } from '../../api/taskApi';

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [refNumber, setRefNumber] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  const load = async () => {
    const data = await getMyTasks();
    setTasks(data);
  };

  useEffect(() => {
    load();
  }, []);

  const openMarkFiled = (task) => {
    setSelectedTask(task);
    setRefNumber('');
  };

  const submitMarkFiled = async () => {
    if (!selectedTask) return;
    await markTaskFiled(selectedTask._id, { filedReferenceNumber: refNumber });
    setSelectedTask(null);
    await load();
  };

  return (
    <div>
      <h1>Compliance Tasks</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Rule</th>
            <th>Period</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Filed Ref</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t._id}>
              <td>{t.rule?.name}</td>
              <td>{t.periodLabel}</td>
              <td>{new Date(t.dueDate).toLocaleDateString()}</td>
              <td>{t.status}</td>
              <td>{t.filedReferenceNumber || '-'}</td>
              <td>
                {t.status !== 'FILED' && (
                  <button onClick={() => openMarkFiled(t)}>Mark Filed</button>
                )}
              </td>
            </tr>
          ))}
          {tasks.length === 0 && (
            <tr>
              <td colSpan="6">No tasks</td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedTask && (
        <div className="modal">
          <div className="modal-body">
            <h3>Mark as Filed - {selectedTask.rule?.name} ({selectedTask.periodLabel})</h3>
            <input
              placeholder="Filed reference number (optional)"
              value={refNumber}
              onChange={(e) => setRefNumber(e.target.value)}
            />
            <div style={{ marginTop: 12 }}>
              <button onClick={submitMarkFiled}>Save</button>
              <button onClick={() => setSelectedTask(null)} style={{ marginLeft: 8 }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskListPage;
