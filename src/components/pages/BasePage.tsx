import {Link} from "react-router-dom";
import {useEffect} from "react";

export const BasePage = ({children}) => {
    const userMedia = async function getMedia(constraints) {
        let stream = null;

        try {
            stream = await navigator.mediaDevices.getUserMedia(constraints);
            /* use the stream */
        } catch (err) {
            /* handle the error */
        }
    }

    useEffect(() => {
        // userMedia({
        //     audio: true,
        //     video: true,
        // })
    })
    return (
        <div className='container-fluid' >
            {/*<div className="row">*/}
            {/*    <div className="profile d-flex">*/}
            {/*        <div className="profile-item profile-img">*/}
            {/*            <img src=''/>*/}
            {/*        </div>*/}
            {/*        <div className="profile-item profile-name">*/}
            {/*            <span>Константин</span>*/}
            {/*        <br/>*/}
            {/*            <span>Константинопольский</span>*/}
            {/*        </div>*/}
            {/*        <div className="profile-item profile-bonuses">*/}
            {/*            <span className='profile-bonuses-number'>*/}
            {/*                0*/}
            {/*            </span>*/}
            {/*            <br/>*/}
            {/*            <span className='profile-bonuses-text'>*/}
            {/*                Бонусы*/}
            {/*            </span>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className='row' >
                {children}
            </div>
            <div className="row" >

                <nav className="mobile-nav menu d-flex">
                    <Link to={'/main'} style={{textDecoration:'none'}} className="menu-item">
                        <div className="menu-item-icon d-flex justify-content-center">
                            <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.375 14.2244C3.375 11.7065 3.375 10.4481 3.947 9.4053C4.5168 8.3614 5.5607 7.7146 7.6474 6.4188L9.8474 5.0537C12.0529 3.6842 13.1562 3 14.375 3C15.5938 3 16.696 3.6842 18.9026 5.0537L21.1026 6.4188C23.1893 7.7146 24.2332 8.3614 24.8041 9.4053C25.375 10.4481 25.375 11.7065 25.375 14.2233V15.8975C25.375 20.1875 25.375 22.3336 24.0858 23.6668C22.7977 25 20.7231 25 16.575 25H12.175C8.0269 25 5.9523 25 4.6642 23.6668C3.375 22.3336 3.375 20.1886 3.375 15.8975V14.2244Z" stroke="#7D7D86" stroke-width="1.5"/>
                                <path d="M14.375 17V20" stroke="#7D7D86" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div className="menu-item-text">
                            Главная
                        </div>
                    </Link>


                    <div className="menu-item">
                        <div className="menu-item-icon d-flex justify-content-center">
                            <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3.875" width="22.25" height="19.25" rx="4.125" stroke="#7D7D86" stroke-width="1.75"/>
                                <path d="M8.125 10C8.125 10 12.25 14.5 14.125 14.5C16 14.5 20.125 10 20.125 10" stroke="#7D7D86" stroke-width="1.75" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div className="menu-item-text">
                            Сообщения
                        </div>
                    </div>
                    <div className="menu-item" style={{marginTop: 0.4 + 'rem'}}>
                        <Link to='/qr' className="menu-item-icon d-flex justify-content-center">
                            <img style={{width:50 + 'px',height:50 + 'px'}} src='/scan.png'/>
                        </Link>
                    </div>

                    <div className="menu-item">
                        <div className="menu-item-icon d-flex justify-content-center">
                            <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.75 7C15.75 6.76794 15.6578 6.54538 15.4937 6.38128C15.3296 6.21719 15.1071 6.125 14.875 6.125C14.6429 6.125 14.4204 6.21719 14.2563 6.38128C14.0922 6.54538 14 6.76794 14 7V11.6667C14 11.8987 14.0922 12.1213 14.2563 12.2854C14.4204 12.4495 14.6429 12.5417 14.875 12.5417C15.1071 12.5417 15.3296 12.4495 15.4937 12.2854C15.6578 12.1213 15.75 11.8987 15.75 11.6667V7Z" fill="#7D7D86"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83335 10.5C5.83335 8.10198 6.78595 5.8022 8.4816 4.10656C10.1772 2.41091 12.477 1.45831 14.875 1.45831C17.273 1.45831 19.5728 2.41091 21.2684 4.10656C22.9641 5.8022 23.9167 8.10198 23.9167 10.5V11.3213C23.9167 12.1345 24.157 12.929 24.6085 13.6056L25.9479 15.6158C27.5042 17.9491 26.3165 21.1201 23.611 21.8575C22.7302 22.0978 21.8412 22.3008 20.9464 22.4676L20.944 22.4735C20.0469 24.8675 17.6494 26.5416 14.875 26.5416C12.1007 26.5416 9.70319 24.8675 8.80602 22.4735L8.80369 22.4676C7.90747 22.3009 7.01849 22.0973 6.13902 21.8575C3.43352 21.1201 2.24585 17.9491 3.80219 15.6158L5.14152 13.6056C5.59256 12.9292 5.83329 12.1344 5.83335 11.3213V10.5ZM10.9352 22.7931C13.552 23.1058 16.1968 23.1058 18.8137 22.7931C17.9854 23.9843 16.5422 24.7916 14.875 24.7916C13.2079 24.7916 11.7647 23.9843 10.9352 22.7931ZM14.875 3.20831C12.9412 3.20831 11.0865 3.97654 9.71903 5.34399C8.35158 6.71145 7.58335 8.56611 7.58335 10.5V11.3213C7.58325 12.4798 7.24023 13.6124 6.59752 14.5763L5.25819 16.5865C5.05091 16.8974 4.92048 17.253 4.87766 17.6242C4.83483 17.9954 4.88083 18.3714 5.01186 18.7213C5.14289 19.0713 5.3552 19.385 5.6313 19.6368C5.90739 19.8885 6.23937 20.071 6.59985 20.1693C12.0181 21.647 17.7331 21.647 23.1514 20.1693C23.5118 20.0712 23.8438 19.8888 24.1199 19.6372C24.396 19.3856 24.6083 19.0719 24.7394 18.7221C24.8704 18.3722 24.9164 17.9962 24.8736 17.6251C24.8308 17.254 24.7003 16.8984 24.493 16.5876L23.1514 14.5763C22.5091 13.6123 22.1665 12.4797 22.1667 11.3213V10.5C22.1667 8.56611 21.3985 6.71145 20.031 5.34399C18.6636 3.97654 16.8089 3.20831 14.875 3.20831Z" fill="#7D7D86"/>
                            </svg>
                        </div>
                        <div className="menu-item-text">
                            Уведомления
                        </div>
                    </div>

                    <div className="menu-item">
                        <div className="menu-item-icon d-flex justify-content-center">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 6.41665L13.37 7.02332C13.4516 7.108 13.5495 7.17536 13.6577 7.22137C13.766 7.26738 13.8824 7.29109 14 7.29109C14.1176 7.29109 14.234 7.26738 14.3423 7.22137C14.4505 7.17536 14.5484 7.108 14.63 7.02332L14 6.41665ZM10.997 21.3757C9.22831 19.9815 7.29515 18.62 5.76098 16.8933C4.25831 15.1993 3.20831 13.2242 3.20831 10.6598H1.45831C1.45831 13.7702 2.75331 16.1431 4.45315 18.0553C6.12148 19.9336 8.24948 21.4387 9.91315 22.75L10.997 21.3757ZM3.20831 10.6598C3.20831 8.15148 4.62581 6.04682 6.56131 5.16132C8.44198 4.30148 10.969 4.52898 13.37 7.02332L14.63 5.81115C11.7833 2.85132 8.47465 2.36248 5.83331 3.56998C3.25031 4.75182 1.45831 7.49582 1.45831 10.6598H3.20831ZM9.91315 22.75C10.5116 23.2213 11.1533 23.723 11.8031 24.1033C12.453 24.4825 13.195 24.7917 14 24.7917V23.0417C13.6383 23.0417 13.2136 22.9016 12.6863 22.5925C12.1578 22.2845 11.6106 21.8598 10.997 21.3757L9.91315 22.75ZM18.0868 22.75C19.7505 21.4375 21.8785 19.9348 23.5468 18.0553C25.2466 16.142 26.5416 13.7702 26.5416 10.6598H24.7916C24.7916 13.2242 23.7416 15.1993 22.239 16.8933C20.7048 18.62 18.7716 19.9815 17.003 21.3757L18.0868 22.75ZM26.5416 10.6598C26.5416 7.49582 24.7508 4.75182 22.1666 3.56998C19.5253 2.36248 16.219 2.85132 13.37 5.80998L14.63 7.02332C17.031 4.53015 19.558 4.30148 21.4386 5.16132C23.3741 6.04682 24.7916 8.15032 24.7916 10.6598H26.5416ZM17.003 21.3757C16.3893 21.8598 15.8421 22.2845 15.3136 22.5925C14.7863 22.9005 14.3616 23.0417 14 23.0417V24.7917C14.805 24.7917 15.547 24.4825 16.1968 24.1033C16.8478 23.723 17.4883 23.2213 18.0868 22.75L17.003 21.3757Z" fill="#7D7D86"/>
                            </svg>
                        </div>
                        <div className="menu-item-text">
                            Избранное
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}