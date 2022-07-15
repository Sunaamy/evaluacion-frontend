import React, { useCallback, useState } from "react";

const StockPrice = ({ stocks }) => {
  if (!stocks || !stocks.length) {
    return (
      <div className="stock-list row --none">
        <p className="col-12">No hay acciones que mostrar.</p>
      </div>
    );
  }
  function getQuantity(symbol, targets) {
    var quantity = 0;

    switch (symbol) {
      case "NTAP":
        quantity = targets.NTAP;
        break;

      case "GOOG":
        quantity = targets.GOOG;
        break;

      case "AAPL":
        quantity = targets.AAPL;
        break;
      default:
        quantity = 0;
        break;
    }
    return quantity;
  }

  const [targets, setTargets] = useState();

  const buyClick = useCallback(
    (symbol, quantity) => () => {
      var quantityValue = parseInt(getQuantity(symbol, quantity));
      var stock = [
        {
          symbol: symbol,
          quantity: quantityValue,
        },
      ];
      apiSaveStock(stock);
    },
    []
  );

  function apiSaveStock(stocks) {
    fetch("http://localhost:4000/api/save-stock", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stocks),
    })
      .then((res) => console.log(res.json()))
      .catch(console.log);
  }

  const buyAll = useCallback(
    (targets) => () => {
      var saveStocks = [
        {
          symbol: "NTAP",
          quantity: parseInt(targets.NTAP),
        },
        {
          symbol: "GOOG",
          quantity: parseInt(targets.GOOG),
        },
        {
          symbol: "AAPL",
          quantity: parseInt(targets.AAPL),
        },
      ];
      console.log(saveStocks);
      apiSaveStock(saveStocks);
    },
    []
  );

  return (
    <div className="stock-list mt-5 row">
      {stocks.map((stock) => (
        <div class="col-sm-4">
          <div className="card m-2" key={stock.symbol}>
            <h3 className="h5 card-title text-center mt-2">{stock.symbol}</h3>
            <div className="card-body text-center">{stock.price}</div>
            <div className="card-footer">
              <strong>Cantidad:</strong>
              <input
                type="number"
                name={stock.symbol}
                onChange={(e) => {
                  setTargets({
                    ...targets,
                    [`${e.target.name}`]: e.target.value,
                  });
                }}
                className="form-control my-3"
              />
              <button
                className="btn btn-success d-flex m-auto"
                onClick={buyClick(stock.symbol, targets)}
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      ))}
      <div>
        <button
          className="btn btn-info"
          d-flex
          m-auto
          onClick={buyAll(targets)}
        >
          Comprar Todo
        </button>
      </div>

      <style jsx>{`
        .stock-list {
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-top: 0;
          margin-bottom: 1rem;
          padding-inline-start: 40px;
        }
      `}</style>
    </div>
  );
};

export default StockPrice;
