function Input({ name, type, place, handleInput, value }) {
  return (
    <>
      <form>
        <label htmlFor={name}>{name}</label>
        <br />
        <input
          type={type}
          placeholder={place}
          onChange={handleInput}
          value={value}
          name={name}
        />
      </form>
    </>
  );
}

export default Input;
