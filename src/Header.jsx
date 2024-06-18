import './Header.css'
import appLogo from './Star-img.webp'

function Header() {
    return (
        <>
            <div className='header-container'>
                <img className='app-logo' src={appLogo} alt='appLogo'/>
                <h1 className='app-name'>KUDOSBOARD</h1>
            </div>
        </>
    )
}

export default Header;