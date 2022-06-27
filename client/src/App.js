import './App.css';
import {
  Switch,
  Route,
} from "react-router-dom";
import TestButton from './components/test-component/testButton';
import Homepage from './pages/homepage/homepage.component';
import Productpage from './pages/product/product.component';
import Header from './components/header/header.component';
import SignIn from './pages/sign-in/sign-in.component';
import SignUp from './pages/sign-up/sign-up.component';
import Footer from './components/footer/footer.component';


function App() {
  
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
// const mapDispatchToProps = dispatch=>({
//   fetchProducts: () => (dispatch(fetchProductsStart()))
// })
export default App
