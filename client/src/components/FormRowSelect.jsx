const FormRowSelect = ({ name, labelText, list, defaultValue = "" }) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText || name}
      </label>
      <select
        id={name}
        name={name}
        className="form-select"
        defaultValue={defaultValue}
      >
        {Object.values(list).map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
