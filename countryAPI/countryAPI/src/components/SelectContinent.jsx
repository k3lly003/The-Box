import { useNavigate } from "react-router-dom";

const SelectContinent = () => {
  const navigate = useNavigate();
  function handleUseStatePage(event) {
    event.preventDefault();
    const selectedValue = event.target.value;
    switch (selectedValue) {
      case "africa":
        navigate("/africa");
        break;
      case "europe":
        navigate("/europe");
        break;
      case "asia":
        navigate("/asia");
        break;
      case "northAmerica":
        navigate("/northAmerica");
        break;
      case "southAmerica":
        navigate("/southAmerica");
        break;
      default:
        navigate("/home");
        return false;
    }
  }
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
