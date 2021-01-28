import {Link} from "react-router-dom";
import '../assets/css/nav-bar.css'
import appLogo from '../assets/img/app-logo.png'
import forestImage from '../assets/img/forest.jpg'
import NavLink from "./nav-link";
import {useLocation} from "react-router";

const AppHeader = ({ ...props }) => {
    return (
        <section>
            <nav>
                <Link to={'/'}>
                    <img className={'app-logo'} src={appLogo} alt={'logo'}/>
                </Link>
                <section className={'links-container'}>
                    <NavLink target='/menu' text='Menu' />
                    <NavLink target='/reserve' text='Rezerwuj' />
                    <NavLink target='/contact' text='Kontakt' />
                </section>
            </nav>
            <header style={{ backgroundImage: `url(${forestImage})` }}>
                <section className={'header-overlay'}>
                    <HeaderContent />
                </section>
            </header>
        </section>
    )
}

const HeaderContent = ({ ...props }) => {
    const pathname = useLocation().pathname
    let view = null
    if(pathname === '/') {
        view = (
            <div className={'header-content'}>
                <p className={'screen-title'}>Bar pod Żubrem</p>
                <Link to='/menu'>
                    <button className={'button nav-button'}>Zobacz Menu</button>
                </Link>
            </div>
        )
    } else if(pathname === '/menu') {
        view = (
            <p className={'screen-title'}>Menu</p>
        )
    } else if(pathname === '/reserve') {
        view = (
            <p className={'screen-title'}>Rezerwuj stolik</p>
        )
    } else if(pathname === '/contact') {
        view = (
            <p className={'screen-title'}>Kontakt</p>
        )
    }
    return view

}
export default AppHeader