const Input = (props: {
  className: string;
  placeholder: string;
  type: string;
  action: any;
  inputClass: string;
}) => {
  return (
    <div className={props.className}>
      <input
        className={props.inputClass}
        placeholder={props.placeholder}
        type={props.type}
        onChange={(e) => props.action(e.target.value)}
      />
    </div>
  );
};
export default Input;
