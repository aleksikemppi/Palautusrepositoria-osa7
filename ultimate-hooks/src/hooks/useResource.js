import { useState, useEffect } from 'react';
import axios from 'axios';

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    };
    fetchResources();
  }, [baseUrl]);

  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject);
    setResources(resources.concat(response.data));
  };

  const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    setResources(resources.map(resource => resource.id !== id ? resource : response.data));
  };

  return [resources, { create, update }];
};

export default useResource;
