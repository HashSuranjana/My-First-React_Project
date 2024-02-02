import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ItemList from './ItemList';
import PropertyDetail from './PropertyDetail';
import properties from './data.json';
import './App.css'; // Import your CSS file

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <h2>Estate Agents</h2>
        </nav>
        <div style={{ flex: 1 }}>
          <Switch>
            <Route exact path="/" render={() => <ItemList properties={properties} />} />
            <Route path="/property/:id" render={(props) => <PropertyDetail {...props} properties={properties} />} />
          </Switch>
        </div>
        <footer>
          &copy; ALL RIGHT RESERVED BY HASH  
        </footer>
      </div>
    </Router>
  );
}

export default App;
