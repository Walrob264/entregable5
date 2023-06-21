import React, { useEffect, useRef, useState } from "react";

const Pagination = ({ pag, setPag, max }) => {
  const [NumbersPag, setNumbersPag] = useState([]);

  useEffect(() => {
    const tmpArray = [];
    for (let n = 0; n < max; n++) {
      tmpArray.push(n);
    }
    console.log(tmpArray.slice(pag, Math.min(pag + 5, max)));
    setNumbersPag(tmpArray);
  }, [max, pag]);

  const handlePlusPag = () => {
    setPag(pag + 1);
  };
  const handleMinusPag = () => {
    setPag(pag - 1);
  };

  const handlePag = (pageNumber) => {
    const numberInThePage = Number(pageNumber);
    setPag(numberInThePage);
  };

  return (
    <div className="containt_pagination">
      {pag > 1 && (
        <button className="button_minus" onClick={handleMinusPag}>
          <i class="bx bx-left-arrow-alt"></i>
        </button>
      )}
      {NumbersPag.length > 0 &&
        NumbersPag.slice(pag, Math.min(pag + 5, max)).map((numberPag) => (
          <button
            className={pag < 2 ? "FirstPage" : "numberForPage "}
            onClick={() => handlePag(numberPag)}
            key={numberPag}
          >
            {numberPag}
          </button>
        ))}
      {pag <= max && (
        <button className="button_plus" onClick={handlePlusPag}>
          <i className="bx bx-right-arrow-alt"></i>
        </button>
      )}
    </div>
  );
};

export default Pagination;
