import "./App.css";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/home/Navbar";
import EventForm from "./components/event/EventForm";
import EventList from "./components/event/EventList";
import JoinEvent from "./components/event/JoinEvent";
import Footer from "./components/footer/Footer";
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/eventForm" element={<EventForm/>} />
          <Route path="/eventList" element={<EventList/>} />
          <Route path="/joinEvent" element={<JoinEvent/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
