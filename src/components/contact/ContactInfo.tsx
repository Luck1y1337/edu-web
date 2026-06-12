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

const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Bog'lanish ma'lumotlari
        </h3>
        <ul className="mt-6 space-y-6">
          {contactDetails.map((detail) => {
            const DetailIcon = detailIcons[detail.icon];
            return (
              <li key={detail.label} className="flex gap-x-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <DetailIcon />
                </span>
                <div>
                  <p className="text-xs text-gray-400">{detail.label}</p>
                  {detail.lines.map((line, index) => (
                    <p
                      key={line}
                      className={`text-sm ${
                        detail.icon === "clock" &&
                        index === detail.lines.length - 1
                          ? "text-gray-400"
                          : "font-medium text-gray-900"
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <img
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=70"
        alt="Xarita"
        className="h-72 w-full rounded-2xl object-cover shadow-sm"
      />

      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold leading-snug">
          Ijtimoiy
          <br />
          tarmoqlarda
        </p>
        <div className="flex items-center gap-x-3">
          {socials.map((name) => (
            <a
              key={name}
              href="#"
              title={name}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-xs text-gray-500 transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              {name[0]}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
