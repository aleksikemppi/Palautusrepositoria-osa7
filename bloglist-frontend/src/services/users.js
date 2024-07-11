import axios from 'axios';
import storage from './storage';

const baseUrl = '/api/users';

const getConfig = () => ({
  headers: { Authorization: `Bearer ${storage.loadUser().token}` },
});

const getAll = async () => {
  const response = await axios.get(baseUrl, getConfig());
  return response.data;
};

export default { getAll };
