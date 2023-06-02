const Button = (props: { text: string; action: any; disabled: boolean; className: string }) => {
    return (
      <div className={props.className} onClick={props.action}>
        <button  disabled={props.disabled}>
          {props.text}
        </button>
      </div>
    );
  };
  
  export default Button;