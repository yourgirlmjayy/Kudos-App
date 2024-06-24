import './Header.css'
import appLogo from './Star-img.webp'

function Header() {
    return (
        <div className='app-header'>
                <img className='app-logo' src={appLogo} alt='appLogo'/>
                <h1 className='app-name'>KUDOS BOARD</h1>
        </div>
    )
}

export default Header;