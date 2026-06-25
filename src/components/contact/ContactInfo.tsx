import type { ReactElement } from "react";
import { Icon } from "../ui/Icon";
import { contactDetails } from "../../data/contact.data";
import { socials } from "../../data/home.data";
import type { ContactIconName } from "../../types/contact.type";

const detailIcons: Record<ContactIconName, () => ReactElement> = {
  location: Icon.location,
  phone: Icon.phone,
  mail: Icon.mail,
  clock: Icon.clock,
};

const socialIcons: Record<string, ReactElement> = {
  Telegram: (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.5 4.5L2.5 12l5 1.8 9-7-7 8 6.5 5.2L21.5 4.5z" />
    </svg>
  ),
  Instagram: (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  Facebook: (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  YouTube: (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  ),
};

const ContactInfo = () => {
  return (
    <aside className="flex flex-col gap-5">
      {/* Contact info card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500">
          Bog'lanish ma'lumotlari
        </h3>
        <ul className="flex flex-col gap-4">
          {contactDetails.map((detail) => {
            const DetailIcon = detailIcons[detail.icon];
            return (
              <li key={detail.label} className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <DetailIcon />
                </span>
                <div>
                  <p className="mb-0.5 text-xs text-gray-500">{detail.label}</p>
                  {detail.lines.map((line, index) => (
                    <p
                      key={line}
                      className={`text-sm ${
                        detail.icon === "clock" && index === detail.lines.length - 1
                          ? "text-gray-400"
                          : "font-medium text-gray-900"
                      }`}
                    >
                      {detail.icon === "phone" ? (
                        <a href={`tel:${line.replace(/\s/g, "")}`} className="hover:text-blue-600">
                          {line}
                        </a>
                      ) : detail.icon === "mail" ? (
                        <a href={`mailto:${line}`} className="hover:text-blue-600">
                          {line}
                        </a>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Map placeholder */}
      <div className="overflow-hidden rounded-xl border border-gray-200" style={{ aspectRatio: "16 / 10" }}>
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=500&fit=crop"
          alt="Toshkent xarita ko'rinishi"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Social links */}
      <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
        <span className="mr-auto text-sm font-semibold text-gray-900">
          Ijtimoiy tarmoqlarda
        </span>
        <ul className="flex gap-2">
          {socials.map((name) => (
            <li key={name}>
              <a
                href="#"
                aria-label={name}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:-translate-y-0.5 hover:bg-blue-600 hover:text-white"
              >
                {socialIcons[name] ?? <span className="text-xs font-medium">{name[0]}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ContactInfo;
