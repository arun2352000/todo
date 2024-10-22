import React, { useState } from 'react';

const Body = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState({ title: '', description: '' });
  const [updateItem, setUpdateItem] = useState({ id: null, title: '', description: '' });
  const url = 'https://todo-backend-627a.onrender.com/api/Todo/getalltodo';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });

      const result = await response.json();
      setData([...data, result]);
      setNewItem({ title: '', description: '' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateItem)
      });

      const result = await response.json();
      setData(data.map(item => item.id === id ? result : item));
      setUpdateItem({ id: null, title: '', description: '' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${url}/${id}`, {
        method: 'DELETE'
      });

      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Fetched Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button onClick={() => setUpdateItem({ id: item.id, title: item.title, description: item.description })}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Add New Item</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Title"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          required
        />
        <button type="submit">Add</button>
      </form>

      <h2>Update Item</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleUpdate(updateItem.id);
      }}>
        <input
          type="text"
          placeholder="Title"
          value={updateItem.title}
          onChange={(e) => setUpdateItem({ ...updateItem, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={updateItem.description}
          onChange={(e) => setUpdateItem({ ...updateItem, description: e.target.value })}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Body;

