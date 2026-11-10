import { MinusIcon, PlusIcon, TrashIcon } from "~/components/Icons";

export function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label,
  size = "default",
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label: string;
  size?: "default" | "small";
}) {
  const button =
    size === "small"
      ? "h-7 w-7"
      : "h-9 w-9";
  const readout = size === "small" ? "w-8 text-[12px]" : "w-11 text-[13px]";

  return (
    <div
      className="inline-flex items-center border border-white/20"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={label + " −"}
        className={`${button} flex items-center justify-center text-white/70 transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:text-white/25 disabled:hover:bg-transparent disabled:hover:text-white/25`}
      >
        <MinusIcon width={12} height={12} />
      </button>
      <span
        className={`${readout} text-center font-semibold tabular-nums`}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={label + " +"}
        className={`${button} flex items-center justify-center text-white/70 transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:text-white/25`}
      >
        <PlusIcon width={12} height={12} />
      </button>
    </div>
  );
}

export function RemoveButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex items-center gap-1 text-[10.5px] uppercase tracking-[0.14em] text-white/40 transition-colors hover:text-white"
    >
      <TrashIcon width={13} height={13} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
