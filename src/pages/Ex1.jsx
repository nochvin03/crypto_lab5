import Form from "../components/Form";
import React, { useState } from "react";
import Table from "../components/Table";

export default function Ex1() {
  const [text, setText] = useState("");
  const [numberFrequency, setNumberFruquency] = useState([]);
  const [countFrequency, setCountFrequency] = useState(0);
  const [isCalc, setIsCalc] = useState(false);

  const fetchFreq = (freq, countSym = 0) => {
    setNumberFruquency(freq);
    setCountFrequency(countSym);
    setIsCalc(true);
  };

  return (
    <>
      <h2>Frequency analisys by Kuzko Andrii</h2>

      <Form setFreq={fetchFreq} setText={setText} />

      <div>
        {numberFrequency &&
          numberFrequency.map((el, i) => {
            return (
              <div key={el}>
                {el}
                {/* ({(el.split(" - ")[1] / countFrequency).toFixed(4)}%) */}
              </div>
            );
          })}
      </div>
      <h3>Total symbols: {countFrequency}</h3>

      <Table list={numberFrequency} text={text} isCalc={isCalc} />
    </>
  );
}
