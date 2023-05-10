function Button({ krass, holder, click, but }) {
  return (
    <>
      <button className={krass} placeholder={holder} onClick={click}>
        {but}
      </button>
    </>
  );
}
export default Button;
