import { useEffect, useState } from "react";

export default function Table({ list, text, isCalc }) {
  const alphabit = "абвгґдеєжзиіїйклмнопрстуфхцчшщьюя".split("");
  alphabit.push("");
  console.log(alphabit);
  const [replaceText, setReplaceText] = useState("");
  const [replaced, setReplaced] = useState({});

  useEffect(() => {
    setReplaceText(text);
  }, [text]);

  const replaceNum = (sym, replacer) => {
    if (!replaced.hasOwnProperty(sym)) {
      const tempObj = {};
      tempObj[sym] = replacer;
      setReplaced((prev) => Object.assign({ ...prev }, tempObj));

      setReplaceText((prev) =>
        prev
          .split(" ")
          .map((item) => (item === sym ? replacer : item))
          .join(" ")
      );
    } else {
      setReplaceText(
        replaceText
          .split(" ")
          .map((item) => {
            if (item === replaced[sym]) {
              if (replacer === "") {
                return sym;
              } else return replacer;
            } else return item;
          })
          .join(" ")
      );

      const temp = replaced;
      delete temp[sym];
      setReplaced(temp);
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
                  onChange={(e) => {
                    if (!alphabit.includes(e.target.value.toLowerCase())) {
                      alert("This isn't letter");
                      e.target.value = "";
                      return 0;
                    }

                    for (const key in replaced) {
                      if (replaced[key] === e.target.value) {
                        alert("This letter already used!");
                        e.target.value = "";
                        return 0;
                      }
                    }
                    replaceNum(el.slice(0, el.indexOf("-") - 1), e.target.value);
                  }}
                />
              </div>
            );
          })}
      </div>

      {isCalc && <textarea className="resultText" disabled value={replaceText}></textarea>}
    </>
  );
}
