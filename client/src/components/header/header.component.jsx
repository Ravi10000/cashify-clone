// styles import
import "./header.styles.scss";
// react imports
// import {useState, useEffect} from 'react'

// components import
import CustomButton from "../../components/custom-button/custom-button.component";

// router imports
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOutUserStart } from "../../redux/user/user.actions";
const Header = ({ currentUser, signOut, isFetchingUser }) => {
  return (
    <div className="header">
      <Link to="/">
        <div className="logo link">
          <img src="/logo-without-bg.png" alt="logo" />
          <span>
            <span className="color">Mr.</span>phone
            <span className="color">X</span>
          </span>
          {/* <div className="underline"></div> */}
        </div>
      </Link>
      <div className="links">
        <a
          href="https://www.facebook.com/mrphonex.2022"
          target="_blank"
          rel="noreferrer"
        >
          <div className="fb link right">
            <img src="/icons/fb.png" alt="facebook" />
            <div className="underline"></div>
          </div>
        </a>
        <a
          href="https://www.instagram.com/mrphone_x"
          target="_blank"
          rel="noreferrer"
        >
          <div className="ig link right">
            <img src="/icons/ig.png" alt="instagram" />
            {/* <div className="underline"></div> */}
          </div>
        </a>
        <a href="https://wa.me/+919667273499" target="_blank" rel="noreferrer">
          <div className="wa link right">
            <img src="/icons/wa.png" alt="whats app" />
            {/* <div className="underline"></div> */}
          </div>
        </a>
        {currentUser ? (
          <Link to="/profile">
            <div className="profile-pic link right">
              <img src="/icons/custom-user.png" alt="user-icon" />
              {/* <div className="underline"></div> */}
            </div>
          </Link>
        ) : isFetchingUser ? (
          <div className="fetchingUser">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="signin-container">
            <Link to="/signin">
              <CustomButton>sign-in</CustomButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutUserStart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
