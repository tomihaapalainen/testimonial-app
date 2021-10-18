import { handleSignOut } from "../../firebase/client";

const DashboardPage = () => {
  return (
    <div className="text-xl">
      <button onClick={handleSignOut}>signout</button>
    </div>
  );
};

export default DashboardPage;
