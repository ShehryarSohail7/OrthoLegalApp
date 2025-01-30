import React from "react";
import axios from "axios";

function SignUpForm() {
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
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
    console.log(state);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create-user/",
        {
          fullName: state.firstName + " " + state.lastName,
          email: state.email,
          password: state.password,
          role: state.role,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Response:", response.data);
      alert("User data sent successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Error sending data");
    }
    setState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    });
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <span>or use your email for registration</span>
        <div className="d-flex gap-4 w-100">
          <input
            type="text"
            name="firstName"
            className="inputNames"
            value={state.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            className="inputNames"
            value={state.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>

        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="password"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        <select name="role" value={state.role} onChange={handleChange}>
          <option value="" disabled>
            Role
          </option>
          <option value="client">Client</option>
          <option value="doctor">Doctor</option>
          <option value="medicalAssistant">Medical Assistant</option>
        </select>
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
