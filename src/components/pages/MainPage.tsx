import {BasePage} from "./BasePage";
import {Link} from "react-router-dom";

export const MainPage = () => {
    return (
        <BasePage>
            <div className="container">
                <div className='d-flex justify-content-center'>
                    <span style={{fontSize:22 + 'px'}}>Программа лояльности</span>
                </div>
                <div className='d-flex justify-content-center go-qr-banner mt-4'>
                    {/*<button className='btn btn-warning go-qr-banner-button'>Добавить чек</button>*/}
                    <Link style={{textDecoration:'none'}} to='/qr'>
                        <div className='go-qr-banner-button'>
                            <span >Получить или списать бонусы</span>
                        </div>
                    </Link>
                </div>
            </div>
        </BasePage>
    )
}