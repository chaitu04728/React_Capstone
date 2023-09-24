import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';

function Profile() {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [unsavedChanges, setUnsavedChanges] = useState(false); // Define unsavedChanges state
  const username = sessionStorage.getItem('username');

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`http://localhost:8000/user/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUserData(userData);
        setEditedUserData(userData);
      } catch (err) {
        toast.error('Failed to fetch user data: ' + err.message);
      }
    }

    fetchUserData();
  }, [username]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUserData(userData);
    setUnsavedChanges(false); // Reset unsavedChanges
  };

  const handleSaveClick = async () => {
    // Custom validation: Check if any required field is empty
    const requiredFields = ['name', 'email', 'phone', 'address'];
    const missingFields = requiredFields.filter(
      (field) => !editedUserData[field]
    );

    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return; // Do not proceed with submission
    }

    try {
      const response = await fetch(`http://localhost:8000/user/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUserData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      setIsEditing(false);
      toast.success('Profile updated successfully');
      setUnsavedChanges(false); // Reset unsavedChanges after successful submission
    } catch (err) {
      toast.error('Failed to update user data: ' + err.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setUnsavedChanges(true); // Set unsavedChanges to true on input change
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (unsavedChanges) {
        event.preventDefault();
        event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [unsavedChanges]);

  return (
    <div className="container mt-4">
      <h2>Profile</h2>
      {isEditing ? (
        <div>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td><strong>Name</strong></td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={editedUserData.name}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>
                  <input
                    type="text"
                    name="email"
                    value={editedUserData.email}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><strong>Phone</strong></td>
                <td>
                  <input
                    type="number"
                    name="phone"
                    value={editedUserData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><strong>Address</strong></td>
                <td>
                  <input
                    type="text"
                    name="address"
                    value={editedUserData.address}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          <button className="btn btn-primary" onClick={handleSaveClick}>
            Save
          </button>
          <button className="btn btn-secondary ml-2" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td><strong>Name</strong></td>
                <td>{userData.name}</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>{userData.email}</td>
              </tr>
              <tr>
                <td><strong>Phone</strong></td>
                <td>{userData.phone}</td>
              </tr>
              <tr>
                <td><strong>Address</strong></td>
                <td>{userData.address}</td>
              </tr>
            </tbody>
          </Table>
          <button className="btn btn-primary" onClick={handleEditClick}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
