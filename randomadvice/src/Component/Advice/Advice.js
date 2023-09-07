import React, { useEffect, useState } from "react";
import "./Advice.css";
import Design from "../../images/pattern-divider-desktop.svg";
import btnImg from "../../images/icon-dice.svg";
import { config } from "../../config";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

export default function Advice() {
  const [data, setData] = useState("");

  const fetchData = async () => {
    try {
      let response = await axios.get(`${config.backendEndpoint}`);
      setData(response.data);
    } catch (error) {
      enqueueSnackbar("error", { variant: "error" });
    }
  };

  const handleDisplayData = () => {
    fetchData();
  };

  useEffect(() => {
    enqueueSnackbar("Click on dice to generate advice", { variant: "info" });
  }, []);

  return (
    <>
      <div class="card">
        <div class="card-container">
          <div class="advice">
            <p style={{ color: "hsl(150, 100%, 66%)", maxWidth: "auto" }}>
              ADVICE #
              <span id="advice-id">{data !== "" ? data.slip.id : ""}</span>
            </p>
            <p
              style={{
                color: "white",
                height: "20px",
                width: "auto",
                fontWeight: "500",
                fontFamily: "Times New Roman",
              }}
            >
              "
              <span id="random-advice">
                {data !== "" ? data.slip.advice : ""}
              </span>
              "
            </p>
          </div>
          <div id="desktop-divider">
            <img
              src={Design}
              alt="Design-logo"
              style={{ width: "300px", objectFit: "cover" }}
            />
          </div>
          <div class="button">
            <button id="advice-btn" onClick={handleDisplayData}>
              <img src={btnImg} alt="btn-dice-icon" style={{ width: "18px" }} />
            </button>
          </div>
        </div>
      </div>

      <div class="attribution">Coded by Karthik</div>
    </>
  );
}
