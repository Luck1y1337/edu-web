export type ContactIconName = "location" | "phone" | "mail" | "clock";

export interface ContactDetail {
  icon: ContactIconName;
  label: string;
  lines: string[];
}
