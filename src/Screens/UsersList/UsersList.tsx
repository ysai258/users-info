import { useState, useEffect } from "react";
import { USERS_ENDPOINT, USERS_LIMIT } from "../../Constants/constants";
import UserType from "../../Types/User/User";
import "./UsersList.css";

const UserList = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [mainUsers, setMainUsers] = useState<UserType[]>([]);

  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(`${USERS_ENDPOINT}/${startIndex}/next`);
      const data = await response.json();
      const usersData = data.users.slice(0, USERS_LIMIT);
      setUsers(usersData);
      setMainUsers(usersData);
    }
    fetchUsers();
  }, [startIndex]);

  function handlePrevClick() {
    if (startIndex > 0) {
      setStartIndex(startIndex - USERS_LIMIT);
    }
  }

  function handleNextClick() {
    setStartIndex(startIndex + USERS_LIMIT);
  }

  function filterDataByName(name: string) {
    setUsers(
      mainUsers.filter((usr) =>
        usr.FirstNameLastName.toLowerCase().includes(name.toLowerCase())
      )
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>User List</h1>
      </div>
      <div className="search">
        <input
          type="search"
          className="searchTerm"
          placeholder="Search Name"
          onChange={(e) => filterDataByName(e.target.value)}
        />
      </div>
      <div className="content">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Job Title</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.ID}>
                <td>{user.ID}</td>
                <td>{user.FirstNameLastName}</td>
                <td>{user.JobTitle}</td>
                <td>
                  <a href={`mailto:${user.EmailAddress}`}>
                    {user.EmailAddress}
                  </a>
                </td>
                <td>
                  <a href={`tel:${user.Phone}`}>{user.Phone}</a>
                </td>
                <td>{user.Company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="footer">
        {!(startIndex === 0) && (
          <button onClick={handlePrevClick}>Previous</button>
        )}
        {!(users.length < USERS_LIMIT) && (
          <button onClick={handleNextClick}>Next</button>
        )}
      </div>
    </div>
  );
};

export default UserList;
