import React, { useState } from 'react';

interface Image {
  secure_url: string
}

interface Pictures {
  images: Image[]
}

export default function ProductImages({ images }: Pictures) {
  const [activeImage, setActiveImage] = useState(images[0].secure_url);

  return (
    <div className="grid grid-cols-[0.3fr_1.7fr] items-center">
      <div className="flex flex-col justify-center items-center gap-1">
        {images.map((image) => (
          <div
            key={image.secure_url}
            className="border-2 border-zinc-300 rounded-md overflow-hidden"
            onClick={() => setActiveImage(image.secure_url)}
          >
            <img src={image.secure_url} alt="" />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center max-h-96">
        <img
          src={activeImage}
          alt=""
          className="max-h-96"
        />
      </div>
    </div>
  );
}
