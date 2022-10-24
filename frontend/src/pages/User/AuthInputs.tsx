import styled from 'styled-components';

interface IAuthInputsProps {
  value: string;
  type: string;
  label: string;
  name: string;
  onInputChange: (val: string) => void;
}

// export const AuthInputs = ({
//   label,
//   value,
//   type,
//   onChange
// }: IAuthInputsProps) => {}

//   return (
//     <TextField
//       fullWidth
//       size="small"
//       margin="normal"
//       value={value}
//       onChange={onChange}
//       onBlur={onBlur}
//       label={label}
//       variant="outlined"
//       inputRef={ref}
//       error={invalid}
//       helperText={error?.message}
//       inputProps={inputProps}
//     />
//   );
// };
const AuthInputs = ({ label, value, type, name, onInputChange }: IAuthInputsProps) => {
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {
    console.log("뭐찍히나",e.target)
    let {name,value} = e.target
    const data = {
      key: name,
      value
    }
    console.log(data)
    onInputChange(e.target.value);
  }
  // const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  // };

  // const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   onFormSubmit(value);
  // };

  return (
    <>
      {label}
      
      <input
        type={type}
        value={value}
        name={name}
        onChange={inputChangeHandler}
      >

      </input>
    </>
  )
};

export default AuthInputs;
