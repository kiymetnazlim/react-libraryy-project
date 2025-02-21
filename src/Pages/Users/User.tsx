import React from "react";
import AddUser from "./AddUser"; // AddUser formunu import ediyoruz.
import UserList from "./UserList";
import { users } from "../../users";

const User: React.FC = () => {
  return (
    <div>
      <h1>Kullanıcı Yönetimi</h1>
      {/* AddUser formunu burada çağırıyoruz */}
      <AddUser />

      <UserList users={users} />
    </div >
  );
};

export default User;
