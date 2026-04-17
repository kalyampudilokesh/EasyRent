// frontend/src/modules/admin/AllUsers.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/admin/users');
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleApproveOwner = async (userId) => {
        if (window.confirm('Are you sure you want to approve this owner?')) {
            try {
                const response = await axios.put(`/api/admin/users/${userId}/approve`);
                setUsers((prevUsers) =>
                    prevUsers.map((u) =>
                        u._id === userId ? { ...u, isApproved: true } : u
                    )
                );
                alert(response.data.message);
            } catch (err) {
                alert(`Failed to approve owner: ${err.response?.data?.message || err.message}`);
            }
        }
    };

    const handleDeleteUser = async (userId, userName) => {
        if (window.confirm(`Are you sure you want to delete user ${userName}?`)) {
            try {
                await axios.delete(`/api/admin/users/${userId}`);
                setUsers((prevUsers) => prevUsers.filter((u) => u._id !== userId));
                alert('User deleted successfully!');
            } catch (err) {
                alert(`Failed to delete user: ${err.response?.data?.message || err.message}`);
            }
        }
    };

    if (loading) return <div className="loading-screen">Loading users...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="admin-users-list">
            <h1>Manage All Users</h1>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Approved</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u._id}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.type}</td>
                                <td>{u.isApproved ? 'Yes' : 'No'}</td>
                                <td>
                                    {u.type === 'Owner' && !u.isApproved && (
                                        <button className="btn btn-small" onClick={() => handleApproveOwner(u._id)}>
                                            Approve
                                        </button>
                                    )}
                                    {u.type !== 'Admin' && (
                                        <button className="btn btn-small btn-danger" onClick={() => handleDeleteUser(u._id, u.name)} style={{ marginLeft: '10px' }}>
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AllUsers;