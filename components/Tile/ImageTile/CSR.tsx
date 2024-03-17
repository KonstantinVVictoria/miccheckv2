"use client";

import { useEffect } from "react";

type CSRProps = {
  Image: React.RefObject<HTMLImageElement>;
  Caption: React.RefObject<HTMLParagraphElement>;
};
export default function ClientSideScript(props: CSRProps) {
  useEffect(() => {
    if (props.Image.current === null || props.Caption.current === null) return;

    const Section = props.Image.current as unknown as HTMLImageElement;
    const Caption = props.Caption.current as unknown as HTMLParagraphElement;
    const SectionHeight = Section.offsetHeight;
    const MainArticle = document.getElementById("main_document") as HTMLElement;

    addEventListener(
      "scroll",
      (event) => {
        const SectionYPos = Section.getBoundingClientRect().y;
        const SectionRelativePosY = (1 + SectionYPos / SectionHeight) / 0.5;
        const AppearPosY = (window.innerHeight - SectionYPos) / SectionHeight;

        let OpacityRate = 0;

        // if (AppearPosY > 0.75 && AppearPosY < 1.5) {
        //   OpacityRate = 0;

        //   Caption.style.transform = `translateX(0%)`;
        //   Caption.style.opacity = `1`;
        //   Section.style.filter = `brightness(65%)`;
        // } else {
        //   OpacityRate = 1;
        //   Caption.style.opacity = `0`;
        //   Caption.style.transform = `translateX(100%)`;

        //   Section.style.filter = `brightness(100%)`;
        // }

        if (AppearPosY <= 1.25) {
          OpacityRate = Math.max(Math.min(AppearPosY, 1), 0);

          Caption.style.transform = `translateX(${
            (1 - Math.pow(OpacityRate, 1)) * 100
          }%)`;
          Caption.style.opacity = `${OpacityRate}`;
          Section.style.filter = `blur(${Math.round(
            Math.pow(OpacityRate, 12) * 2
          )}px) brightness(${100 - Math.pow(OpacityRate, 6) * 25}%)`;
        } else if (AppearPosY >= 1.25 && AppearPosY < 2) {
          OpacityRate = AppearPosY - 1;

          Caption.style.transform = `translateX(${
            Math.pow((OpacityRate - 0.25) / 0.75, 1) * 100
          }%)`;

          Caption.style.opacity = `${1 - (OpacityRate - 0.25) / 0.75}`;

          Section.style.filter = `blur(${Math.round(
            Math.pow(1 - (OpacityRate - 0.25) / 0.75, 12) * 2
          )}px)  brightness(${
            100 - (1 - Math.pow((OpacityRate - 0.25) / 0.75, 6)) * 25
          }%)`;
        }
      },
      true
    );
  }, []);
  return <></>;
}
