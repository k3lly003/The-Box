import React from "react";

const SelectContinent = () => {
  return (
    <>
      <div>
        <select name="hooks" id="select" onChange={handleUseStatePage}>
          <option value="choose"></option>
          <option value="africa">Africa</option>
          <option value="europe">Europe</option>
          <option value="asia">Asia</option>
          <option value="northAmerica">North America</option>
          <option value="southAmerica">South America</option>
        </select>
      </div>
    </>
  );
};

export default SelectContinent;
