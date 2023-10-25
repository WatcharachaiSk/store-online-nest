import { Routes, Route } from 'react-router-dom';
// import CreateGate from "../pages/createGate/CreateGate";
// import JoinGate from "../pages/joinGate/JoinGate";
// import pathRoutesPage from "./pathPage";
// import Chat from "../pages/chat/Chat";
import Home from '../pages/home/Home';

function RoutesPath() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default RoutesPath;
