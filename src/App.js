import {BrowserRouter, Route, Switch} from "react-router-dom";
import AppHeader from "./components/app-header";
import LandingScreen from "./screens/landing-screen";
import MenuScreen from "./screens/menu-screen";
import ReserveScreen from "./screens/reserve-screen";
import './assets/css/master.css'
import ContactScreen from "./screens/contact";

function App() {
  return (
    <section>
      <BrowserRouter>
        <AppHeader />
        <main>
            <Switch>
                <Route exact path='/'>
                    <LandingScreen />
                </Route>
                <Route path='/menu'>
                    <MenuScreen />
                </Route>
                <Route path='/reserve'>
                    <ReserveScreen />
                </Route>
                <Route path='/contact'>
                    <ContactScreen />
                </Route>
            </Switch>
        </main>
      </BrowserRouter>
    </section>
  );
}


export default App;
