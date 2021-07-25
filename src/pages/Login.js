import React, { useState } from "react";
import { useHistory } from "react-router";
import loginUser from "../strapi/loginUser";
import registerUser from "../strapi/registerUser";
import { useUserContext } from "../context/user";

export default function Login() {
  const history = useHistory();
  const { userLogIn, showAlert, alert } = useUserContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("default");
  const [isMember, setIsMember] = useState(true);

  let isEmpty =
    !email || !password || !username || alert.show;
  const toggleMemeber = () => {
    setIsMember((prev) => {
      let isMember = !prev;
      isMember ? setUsername("default") : setUsername("");
      return isMember;
    });
    setEmail("");
    setPassword("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // to prevent continous post eequest when the network is bad
    showAlert(
      true,
      "acessoing data, please wait",
      "waiting"
    );
    let response;
    if (isMember) {
      response = await loginUser({ email, password });
    } else {
      response = await registerUser({
        email,
        password,
        username,
      });
    }
    if (response) {
      const { user, jwt } = response.data;
      const { username } = user;
      const token = jwt;
      const newUser = {
        username,
        token,
      };
      userLogIn(newUser);
      showAlert(
        true,
        `you have successfully logged in ${username} happy shopping`,
        "success"
      );
      history.push("/products");
    } else {
      showAlert(
        true,
        "invalid username or password, put in correct details",
        "danger"
      );
    }
  };
  return (
    <section className='form section'>
      <h2 className='section-title'>
        {isMember ? "Log in" : "Sign up"}
      </h2>
      <form className='login-form' onSubmit={handleSubmit}>
        {/* single inputs*/}
        <div className='form-control'>
          <label htmlFor='email'>email</label>
          <input
            type='email'
            id='email'
            placeholder='dasiloydesigners@gmail.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/*end of single inputs*/}
        {/* single inputs*/}
        <div className='form-control'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            id='password'
            placeholder='********'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/*end of single inputs*/}
        {!isMember && (
          <div className='form-control'>
            <label htmlFor='username'>username</label>
            <input
              type='text'
              id='username'
              placeholder='dasiloydesigners'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        {isEmpty && (
          <p className='form-empty'>
            please fill out all form fields
          </p>
        )}
        {!isEmpty && (
          <button
            type='submit'
            className='btn btn-primary btn-block'>
            submit
          </button>
        )}
        <p className='register-link'>
          {isMember
            ? "need to register"
            : "already a member"}
          <button type='button' onClick={toggleMemeber}>
            click here
          </button>
        </p>
      </form>
    </section>
  );
}
