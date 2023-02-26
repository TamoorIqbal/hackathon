import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import "./Home.css";
function Home() {
  const data = useSelector((store) => store.auth?.user);
  console.log("header component data", data?.uid);
  return (
    <>
      <div className="intro-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="intro-message">
                <h1>Event Planner</h1>
                <h3>Event Organizer & Planning</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
