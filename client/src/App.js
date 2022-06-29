import './App.scss';
import { useEffect } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
// pages
import Homepage from './pages/homepage/homepage.component';
import Productpage from './pages/product/product.component';
import SignIn from './pages/sign-in/sign-in.component';
import SignUp from './pages/sign-up/sign-up.component';

// componetnts
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

// redux connect
import { connect } from 'react-redux';
import { fetchUserStart } from './redux/user/user.actions';

function App({fetchUser}) {
  useEffect(() => {
    fetchUser()
  }, [fetchUser])
  
  return (
     <div className="App">
      <Header/>
      <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/product/:id'  component={Productpage}/>
        <Route excat path='/signin' component={SignIn}/>
        <Route excat path='/signup' component={SignUp}/>
      </Switch>
      <Footer/>
    </div>
  );
}
// const mapStateToProps = createStructuredSelector({
//   products: selectProducts,
// })
const mapDispatchToProps = dispatch=>({
  fetchUser: () => (dispatch(fetchUserStart()))
})
export default connect(null, mapDispatchToProps)(App)
