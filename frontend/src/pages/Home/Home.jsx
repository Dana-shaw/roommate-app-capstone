import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./Home.css";
import LoginForm from "../../components/LoginForm";
import { getAllChores } from "../../store/chores";
import Tile from "../../components/Tile/Tile";
import { getAllUsers } from "../../store/users";
import Sidebar from "./Sidebar";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const chores = Object.values(useSelector((state) => state.chores));
  console.log(chores);

  useEffect(() => {
    dispatch(getAllChores()).then(dispatch(getAllUsers()));
  }, [dispatch]);

  return (
    <>
      {!user ? (
        <LoginForm />
      ) : (
        <div className="layout">
            <div className="sidebar">
            <Sidebar/>
            </div>
          <div className="content">
            <div className="content-header">
              <h1>Chores</h1>
            </div>
            <div className="content-list">
              <div>
                {chores.map((chore) => (
                  <Tile key={chore.id} chore={chore} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
