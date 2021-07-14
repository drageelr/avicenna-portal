import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Default from './components/Default';
import Poll from './components/Poll';

function App() {
    const [user, setUser] = React.useState((() => {
        let token = sessionStorage.getItem("userToken");
        let name = sessionStorage.getItem("userName");
        let admin = sessionStorage.getItem("userAdmin");
        if (!token || !name || admin === undefined) {
            return false;
        } else {
            return {token, name, admin};
        }
    })());

    const handleSetUser = (obj) => {
        setUser(obj);
    }

    return (
        <BrowserRouter>
            <NavBar handleSetUser={handleSetUser} user={user}/>
            <Switch>
                <Route exact path="/" component={Default}/>
                <Route exact path="/polls" component={user && Poll}/>
                <Route exact path="/polls/view"/>
                <Route exact path="/users"/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
