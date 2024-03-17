"use client";

import { useEffect } from "react";

type CSRProps = {
  id: string;
};
export default function ClientSideScript(props: CSRProps) {
  useEffect(() => {
    const Section = document.getElementById(props.id) as HTMLElement;
    const SectionHeight = Section.offsetHeight;
    const MainArticle = document.getElementById("main_document") as HTMLElement;
    const MainDocument = MainArticle.parentElement as HTMLElement;
    const MainDocumentHeight = MainDocument.offsetHeight;
    const SectionInitYPos = Section.getBoundingClientRect().y;

    addEventListener(
      "scroll",
      (event) => {
        const SectionYPos = Section.getBoundingClientRect().y;
        const SectionRelativePosY = (1 + SectionYPos / SectionHeight) / 0.5;
        const AppearPosY = (window.innerHeight - SectionYPos) / SectionHeight;

        const OpacityRate =
          AppearPosY < 0.5
            ? Math.max(
                Math.min(
                  (window.innerHeight - SectionYPos) / SectionHeight,
                  0.5
                ),
                0
              ) / 0.5
            : Math.max(Math.min(1, SectionRelativePosY), 0);

        Section.style.opacity = `${Math.pow(OpacityRate, 0.5)}`;
      },
      true
    );
  }, []);
  return <></>;
}
