import LeftChevron from '../icons/LeftChevron';



const LeftNavButton = ({ onClick, ...props }) => {
  return (
    <button {...props} onClick={onClick}>
      <LeftChevron width={16} height={16} />
    </button>
  );
}

export default LeftNavButton;