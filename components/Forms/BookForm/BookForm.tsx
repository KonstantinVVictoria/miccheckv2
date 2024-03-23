"use client";
import { RefObject, useEffect, useRef, useState } from "react";
import Form from "../Form";
import { LeftArrow, RightArrow } from "../../../svg/icons/Arrows";
import { stall } from "../../../lib/common";
import styles from "../Form.styles.module.css";
import { DateField, DatePicker } from "@mui/x-date-pickers";
import CloseIcon from "../../../svg/icons/CloseIcon";
import packages from "./packages";

type EntryTypes = "calender" | "default" | "textarea" | "dropdown" | "custom";

type EventTypes =
  | "wedding"
  | "private"
  | "corporate"
  | "school"
  | "club"
  | "other"
  | "unset";

type FormValues = {
  current_form: number;
  data: {
    name: string;
    phone: string;
    email: string;
    event: {
      name: string;
      date: string;
      type: string;
      package: string;
      requests: string;
    };
  };
};
type MetaEntry = {
  dropdown?: Array<string>;
  validation?: (text: string) => Boolean;
  component?: Function;
  overlay?: Function;
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

function Validator(text: string, validation_rule: Validator) {
  return validation_rule(text);
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
  Entry("event.date", "", "Event Date", "When is it?", "calender", {
    validation: (text: string) => {
      return text.length > 0;
    },
  }),
  Entry(
    "event.type",
    "Wedding",
    "Type of Event",
    "What kind of event is it?",
    "dropdown",
    {
      dropdown: ["wedding", "private", "corporate", "school", "club", "other"],
      validation: (text: string) => {
        return text.length > 0;
      },
    }
  ),
  Entry(
    "event.package",
    "",
    "Package Selection",
    "Which of our packages are you interested in?",
    "custom",
    {
      validation: (text: string) => {
        return (
          text.length > 0 &&
          text.length <= 16 &&
          /^(0|[1-9]\d*)(\.\d+)?$/.test(text)
        );
      },
      component: (
        is_active: boolean,
        set_active: Function,
        current_form_status: FormValues,
        set_form_status: Function,
        nextRef: RefObject<HTMLButtonElement>
      ) => (
        <PackageSelection
          is_active={is_active}
          set_active={set_active}
          current_form_status={current_form_status}
          set_form_status={set_form_status}
          NextRef={nextRef}
        />
      ),
      overlay: (is_active: boolean, set_active: Function) => (
        <PackageOverlay is_active={is_active} set_active={set_active} />
      ),
    }
  ),
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
  const ButtonsContainerRef = useRef(null);
  const [overlay_active, set_overlay_status] = useState(false);

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
        package: "showtime",
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
      {CurrentEntry.type === "custom" &&
        CurrentEntry.meta.overlay &&
        CurrentEntry.meta.overlay(overlay_active, set_overlay_status)}
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
                const is_valid = Validator(
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
            (CurrentEntry.type === "custom" &&
              CurrentEntry.meta.component &&
              CurrentEntry.meta.component(
                overlay_active,
                set_overlay_status,
                form,
                set_form_status,
                NextButtonRef
              )) ||
            (CurrentEntry.type === "calender" && (
              <DateField
                onChange={(new_value) => {
                  CalendarRef.current = new_value as unknown as string;
                  const is_valid = Validator(
                    new Date(new_value as unknown as string).toDateString(),
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
                  }
                }}
              />
            )) ||
            (CurrentEntry.type === "dropdown" && (
              <select
                ref={DropDownRef}
                onChange={({ target }) => {
                  const value = target.value;
                  const is_valid = Validator(
                    value,
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
                  }
                }}
                defaultValue={""}
              >
                <option value="" disabled hidden>
                  Choose here
                </option>
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
        <div className={styles.buttons} ref={ButtonsContainerRef}>
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
          {form.current_form < form_entries.length - 1 ? (
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
                const next =
                  NextButtonRef.current as unknown as HTMLButtonElement;
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
                if (form.current_form < form_entries.length - 2) {
                  next.disabled = true;
                  next.style.opacity = "0.5";
                  next.style.pointerEvents = "none";
                } else {
                  next.disabled = false;
                  next.style.opacity = "1";
                  next.style.pointerEvents = "auto";
                  next.style.cursor = "pointer";
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
          ) : (
            <button
              style={{ fontSize: "1.5rem" }}
              ref={NextButtonRef}
              onClick={async () => {
                const new_status = { ...form };
                const InputContainer =
                  InputContainerRef.current as unknown as HTMLDivElement;
                const Title = TitleRef.current as unknown as HTMLHeadingElement;
                const Desc = DescRef.current as unknown as HTMLParagraphElement;
                const ButtonsContainer =
                  ButtonsContainerRef.current as unknown as HTMLDivElement;
                const next =
                  NextButtonRef.current as unknown as HTMLButtonElement;
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

                fetch("/api/book", {
                  method: "POST", // *GET, POST, PUT, DELETE, etc.
                  mode: "cors", // no-cors, *cors, same-origin
                  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                  credentials: "same-origin", // include, *same-origin, omit
                  headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  redirect: "follow", // manual, *follow, error
                  referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                  body: JSON.stringify(new_status.data), // body data type must match "Content-Type" header
                });
                Title.innerHTML = "Thank you!";
                Desc.innerHTML =
                  "We've sent you a confirmation email, and we'll reach out to you shortly";
                InputContainer.style.display = "none";
                ButtonsContainer.style.display = "none";
                set_form_status(new_status);
              }}
            >
              Submit
            </button>
          )}
        </div>
      </div>
      <img src="/images/LRphoto2-29.png" alt="background image" />
    </Form>
  );
}

type PackageOverlayProps = {
  set_active: Function;
  is_active: boolean;
};
function PackageOverlay(props: PackageOverlayProps) {
  const { is_active, set_active } = props;
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        top: "0",
        padding: "0",
        backdropFilter: "blur(25px)",
        zIndex: 10,
        background: "rgba(0,0,0,0.75)",
        opacity: is_active ? "1" : "0",
        pointerEvents: is_active ? "visible" : "none",
        transition: "opacity 200ms ease-in",
      }}
    >
      <button
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          background: "none",
          border: "none",
        }}
        onClick={() => {
          set_active(false);
        }}
      >
        <CloseIcon height="2rem" width="2rem" fill="white" selectable />
      </button>
      <div
        style={{
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          padding: "1rem",
        }}
      >
        {packages.map((package_info, i) => (
          <PackageInfo package={package_info} key={i + "package_info"} />
        ))}
      </div>
    </div>
  );
}

type PackageSelectionProps = PackageOverlayProps & {
  NextRef: RefObject<HTMLButtonElement>;
  current_form_status: FormValues;
  set_form_status: Function;
};
function PackageSelection(props: PackageSelectionProps) {
  function set_value(value: string) {
    const new_form_status = { ...props.current_form_status };
    new_form_status.data.event.package = value;
    const next = props.NextRef.current as unknown as HTMLButtonElement;
    next.disabled = false;
    next.style.opacity = "1";
    next.style.pointerEvents = "auto";
    next.style.cursor = "pointer";

    props.set_form_status(new_form_status);
  }
  return (
    <fieldset
      style={{ border: "none" }}
      defaultValue={"party-time-package-radio"}
    >
      <p
        style={{ margin: "1rem", cursor: "pointer" }}
        onClick={() => props.set_active(true)}
      >
        View packages
      </p>
      <div>
        <div
          style={{
            fontSize: "1.5rem",
            gap: "1rem",
            display: "flex",
          }}
        >
          <input
            type="radio"
            id="party-time-package-radio"
            name="package"
            value="partytime"
            onClick={() => set_value("partytime")}
          />
          <label htmlFor="party-time-package-radio">Party Time</label>
        </div>
      </div>
      <div style={{ fontSize: "1.5rem", gap: "1rem", display: "flex" }}>
        <input
          type="radio"
          id="sweetheart-package-radio"
          name="package"
          onClick={() => set_value("sweetheart")}
        />
        <label htmlFor="sweetheart-package-radio">Sweetheart</label>
      </div>
      <div style={{ fontSize: "1.5rem", gap: "1rem", display: "flex" }}>
        <input
          type="radio"
          id="showtime-package-radio"
          name="package"
          onClick={() => set_value("showtime")}
        />
        <label htmlFor="showtime-package-radio">Showtime</label>
      </div>
    </fieldset>
  );
}

type PackageInfoProps = {
  package: {
    title: string;
    price: number;
    subtitle: string;
    bullet_points: Array<string>;
  };
};
function PackageInfo(props: PackageInfoProps) {
  const { title, price, subtitle, bullet_points } = props.package;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        border: "1px solid white",
        borderRadius: "var(--card-border-radius)",
        width: "80%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h1 style={{ margin: 0 }}>{title}</h1>
        <p style={{ margin: 0 }}>${price}</p>
        <p style={{ margin: 0 }}>{subtitle}</p>
      </div>
      <p>{`What's included`}</p>
      <ul style={{ padding: "1rem", textAlign: "left" }}>
        {bullet_points.map((point, i) => (
          <li key={i + point + "key"}>{point}</li>
        ))}
      </ul>
    </div>
  );
}
