import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.cart.cartItemData,
  (cartItemData) => {
    let numItems = 0;
    for (let id in cartItemData) {
      numItems += cartItemData[id];
    }
    return numItems;
  }
);

export const getTotalPrice = createSelector(
  (state: RootState) => state.cart,
  ({ cartItemData, items }) => {
    let total = 0;

    items.forEach((item) => {
      total += Number(item.price) * cartItemData[item.id];
    });

    return total;
  }
);
