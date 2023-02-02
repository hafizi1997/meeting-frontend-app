import "./App.css";
import Login from "./component/Login";
import Navbar from "./Navbar";
import Event from "./component/Event";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import Register from "./component/Register";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

function App() {
  const session = useSession(); // tokens
  const supabase = useSupabaseClient(); // talk to supabase
  const { isloading } = useSessionContext();
  if (isloading) {
    return <></>;
  }
  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });
    if (error) {
      console.log(error);
    }
  }
  console.log(session);
  return (
    <Router>
      <div>
        {session ? (
          <>
            <Navbar />
            <div>
              <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Event" element={<Event />} />

              </Routes>
            </div>
          </>
        ) : (
          <>
            <button className="google-sign-in" onClick={() => googleSignIn()}>sign in with google</button>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
