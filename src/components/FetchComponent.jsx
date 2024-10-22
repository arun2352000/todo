// FetchComponent.jsx
import React, { useState, useEffect } from 'react';


const FetchComponent = () => {
  const [data, setData] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editItem, setEditItem] = useState({ id: null, title: '', description: '', completed: false });
  // const url = useURL();

  useEffect(() => {
    fetch('https://todo-backend-627a.onrender.com/api/Todo/getalltodo')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data.data || []);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleEdit = (item) => {
    setEditItemId(item._id);
    setEditItem({ id: item._id, title: item.title, description: item.description, completed: item.completed });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = data.map(item => {
      if (item._id === editItem.id) {
        item.title = editItem.title;
        item.description = editItem.description;
        item.completed = editItem.completed;
      }
      return item;
    });
    setData(updatedData);
    setEditItemId(null);

    fetch(`https://todo-backend-627a.onrender.com/api/Todo/updateTodo/${editItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: editItem.title, description: editItem.description, completed: editItem.completed })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Update successful:', data);
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  const handleDelete = (id) => {
    const updatedData = data.filter(item => item._id !== id);
    setData(updatedData);

    fetch(`https://todo-backend-627a.onrender.com/api/Todo/deleteTodo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Delete successful:', data);
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };

  const toggleCompleted = (id) => {
    const updatedData = data.map(item => {
      if (item._id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setData(updatedData);

    fetch(`https://todo-backend-627a.onrender.com/api/Todo/updateTodo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: updatedData.find(item => item._id === id).completed })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Toggle completed successful:', data);
      })
      .catch((error) => {
        console.error('Error toggling completed state:', error);
      });
  };

  return (
    <div>
      <h1>API Data</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.map(item => (
          <div key={item._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '16px', width: '300px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            {editItemId === item._id ? (
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  name="title"
                  value={editItem.title}
                  onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                  placeholder="Title"
                  required
                />
                <textarea
                  name="description"
                  value={editItem.description}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                  placeholder="Description"
                  required
                />
                <button type="submit">Update</button>
                <button type="button" onClick={() => setEditItemId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p>Completed: {item.completed ? 'Completed' : 'Not Completed'}</p>
                <button onClick={() => toggleCompleted(item._id)}>
                  {item.completed ? 'Mark as Not Completed' : 'Mark as Completed'}
                </button>
                <button onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(item._id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchComponent;
