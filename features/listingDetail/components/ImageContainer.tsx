"use client";
import * as React from "react";
import { Box, Flex, IconButton } from "@radix-ui/themes";
import Image from "next/image";
import { ArrowRightIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import useEmblaCarousel from "embla-carousel-react";

import styles from "./styles.module.css";

export const ImageContainer = ({ images }: { images: string[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollNext = React.useCallback(() => {
    if (!emblaApi) return;
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
    } else {
      emblaApi.scrollTo(0);
    }
  }, [emblaApi]);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  return (
    <Box style={{ backgroundColor: "var(--gray-a2)" }}>
      <Box
        p='5'
        style={{
          backgroundColor: "white",
          borderRadius: "var(--radius-3)",
          boxShadow: "var(--shadow-3",
        }}
      >
        {images.length > 1 ? (
          <>
            <div className={styles.embla} ref={emblaRef}>
              <div className={styles.embla__container}>
                {images.map((image, index) => (
                  <div className={styles.embla__slide} key={index}>
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={image}
                        alt={""}
                        fill
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Flex direction='row' gap='3'>
              <IconButton onClick={scrollPrev}>
                <ArrowLeftIcon />
              </IconButton>
              <IconButton onClick={scrollNext}>
                <ArrowRightIcon />
              </IconButton>
            </Flex>
          </>
        ) : (
          <Flex
            direction='column'
            gap='6'
            style={{ height: "20rem", position: "relative" }}
          >
            <Image
              src={images[0]}
              alt={""}
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </Flex>
        )}
      </Box>
    </Box>
  );
};
