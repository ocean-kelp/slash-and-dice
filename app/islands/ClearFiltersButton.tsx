interface ClearFiltersButtonProps {
  hasFilters: boolean;
  label: string;
}

export default function ClearFiltersButton(
  { hasFilters, label }: ClearFiltersButtonProps,
) {
  if (!hasFilters) return null;

  const handleClear = () => {
    const url = new URL(globalThis.location.href);
    // Preserve only search and sort params
    const search = url.searchParams.get("search");
    const sort = url.searchParams.get("sort");

    url.search = "";
    if (search) url.searchParams.set("search", search);
    if (sort) url.searchParams.set("sort", sort);

    globalThis.location.href = url.toString();
  };

  return (
    <button
      type="button"
      onClick={handleClear}
      class="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 font-semibold rounded-lg transition-colors text-sm"
    >
      {label}
    </button>
  );
}
