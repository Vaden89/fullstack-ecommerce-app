"use client";
import Image from "next/image";
import { useState } from "react";

export const ProductImageDisplay = ({ images }: { images: string[] }) => {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className="w-full sm:w-1/2 flex sm:flex-row flex-col-reverse  gap-4">
      <div className="sm:w-1/3">
        {images.map((item, index) => {
          return (
            <Image
              src={item}
              width={150}
              height={150}
              key={index}
              alt={`product Image ${index + 1}`}
              onClick={() => setImageIndex(index)}
              className="w-1/3 sm:w-full sm:h-1/3 border-2 rounded-xl"
            />
          );
        })}
      </div>
      <Image
        width={500}
        height={500}
        alt="Product Image"
        src={images[imageIndex]}
        className="w-full sm:w-3/5 aspect-auto border rounded-xl"
      />
    </div>
  );
};
