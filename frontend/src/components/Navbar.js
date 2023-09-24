import '../index.css'
import styles from './Navbar.module.css'
import { BiMenu } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()

    function goHome(e) {
        e.preventDefault()
        navigate('/')
    }

    return (
        <nav className={styles.nav}>
            <ul>
                <li onClick={goHome} className={styles.title}>
                    Noted.
                </li>
                <li className={styles.subtitle}>
                    My Notes
                </li>
                <li>
                    {/* <img src='../assets/menu.png'/> */}
                    <BiMenu className={styles.menuIcon} />
                </li>
            </ul>
        </nav>
    )
}

export default Navbar