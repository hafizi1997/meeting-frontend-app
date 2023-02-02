import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import {
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

function Navbar() {
  const supabase = useSupabaseClient(); // talk to supabase
  async function signOut() {
    await supabase.auth.signOut();
  }
  const { isloading } = useSessionContext();
  if (isloading) {
    return <></>;
  }
  function aku() {
    const menuToggle = document.querySelector(".toggle");
    const showcase = document.querySelector(".showcase");
    menuToggle.classList.toggle("active");
    showcase.classList.toggle("active");
  }
  return (
    <div>
      <section className="showcase">
        <header>
          <h2 className="logo">Meeting</h2>
          <div className="toggle" onClick={aku}></div>
        </header>
        <div className="overlay"></div>
      </section>
      <div className="menu">
        <ul>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/Register">Register</Link>
          </li>
          <li>
            <Link to="/Event">Add event</Link>
          </li>
        
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link  onClick={() => signOut()}>Sign out</Link>

          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
