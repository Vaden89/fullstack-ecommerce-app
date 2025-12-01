"use client";
import Image from "next/image";
import { useState } from "react";

export const ProductImageDisplay = ({ images }: { images: string[] }) => {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className="w-1/2 flex gap-4">
      <div className="w-1/3 ">
        {images.map((item, index) => {
          return (
            <Image
              src={item}
              width={150}
              height={150}
              key={index}
              alt={`product Image ${index + 1}`}
              className="w-full h-1/3 border-2 rounded-xl"
            />
          );
        })}
      </div>
      <Image
        width={500}
        height={500}
        alt="Product Image"
        src={images[imageIndex]}
        className="w-2/3 aspect-auto border rounded-xl"
      />
    </div>
  );
};
