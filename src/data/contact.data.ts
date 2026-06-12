import type { ContactDetail } from "../types/contact.type";

export const contactDetails: ContactDetail[] = [
  {
    icon: "location",
    label: "Manzil",
    lines: ["Amir Temur ko'chasi 108-uy, Toshkent, O'zbekiston"],
  },
  {
    icon: "phone",
    label: "Telefon",
    lines: ["+998 71 123 45 67", "+998 90 123 45 67"],
  },
  {
    icon: "mail",
    label: "Email",
    lines: ["info@oquv.uz", "support@oquv.uz"],
  },
  {
    icon: "clock",
    label: "Ish vaqti",
    lines: ["Du-Ju: 09:00 — 19:00", "Sha: 10:00 — 16:00", "Yakshanba: dam olish kuni"],
  },
];

export const messageSubjects: string[] = [
  "Kurs haqida ma'lumot",
  "To'lov va chegirmalar",
  "Hamkorlik taklifi",
  "Boshqa savol",
];
