export const DEFAULT_STATE = "California" as const;
export const DEFAULT_COUNTRY = "United States" as const;

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

export type CaliforniaHealthQuarter =
  (typeof CALIFORNIA_HEALTH_QUARTERS)[number];

export const CALIFORNIA_CITY_SUGGESTIONS = [
  "Los Angeles",
  "San Francisco",
  "San Diego",
  "Sacramento",
  "San Jose",
  "Fresno",
  "Oakland",
  "Long Beach",
  "Bakersfield",
  "Anaheim",
  "Santa Ana",
  "Riverside",
  "Stockton",
  "Irvine",
  "Chula Vista",
] as const;
