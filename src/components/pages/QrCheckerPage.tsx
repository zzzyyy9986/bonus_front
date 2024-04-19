import { useState} from "react";
import QrScanner from "./QrScanner";


export const QrCheckerPage = () => {
    const [data, setData] = useState('No result');

    const onNewScanResult = (decodedText, decodedResult) => {
        // alert(decodedText)
        // handle decoded results here
    };
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-4">
                    меню
                </div>
                <div className="col-md-8">
                    <QrScanner
                        fps={10}
                        qrbox={400}
                        disableFlip={false}
                        qrCodeSuccessCallback={onNewScanResult}
                    />
                </div>
            </div>
        </div>
    )
}