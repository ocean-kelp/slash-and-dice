type User = {
  username?: string;
  iconUrl?: string;
};

export default function UserProfile({ user }: { user?: User }) {
  const name = user?.username ?? "Guest";
  const iconUrl = user?.iconUrl;

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((s) => s[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
        {iconUrl
          ? (
            <img
              src={iconUrl}
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
