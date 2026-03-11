import { useRef } from "react";

function HeroSection({
  t,
  language,
  checkInDate,
  checkOutDate,
  minCheckIn,
  minCheckOut,
  availabilityResult,
  onChangeCheckIn,
  onChangeCheckOut,
  onCheckAvailability
}) {
  const checkInInputRef = useRef(null);
  const checkOutInputRef = useRef(null);

  const formatDisplayDate = (value) => {
    if (!value) {
      return null;
    }

    return new Date(`${value}T00:00:00`).toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const openDatePicker = (inputRef) => {
    const input = inputRef.current;

    if (!input) {
      return;
    }

    if (typeof input.showPicker === "function") {
      input.showPicker();
      return;
    }

    input.focus();
    input.click();
  };

  return (
    <section id="hero" className="hero">
      <div className="heroOverlay" />
      <div className="heroContent">
        <h1 className="heroTitle">{t.hero.title}</h1>
        <p className="heroSubtitle">{t.hero.subtitle}</p>

        <form
          className="searchBar"
          onSubmit={(event) => {
            event.preventDefault();
            onCheckAvailability();
          }}
        >
          <div className="searchField">
            <div className="searchInputWrapper">
              <label htmlFor="hero-check-in">{t.hero.checkInLabel}</label>
              <button
                className="calendarTrigger"
                type="button"
                aria-label={t.hero.checkInLabel}
                onClick={() => openDatePicker(checkInInputRef)}
              >
                {formatDisplayDate(checkInDate) || t.hero.selectCheckInBtn}
              </button>
              <input
                ref={checkInInputRef}
                id="hero-check-in"
                className="heroDatePickerInput"
                type="date"
                min={minCheckIn}
                value={checkInDate}
                onChange={(event) => onChangeCheckIn(event.target.value)}
                onKeyDown={(event) => event.preventDefault()}
                required
              />
            </div>
          </div>

          <div className="searchDivider" />

          <div className="searchField">
            <div className="searchInputWrapper">
              <label htmlFor="hero-check-out">{t.hero.checkOutLabel}</label>
              <button
                className="calendarTrigger"
                type="button"
                aria-label={t.hero.checkOutLabel}
                onClick={() => openDatePicker(checkOutInputRef)}
              >
                {formatDisplayDate(checkOutDate) || t.hero.selectCheckOutBtn}
              </button>
              <input
                ref={checkOutInputRef}
                id="hero-check-out"
                className="heroDatePickerInput"
                type="date"
                min={minCheckOut}
                value={checkOutDate}
                onChange={(event) => onChangeCheckOut(event.target.value)}
                onKeyDown={(event) => event.preventDefault()}
                required
              />
            </div>
          </div>

          <button className="searchButton" type="submit" aria-label={t.hero.checkAvailabilityBtn}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="11" cy="11" r="5.5" stroke="currentColor" strokeWidth="2"/>
              <path d="M15.5 15.5L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </form>

        {availabilityResult && (
          <div className={`availabilityResult ${availabilityResult.isAvailable ? "available" : "unavailable"}`}>
            <strong>{availabilityResult.title}</strong>
            <p>{availabilityResult.message}</p>
            {!!availabilityResult.listingNames?.length && (
              <p className="availabilityListings">{availabilityResult.listingNames.join(" | ")}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default HeroSection;
