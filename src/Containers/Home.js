import { useHistory } from "react-router";
import "./commom.css";

const Home = () => {
  let history = useHistory();
  const homePage = () => {
    history.push("/Dashboard");
  };
  return (
    <div className="comm">
      <h1>UnAvailable</h1>
      <button type="submit" onClick={homePage} className="bn">
        GO TO HOME PAGE
      </button>
    </div>
  );
};
export default Home;
