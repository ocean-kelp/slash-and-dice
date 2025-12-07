import dicebearUrl from "@/services/dicebear/dicebear.ts";

type User = {
  username?: string;
  iconUrl?: string;
};

type Props = {
  user?: User;
  translationData?: Record<string, unknown>;
};

export default function UserProfile({ user }: Props) {
  // translationData is available for future use if needed for localized tooltips or labels
  const name = user?.username ?? "Guest";

  // If the user has an explicit iconUrl, use it. Otherwise, build a Dicebear
  // avatar URL. Use the username as a stable seed when available so avatars
  // remain consistent for known users; fall back to a short random seed for
  // anonymous users.
  const seed = user?.username ??
    `anon-${Math.random().toString(36).slice(2, 9)}`;
  const avatarUrl = user?.iconUrl ?? dicebearUrl(seed);

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((s) => s[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div class="flex items-center gap-3">
      <div class="w-14 h-14 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border-2 border-ocean-deep-500 shadow-sm">
        {avatarUrl
          ? (
            <img
              src={avatarUrl}
              alt={`${name} avatar`}
              class="w-full h-full object-cover"
            />
          )
          : (
            <span class="text-sm font-medium text-gray-600">
              {initials || "G"}
            </span>
          )}
      </div>

      <div class="text-sm text-right sm:text-left">
        <div class="font-medium text-gray-800">{name}</div>
        <div class="text-xs text-gray-500">
          @{(user?.username ?? "guest").toLowerCase()}
        </div>
      </div>
    </div>
  );
}
