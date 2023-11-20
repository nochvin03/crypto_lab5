import { useState } from "react";

export default function Form({ setFreq, setText }) {
  const [numberList, setNumberList] = useState([]);

  const calcFreq = () => {
    if (numberList === "") alert("The textarea is empty!");
    else {
      let tempList = numberList.replace(/[\r\n]+/g, " ");
      tempList = tempList.split(/[\s?¬—-]+/g);
      tempList = tempList.filter(
        (el) => el !== "" && el !== " " && ![",", ".", ":", "-", "¬", "—"].includes(el)
      );

      let countSym = 0;
      const result = tempList.reduce((acc, el) => {
        countSym++;
        acc[el] = (acc[el] || 0) + 1;
        return acc;
      }, {});

      let freq = [];
      for (let key in result) {
        freq.push(`${key} - ${result[key]}`);
      }

      freq.sort((a, b) => {
        return Number(b.slice(b.indexOf("-") + 1)) - Number(a.slice(a.indexOf("-") + 1));
      });

      setFreq(freq, countSym);
    }
  };

  return (
    <form>
      <textarea
        name=""
        id=""
        placeholder="Input your code"
        onChange={(e) => {
          setNumberList(e.target.value);
          setText(e.target.value.replace(/[\r\n]+/g, "\n"));
        }}></textarea>

      <input
        type="submit"
        value="Calculate frequency"
        onClick={(e) => {
          e.preventDefault();
          calcFreq();
        }}
      />
    </form>
  );
}
