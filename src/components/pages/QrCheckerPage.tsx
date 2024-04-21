import {useEffect, useState} from "react";
import QrScanner from "./QrScanner";
import axios from "axios";
import { serverUrl } from "../../env";
import { BasePage } from "./BasePage";
import { TaxResponse } from "../../common/interfaces/TaxResponse";
import { FrontTaxInfo } from "../../common/interfaces/FrontTaxInfo";
import {Link, useNavigate} from "react-router-dom";
import { ResponseStatuses } from "../../common/enums/ResponseStatuses";

export const QrCheckerPage = () => {
  const [qrStr, setQrStr] = useState("");
  const [bonusData, setBonusData]: [FrontTaxInfo, Function] = useState(
    {} as FrontTaxInfo,
  );
  const [cameraButtonLabel,setCameraButtonLabel] = useState("Стоп")

  const hideButtons = () => {
    const startButtton = document.getElementById("html5-qrcode-button-camera-start");
    const closeButton = document.getElementById("html5-qrcode-button-camera-stop")
    if(startButtton && startButtton.style.display !== 'none'){
      startButtton.style.visibility = 'hidden';
      setCameraButtonLabel("Стоп")
    }
    if (closeButton && closeButton.style.display !== 'none'){
      closeButton.style.visibility = 'hidden';
      setCameraButtonLabel("Старт")
    }
  }

  useEffect(() => {
    // hideButtons()
    setTimeout(() => {
      hideButtons()
      // document.getElementById("html5-qrcode-button-camera-start").style.visibility = 'hidden'
      // document.getElementById("html5-qrcode-button-camera-stop").style.visibility = 'hidden'

    },500)
  },[])

  const manageScanning = () => {


    let startButton = document.getElementById("html5-qrcode-button-camera-start")
    if(startButton && document.getElementById("html5-qrcode-button-camera-start").style.display !== 'none'){
      document.getElementById("html5-qrcode-button-camera-start").click()
    }
    else {
      document.getElementById("html5-qrcode-button-camera-stop").click()
    }
    hideButtons()
  }
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState("");
  // const [qrBlocker,setQrBlocker]
  const onNewScanResult = async (decodedText, decodedResult) => {
    // alert(decodedText)
    // alert('df')
    setQrStr(decodedText);
    document.getElementById("html5-qrcode-button-camera-stop").click();
    // return ;
    const nalogAnswer = await axios.post(serverUrl + "/nalog", {
      // qrraw:"t=20240131T2126&s=47718.00&fn=7284440500275777&i=4044&fp=1511848317&n=1"
      qrraw: decodedText,
    });
    const taxInfo: FrontTaxInfo = nalogAnswer.data.data;
    setBonusData({ ...taxInfo });
    // handle decoded results here
  };
  const addBonuses = async () => {
    const addBonusReqRes = await axios.post(serverUrl + "/addBonuses", {
      qrraw: qrStr,
    });
    if (addBonusReqRes.data.status === ResponseStatuses.ok) {
      setServerMessage("Успешно добавили бонусы! Перенаправляем на главную...");
      setTimeout(() => {
        navigate("/main");
      }, 3000);
    }
    console.log(addBonusReqRes);
  };
  return (
    <div>
      <div className="qr-container">
        <div>
          <QrScanner
            fps={60}
            qrbox={400}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
          />
          {bonusData.store !== undefined && (
            <>
              <div className="d-flex justify-content-center">
              </div>
              <div className="d-flex justify-content-center mt-3">
                <div className="card" style={{ width: 18 + "rem" }}>
                  <div className="card-body">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>Магазин:</td>
                          <td>{bonusData.store}</td>
                        </tr>
                        <tr>
                          <td>Сумма:</td>
                          <td>{bonusData.sum.toLocaleString() + " ₽"}</td>
                        </tr>
                        <tr>
                          <td>Процент:</td>
                          <td>
                            {bonusData?.percent ? bonusData.percent + "%" : ""}
                          </td>
                        </tr>
                        <tr>
                          <td>Всего:</td>
                          <td >{bonusData.bonuses.toLocaleString() + " бонусов"}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className='bonus-btn' onClick={addBonuses}>
                      Зачислить
                    </div>
                  </div>
                </div>
              </div>
              {serverMessage != "" && (
                <div className="alert alert-success mt-2">{serverMessage}</div>
              )}
            </>
          )}
          {bonusData?.store === undefined && (
              <div className='d-flex justify-content-center'>
                <div className="lds-spinner">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
          )}
        </div>
      </div>

      <div className="qr-menu d-flex justify-content-around">
        <div className="qr-menu-item">
          <Link to={'/main'}>
            <div className="qr-menu-item-img">
              <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.198 2.5H33.8C35.834 2.5 37.234 2.5 38.412 2.908C39.513 3.29682 40.5095 3.93435 41.324 4.77102C42.1385 5.60769 42.749 6.62095 43.108 7.732C43.5 8.926 43.498 10.346 43.498 12.452V40.748C43.498 43.68 40.044 45.424 37.77 43.342C37.6971 43.2722 37.6 43.2332 37.499 43.2332C37.3981 43.2332 37.301 43.2722 37.228 43.342L36.26 44.226C34.404 45.926 31.592 45.926 29.736 44.226C29.4001 43.9123 28.9576 43.7379 28.498 43.7379C28.0384 43.7379 27.596 43.9123 27.26 44.226C25.404 45.926 22.592 45.926 20.736 44.226C20.4001 43.9123 19.9576 43.7379 19.498 43.7379C19.0384 43.7379 18.596 43.9123 18.26 44.226C16.404 45.926 13.592 45.926 11.736 44.226L10.77 43.342C10.697 43.2716 10.5995 43.2323 10.498 43.2323C10.3966 43.2323 10.2991 43.2716 10.226 43.342C7.95205 45.422 4.49805 43.68 4.49805 40.748V12.454C4.49805 10.346 4.49805 8.926 4.88805 7.732C5.24699 6.62087 5.85745 5.60755 6.67194 4.77086C7.48642 3.93417 8.48297 3.29668 9.58405 2.908C10.764 2.498 12.164 2.5 14.198 2.5ZM14.488 5.5C12.046 5.5 11.204 5.52 10.568 5.742C9.90352 5.97961 9.3027 6.36719 8.81224 6.87464C8.32178 7.38209 7.95489 7.99576 7.74005 8.668C7.51805 9.344 7.50005 10.236 7.50005 12.74V40.748C7.50005 40.988 7.61805 41.132 7.76805 41.202C7.83649 41.2346 7.91278 41.2471 7.98805 41.238C8.06923 41.2249 8.14417 41.1864 8.20205 41.128C8.82787 40.5519 9.64742 40.2321 10.498 40.2321C11.3487 40.2321 12.1682 40.5519 12.794 41.128L13.76 42.012C14.096 42.3257 14.5384 42.5001 14.998 42.5001C15.4576 42.5001 15.9001 42.3257 16.236 42.012C17.1249 41.193 18.2894 40.7383 19.498 40.7383C20.7067 40.7383 21.8712 41.193 22.76 42.012C23.096 42.3257 23.5384 42.5001 23.998 42.5001C24.4576 42.5001 24.9001 42.3257 25.236 42.012C26.1249 41.193 27.2894 40.7383 28.498 40.7383C29.7067 40.7383 30.8712 41.193 31.76 42.012C32.096 42.3257 32.5384 42.5001 32.998 42.5001C33.4576 42.5001 33.9001 42.3257 34.236 42.012L35.202 41.128C35.8279 40.5519 36.6474 40.2321 37.498 40.2321C38.3487 40.2321 39.1682 40.5519 39.794 41.128C39.88 41.208 39.954 41.232 40.01 41.238C40.0846 41.2467 40.1602 41.2342 40.228 41.202C40.378 41.132 40.498 40.986 40.498 40.748V12.74C40.498 10.236 40.478 9.344 40.258 8.666C40.0425 7.99371 39.6749 7.38017 39.1837 6.87305C38.6926 6.36593 38.0911 5.97889 37.426 5.742C36.792 5.522 35.95 5.502 33.508 5.502L14.488 5.5ZM12.5 15C12.5 14.6022 12.6581 14.2206 12.9394 13.9393C13.2207 13.658 13.6022 13.5 14 13.5H15C15.3979 13.5 15.7794 13.658 16.0607 13.9393C16.342 14.2206 16.5 14.6022 16.5 15C16.5 15.3978 16.342 15.7794 16.0607 16.0607C15.7794 16.342 15.3979 16.5 15 16.5H14C13.6022 16.5 13.2207 16.342 12.9394 16.0607C12.6581 15.7794 12.5 15.3978 12.5 15ZM19.5 15C19.5 14.6022 19.6581 14.2206 19.9394 13.9393C20.2207 13.658 20.6022 13.5 21 13.5H34C34.3979 13.5 34.7794 13.658 35.0607 13.9393C35.342 14.2206 35.5 14.6022 35.5 15C35.5 15.3978 35.342 15.7794 35.0607 16.0607C34.7794 16.342 34.3979 16.5 34 16.5H21C20.6022 16.5 20.2207 16.342 19.9394 16.0607C19.6581 15.7794 19.5 15.3978 19.5 15ZM12.5 22C12.5 21.6022 12.6581 21.2206 12.9394 20.9393C13.2207 20.658 13.6022 20.5 14 20.5H15C15.3979 20.5 15.7794 20.658 16.0607 20.9393C16.342 21.2206 16.5 21.6022 16.5 22C16.5 22.3978 16.342 22.7794 16.0607 23.0607C15.7794 23.342 15.3979 23.5 15 23.5H14C13.6022 23.5 13.2207 23.342 12.9394 23.0607C12.6581 22.7794 12.5 22.3978 12.5 22ZM19.5 22C19.5 21.6022 19.6581 21.2206 19.9394 20.9393C20.2207 20.658 20.6022 20.5 21 20.5H34C34.3979 20.5 34.7794 20.658 35.0607 20.9393C35.342 21.2206 35.5 21.6022 35.5 22C35.5 22.3978 35.342 22.7794 35.0607 23.0607C34.7794 23.342 34.3979 23.5 34 23.5H21C20.6022 23.5 20.2207 23.342 19.9394 23.0607C19.6581 22.7794 19.5 22.3978 19.5 22ZM12.5 29C12.5 28.6022 12.6581 28.2206 12.9394 27.9393C13.2207 27.658 13.6022 27.5 14 27.5H15C15.3979 27.5 15.7794 27.658 16.0607 27.9393C16.342 28.2206 16.5 28.6022 16.5 29C16.5 29.3978 16.342 29.7794 16.0607 30.0607C15.7794 30.342 15.3979 30.5 15 30.5H14C13.6022 30.5 13.2207 30.342 12.9394 30.0607C12.6581 29.7794 12.5 29.3978 12.5 29ZM19.5 29C19.5 28.6022 19.6581 28.2206 19.9394 27.9393C20.2207 27.658 20.6022 27.5 21 27.5H34C34.3979 27.5 34.7794 27.658 35.0607 27.9393C35.342 28.2206 35.5 28.6022 35.5 29C35.5 29.3978 35.342 29.7794 35.0607 30.0607C34.7794 30.342 34.3979 30.5 34 30.5H21C20.6022 30.5 20.2207 30.342 19.9394 30.0607C19.6581 29.7794 19.5 29.3978 19.5 29Z"
                    fill="#AEAEB8"
                />
              </svg>
            </div>
            <div className="qr-menu-item-text">
              <span >История</span>
            </div>
          </Link>
        </div>
        <div className="qr-menu-item" onClick={manageScanning}>
          <div className="qr-menu-item-img">
            <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_56_872)">
                <circle cx="32" cy="28" r="28" fill="#CBCBCE" />
              </g>
              <defs>
                <filter
                    id="filter0_d_56_872"
                    x="0"
                    y="0"
                    width="64"
                    height="64"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_56_872"
                  />
                  <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_56_872"
                      result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <div className="qr-menu-item-text" >
            <span >{cameraButtonLabel}</span>
          </div>
        </div>
        <div className="qr-menu-item">
          <div className="qr-menu-item-img">
            <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M3.5 24.5C3.5 17.9008 3.5 14.6002 5.551 12.551C7.60025 10.5 10.9008 10.5 17.5 10.5H24.5C31.0992 10.5 34.3997 10.5 36.449 12.551C38.5 14.6002 38.5 17.9008 38.5 24.5C38.5 31.0992 38.5 34.3997 36.449 36.449C34.3997 38.5 31.0992 38.5 24.5 38.5H17.5C10.9008 38.5 7.60025 38.5 5.551 36.449C3.5 34.3997 3.5 31.0992 3.5 24.5Z"
                  stroke="#AEAEB8"
                  stroke-width="3"
              />
              <path
                  d="M7 12.25L6.979 10.5C7.175 8.87075 7.58625 7.7455 8.44375 6.88975C10.0888 5.25 12.7383 5.25 18.0373 5.25H23.6565C28.9555 5.25 31.6033 5.25 33.25 6.88975C34.1075 7.7455 34.5188 8.87075 34.7148 10.5V12.25"
                  stroke="#AEAEB8"
                  stroke-width="3"
              />
              <path
                  d="M30.625 21C32.0747 21 33.25 19.8247 33.25 18.375C33.25 16.9253 32.0747 15.75 30.625 15.75C29.1753 15.75 28 16.9253 28 18.375C28 19.8247 29.1753 21 30.625 21Z"
                  stroke="#AEAEB8"
                  stroke-width="2"
              />
              <path
                  d="M3.5 25.3748L6.566 22.6921C7.33449 22.0202 8.32955 21.6654 9.34976 21.6995C10.37 21.7336 11.3391 22.1541 12.061 22.8758L19.5685 30.3833C20.1511 30.9658 20.9205 31.3241 21.7412 31.3951C22.562 31.4662 23.3815 31.2455 24.0555 30.7718L24.5788 30.4043C25.551 29.7214 26.7262 29.3886 27.9122 29.4601C29.0982 29.5316 30.2248 30.0033 31.108 30.7981L36.75 35.8748"
                  stroke="#AEAEB8"
                  stroke-width="3"
                  stroke-linecap="round"
              />
            </svg>
          </div>
          <div className="qr-menu-item-text">
            <span >Галерея</span>
          </div>
        </div>
      </div>
    </div>
  );
};
