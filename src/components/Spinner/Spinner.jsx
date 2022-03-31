import { ImSpinner2 } from "react-icons/im";
import "./Spinner.css";

export const Spinner = () => {
  return (
    <div className='spinner__container'>
      <ImSpinner2 className='spinner__icon' size={60} />
    </div>
  );
}