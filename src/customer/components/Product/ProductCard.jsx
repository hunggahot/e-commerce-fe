import React from 'react';
import './ProductCard.scss';

const ProductCard = () => {
  return (
    <div className="productCard w-[15rem] m-3 transition-all cursor-pointer">
      <div className="h-[20rem]">
        <img
          className="h-full w-full object-cover object-left-top"
          src="https://pubcdn.ivymoda.com/files/product/thumab/1400/2023/07/20/0e653008a81c21dd21570acbe2c439e0.JPG"
          alt=""
        />
      </div>

      <div className="textPart bg-white p-3">
        <div>
          <div className="font-bold opacity-60">ÁO THUN ĐÍNH REN</div>
          <p>SKU: 57M8283</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold">
            325.000<sup>đ</sup>
          </p>
          <p className="line-through opacity-50">
            650.000<sup>đ</sup>
          </p>
          <p className="text-green-600 font-semibold">50% off</p>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
