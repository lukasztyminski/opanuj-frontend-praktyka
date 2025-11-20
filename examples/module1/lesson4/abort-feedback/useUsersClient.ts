import axios from 'axios';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
}

const API_URL = '/api/data/users?timeout=10000';
const REQUEST_TIMEOUT_MS = 5000;

export const useUsersClient = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isTimeoutError, setIsTimeoutError] = useState(false);

  function fetchUsers() {
    axios
      .get<User[]>(API_URL, {
        timeout: REQUEST_TIMEOUT_MS,
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        if (error.code === 'ECONNABORTED') {
          setIsTimeoutError(true);
        }
      });
  }

  const retryRequest = () => {
    setIsTimeoutError(false);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, isTimeoutError, retryRequest };
};
