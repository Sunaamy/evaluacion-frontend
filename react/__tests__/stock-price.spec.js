import {render} from "@testing-library/react";
import React from 'react';

import StockPrice from "../pages/components/stock-price";

test('StockPrice shows a message when there are no stocks to display', () => {
  const rendered = render(
    <StockPrice stocks={[]} />
  )
  expect(rendered.getByText('There are no stocks to display.')).toBeTruthy()
});
