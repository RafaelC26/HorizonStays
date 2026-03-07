import { useMemo, useState } from "react";
import { listings } from "./data";
import { translations } from "./translations";

export function useAppLogic() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("en");
  const [heroFilters, setHeroFilters] = useState({
    destination: "",
    checkIn: null,
    checkOut: null,
    guests: ""
  });
  const [appliedFilters, setAppliedFilters] = useState({
    destination: "",
    checkIn: null,
    checkOut: null,
    guests: ""
  });
  const [filterError, setFilterError] = useState("");

  const t = translations[language];

  const categories = useMemo(
    () => [
      t.categories.all,
      t.categories.beachFront,
      t.categories.cabins,
      t.categories.countryside,
      t.categories.citystays,
      t.categories.luxury,
      t.categories.hotels
    ],
    [t]
  );
  const categoryKeys = useMemo(
    () => ["all", "beachFront", "cabins", "countryside", "citystays", "luxury", "hotels"],
    []
  );

  const guestOptions = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => {
        const value = String(index + 1);
        return { value, label: value };
      }),
    []
  );

  const selectedGuestOption = useMemo(
    () => guestOptions.find((option) => option.value === String(heroFilters.guests || "")) || null,
    [guestOptions, heroFilters.guests]
  );

  const guestSelectStyles = useMemo(
    () => ({
      control: (base, state) => ({
        ...base,
        minHeight: 38,
        height: 38,
        border: "1px solid rgba(166, 194, 238, 0.72)",
        boxShadow: state.isFocused
          ? "0 0 0 2px rgba(86, 136, 214, 0.32), 0 0 0 7px rgba(183, 213, 255, 0.2), 0 12px 24px rgba(27, 58, 104, 0.18)"
          : "0 8px 18px rgba(30, 58, 105, 0.12)",
        background: "rgba(241, 247, 255, 0.82)",
        backdropFilter: "blur(8px)",
        borderRadius: 12,
        cursor: "pointer",
        transition: "all 0.2s ease"
      }),
      valueContainer: (base) => ({
        ...base,
        padding: "0 10px"
      }),
      placeholder: (base) => ({
        ...base,
        color: "#5877a2",
        fontWeight: 500
      }),
      singleValue: (base) => ({
        ...base,
        color: "#1e2a44",
        fontWeight: 700
      }),
      menu: (base) => ({
        ...base,
        marginTop: 8,
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid rgba(166, 194, 238, 0.78)",
        background: "rgba(246, 250, 255, 0.95)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 20px 34px rgba(17, 44, 89, 0.24)",
        animation: "guestMenuIn 220ms cubic-bezier(0.22, 1, 0.36, 1)"
      }),
      menuList: (base) => ({
        ...base,
        maxHeight: 220,
        padding: 6
      }),
      option: (base, state) => ({
        ...base,
        borderRadius: 10,
        marginBottom: 2,
        background: state.isSelected
          ? "linear-gradient(135deg, #2f5f9f, #1f4e8d)"
          : state.isFocused
            ? "rgba(219, 233, 255, 0.92)"
            : "transparent",
        color: state.isSelected ? "#ffffff" : "#1f3f6d",
        fontWeight: state.isSelected ? 700 : 600,
        cursor: "pointer"
      }),
      dropdownIndicator: (base, state) => ({
        ...base,
        color: state.isFocused ? "#2b528e" : "#4b6fa0"
      }),
      clearIndicator: (base) => ({
        ...base,
        color: "#4b6fa0"
      }),
      indicatorSeparator: () => ({
        display: "none"
      })
    }),
    []
  );

  const filtered = useMemo(() => {
    const activeCategoryKey =
      activeCategoryIndex === null ? null : categoryKeys[activeCategoryIndex] || null;

    return listings.filter((listing) => {
      const quickText = search.trim().toLowerCase();
      const destination = appliedFilters.destination.trim().toLowerCase();
      const guests = Number(appliedFilters.guests || 0);

      const matchesQuickSearch =
        !quickText ||
        listing.title.toLowerCase().includes(quickText) ||
        listing.location.toLowerCase().includes(quickText);

      const matchesDestination =
        !destination ||
        listing.title.toLowerCase().includes(destination) ||
        listing.location.toLowerCase().includes(destination);

      const matchesGuests = !guests || listing.maxGuests >= guests;
      const matchesCategory = !activeCategoryKey || activeCategoryKey === "all" || listing.category === activeCategoryKey;

      return matchesQuickSearch && matchesDestination && matchesGuests && matchesCategory;
    });
  }, [search, appliedFilters, activeCategoryIndex, categoryKeys]);

  const featuredListings = useMemo(
    () => filtered.filter((listing) => listing.featured),
    [filtered]
  );

  const additionalListings = useMemo(
    () => filtered.filter((listing) => !listing.featured),
    [filtered]
  );

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  };

  const handleHeroFilterChange = (field, value) => {
    setHeroFilters((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCategoryClick = (index) => {
    setActiveCategoryIndex((prev) => (prev === index ? null : index));
  };

  const applyHeroFilters = () => {
    if (
      heroFilters.checkIn &&
      heroFilters.checkOut &&
      heroFilters.checkOut.getTime() <= heroFilters.checkIn.getTime()
    ) {
      setFilterError(t.hero.invalidDateRange);
      return;
    }

    setFilterError("");
    setAppliedFilters({ ...heroFilters });
  };

  const openListingDetails = (listing) => {
    const payload = encodeURIComponent(
      JSON.stringify({
        ...listing,
        language,
        sectionTitle: listing.featured
          ? t.listings.featuredAccommodations
          : t.listings.additionalStays
      })
    );

    window.open(`/stay-detail.html?data=${payload}`, "_blank", "noopener,noreferrer");
  };

  return {
    activeCategoryIndex,
    search,
    setSearch,
    language,
    heroFilters,
    filterError,
    t,
    categories,
    guestOptions,
    selectedGuestOption,
    guestSelectStyles,
    featuredListings,
    additionalListings,
    toggleLanguage,
    handleHeroFilterChange,
    handleCategoryClick,
    applyHeroFilters,
    openListingDetails
  };
}
