import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AppNavbar from './components/AppNavbar'
import ShopList from './components/ShopList'
import ItemModal from './components/ItemModal'
import {
  Container
} from 'reactstrap';


import {Provider} from 'react-redux'
import store from './store'
import {loadUser} from './actions/authActions'

class App extends React.Component {
  componentDidMount(){
    store.dispatch(loadUser)
  }
  render(){
    return (
      <Provider store={store}>  
        <div className="App">
            <AppNavbar/>
            <Container>
              <ItemModal/>
              <ShopList/>
            </Container>
            
        </div>
      </Provider>
    )
  }
  
}

export default App;
