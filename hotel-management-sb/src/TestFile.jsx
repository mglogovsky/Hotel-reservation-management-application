import React from "react";

import AsyncSelect from "react-select/async";
import { searchProducts } from "./api/productsResourceAPi";

const Testing = () => {
  const loadOptions = async (inputValue, callback) => {
    const data = await searchProducts(inputValue);
    callback(
      data?.map((item) => ({
        label: item?.name,
        value: item?.id,
      }))
    );
  };
  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      onChange={(e) => console.log(e)}
      placeholder={<div>Enter product name or productId</div>}
    />
  );
};

export default Testing;
