import { auth, logInWithEmailAndPassword, sendPasswordReset, signInWithGoogle } from "../firebaseQuery";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const FirebaseLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      console.log(loading,"loading");
      return;
    }
    if (user){
      console.log('====================================');
      console.log(user,"user");
      console.log('====================================');
       navigate("/")};
  }, [user, loading,navigate]);

  return (
    <>
      <div className="fcc">
        <form action="" className="fcc">
          <input
            type={"email"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type={"password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="mt15"
          />
          <input type={"button"} value={"Submit"} className="mt15" onClick={()=>{
            logInWithEmailAndPassword(email,password)
          }} />
        <button
          onClick={() => {
            sendPasswordReset(email)
          }}
        >
          Forgot Password?
        </button>
        </form>
        <button
          onClick={() => {
            signInWithGoogle();
          }}
        >
          Google
        </button>
      </div>
    </>
  );
};

export default FirebaseLogin;
