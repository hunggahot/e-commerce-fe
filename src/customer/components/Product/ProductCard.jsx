import React from 'react';
import './ProductCard.scss';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${5}`)}
      className="productCard w-[15rem] m-3 transition-all cursor-pointer"
    >
      <div className="h-[20rem]">
        <img
          className="h-full w-full object-cover object-left-top"
          src={product.imageUrl}
          alt=""
        />
      </div>

      <div className="textPart bg-white p-3">
        <div>
          <div className="font-bold opacity-60">{product.brand}</div>
          <p>{product.title}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold">
            {product.discountedPrice}
            <sup>đ</sup>
          </p>
          <p className="line-through opacity-50">
            {product.price}
            <sup>đ</sup>
          </p>
          <p className="text-green-600 font-semibold">
            {product.discountPercent}% off
          </p>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
