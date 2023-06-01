const Validate = (value: string) => {
    // Check if value is empty
    const empty = () => {
      if (value === undefined || value === "") {
        return false;
      } else {
        return true;
      }
    };
    return { empty };
  };
  
  export default Validate;