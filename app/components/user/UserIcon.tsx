interface UserIconProps {
  /** Image URL for the avatar. If omitted, a fallback SVG will be shown. */
  src?: string;
  /** Alt text for the image (and accessible label). */
  alt?: string;
  /** Additional Tailwind / utility classes to apply to the wrapper. */
  class?: string;
  /** Optional Tailwind classes to control size (e.g. "w-8 h-8", "w-12 h-12").
   * If not provided, defaults to `w-10 h-10`.
   */
  sizeClass?: string;
}

export default function UserIcon({
  src,
  alt = "User avatar",
  class: extra = "",
  sizeClass = "w-10 h-10",
}: UserIconProps) {
  // Base classes: circular, small border and clipped content
  const wrapper = [
    "inline-block",
    "rounded-full",
    "border",
    "border-gray-200",
    "overflow-hidden",
    "bg-gray-100",
    sizeClass,
    extra,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div class={wrapper} role="img" aria-label={alt}>
      {src
        ? (
          // cover the container to preserve circular cropping
          <img src={src} alt={alt} class="object-cover w-full h-full" />
        )
        : (
          // simple fallback user silhouette SVG sized to container
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-full h-full text-gray-400"
            aria-hidden="true"
          >
            <rect
              width="24"
              height="24"
              rx="12"
              fill="currentColor"
              opacity="0.06"
            />
            <path
              d="M12 12.5c1.93 0 3.5-1.57 3.5-3.5S13.93 5.5 12 5.5 8.5 7.07 8.5 9s1.57 3.5 3.5 3.5zM4 19.5c0-2.76 3.58-5 8-5s8 2.24 8 5v.5H4v-.5z"
              fill="currentColor"
            />
          </svg>
        )}
    </div>
  );
}
