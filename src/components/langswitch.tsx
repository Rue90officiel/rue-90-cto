import { useI18n } from "~/lib/i18n";
import { GlobeIcon } from "~/components/Icons";

export function LangSwitch({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      className={`inline-flex items-center overflow-hidden border border-white/20 ${className}`}
      role="group"
      aria-label={t("common.languageSwitch")}
    >
      {!compact && (
        <GlobeIcon
          width={13}
          height={13}
          className="mx-2 shrink-0 text-white/45"
        />
      )}
      {(["fr", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors ${
            lang === code
              ? "bg-white text-black"
              : "text-white/60 hover:text-white"
          }`}
        >
          {code === "fr" ? "FR" : "EN"}
        </button>
      ))}
    </div>
  );
}
