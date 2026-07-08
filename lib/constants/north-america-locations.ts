export const SUPPORTED_COUNTRIES = ["United States", "Canada"] as const;
export type SupportedCountry = (typeof SUPPORTED_COUNTRIES)[number];

export const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
] as const;

export type UsState = (typeof US_STATES)[number];

export const CA_PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
] as const;

export type CaProvince = (typeof CA_PROVINCES)[number];

export const US_CARE_REGIONS = [
  "Northeast",
  "Midwest",
  "South",
  "West",
  "Other US region",
] as const;

export type UsCareRegion = (typeof US_CARE_REGIONS)[number];

export const CA_CARE_REGIONS = [
  "Atlantic",
  "Central Canada",
  "Prairies",
  "West Coast",
  "Northern Territories",
  "Other Canadian region",
] as const;

export type CaCareRegion = (typeof CA_CARE_REGIONS)[number];

/** @deprecated Use SUPPORTED_COUNTRIES and country-specific lists instead */
export const DEFAULT_COUNTRY: SupportedCountry = "United States";
/** @deprecated Use US_STATES / CA_PROVINCES instead */
export const DEFAULT_STATE: UsState = "California";

/** @deprecated Legacy California-only regions — kept for backward-compatible reads */
export const CALIFORNIA_HEALTH_QUARTERS = [
  "Northern California",
  "Bay Area",
  "Central Valley",
  "Central Coast",
  "Los Angeles Metro",
  "Orange County",
  "San Diego & Inland Empire",
  "Other California region",
] as const;

const US_CITY_SUGGESTIONS: Partial<Record<UsState, readonly string[]>> = {
  California: [
    "Los Angeles",
    "San Francisco",
    "San Diego",
    "Sacramento",
    "San Jose",
    "Oakland",
    "Fresno",
  ],
  "New York": ["New York", "Buffalo", "Rochester", "Albany", "Syracuse"],
  Texas: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth"],
  Florida: ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale"],
  Illinois: ["Chicago", "Springfield", "Naperville", "Peoria"],
  Pennsylvania: ["Philadelphia", "Pittsburgh", "Harrisburg", "Allentown"],
  Ohio: ["Columbus", "Cleveland", "Cincinnati", "Toledo"],
  Georgia: ["Atlanta", "Savannah", "Augusta"],
  Washington: ["Seattle", "Spokane", "Tacoma", "Bellevue"],
  Massachusetts: ["Boston", "Worcester", "Springfield", "Cambridge"],
  Arizona: ["Phoenix", "Tucson", "Mesa", "Scottsdale"],
  Colorado: ["Denver", "Colorado Springs", "Aurora", "Boulder"],
  Michigan: ["Detroit", "Grand Rapids", "Ann Arbor", "Lansing"],
  "District of Columbia": ["Washington"],
};

const CA_CITY_SUGGESTIONS: Partial<Record<CaProvince, readonly string[]>> = {
  Ontario: ["Toronto", "Ottawa", "Mississauga", "Hamilton", "London"],
  Quebec: ["Montreal", "Quebec City", "Laval", "Gatineau"],
  "British Columbia": ["Vancouver", "Victoria", "Surrey", "Burnaby"],
  Alberta: ["Calgary", "Edmonton", "Red Deer", "Lethbridge"],
  Manitoba: ["Winnipeg", "Brandon", "Steinbach"],
  Saskatchewan: ["Saskatoon", "Regina", "Prince Albert"],
  "Nova Scotia": ["Halifax", "Dartmouth", "Sydney"],
  "New Brunswick": ["Moncton", "Saint John", "Fredericton"],
  "Newfoundland and Labrador": ["St. John's", "Mount Pearl"],
  "Prince Edward Island": ["Charlottetown", "Summerside"],
  Yukon: ["Whitehorse"],
  "Northwest Territories": ["Yellowknife"],
  Nunavut: ["Iqaluit"],
};

export function getSubdivisionLabel(country: SupportedCountry): string {
  return country === "Canada" ? "Province or territory" : "State";
}

export function getSubdivisions(country: SupportedCountry): readonly string[] {
  return country === "Canada" ? CA_PROVINCES : US_STATES;
}

export function getCareRegions(country: SupportedCountry): readonly string[] {
  return country === "Canada" ? CA_CARE_REGIONS : US_CARE_REGIONS;
}

export function getCitySuggestions(
  country: SupportedCountry,
  subdivision: string,
): readonly string[] {
  if (country === "Canada") {
    return (
      CA_CITY_SUGGESTIONS[subdivision as CaProvince] ?? []
    );
  }
  return US_CITY_SUGGESTIONS[subdivision as UsState] ?? [];
}

export function isValidSubdivision(
  country: SupportedCountry,
  subdivision: string,
): boolean {
  return getSubdivisions(country).includes(subdivision);
}

export function isValidCareRegion(
  country: SupportedCountry,
  region: string,
): boolean {
  return getCareRegions(country).includes(region);
}
