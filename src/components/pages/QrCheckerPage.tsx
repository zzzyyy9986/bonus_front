import { useState} from "react";
import QrScanner from "./QrScanner";
import axios from "axios";
import {serverUrl} from "../../env";
import {BasePage} from "./BasePage";
import {TaxResponse} from "../../common/interfaces/TaxResponse";
import {FrontTaxInfo} from "../../common/interfaces/FrontTaxInfo";
import {useNavigate} from "react-router-dom";
import {ResponseStatuses} from "../../common/enums/ResponseStatuses";


export const QrCheckerPage = () => {
    const [qrStr, setQrStr] = useState('');
    const [bonusData,setBonusData]:[FrontTaxInfo,Function] = useState({} as FrontTaxInfo)
    const navigate = useNavigate();
    const [serverMessage,setServerMessage] = useState("")
    // const [qrBlocker,setQrBlocker]
    const onNewScanResult = async (decodedText, decodedResult) => {
        // alert(decodedText)
        // alert('df')
        setQrStr(decodedText)
        document.getElementById("html5-qrcode-button-camera-stop").click()
        // return ;
        const nalogAnswer  = await axios.post(serverUrl + '/nalog',{
            // qrraw:"t=20240131T2126&s=47718.00&fn=7284440500275777&i=4044&fp=1511848317&n=1"
            qrraw:decodedText
        })
        const taxInfo:FrontTaxInfo = nalogAnswer.data.data;
        setBonusData({...taxInfo})
        // handle decoded results here
    };
    const addBonuses = async () => {
        const addBonusReqRes = await axios.post(serverUrl + '/addBonuses',{
            qrraw:qrStr
        })
        if(addBonusReqRes.data.status === ResponseStatuses.ok){
            setServerMessage("Успешно добавили бонусы! Перенаправляем на главную...")
            setTimeout(() => {
                navigate("/main")
            },3000)
        }
        console.log(addBonusReqRes)
    }
    return (
        // <div className='container'>
            <BasePage>
                <div>
                    <QrScanner
                        fps={60}
                        qrbox={400}
                        disableFlip={false}
                        qrCodeSuccessCallback={onNewScanResult}
                    />
                    {
                        bonusData.store !== undefined && <>


                            <table className='table'>
                                <tbody>
                                <tr>
                                    <td>
                                        Магазин:
                                    </td>
                                    <td>
                                        {bonusData.store}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Сумма:
                                    </td>
                                    <td>
                                        {bonusData.sum.toLocaleString() + ' ₽'}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Процент:
                                    </td>
                                    <td>
                                        {bonusData?.percent?bonusData.percent + '%': ''}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Итого:
                                    </td>
                                    <td>
                                        {bonusData.bonuses.toLocaleString() + ' B'}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div className='d-flex justify-content-center'>
                                <button className='btn btn-warning' onClick={addBonuses}>
                                    Зачислить
                                </button>
                            </div>
                            {serverMessage != '' && <div className='alert alert-success mt-2'>
                                {serverMessage}
                            </div>}
                        </>
                    }
                </div>
            </BasePage>
            // {/*<div className="row">*/}
            // {/*    <div className="col-md-4">*/}
            // {/*        меню*/}
            // {/*    </div>*/}
            // {/*    <div className="col-md-8">*/}
            // {/*        <QrScanner*/}
            // {/*            fps={60}*/}
            // {/*            qrbox={400}*/}
            // {/*            disableFlip={false}*/}
            // {/*            qrCodeSuccessCallback={onNewScanResult}*/}
            // {/*        />*/}
            // {/*    </div>*/}
            // {/*</div>*/}
        // </div>
    )
}