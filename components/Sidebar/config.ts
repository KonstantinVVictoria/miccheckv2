type NavTypeEnum = "normal" | "special";

function NavLink(label: string, link: string, type: NavTypeEnum = "normal") {
  return {
    label,
    link,
    type,
  };
}

export const config = [
  NavLink("Home", ""),
  NavLink("Mixes", "#mixes_section"),
  NavLink("Book", ""),
  NavLink("Jobs", ""),
];
