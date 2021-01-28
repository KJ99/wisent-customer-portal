import {Link} from "react-router-dom";
import '../assets/css/nav-link.css'
import {useState} from "react";

const NavLink = ({ text, target, ...props }) => {
    const [hover, setHover] = useState(false)

    return (
        <section
            className={'nav-link-container'}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
        >
            <Link to={target}>
                <div>
                    <p className={'nav-link-title'}>{text}</p>
                    <div className={'nav-link-underline'} style={{
                        width: hover ? '100%' : 0
                    }}/>
                </div>
            </Link>
        </section>
    )
}

export default NavLink