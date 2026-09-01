const UserItem = ({ user }) => {
  return (
    <li>
      <div>
        <img src={user.image} alt={user.name} />
      </div>
      <h2>{user.name}</h2>
      <h3>
        {user.placesCount} {user.placesCount === 1 ? "Place" : "Places"}
      </h3>
    </li>
  );
};

export default UserItem;
