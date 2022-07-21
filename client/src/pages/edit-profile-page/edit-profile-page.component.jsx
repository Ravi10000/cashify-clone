import "./edit-profile.page.styles.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
// components
import CustomButton from "../../components/custom-buttom/custom-button.component";
import CustomInput from "../../components/custom-input/custom-input.component";
import CustomTextarea from "../../components/custom-textarea/custom-textarea.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { withRouter } from "react-router-dom";
import { updateUser } from "../../redux/user/user.actions";
import { setFlash } from "../../redux/flash/flash.actions";

const EditProfilePage = ({ flash, currentUser, history, updateUser }) => {
  // const { name, address } = currentUser;
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ defaultValues: userInfo });

useEffect(()=>{
  console.log('useEffect', currentUser)
  const user = {
    name: currentUser?.name,
    address: currentUser?.address,
    "phone number": currentUser?.["phone number"]
  }
  setUserInfo(user);
  reset(user)
},[currentUser, reset])

  const submitForm = async (data) => {
    try {
      setIsLoading(true);
      //   initialize the empty userUpdates object to track updates
      const userUpdates = {};

      //   add updated fields to userUpdates
      for (let key in data)
        if (data[key] !== userInfo[key]) userUpdates[key] = data[key];

      // redirect to profile page if no updates
      const isEmpty = Object.keys(userUpdates).length === 0;
      if (isEmpty) {
        history.push("/profile");
        return;
      }
      //  update user in database
      const res = await axios.put("/api/user", {userUpdates});

      //   update user in redux
      updateUser(res.data.user);

      // show profile updated flash message
      flash({
        type: 'success',
        message: 'profile updated'
      })
      //   redirect to profile page
      history.goBack();
    } catch (error) {
      console.log(error.message);
      setIsLoading(false)
      flash({
        type: 'error',
        message: error.message
      })
    }
  };
  return (
    <div className="edit-profile-page">
      <div className="container">
        <div className="profile-pic">
          <img src="/icons/custom-user.png" alt="" />
        </div>
        <form onSubmit={handleSubmit(submitForm)} noValidate>
          <div className="name input-box">
          <CustomInput
            label="full name"
            name="name"
            type="text"
            register={{ ...register("name") }}
          />
          </div>

          <div className="phone input-box">
          <CustomInput
            name="phone number"
            type="number"
            required
            register={{
              ...register("phone number", {
                required: "phone number is required",
                minLength: {
                  value: 10,
                  message: "phone number must be 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "phone number must be 10 digits",
                },
              }),
            }}
          />
          <p className="errors">{errors?.["phone number"]?.message}</p>
          </div>
          <div className="address input-box">
            <CustomTextarea id="address" name="address" label="Address" register={{...register("address")}} />
            {/* <p className="msg">enter complete address with pincode</p> */}
          </div>
          <div className="save-button-container">
            <CustomButton isLoading={isLoading}>Save Profile</CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  updateUser: (user) => dispatch(updateUser(user)),
  flash: flash=>dispatch(setFlash(flash)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditProfilePage)
);
