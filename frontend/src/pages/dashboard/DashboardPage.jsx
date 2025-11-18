import React, { useEffect, useState } from "react";
import { generateTasks } from "../../api/companyApi.js";
import { getMyTasks, getRiskSummary } from "../../api/taskApi.js";

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [t, r] = await Promise.all([getMyTasks(), getRiskSummary()]);
      setTasks(t);
      setRisk(r);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleGenerateTasks = async () => {
    try {
      setMsg("");
      await generateTasks();
      setMsg("Tasks generated for last period.");
      await load();
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to generate tasks");
    }
  };

  const pending = tasks.filter((t) => t.status !== "FILED");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <p className="text-sm text-slate-500">
            Track returns, invoices and risk in one place.
          </p>
        </div>
        <button onClick={handleGenerateTasks} className="btn-primary">
          Generate Tasks for Last Month
        </button>
      </div>

      {msg && <p className="text-sm text-slate-600">{msg}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card">
              <p className="text-xs text-slate-500 mb-1">Pending tasks</p>
              <p className="text-2xl font-semibold">{pending.length}</p>
            </div>
            <div className="card">
              <p className="text-xs text-slate-500 mb-1">Total tasks</p>
              <p className="text-2xl font-semibold">{tasks.length}</p>
            </div>
            <div className="card">
              <p className="text-xs text-slate-500 mb-1">Invoices missing HSN</p>
              <p className="text-2xl font-semibold">
                {risk?.missingHSNCount || 0}
              </p>
            </div>
          </div>

          <div className="card mt-4">
            <h3 className="font-semibold mb-2 text-sm">Upcoming tasks</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Rule</th>
                  <th>Period</th>
                  <th>Due date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.slice(0, 5).map((t) => (
                  <tr key={t._id}>
                    <td>{t.rule?.name}</td>
                    <td>{t.periodLabel}</td>
                    <td>{new Date(t.dueDate).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={
                          t.status === "FILED"
                            ? "badge-green"
                            : t.status === "OVERDUE"
                            ? "badge-red"
                            : "badge-yellow"
                        }
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {tasks.length === 0 && (
                  <tr>
                    <td colSpan="4">No tasks yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
