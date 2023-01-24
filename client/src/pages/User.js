import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log(currentUser.user);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  console.log(currentUser.user);

  return (
    <div>
      <header>
        <h3>
          <strong>{currentUser.user.firstName.toUpperCase() + " "}</strong>
          <strong>{currentUser.user.lastName.toUpperCase() + " "}</strong>
        </h3>
      </header>
      <p>
        <strong>Email:</strong> {currentUser.user.email}
      </p>
      <p>
        <strong>User Since:</strong> {currentUser.user.createdAt.split("T")[0]}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.user._id}
      </p>
      <p>
        <strong>Friends:</strong>
      </p>
      {currentUser.user.friends.map((friend) => (
        <p>{friend}</p>
      ))}
      <p>
        <strong>Last games: </strong>
      </p>
      {currentUser.user.gamesHistory.map((game) => (
        <p>{game}</p>
      ))}
      <p>
        <strong>Favorites: </strong>
      </p>
      {currentUser.user.favorites.map((favorite) => (
        <p>{favorite}</p>
      ))}

      {/* Favorites */}
      {/* Friends */}
      {/* Game History */}
      {/* Next Game*/}

      <div></div>
    </div>
  );
};

export default User;
