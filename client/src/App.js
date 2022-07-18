import "./App.scss";
import { useState, useEffect } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
// pages
import Homepage from "./pages/homepage/homepage.component";
import Productpage from "./pages/product/product.component";
import SignIn from "./pages/sign-in/sign-in.component";
import SignUp from "./pages/sign-up/sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import ProfilePage from "./pages/profile/profile.component";
import EditProfilePage from "./pages/edit-profile-page/edit-profile-page.component";
import OrdersPage from "./pages/orders/orders.page";
import AboutPage from './pages/about/about.page';

// componetnts
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Popup from "./components/popup/popup.component";

// redux connect
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// actions
import { signIn } from "./redux/user/user.actions";
import { setProducts } from "./redux/shop/shop.actions";


// selectors
import { selectCurrentUser } from "./redux/user/user.selectors";
import { selectFlash } from "./redux/flash/flash.selectors";

function App({ setProducts, flash, signIn, currentUser, history, location }) {
  const [isFetchingUser, setFetchingUser] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // fetch user and products from api
        const userResponse = await axios.get("/api/user");
        const productsResponse = await axios.get("/api/products");
        
        // signin user and products in redux
        signIn(userResponse.data.user);
        setProducts(productsResponse.data.products);

        setFetchingUser(false);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, [signIn]);
  return (
    <div className="App">
      {flash && <Popup type={flash.type} message={flash.message} />}
      <Header isFetchingUser={isFetchingUser} />
      <Switch>
        <Route exact path="/about-us" component={AboutPage} />
        <Route exact path="/product/:id" component={Productpage} />
        <Route exact path="/checkout/:productid" component={CheckoutPage} />
        <Route
          excat
          path="/signin"
          render={() => (currentUser ? <Redirect to="/" /> : <SignIn />)}
        />
        <Route
          excat
          path="/signup"
          render={() => (currentUser ? <Redirect to="/" /> : <SignUp />)}
        />
        <Route excat path="/profile" component={ProfilePage} />
        <Route path="/edit-profile" component={EditProfilePage} />
        <Route path="/orders" component={OrdersPage} />
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
  setProducts: (products) => dispatch(setProducts(products)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
