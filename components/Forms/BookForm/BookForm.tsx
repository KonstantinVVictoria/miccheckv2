"use client";
import { RefObject, useRef, useState } from "react";
import Form from "../Form";
import { LeftArrow, RightArrow } from "../../../svg/icons/Arrows";
import { stall } from "../../../lib/common";
import styles from "../Form.styles.module.css";
import { DateField, DatePicker } from "@mui/x-date-pickers";
type EntryTypes = "calender" | "default" | "textarea" | "dropdown";
type EventTypes =
  | "wedding"
  | "private"
  | "corporate"
  | "school"
  | "club"
  | "other"
  | "unset";

type MetaEntry = {
  dropdown?: Array<string>;
  validation?: (text: string) => Boolean;
};
function Entry(
  entry_name: string,
  placeholder: string,
  title: string,
  description: string,
  type: EntryTypes = "default",
  meta: MetaEntry = {}
) {
  return {
    entry_name,
    placeholder,
    title,
    description,
    type,
    meta,
  };
}
type Validator = (text: string) => Boolean;

function InputValidator(
  inputref: RefObject<HTMLInputElement>,
  nextref: RefObject<HTMLButtonElement>
) {
  return (text: string, validation_rule: Validator) => {
    return validation_rule(text);
  };
}
const form_entries = [
  Entry(
    "name",
    "John Doe",
    "Let's get the party started",
    "What is your name?",
    "default",
    {
      validation: (text: string) => {
        return text.length > 0 && text.length <= 24;
      },
    }
  ),
  Entry(
    "phone",
    "+1 (415) 889-0008",
    "Phone number",
    "What's the best phone number to get a hold of you with?",
    "default",
    {
      validation: (text: string) => {
        return (
          text.length > 0 &&
          text.length <= 10 &&
          /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(
            text
          )
        );
      },
    }
  ),
  Entry(
    "email",
    "johndoe@mail.com",
    "Email",
    "What's the best email to send you a confirmation and booking details?",
    "default",
    {
      validation: (text: string) => {
        return (
          text.length > 0 &&
          text.length <= 254 &&
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
            text
          )
        );
      },
    }
  ),
  Entry(
    "event.name",
    "John's Wedding",
    "Event Name",
    "What's the name of your venue or event?",
    "default",
    {
      validation: (text: string) => {
        return text.length > 0 && text.length <= 24;
      },
    }
  ),
  Entry("event.date", "", "Event Date", "When is it?", "calender"),
  Entry(
    "event.type",
    "Wedding",
    "Type of Event",
    "What kind of event is it?",
    "dropdown",
    {
      dropdown: ["wedding", "private", "corporate", "school", "club", "other"],
    }
  ),
  Entry("event.budget", "", "Budget", "What is your budget?", "default", {
    validation: (text: string) => {
      return (
        text.length > 0 &&
        text.length <= 16 &&
        /^(0|[1-9]\d*)(\.\d+)?$/.test(text)
      );
    },
  }),
  Entry(
    "event.request",
    "",
    "Any other Requests",
    "If you have anything else you'd like to add, please note it down.",
    "textarea"
  ),
];

export default function BookForm() {
  const InputRef = useRef(null);
  const InputContainerRef = useRef(null);
  const TitleRef = useRef(null);
  const DescRef = useRef(null);
  const CalendarRef = useRef("");
  const DropDownRef = useRef(null);
  const TextAreaRef = useRef(null);
  const NextButtonRef = useRef(null);
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
  const input_validation = InputValidator(InputRef, NextButtonRef);
  const CurrentEntry = form_entries[form.current_form];
  return (
    <Form>
      <div>
        <div>
          <h1 ref={TitleRef}>{CurrentEntry.title}</h1>
          <p ref={DescRef}>{CurrentEntry.description}</p>
        </div>
        <div ref={InputContainerRef}>
          {(CurrentEntry.type === "default" && (
            <input
              placeholder={CurrentEntry.placeholder}
              ref={InputRef}
              onChange={({ target }) => {
                const is_valid = input_validation(
                  target.value,
                  CurrentEntry.meta.validation as Validator
                );
                const input = InputRef.current as unknown as HTMLInputElement;
                const next =
                  NextButtonRef.current as unknown as HTMLButtonElement;
                if (!is_valid) {
                  next.disabled = true;
                  next.style.opacity = "0.5";
                  next.style.pointerEvents = "none";
                  input.style.borderBottom = "1px solid red";
                } else {
                  next.disabled = false;
                  next.style.opacity = "1";
                  next.style.pointerEvents = "visible";
                  input.style.borderBottom = "";
                }
              }}
            />
          )) ||
            (CurrentEntry.type === "calender" && (
              <DateField
                onChange={(new_value) =>
                  (CalendarRef.current = new_value as unknown as string)
                }
              />
            )) ||
            (CurrentEntry.type === "dropdown" && (
              <select ref={DropDownRef}>
                {CurrentEntry.meta.dropdown?.map((label, i) => (
                  <option key={label + i + "dropdown option"} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            )) ||
            (CurrentEntry.type === "textarea" && (
              <textarea ref={TextAreaRef} />
            )) ||
            null}
        </div>
        <div className={styles.buttons}>
          <button
            style={{
              opacity: form.current_form >= 1 ? "1" : "0.5",
              pointerEvents: form.current_form < 1 ? "none" : "auto",
            }}
            disabled={form.current_form < 1}
            onClick={async () => {
              const InputContainer =
                InputContainerRef.current as unknown as HTMLDivElement;
              const Title = TitleRef.current as unknown as HTMLHeadingElement;
              const Desc = DescRef.current as unknown as HTMLParagraphElement;
              const new_status = { ...form };
              const next =
                NextButtonRef.current as unknown as HTMLButtonElement;
              next.disabled = true;
              next.style.opacity = "0.5";
              next.style.pointerEvents = "none";

              if (CurrentEntry.type === "default") {
                const Input = InputRef.current as unknown as HTMLInputElement;

                Input.value = "";
              }
              for (const Element of [Title, Desc, InputContainer]) {
                Element.style.opacity = "0";
                await stall(100);
              }
              new_status.current_form--;
              set_form_status(new_status);
              for (const Element of [Title, Desc, InputContainer]) {
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
              opacity: "0.5",
              pointerEvents: "none",
            }}
            onClick={async () => {
              const new_status = { ...form };
              const InputContainer =
                InputContainerRef.current as unknown as HTMLDivElement;
              const Title = TitleRef.current as unknown as HTMLHeadingElement;
              const Desc = DescRef.current as unknown as HTMLParagraphElement;
              const set_field = (value: any) => {
                const keys = CurrentEntry.entry_name.split(".");
                if (keys.length === 1) {
                  new_status.data[keys[0]] = value;
                } else {
                  const last_key = keys.pop() as string;
                  let current_object = new_status.data as any;
                  for (const key of keys) {
                    current_object = current_object[key];
                  }
                  current_object[last_key] = value;
                }
              };

              if (CurrentEntry.type === "default") {
                const Input = InputRef.current as unknown as HTMLInputElement;

                set_field(Input.value);

                Input.value = "";
              } else if (CurrentEntry.type === "calender") {
                const CalendarDate = CalendarRef.current as unknown as Date;
                const standard_date = new Date(CalendarDate);
                set_field(
                  standard_date.getMonth() +
                    1 +
                    "/" +
                    standard_date.getDate() +
                    "/" +
                    standard_date.getFullYear()
                );
              } else if (CurrentEntry.type === "dropdown") {
                const DropDown =
                  DropDownRef.current as unknown as HTMLSelectElement;
                set_field(DropDown.value);
              }
              for (const Element of [Title, Desc, InputContainer]) {
                Element.style.opacity = "0";
                await stall(100);
              }
              new_status.current_form++;

              set_form_status(new_status);
              for (const Element of [Title, Desc, InputContainer]) {
                Element.style.opacity = "1";
                await stall(100);
              }
            }}
            ref={NextButtonRef}
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
