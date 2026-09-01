import UsersList from "../components/UsersList";

const Users = () => {
  const DUMMY_USERS = [
    {
      id: "u1",
      name: "Ali Khan",
      image: "https://i.pravatar.cc/150?img=1",
      placesCount: 5,
    },
    {
      id: "u2",
      name: "Sara Ahmed",
      image: "https://i.pravatar.cc/150?img=2",
      placesCount: 8,
    },
    {
      id: "u3",
      name: "Hamza Malik",
      image: "https://i.pravatar.cc/150?img=3",
      placesCount: 3,
    },
    {
      id: "u4",
      name: "Ayesha Noor",
      image: "https://i.pravatar.cc/150?img=4",
      placesCount: 12,
    },
    {
      id: "u5",
      name: "Usman Tariq",
      image: "https://i.pravatar.cc/150?img=5",
      placesCount: 7,
    },
  ];

  return <UsersList items={DUMMY_USERS} />;
};

export default Users;
