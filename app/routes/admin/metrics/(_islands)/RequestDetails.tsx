import { useEffect, useState } from "preact/hooks";

export default function RequestDetails() {
  const [visible, setVisible] = useState(false);
  const [_loading, setLoading] = useState(false);
  const [body, setBody] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const rows = Array.from(
      document.querySelectorAll("tr[data-id]"),
    ) as HTMLElement[];
    const handlers = new Map<HTMLElement, EventListenerOrEventListenerObject>();

    rows.forEach((r) => {
      const listener = async () => {
        const id = r.getAttribute("data-id");
        if (!id) return;
        setVisible(true);
        setLoading(true);
        setError("");
        setBody("Loading...");
        try {
          const res = await fetch(
            "/api/admin/metrics/request?id=" + encodeURIComponent(id) +
              location.search,
          );
          if (!res.ok) {
            setError("Error loading request: " + res.status);
            setBody("");
            return;
          }
          const json = await res.json();
          setBody(JSON.stringify(json, null, 2));
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          setError("Fetch error: " + msg);
          setBody("");
        } finally {
          setLoading(false);
        }
      };
      r.addEventListener("click", listener);
      handlers.set(r, listener);
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVisible(false);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      handlers.forEach((listener, el) =>
        el.removeEventListener("click", listener)
      );
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div>
      {visible && (
        <div class="fixed inset-0 flex items-center justify-center bg-black/60 p-6 z-50">
          <div class="bg-gray-900 rounded-lg max-w-3xl w-full p-6 border border-gray-700">
            <div class="flex justify-between items-start">
              <h3 class="text-lg font-bold">Request Details</h3>
              <button
                type="button"
                class="text-gray-400"
                onClick={() => setVisible(false)}
              >
                Close
              </button>
            </div>
            <pre class="text-sm mt-4 text-gray-200 overflow-auto max-h-80 whitespace-pre-wrap">{error ? error : body}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
