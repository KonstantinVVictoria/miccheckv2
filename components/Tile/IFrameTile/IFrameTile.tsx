/* eslint-disable jsx-a11y/alt-text */
"use client";
import styles from "./IFrameTile.styles.module.css";
import { useEffect, useRef } from "react";
type IFrameProps = {
  height: string;
  width: string;
  src: string;
  attributes: {
    [key: string]: any;
  };
  style?: {
    [key: string]: string;
  };
};

export default function IFrameTile(props: IFrameProps) {
  const IFrameRef = useRef(null);
  let attributes = {
    ...props,
    height: undefined,
    width: undefined,
    attributes: undefined,
    ...props.attributes,
  };

  return (
    <div
      className={`${styles.tile} ${styles.loading}`}
      style={{ height: props.height, width: props.width }}
    >
      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <iframe
        style={{ ...props.style, height: props.height, width: props.width }}
        {...attributes}
        ref={IFrameRef}
        onLoad={() => {
          const IFrameElement =
            IFrameRef.current as unknown as HTMLIFrameElement;
          loadElement(IFrameElement);
        }}
      ></iframe>
    </div>
  );
}

function loadElement(IFrameElement: HTMLIFrameElement) {
  const ContainerElement = IFrameElement.parentElement as HTMLDivElement;
  ContainerElement.classList.add(styles.loaded);
  ContainerElement.classList.remove(styles.loading);
}
