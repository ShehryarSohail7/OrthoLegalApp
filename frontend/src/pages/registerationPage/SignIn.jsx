import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignInForm() {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/sign-in-user/",
        state,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Response:", response.data);
      if (response.data.success) {
        alert(`User ${state.email} Signed in Successfully!`);
        setState({
          email: "",
          password: "",
        });
        navigate("/calender");
      } else {
        alert(`Invalid Credentials!`);
      }
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Error sending data");
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
