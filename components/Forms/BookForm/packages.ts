export default [
  Package("Party Time", 1250, "Reception only", [
    "Up to 4 hours",
    "Professional DJ and MC services",
    "Full DJ Setup + JBL Speakers + Microphones",
    "Basic Dance Floor Lights",
    "Full Planning Services",
  ]),
  Package(
    "Sweetheart",
    1500,
    "Reception, Ceremony, and Cocktail Hour Included",
    [
      "Up to 6 hours",
      "Professional DJ and MC services",
      "Full DJ Setup + JBL Speakers + Microphones",
      "Speakers + Mic for Ceremony and Cocktail Hour",
      "Basic Dance Floor Lights",
      "Full Planning Services",
    ]
  ),
  Package(
    "Showtime",
    2000,
    "Reception, Ceremony, Cocktail Hour, and Live Musician Included",
    [
      "Up to 8 hours",
      "Professional DJ and MC services",
      "Full DJ Setup + JBL Speakers + Microphones",
      "Las Vegas Club Style Lighting",
      "Speakers + Mic for Ceremony and Cocktail Hour",
      "1 hour w/ Live Musician + DJ",
      "Full Planning Services",
    ]
  ),
];

function Package(
  title: string,
  price: number,
  subtitle: string,
  bullet_points: Array<string>
) {
  return {
    title,
    price,
    subtitle,
    bullet_points,
  };
}
