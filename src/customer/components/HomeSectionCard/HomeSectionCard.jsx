import React from "react";

const HomeSectionCard = () => {
  return (
    <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3">
      <div className="h-[13rem] w-[10rem]">
        <img
          className="object-cover object-top w-full h-full"
          src="https://pubcdn.ivymoda.com/files/product/thumab/1400/2023/05/17/b530a02260b03cecd01b1ace2210a30d.jpg"
          alt=""
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">Áo dài</h3>
        <p className="mt-2 text-sm text-gray-500">
          CHÂU HOA - Áo dài - Tơ hoa hồng - FA249
        </p>
      </div>
    </div>
  );
};

export default HomeSectionCard;
