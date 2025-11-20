import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const ItemAmount = () => {
  const { itemAmount } = useContext(CartContext);
  return (
    <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
      {itemAmount}
    </div>
  );
};

export default ItemAmount;
