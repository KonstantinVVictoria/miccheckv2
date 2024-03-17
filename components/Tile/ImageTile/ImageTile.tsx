/* eslint-disable jsx-a11y/alt-text */
"use client";
import styles from "./ImageTiles.styles.module.css";
import { useEffect, useRef } from "react";
import ClientSideScript from "./CSR";
type ImageProps = {
  height: string;
  width: string;
  alt: string;
  src: string;
  caption?: string;
  style?: {
    [key: string]: string;
  };
};

export default function ImageTile(props: ImageProps) {
  const ImageRef = useRef(null);
  const CaptionRef = useRef(null);

  let attributes = {
    ...props,
    height: undefined,
    width: undefined,
    caption: undefined,
  };

  useEffect(() => {
    const ImageElement = ImageRef.current as unknown as HTMLImageElement;
    const ContainerElement = ImageElement.parentElement as HTMLDivElement;

    if (ImageElement.naturalWidth !== 0) {
      loadElement(ImageElement);
      console.log("still");
    } else {
      ContainerElement.classList.add(styles.loading);
      console.log("loading");
      ImageElement.onload = () => loadElement(ImageElement);
    }
  }, []);

  return (
    <div
      className={`${styles.tile}`}
      style={{ ...props.style, height: props.height, width: props.width }}
    >
      <ClientSideScript Image={ImageRef} Caption={CaptionRef} />
      {(props?.caption && (
        <div className={styles.caption}>
          <p ref={CaptionRef}>{props.caption}</p>
        </div>
      )) ||
        null}
      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <img {...attributes} ref={ImageRef} />
    </div>
  );
}

function loadElement(ImageElement: HTMLImageElement) {
  const ContainerElement = ImageElement.parentElement as HTMLDivElement;
  ImageElement.style.opacity = "1";
  ContainerElement.classList.add(styles.loaded);
  ContainerElement.classList.remove(styles.loading);
}
