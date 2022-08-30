import {
  auth,
  logInWithEmailAndPassword,
  // sendPasswordReset,
  signInWithGoogle,
} from "../firebaseQuery";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import IconGoogle from "../static/icons/IconGoogle"

const FirebaseLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      console.log(loading, "loading");
      return;
    }
    if (user) {
      console.log("====================================");
      console.log(user, "user");
      console.log("====================================");
      navigate("/");
    }
  }, [user, loading, navigate]);

  return (
    <>
    <div className="fcfs mt40">
      <Link to={"/"} style={{color:"var(--red)",}} className={"mr5 bold24"}>TOPMANGALIST</Link>
      <h2 className="bold24"> LOGIN</h2>
    </div>
      <div className="fcc mt40">
        <form action="" className="fcc">
          <input
            type={"email"}
            className={`searchBar`}
            placeholder={"Enter Email"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type={"password"}
            placeholder={"Password"}

            className={`searchBar mt15`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
           <button
          className="mt15"
          style={{alignSelf:"flex-start"}}
            onClick={() => {
              // sendPasswordReset(email)
              alert("function to be added");
            }}
          >
            Forgot Password?
          </button>
          <input
            type={"button"}
            disabled={!email.length || !password.length}
            value={"Submit"}
            className="mt15 redBtn"
            style={{padding:"15px 0"}}
            onClick={() => {
              logInWithEmailAndPassword(email, password);
            }}
          />
        </form>
        <button
        className="mt15 socialMediaBtn"
          onClick={() => {
            signInWithGoogle();
          }}
        >
          <div className="frc">
            <IconGoogle/><span className="ml15">
              
              Google
            </span>
          </div>
        </button>
      </div>
    </>
  );
};

export default FirebaseLogin;
