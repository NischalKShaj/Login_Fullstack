import React from "react";

const Signup = () => {
  return (
    <div className="wrapper">
      <div className="login_box">
        <div className="login_header">
          <span>Signup</span>
        </div>

        <div className="input_box">
          <input
            type="text"
            id="fname"
            className="input_field"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="firstname" className="label">
            firstname
          </label>
        </div>

        <div className="input_box">
          <input
            type="text"
            id="lname"
            className="input_field"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="lastname" className="label">
            lastname
          </label>
        </div>

        <div className="input_box">
          <input
            type="email"
            id="user"
            className="input_field"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email" className="label">
            email
          </label>
        </div>

        <div className="input_box">
          <input
            type="password"
            id="pass"
            className="input_field"
            required
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password" className="label">
            password
          </label>
        </div>

        <div className="input_box">
          <button type="submit" className="input_submit">
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
