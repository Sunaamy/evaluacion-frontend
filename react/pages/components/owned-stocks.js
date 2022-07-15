import React from "react";

const OwnedStocks = ({ purchasedStocks }) => {
  return (
    /*       <div>
            TODO: <br></br> 
             1 - Una lista de las acciones compradas <br></br>
             2 - Agregar funcionalidad a los botones <br></br>
             3 - Agregar una forma para comprar diferentes numero de acciones <br></br> 
             4 - Poner tu propio estilo de diseño mejorado <br></br><br></br>
             EXTRAS: <br></br>
              - Poner al lado del boton de comprar un campo para cambiar cantidades de compra ej. - 0 + <br></br>
              - Agregar un saldo inicial que se vea reflejado el cambio al comprar una accion <br></br>
              - Agregar cualquier cosa innovadora que quieras que demuestre tu pasion por frontend
        </div> */
    <table className="table table-striped">
      <thead className="table-dark">
        <tr>
          <th scope="col">Acción</th>
          <th scope="col">Compañia</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        {purchasedStocks.map((pStock) => (
          <tr key={pStock.symbol}>
            <td>{pStock.symbol}</td>
            <td>{pStock.company}</td>
            <td>{pStock.quantity}</td>
            <td>{pStock.quantity * pStock.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OwnedStocks;
