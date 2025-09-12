import { html } from "lit-html";

type SearchBarProps = {
  onSearch: (location: string) => void;
};

export function searchBarHtml({ onSearch }: SearchBarProps) {
  const baseUrl = import.meta.env.BASE_URL;

  return html`
    <form @submit=${handleSearch} class="flex flex-col gap-4">
      <div class="relative flex items-center">
        <img
          src="${baseUrl}assets/images/icon-search.svg"
          alt=""
          class="absolute left-4"
        />
        <input
          type="search"
          name="search"
          placeholder="Search for a place..."
          aria-label="Search for a place"
          class="focus:ring-primary-400 w-full rounded-full bg-neutral-800 py-4 pr-4 pl-12 text-white placeholder-neutral-400 focus:ring-2 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        class="w-full rounded-full bg-blue-500 py-4 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        Search
      </button>
    </form>
  `;

  function handleSearch(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const searchInput = form.elements.namedItem("search") as HTMLInputElement;
    const location = searchInput.value.trim();
    if (location) {
      onSearch(location);
      form.reset();
    }
  }
}
