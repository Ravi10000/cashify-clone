import "./App.scss";

// hooks
import { useState, useEffect } from "react";

// packages
import axios from "axios";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// pages
import Homepage from "./pages/homepage/homepage.component";
import Productpage from "./pages/product/product.component";
import SignIn from "./pages/sign-in/sign-in.component";
import SignUp from "./pages/sign-up/sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import ProfilePage from "./pages/profile/profile.component";
import EditProfilePage from "./pages/edit-profile-page/edit-profile-page.component";
import OrdersPage from "./pages/orders/orders.page";
import AboutPage from "./pages/about/about.page";
import TOSPage from "./pages/tos/tos.page";

// componetnts
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Popup from "./components/popup/popup.component";
import ProtectedRoute from "./components/protected-route/protected-route";
import ProtectedIfAuthenticated from "./components/protected-authenticate/protected-authenticate";

// actions
import { signIn } from "./redux/user/user.actions";

// selectors
import { selectCurrentUser } from "./redux/user/user.selectors";
import { selectFlash } from "./redux/flash/flash.selectors";
import { setFlash } from "./redux/flash/flash.actions";

function App({ setFlash, flash, signIn, currentUser }) {
  const [isFetchingUser, setFetchingUser] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // fetch user
        const { data } = await axios.get("/api/user");

        setFetchingUser(false);
        if (data.error) {
          console.log(data.error);
          setFlash({
            type: "error",
            message: data.error.message,
          });
          return;
        }

        // signin user and products in redux
        signIn(data.user);

      } catch (error) {
        console.log(error.message);
        setFlash({
          type: "error",
          message: error.message,
        });
      }
    })();
  }, [signIn, setFlash]);
  return (
    <div className="App">
      {flash && <Popup type={flash.type} message={flash.message} />}
      <Header isFetchingUser={isFetchingUser} />
      <Switch>
        <Route exact path="/tos" component={TOSPage} />
        <Route exact path="/about-us" component={AboutPage} />
        <Route exact path="/product/:id" component={Productpage} />
        <ProtectedIfAuthenticated
          excat
          path="/signin"
          component={SignIn}
        />
        <ProtectedIfAuthenticated
          excat
          path="/signup"
          component={SignUp}
        />
        <ProtectedRoute exact path="/checkout/:productid" component={CheckoutPage} />
        <ProtectedRoute excat path="/profile" component={ProfilePage} />
        <ProtectedRoute path="/edit-profile" component={EditProfilePage} />
        <ProtectedRoute path="/orders" component={OrdersPage} />
        <Route exact path="/" component={Homepage} />
        <Route exact path="*" render={() => <Redirect to="/" />} />
      </Switch>
      <Footer />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  flash: selectFlash,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (user) => dispatch(signIn(user)),
  setFlash: (flash) => dispatch(setFlash(flash)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
