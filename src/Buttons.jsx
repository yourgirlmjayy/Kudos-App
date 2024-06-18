import './Buttons.css'

function Buttons(){
    return (
        <>
        <div className='button-container'>
            <a href=""><button>All</button></a>
            <a href=""><button>Recent</button></a>
            <a href=""><button>Celebration</button></a>
            <a href=""><button>Thank You</button></a>
            <a href=""><button>Inspiration</button></a>
        </div>
        {/* //Create seperate div for center button */}
        <div className='centre-button'>
            <a href=""><button>Create a new Board</button></a>
        </div>
        </>
    )
}
export default Buttons;