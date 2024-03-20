"use client";
import { useRef, useState } from "react";
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
  Entry(
    "email",
    "johndoe@mail.com",
    "Email",
    "What's the best email to send you a confirmation and booking details?"
  ),
  Entry(
    "event.name",
    "John's Wedding",
    "Event Name",
    "What's the name of your venue or event?"
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
  Entry("event.budget", "", "Budget", "What is your budget?"),
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
          {(CurrentEntry.type === "default" && (
            <input placeholder={CurrentEntry.placeholder} ref={InputRef} />
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
              opacity:
                form.current_form < form_entries.length - 1 ? "1" : "0.5",
              pointerEvents:
                form.current_form >= form_entries.length - 1 ? "none" : "auto",
            }}
            disabled={form.current_form >= form_entries.length - 1}
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
              console.log(new_status);
              set_form_status(new_status);
              for (const Element of [Title, Desc, InputContainer]) {
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
