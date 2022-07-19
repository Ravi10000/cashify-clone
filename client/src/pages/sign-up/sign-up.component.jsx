// styles
import "./sign-up.styles.scss";

// react hooks
import { useState } from "react";

// packages
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// components
import CustomButton from "../../components/custom-buttom/custom-button.component";
import CustomInput from "../../components/custom-input/custom-input.component";

// redux actions
import { updateUser } from "../../redux/user/user.actions";
import { setFlash } from "../../redux/flash/flash.actions";

const SignUp = ({ history, updateUser, flash }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      "phone number": "",
      password: "",
      "confirm password":""
    },
  });

  const submitForm = async (data) => {
    try {
        setIsLoading(true);
      const { email, password } = data;
      console.log(data);
      const res = await axios.post("/api/user/signup", {user:{
        email,
        password,
        "phone number": data["phone number"],
    }});
      console.log(res.data.user);
      if(res.data.error){
        console.log(res.data.error.message);
        flash({
          type: 'error',
          message: res.data.error.message
        })
        history.push('/signup');
        setIsLoading(false);
        return
      }
      updateUser(res.data.user);
      history.push('/profile');
    } catch (err) {
      console.log(err.message);
    }
  };
  //   save password input for later comparision with confirm password
  const password = watch("password");

  // to pass as a prop to custom input for styling
  const bgColor = "rgba(209, 230, 224, 0.7)";

  return (
    <div className="signup-page">
      <h3>
        Already have an account?{" "}
        <Link to="/signin">
          <span>Sign-in</span>
        </Link>
      </h3>
      <div className="container">
        <form noValidate onSubmit={handleSubmit(submitForm)}>
          <h1 className="form-title">Sign-up</h1>
          <div className="inputs-container">
            <div className="email input-box">
              <CustomInput
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
                bgColor={bgColor}
                name="email"
                type="email"
                required
              />
              <p className="errors">{errors?.email?.message}</p>
            </div>
            <div className="phone input-box">
              <CustomInput
                register={{
                  ...register("phone number", {
                    required: "phone number is required!",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "phone number must be 10 digits",
                    },
                  }),
                }}
                bgColor={bgColor}
                name="phone number"
                type="number"
                required
              />
              <p className="errors">{errors?.["phone number"]?.message}</p>
            </div>
            <div className="password input-box">
              <CustomInput
                register={{
                  ...register("password", {
                    required: "password is required!",
                    minLength: {
                      value: 8,
                      message: "password must be at least 8 characters",
                    },
                    maxLength: {
                      value: 16,
                      message: "password must be at most 16 characters",
                    },
                  }),
                }}
                bgColor={bgColor}
                name="password"
                type="password"
                required
              />
              <p className="errors">{errors?.password?.message}</p>
            </div>
            <div className="confirm-password input-box">
              <CustomInput
                register={{
                  ...register("confirm password", {
                    required: "confirm password is required!",
                    minLength: {
                      value: 8,
                      message: "password must be at least 8 characters",
                    },
                    maxLength: {
                      value: 16,
                      message: "password must be at most 16 characters",
                    },
                    pattern: {
                      value: RegExp(password),
                      message: "password does not match",
                    },
                  }),
                }}
                bgColor={bgColor}
                name="confirm password"
                type="password"
                required
              />
              <p className="errors">{errors?.["confirm password"]?.message}</p>
            </div>
            <div className="text input-box">
              <CustomInput name="text" required/>
            </div>
          </div>
          <div className="signup-button input-box">
            <CustomButton
            isLoading={isLoading}
              myStyles={{ color: "#97DAC8", backgroundColor: "#194656" }}
            >
              Sign Up
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateUser: (user) => dispatch(updateUser(user)),
  flash: (flash) => dispatch(setFlash(flash)),
});

export default connect(null, mapDispatchToProps)(withRouter(SignUp));
