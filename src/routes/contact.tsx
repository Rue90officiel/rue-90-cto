import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "~/lib/i18n";
import { CheckIcon } from "~/components/Icons";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Nous joindre — Rue 90" }] }),
  component: ContactPage,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

function ContactPage() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = t("contact.errorName");
    if (!EMAIL_RE.test(form.email.trim())) next.email = t("contact.errorEmail");
    if (form.message.trim().length < 10) next.message = t("contact.errorMessage");
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setSent(false);
      return;
    }
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  const blocks = [
    {
      title: t("contact.addressTitle"),
      value: "1234, rue Saint-Laurent\nMontréal (Québec) H2X 2S9",
    },
    {
      title: t("contact.emailTitle"),
      value: "bonjour@rue90.example",
    },
    {
      title: t("contact.phoneTitle"),
      value: "514 555-0190",
    },
  ];

  return (
    <div className="container-x pb-16 pt-8 md:pt-12">
      <header className="border-b border-white/14 pb-7">
        <p className="label">{t("contact.eyebrow")}</p>
        <h1 className="display mt-2 text-4xl md:text-5xl">{t("contact.title")}</h1>
        <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-white/50">
          {t("contact.intro")}
        </p>
      </header>

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        {blocks.map((block) => (
          <div
            key={block.title}
            className="relative border border-dashed border-white/22 bg-[#0c0c0c] p-4"
          >
            <span className="absolute right-3 top-3 border border-white/25 px-1.5 py-[2px] text-[8.5px] font-bold uppercase tracking-[0.14em] text-white/45">
              {t("contact.placeholderTag")}
            </span>
            <p className="label mt-4">{block.title}</p>
            <p className="mt-2 whitespace-pre-line text-[13px] leading-relaxed text-white/70">
              {block.value}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-2.5 text-[11px] leading-relaxed text-white/35">
        {t("contact.placeholderNote")}
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="border border-white/16 bg-[#0c0c0c] p-5 md:p-6">
          <h2 className="text-[13px] font-bold uppercase tracking-[0.14em]">
            {t("contact.formTitle")}
          </h2>
          <p className="mt-2 text-[12px] leading-relaxed text-white/45">
            {t("contact.formBody")}
          </p>

          {sent ? (
            <div className="anim-fade mt-6 border border-white/30 bg-white/[0.04] p-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center border border-white bg-white text-black">
                  <CheckIcon width={14} height={14} />
                </span>
                <p className="text-[13.5px] font-semibold">{t("contact.success")}</p>
              </div>
              <p className="mt-3 text-[11.5px] leading-relaxed text-white/50">
                {t("contact.successNote")}
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="btn btn-ghost btn-sm mt-4"
              >
                {t("contact.another")}
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-5 grid gap-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50"
                  >
                    {t("contact.name")}
                  </label>
                  <input
                    id="contact-name"
                    value={form.name}
                    onChange={(event) => {
                      setForm({ ...form, name: event.target.value });
                      setErrors({ ...errors, name: "" });
                    }}
                    placeholder={t("contact.namePlaceholder")}
                    aria-invalid={Boolean(errors.name)}
                    className={`field ${errors.name ? "field-error" : ""}`}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-[11px] text-white/70">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50"
                  >
                    {t("contact.email")}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(event) => {
                      setForm({ ...form, email: event.target.value });
                      setErrors({ ...errors, email: "" });
                    }}
                    placeholder={t("contact.emailPlaceholder")}
                    aria-invalid={Boolean(errors.email)}
                    className={`field ${errors.email ? "field-error" : ""}`}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-[11px] text-white/70">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50"
                >
                  {t("contact.message")}
                </label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(event) => {
                    setForm({ ...form, message: event.target.value });
                    setErrors({ ...errors, message: "" });
                  }}
                  rows={6}
                  placeholder={t("contact.messagePlaceholder")}
                  aria-invalid={Boolean(errors.message)}
                  className={`field resize-y ${errors.message ? "field-error" : ""}`}
                />
                {errors.message && (
                  <p className="mt-1 text-[11px] text-white/70">{errors.message}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" className="btn btn-primary">
                  {t("contact.send")}
                </button>
                <span className="text-[10.5px] uppercase tracking-[0.14em] text-white/30">
                  {t("contact.reply")}
                </span>
              </div>
            </form>
          )}
        </div>

        <aside className="border border-white/16 bg-[#0c0c0c] p-5">
          <p className="label">{t("contact.hours")}</p>
          <p className="mt-2 text-[13px] leading-relaxed text-white/70">
            {t("contact.hoursValue")}
          </p>
          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="label">{t("brand.city")}</p>
            <p className="mt-2 text-[12px] leading-relaxed text-white/45">
              {t("footer.tagline")}
            </p>
          </div>
          <p className="mt-5 border border-dashed border-white/20 px-3 py-2 text-[10.5px] leading-relaxed text-white/35">
            {t("footer.placeholder")}
          </p>
        </aside>
      </div>
    </div>
  );
}
