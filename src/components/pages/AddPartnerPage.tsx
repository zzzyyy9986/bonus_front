import { useState } from "react";
import { BasePage } from "./BasePage";
import axios from "axios";
import {serverUrl} from "../../env";

interface partner {
  name: string;
  inn: string;
  percent: string;
}

const setFormValue = (e, setF) => {
  setF((previous) => {
    return {
      ...previous,
      [e.target.name]: e.target.value,
    };
  });
};
export const AddPartnerPage = () => {
  const [partner, setPartner]: [partner, Function] = useState({} as partner);
  const sendForm = (e) => {
      e.preventDefault()
      axios.post(serverUrl + '/addPartner',{
          partner
      })
  }
  return (
    <BasePage>
      <div className="container-fluid">
        <h3 className="mt-2">Добавление партнеров</h3>
        <hr />
        <form action="" onSubmit={sendForm}>
          <div className="mb-2 mt-2">
            <input
              type="text"
              name="name"
              onChange={(e) => {
                setFormValue(e, setPartner);
              }}
              required
              className="form-control"
              value={partner.name}
              placeholder={"Введите название организации"}
            />
          </div>
          <div className="mb-2">
            <input
              name="inn"
              onChange={(e) => setFormValue(e, setPartner)}
              type="text"
              required
              className="form-control"
              value={partner.inn}
              placeholder={"Введите инн организации"}
            />
          </div>
          <div className="mb-2">
            <input
              type="number"
              name="percent"
              onChange={(e) => setFormValue(e, setPartner)}
              required
              className="form-control"
              value={partner.percent}
              placeholder={"Введите процент бонуса"}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button type='submit' className="btn btn-warning">Сохранить</button>
          </div>
        </form>
      </div>
    </BasePage>
  );
};
