/**
 * The type representing a park result's images.
 */
export type ResultImage = {
  credit: string;
  altText: string;
  title: string;
  id: string;
  caption: string;
  url: string;
};

/**
 * The type representing a park and its information.
 */
export type Result = {
  states: string;
  latLong: string;
  description: string;
  images?: ResultImage[];
  designation: string;
  parkCode: string;
  id: string;
  directionsInfo: string;
  directionsUrl: string;
  fullName: string;
  url: string;
  weatherInfo: string;
  name: string;
};

/**
 * The type representing a visitor center and its information.
 */
export type VisitorCenter = {
  latLong: string;
  description: string;
  parkCode: string;
  id: string;
  directionsInfo: string;
  directionsUrl: string;
  url: string;
  name: string;
};
