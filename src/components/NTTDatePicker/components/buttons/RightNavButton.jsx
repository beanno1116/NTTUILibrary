import RightChevron from '../icons/RightChevron';



const RightNavButton = ({ onClick, ...props }) => {
  return (
    <button {...props} onClick={onClick}>
      <RightChevron width={16} height={16} />
    </button>
  );
}

export default RightNavButton;