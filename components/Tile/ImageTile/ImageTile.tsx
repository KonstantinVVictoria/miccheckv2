/* eslint-disable jsx-a11y/alt-text */
"use client";
import styles from "./ImageTiles.styles.module.css";
import { SyntheticEvent, createContext, useEffect, useRef } from "react";
type ImageProps = {
  height: string;
  width: string;
  alt: string;
  src: string;
  style?: {
    [key: string]: string;
  };
};

export default function ImageTile(props: ImageProps) {
  const ImageRef = useRef(null);
  let attributes = { ...props, height: undefined, width: undefined };

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
