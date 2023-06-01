const Button = (props: { text: string; action: any; disabled: boolean; className: string }) => {
    return (
      <div className={props.className}>
        <button onClick={props.action} disabled={props.disabled}>
          {props.text}
        </button>
      </div>
    );
  };
  
  export default Button;