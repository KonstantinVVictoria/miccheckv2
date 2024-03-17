/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import { useEffect, useRef } from "react";
import styles from "./GalleryTile.styles.module.css";
import { LeftArrow, RightArrow } from "../../../svg/icons/Arrows";
type GalleryProps = {
  height: string;
  width: string;
  style?: {
    [key: string]: string;
  };
  children: React.ReactNode[];
};
export function GalleryTile(props: GalleryProps) {
  const GalleryElementRef = useRef(null);
  const BarElementRef = useRef(null);
  const PrevSlideRef = useRef(null);
  const NextSlideRef = useRef(null);
  useEffect(() => {
    const GalleryElement =
      GalleryElementRef.current as unknown as HTMLUListElement;
    const BarElement = BarElementRef.current as unknown as HTMLDivElement;

    const PrevSlideElement =
      PrevSlideRef.current as unknown as HTMLButtonElement;
    const NextSlideElement =
      NextSlideRef.current as unknown as HTMLButtonElement;

    const GalleryElementChildren = Array.from(
      GalleryElement.children
    ) as HTMLElement[];
    const slides = GalleryElementChildren.reduce((agg, curr) => {
      if (curr.tagName === "LI") agg.push(curr);
      return agg;
    }, [] as HTMLElement[]);

    const num_of_slides = slides.length;
    slideshow_start(
      slides,
      [PrevSlideElement, NextSlideElement, BarElement],
      10
    );
  }, []);

  return (
    <ul
      className={styles.tile}
      style={{ ...props.style, height: props.height, width: props.width }}
      ref={GalleryElementRef}
    >
      <button className={styles.change_slide} ref={PrevSlideRef}>
        {
          <LeftArrow
            fill="rgba(255,255,255,0.9)"
            height="1.5rem"
            width="1.5rem"
          />
        }
      </button>
      {props.children}
      <div className={styles.loadingbar} ref={BarElementRef}>
        {props.children.map((e, i) => (
          <Dot key={`${new Date().getTime()}_slide_${i + 1}`} />
        ))}
      </div>
      <button className={styles.change_slide} ref={NextSlideRef}>
        {
          <RightArrow
            fill="rgba(255,255,255,0.9)"
            height="1.5rem"
            width="1.5rem"
          />
        }
      </button>
    </ul>
  );
}

type SlideProps = {
  src: string;
  alt: string;
  style?: {
    [key: string]: string;
  };
  children?: React.ReactNode;
  description?: string;
};
export function Slide(props: SlideProps) {
  const attributes = { ...props, description: undefined, children: undefined };
  return (
    <li>
      <img className={styles.slide} {...attributes} />
      {props?.children ? (
        <p className={styles.description}>{props.children}</p>
      ) : null}
    </li>
  );
}
async function slideshow_start(
  slides: HTMLElement[],
  [PrevSlideElement, NextSlideElement, BarElement]: HTMLElement[],
  seconds: number
) {
  let i = 0;
  const Dots = BarElement.children;
  async function changeSlide(is_clicked = false) {
    const current_slide = slides[i];
    const next_slide = slides[(i + 1) % slides.length];
    const current_dot = Dots[i] as HTMLDivElement;
    const next_dot = Dots[(i + 1) % slides.length] as HTMLDivElement;
    current_dot.style.opacity = "1";
    next_slide.style.transform = "translateX(100%)";
    next_slide.style.zIndex = "1";
    current_slide.style.transform = "translateX(0%)";
    current_slide.style.zIndex = "2";
    if (!is_clicked) {
      await new Promise((res) => {
        setTimeout(() => {
          i = ++i % slides.length;
          res(null);
        }, seconds * 1000);
      });
    }
    next_slide.style.transform = "translateX(0%)";
    next_slide.style.zIndex = "2";

    current_slide.style.transform = "translateX(-100%)";
    current_slide.style.zIndex = "1";
    current_dot.style.opacity = "";
    next_dot.style.opacity = "1";

    await new Promise((res) => {
      setTimeout(() => {
        res(null);
      }, parseInt(window.getComputedStyle(next_slide).transitionDuration.replace("s", "")) * 1000);
    });

    current_slide.style.transform = "translateX(100%)";
  }

  // PrevSlideElement.onclick = () => {
  //   console.log("clicked");
  //   i = Math.abs(--i % slides.length);
  //   console.log(i);
  //   changeSlide(true);
  // };
  // NextSlideElement.onclick = () => {
  //   i = ++i % slides.length;
  //   console.log(i);
  //   changeSlide(true);
  // };
  while (true) {
    await changeSlide();
  }
}

function Dot() {
  return <div className={styles.dot} />;
}
