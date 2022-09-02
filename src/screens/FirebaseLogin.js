import {
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  // sendPasswordReset,
  signInWithGoogle,
} from "../firebaseQuery";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import IconGoogle from "../static/icons/IconGoogle";
// for email
import { validate } from "email-validator";
// for password
import * as yup from "yup";
import YupPassword from "yup-password";

const FirebaseLogin = () => {
  YupPassword(yup);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const passSchema = yup.string().password();

  const btnCondition = !(validate(email) && password.length >= 6);
  const btnCondReg = !(
    name.length >= 5 &&
    confirmPass.length >= 6 &&
    password.length >= 8 &&
    validate(email)
  );

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      console.log(loading, "loading");
      return;
    }
    if (user) {
      // console.log("====================================");
      // console.log(user, "user");
      // console.log("====================================");
      navigate("/");
    }
  }, [user, loading, navigate]);

  return (
    <>
      <div className="fcfs mt40">
        <Link to={"/"} style={{ color: "var(--red)" }} className={"mr5 bold24"}>
          TOPMANGALIST
        </Link>
        <h2 className="bold24 upper"> {register ? "Register" : "LOGIN"}</h2>
      </div>
      <div className="fcc mt40">
        <form action="" className="fcc">
          {register && (
            <input
              type={"text"}
              maxLength={20}
              className={`searchBar mb15`}
              placeholder={"Name (length >= 5)"}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          )}
          <input
            type={"email"}
            className={`searchBar`}
            placeholder={"Email"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type={"password"}
            placeholder={"Password (length >= 8)"}
            className={`searchBar mt15`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {register && (
            <input
              type={"password"}
              placeholder={"Confirm Password"}
              className={`searchBar mt15`}
              value={confirmPass}
              onChange={(e) => {
                setConfirmPass(e.target.value);
              }}
            />
          )}
          {!register && (
            <button
              className="mt15"
              style={{ alignSelf: "flex-start" }}
              onClick={() => {
                // sendPasswordReset(email)
                alert("function to be added");
              }}
            >
              Forgot Password?
            </button>
          )}
          <input
            type={"button"}
            disabled={register ? btnCondReg : btnCondition}
            value={register ? "Register" : "Submit"}
            className="mt15 redBtn"
            style={{ padding: "15px 0" }}
            onClick={async () => {
              try {
                await passSchema.validate(password);
                if (register) {
                  if (password === confirmPass) {
                    registerWithEmailAndPassword(name, email, password);
                    console.log("success");
                  } else {
                    alert("Enter same password in both fields.");
                  }
                } else {
                  console.log("success");
                  logInWithEmailAndPassword(email, password);
                }
              } catch (error) {
                // console.log(error["type"],Object.keys(error));
                alert("Error! " + error["message"].replace("this", "Password"));
              }
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
            <IconGoogle />
            <span className="ml15">Google</span>
          </div>
        </button>
        <button
          className="mv20"
          style={{ alignSelf: "flex-start" }}
          onClick={() => {
            // sendPasswordReset(email)
            // alert("function to be added");
            setRegister(!register);
            setConfirmPass("");
            setName("");
          }}
        >
          {register
            ? "Already have a acoount? Login"
            : "New user? Create an account."}
        </button>
      </div>
    </>
  );
};

export default FirebaseLogin;
