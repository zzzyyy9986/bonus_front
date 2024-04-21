import {BasePage} from "./BasePage";
import {Link} from "react-router-dom";
import axios from "axios";
import {serverUrl} from "../../env";
import {useEffect, useState} from "react";
import {IHistoryItem} from "../../common/interfaces/IHistoryItem";

export const MainPage = () => {
    const [historyItems,setHistoryItems]:[IHistoryItem[],Function] = useState([])
    const getHistoryItems = async () => {
        const historyItemsResp = await axios.get(serverUrl + "/getHistoryItems");
        setHistoryItems(historyItemsResp.data.data)
        // console.log(historyItemsResp)
    }
    useEffect(() => {
        getHistoryItems()
    },[])
    return (
        <BasePage>
            <div className="container">
                <div className='d-flex justify-content-center'>
                    <span style={{fontSize:22 + 'px'}}>Программа лояльности</span>
                </div>
                <div>
                    <Link style={{textDecoration:'none'}} to='/qr'>
                    <div className="get-bonuses">
                        <p>Получить или списать бонусы</p>
                        <img src="/qr.png" alt="QR code" width="56" height="56"/>
                    </div>
                </Link>

                <h2>История бонусов</h2>
                    <div className="subtitle-wrapper">
                        <span className="subtitle">Магазин, дата</span>
                        <span className="subtitle" style={{float:'right'}}>Движение бонусов</span>
                    </div>
                    <div className="list-of-history-items">
                        {historyItems.map(el => {
                            const currentDate = new Date(el.time * 1000);
                            let currentD = new Date().toJSON().slice(0, 10);
                            return (
                                <div className="history-item">
                                    <div className="history-item-wrapper">
                                        <p className="org">{el?.partner[0]?.name}</p>
                                        <p className="date-time">{ currentD + ' в ' + currentDate.toLocaleTimeString()}</p>
                                    </div>
                                    <span className="history-bonus-positive">{'+' + el.bonuses.toFixed(2)}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </BasePage>
    )
}