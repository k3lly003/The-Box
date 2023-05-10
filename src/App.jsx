import Input from "./components/Input.jsx";
import Button from "./components/Button.jsx";
import "./App.css";
import { useState } from "react";

function App() {
  const [data, setData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  function handleValue(event) {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  //
  function clickbtn(e) {
    e.preventDefault();
    console.log(data);
  }

  return (
    <>
      <form onSubmit={clickbtn}>
        <div className="header">
          <h2>Sign up</h2>
          <p>Please fill in this form to create an account.</p>
        </div>
        <div>
          <Input
            name="email"
            place="email"
            type="text"
            handleInput={handleValue}
            value={data.email}
          />
          <Input
            name="password"
            place="password"
            type="password"
            handleInput={handleValue}
            value={data.password}
          />
          <Input
            name="repeatPassword"
            place="repeat password"
            type="text"
            handleInput={handleValue}
            value={data.repeatPassword}
          />
        </div>
        <p>
          <input type="checkbox" />
          Remember me
        </p>
        <p>
          By creating an account you agree to our <a href="">Terms & Privacy</a>
        </p>
        <Button but="cancel" krass="red" />
        <Button but="sign up" krass="green" click={clickbtn} />
      </form>
    </>
  );
}
export default App;
