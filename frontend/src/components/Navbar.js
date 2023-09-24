import '../index.css'
import styles from './Navbar.module.css'
import { BiMenu } from 'react-icons/bi'


const Navbar = () => {  
  return (
    <nav className={styles.nav}>
      <ul>
        <li className={styles.title}>
          Noted.
        </li>
        <li className={styles.subtitle}>
            My Notes
        </li>
        <li>
            {/* <img src='../assets/menu.png'/> */}
            <BiMenu className={styles.menuIcon}/>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar