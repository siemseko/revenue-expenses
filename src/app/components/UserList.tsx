"use client"
import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  username: string;
  password: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/auth/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data.data); // Adjust this line if your API response structure is different
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>User List</h1>
      <div>
        {users.map(user => (
          <div key={user.id}>
           <div> Username: {user.username}</div>
         
            <div> password: {user.password}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
