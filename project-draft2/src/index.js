import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

const supabase = createClient(
"https://xxwzobwsetqapihbfyqj.supabase.co", //url
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4d3pvYndzZXRxYXBpaGJmeXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ3MDQwNzEsImV4cCI6MTk5MDI4MDA3MX0.ELrmpPcKbdg2_oXVLf1CV2KP-9wU5B_7xIt4crcvZ4M"); //API supabase key
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);
