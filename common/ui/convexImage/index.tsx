import * as React from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Image from "next/image";

export const ConvexImage = ({ imageId }: any) => {
  const imageUrl = useQuery(api.files.getImageUrl, { imageId });

  return (
    imageUrl && (
      <Image
        alt='image test image'
        className='object-cover'
        src={imageUrl}
        layout='fill'
      />
    )
  );
};
