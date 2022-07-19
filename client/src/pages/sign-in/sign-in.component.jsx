import "./sign-in.styles.scss";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, withRouter } from "react-router-dom";
import CustomButton from "../../components/custom-buttom/custom-button.component";
import CustomInput from "../../components/custom-input/custom-input.component";
import { signIn } from "../../redux/user/user.actions";
import { connect } from "react-redux";


import { setFlash } from "../../redux/flash/flash.actions";

const SignIn = ({ flash, history, signIn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async (data) => {
    try {
      setIsLoading(true);
      const { email: username, password } = data;
      const res = await axios.post("/api/user/signin", { username, password });

      signIn(res.data.user);
      flash({
        type: "success",
        message: "You are signed in successfully",
      });
        history.push("/profile");
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
      flash({
        type: "error",
        message: 'Invalid username or password',
      })
    }
  };

  return (
    <div className="signin-page">
      <h3>
        Don't have an account?{" "}
        <Link to="/signup">
          <span>Sign-up</span>
        </Link>
      </h3>
      <div className="container">
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <h1 className="form-title">Sign-in</h1>
          <div className="inputs-container">
            <div className="username input-box">
              <CustomInput
                name="email"
                type="email"
                register={{
                  ...register("email", {
                    required: "email is required!",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "invalid email",
                    },
                  }),
                }}
                required
              />
              <p className="errors">{errors?.email?.message}</p>
            </div>
            <div className="password input-box">
              <CustomInput
                register={{
                  ...register("password", {
                    required: "password is required!",
                    minLength: { value: 8, message: "min length 8" },
                    maxLength: { value: 16, message: "max length 16" },
                  }),
                }}
                name="password"
                type="password"
                required
              />
              <p className="errors">{errors?.password?.message}</p>
            </div>
          </div>
          <div className="signin-button-container">
            <CustomButton isLoading={isLoading}>Sign In</CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signIn: (user) => dispatch(signIn(user)),
  flash: flash => dispatch(setFlash(flash))
});
export default connect(null, mapDispatchToProps)(withRouter(SignIn));
