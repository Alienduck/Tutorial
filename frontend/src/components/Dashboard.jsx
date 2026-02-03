import { useState, useEffect } from 'react';
import { useTheme } from '../App';
import '../Dashboard.css';
import api from '../../services/Axios';

const Dashboard = ({ onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/user/all');
      setUsers(data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data || 'Erreur lors de la récupération des utilisateurs';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/user/register', formData);
      await fetchUsers();
      setShowModal(false);
      setFormData({ email: '', password: '' });
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data || 'Erreur lors de la création';
      setError(errorMessage);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.put(`/user/${editingUser._id}`, formData);
      await fetchUsers();
      setShowModal(false);
      setEditingUser(null);
      setFormData({ email: '', password: '' });
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data || 'Erreur lors de la mise à jour';
      setError(errorMessage);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await api.delete(`/user/${userId}`);
      await fetchUsers();
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data || 'Erreur lors de la suppression';
      setError(errorMessage);
    }
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setFormData({ email: '', password: '' });
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({ email: user.email, password: '' });
    setShowModal(true);
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <div className="animated-bg">
        <div className="bg-gradient bg-gradient-1"></div>
        <div className="bg-gradient bg-gradient-2"></div>
        <div className="bg-gradient bg-gradient-3"></div>
      </div>

      {/* Sidebar */}
      <aside className="sidebar glass-card">
        <div className="sidebar-header">
          <div className="logo-icon">
            <svg viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="url(#gradient)" strokeWidth="2"/>
              <path d="M15 20L18 23L25 16" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                  <stop offset="0%" stopColor="#8b5cf6"/>
                  <stop offset="100%" stopColor="#ec4899"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="logo-text">UserFlow</span>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active">
            <span className="nav-icon">👥</span>
            <span>Users</span>
          </button>
          <button className="nav-item">
            <span className="nav-icon">📊</span>
            <span>Analytics</span>
          </button>
          <button className="nav-item">
            <span className="nav-icon">⚙️</span>
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <button className="btn btn-ghost" onClick={onLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="dashboard-header">
          <div>
            <h1>User Management</h1>
            <p className="subtitle">Manage all users in your system</p>
          </div>
          <button className="btn btn-primary" onClick={openCreateModal}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 5v10m-5-5h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add User
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-bar glass-card">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="2"/>
            <path d="M13 13l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search users by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="glass-card stat-card">
            <div className="stat-icon">👥</div>
            <div>
              <div className="stat-label">Total Users</div>
              <div className="stat-value">{users.length}</div>
            </div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-icon">✅</div>
            <div>
              <div className="stat-label">Active</div>
              <div className="stat-value">{users.length}</div>
            </div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-icon">📈</div>
            <div>
              <div className="stat-label">Growth</div>
              <div className="stat-value">+12%</div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="glass-card users-table">
          <div className="table-header">
            <h2>All Users</h2>
          </div>
          
          {loading ? (
            <div className="loading">Loading users...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No users found</h3>
              <p>Try adjusting your search or create a new user</p>
            </div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={user._id} style={{animationDelay: `${index * 0.05}s`}}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">
                            {user.email.charAt(0).toUpperCase()}
                          </div>
                          <span>{user.email}</span>
                        </div>
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-icon"
                            onClick={() => openEditModal(user)}
                            title="Edit user"
                          >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                              <path d="M12.5 2.5l3 3L6 15H3v-3L12.5 2.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button 
                            className="btn-icon btn-danger"
                            onClick={() => handleDeleteUser(user._id)}
                            title="Delete user"
                          >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                              <path d="M3 5h12M7 5V3h4v2m-6 0v10h8V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* User Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12m0-12L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="modal-header">
              <h2>{editingUser ? 'Edit User' : 'Create New User'}</h2>
              <p>{editingUser ? 'Update user information' : 'Add a new user to your system'}</p>
            </div>

            <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser}>
              {error && (
                <div className="error-message">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M10 6v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  {error}
                </div>
              )}

              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input
                  type="email"
                  className="input"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">
                  Password {editingUser && <span>(leave empty to keep current)</span>}
                </label>
                <input
                  type="password"
                  className="input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required={!editingUser}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                {editingUser ? 'Update User' : 'Create User'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;