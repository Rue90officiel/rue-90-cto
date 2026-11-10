import { StarIcon } from "~/components/Icons";
import type { Lang } from "~/data/products";

export function Stars({
  rating,
  size = 12,
  className = "",
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-[2px] ${className}`}
      aria-label={`${rating.toFixed(1)} / 5`}
    >
      {[1, 2, 3, 4, 5].map((index) => {
        const filled = rating >= index - 0.25;
        return (
          <StarIcon
            key={index}
            filled={filled}
            width={size}
            height={size}
            className={filled ? "text-white" : "text-white/25"}
          />
        );
      })}
    </span>
  );
}

export const formatRating = (rating: number, lang: Lang): string =>
  lang === "fr"
    ? rating.toFixed(1).replace(".", ",")
    : rating.toFixed(1);

export function RatingLine({
  rating,
  reviews,
  lang,
  reviewsLabel,
  className = "",
}: {
  rating: number;
  reviews: number;
  lang: Lang;
  reviewsLabel: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Stars rating={rating} />
      <span className="text-[11px] font-medium text-white/55">
        {formatRating(rating, lang)}
      </span>
      <span className="text-[11px] text-white/35">
        ({reviews} {reviewsLabel})
      </span>
    </div>
  );
}
