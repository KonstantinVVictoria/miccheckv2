/* eslint-disable jsx-a11y/alt-text */
"use client";
import styles from "./VideoTiles.styles.module.css";
import { SyntheticEvent, createContext, useEffect, useRef } from "react";
type VideoProps = {
  height: string;
  width: string;
  alt: string;
  src: string;
  src_type: string;
  style?: {
    [key: string]: string;
  };
};

export default function VideoTile(props: VideoProps) {
  const VideoRef = useRef(null);
  let attributes = {
    ...props,
    height: undefined,
    width: undefined,
    src: undefined,
    src_type: undefined,
  };

  // useEffect(() => {
  //   const VideoElement = VideoRef.current as unknown as HTMLVideoElement;
  //   const ContainerElement = VideoElement.parentElement as HTMLDivElement;
  //   if (VideoElement.complete) {
  //     loadElement(VideoElement);
  //     console.log("still");
  //   } else {
  //     ContainerElement.classList.add(styles.loading);
  //     console.log("loading");
  //     VideoElement.onload = () => loadElement(VideoElement);
  //   }
  // }, []);

  return (
    <div
      className={`${styles.tile} ${styles.loading}`}
      style={{ ...props.style, height: props.height, width: props.width }}
    >
      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <video
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          backgroundColor: "transparent",
          opacity: 0,
        }}
        {...attributes}
        ref={VideoRef}
        muted
        autoPlay
        loop
        onPlay={() => {
          loadElement(VideoRef.current as unknown as HTMLVideoElement);
        }}
      >
        <source type={props.src_type} src={props.src} />
      </video>
    </div>
  );
}

function loadElement(VideoElement: HTMLVideoElement) {
  const ContainerElement = VideoElement.parentElement as HTMLDivElement;
  VideoElement.style.opacity = "1";
  ContainerElement.classList.add(styles.loaded);
  ContainerElement.classList.remove(styles.loading);
}
