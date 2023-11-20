import { useEffect, useState } from "react";

export default function Table({ list, text, isCalc }) {
  const [replaceSym, setReplaceSym] = useState("");
  const [replaced, setReplaced] = useState({});

  useEffect(() => {
    setReplaceSym(text);
  }, [text]);

  const replaceNum = (sym, replacer) => {
    console.log(replaced);
    console.log(replaced.hasOwnProperty(sym));
    if (replaced.hasOwnProperty(sym)) {
      console.log(sym, replacer);

      if (replacer !== "") {
        setReplaceSym(replaceSym.replaceAll(replaced[sym], replacer));
        setReplaced((replaced[sym] = replacer));
      } else {
        setReplaceSym(replaceSym.replaceAll(replaced[sym], sym));
        setReplaced(delete replaced[sym]);
      }
    } else {
      const temp = {};
      temp[sym] = replacer;
      setReplaced(Object.assign({}, replaced, temp));
      setReplaceSym(() => {
        return replaceSym
          .split(" ")
          .map((el, i) => {
            if (el === sym) {
              return replacer;
            } else if (replaceSym[sym] !== "" && replacer === "" && el === replacer[sym]) {
              return sym;
            } else if (replaceSym[sym] !== "" && el === replaceSym[sym]) {
              return replacer;
            }
          })
          .join(" ");
      });
    }
  };

  return (
    <>
      <div className="table">
        {list
          .sort(
            (a, b) =>
              Number(a.slice(0, a.indexOf("-") - 1)) - Number(b.slice(0, b.indexOf("-") - 1))
          )
          .map((el) => {
            return (
              <div className="box" key={Number(el.slice(0, el.indexOf("-") - 1))}>
                <h3>{Number(el.slice(0, el.indexOf("-") - 1))}</h3>
                <input
                  type="text"
                  maxLength={1}
                  onChange={(e) => replaceNum(el.slice(0, el.indexOf("-") - 1), e.target.value)}
                />
              </div>
            );
          })}
      </div>

      {isCalc && <textarea className="resultText" disabled value={replaceSym}></textarea>}
    </>
  );
}
