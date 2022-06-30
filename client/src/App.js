import './App.scss';
import { useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
// pages
import Homepage from './pages/homepage/homepage.component';
import Productpage from './pages/product/product.component';
import SignIn from './pages/sign-in/sign-in.component';
import SignUp from './pages/sign-up/sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component'
import ProfilePage from './pages/profile/profile.component';
import EditProfilePage from './pages/edit-profile-page/edit-profile-page.component'

// componetnts
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

// redux connect
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchUserStart } from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors'

function App({fetchUser, currentUser}) {
  useEffect(() => {
    fetchUser()
  }, [fetchUser])
  // const createRouteIfUserExist = (route, component, redirect)=>{
  //   <Route excat 
  //       path={route} 
  //       render={
  //         () => currentUser ? <Redirect to={redirect}/> : <component/>
  //       }/>
  // }
  return (
     <div className="App">
      <Header/>
      <Switch>
        <Route exact path='/product/:id'  component={Productpage}/>
        <Route exact path='/checkout/:productid' component={CheckoutPage}/>
        <Route excat 
        path='/signin' 
        render={
          () => currentUser ? <Redirect to='/'/> : <SignIn/>
        }/>
        {/* {createRouteIfUserExist('/signin', SignIn, '/')} */}
        <Route excat 
        path='/signup' 
        render={
          () => currentUser ? <Redirect to='/'/> : <SignUp/>
        }/>
        
        <Route excat 
        path='/profile' 
        render={
          () => currentUser ? <ProfilePage/> : <Redirect to='/signin'/>
        }/>
        <Route path='/edit-profile' component={EditProfilePage}/>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='*' render={
          () => <Redirect to='/'/>
        }/>
      </Switch>
      <Footer/>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser
})
const mapDispatchToProps = dispatch=>({
  fetchUser: () => (dispatch(fetchUserStart()))
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
