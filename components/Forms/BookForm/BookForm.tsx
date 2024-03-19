"use client";
import { useRef, useState } from "react";
import Form from "../Form";
import { LeftArrow, RightArrow } from "../../../svg/icons/Arrows";
import { stall } from "../../../lib/common";
import styles from "../Form.styles.module.css";
type EntryTypes = "calender" | "default";
type EventTypes =
  | "wedding"
  | "private"
  | "corporate"
  | "school"
  | "club"
  | "other"
  | "unset";

function Entry(
  entry_name: string,
  placeholder: string,
  title: string,
  description: string,
  type: EntryTypes = "default"
) {
  return {
    entry_name,
    placeholder,
    title,
    description,
  };
}

const form_entries = [
  Entry(
    "name",
    "John Doe",
    "Let's get the party started",
    "What is your name?"
  ),
  Entry(
    "phone",
    "+1 (415) 889-0008",
    "Phone number",
    "What's the best phone number to get a hold of you with?"
  ),
];

export default function BookForm() {
  const InputRef = useRef(null);
  const InputContainerRef = useRef(null);
  const TitleRef = useRef(null);
  const DescRef = useRef(null);
  const [form, set_form_status] = useState({
    current_form: 0,
    data: {
      name: "",
      phone: "",
      email: "",
      event: {
        name: "",
        date: "",
        type: "",
        budget: "",
        requests: "",
      },
    },
  } as {
    current_form: number;
    data: {
      [key: string]: string | object;
    };
  });

  const CurrentEntry = form_entries[form.current_form];
  return (
    <Form>
      <div>
        <div>
          <h1 ref={TitleRef}>{CurrentEntry.title}</h1>
          <p ref={DescRef}>{CurrentEntry.description}</p>
        </div>
        <div ref={InputContainerRef}>
          <input placeholder={CurrentEntry.placeholder} ref={InputRef} />
        </div>
        <div className={styles.buttons}>
          <button
            style={{
              opacity: form.current_form >= 1 ? "1" : "0.5",
              pointerEvents: form.current_form < 1 ? "none" : "auto",
            }}
            disabled={form.current_form < 1}
            onClick={async () => {
              const Input = InputRef.current as unknown as HTMLInputElement;
              const InputContainer =
                InputContainerRef.current as unknown as HTMLDivElement;
              const Title = TitleRef.current as unknown as HTMLHeadingElement;
              const Desc = DescRef.current as unknown as HTMLParagraphElement;
              const new_status = { ...form };
              new_status.current_form--;
              for (const Element of [Title, Desc, Input, InputContainer]) {
                Element.style.opacity = "0";
                await stall(100);
              }
              set_form_status(new_status);
              for (const Element of [Title, Desc, Input, InputContainer]) {
                Element.style.opacity = "1";
                await stall(100);
              }
            }}
          >
            <LeftArrow
              height="2rem"
              fill="white"
              selectable={form.current_form >= 1}
            />
          </button>
          <button
            style={{
              opacity:
                form.current_form < form_entries.length - 1 ? "1" : "0.5",
              pointerEvents:
                form.current_form >= form_entries.length - 1 ? "none" : "auto",
            }}
            disabled={form.current_form >= form_entries.length - 1}
            onClick={async () => {
              const Input = InputRef.current as unknown as HTMLInputElement;
              const InputContainer =
                InputContainerRef.current as unknown as HTMLDivElement;
              const Title = TitleRef.current as unknown as HTMLHeadingElement;
              const Desc = DescRef.current as unknown as HTMLParagraphElement;

              const new_status = { ...form };
              new_status.current_form++;
              new_status.data[CurrentEntry.entry_name] = Input.value;
              for (const Element of [Title, Desc, Input, InputContainer]) {
                Element.style.opacity = "0";
                await stall(100);
              }
              set_form_status(new_status);
              for (const Element of [Title, Desc, Input, InputContainer]) {
                Element.style.opacity = "1";
                await stall(100);
              }
            }}
          >
            <RightArrow
              height="2rem"
              fill="white"
              selectable={form.current_form < form_entries.length - 1}
            />
          </button>
        </div>
      </div>
      <img src="/images/LRphoto2-29.png" alt="background image" />
    </Form>
  );
}
