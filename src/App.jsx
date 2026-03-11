import "./App.css";
import { useState, useMemo, useRef } from "react";
import { listings } from "./data";
import { translations } from "./translations";
import logoImg from "./assets/logo.png";
import footerImage from "./assets/footer.jpg";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ListingsSection from "./components/ListingsSection";
import ExperiencesSection from "./components/ExperiencesSection";
import FooterSection from "./components/FooterSection";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const toIsoDate = (date) => {
  const safeDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return safeDate.toISOString().slice(0, 10);
};

const addDays = (baseDate, days) => {
  const nextDate = new Date(baseDate);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

const eachDayIso = (startIso, endIso) => {
  const startDate = new Date(`${startIso}T00:00:00`);
  const endDate = new Date(`${endIso}T00:00:00`);
  const allDates = [];

  for (let cursor = startDate; cursor < endDate; cursor = new Date(cursor.getTime() + DAY_IN_MS)) {
    allDates.push(toIsoDate(cursor));
  }

  return allDates;
};

const buildUnavailableDatesForListing = (listingId, baseDate) => {
  const unavailableDates = new Set();
  const blocks = [
    { startOffset: (listingId * 3) % 18 + 6, length: 3 + (listingId % 3) },
    { startOffset: (listingId * 5) % 30 + 30, length: 2 + (listingId % 4) },
    { startOffset: (listingId * 7) % 28 + 64, length: 3 + (listingId % 2) }
  ];

  blocks.forEach((block) => {
    const blockStart = addDays(baseDate, block.startOffset);
    for (let i = 0; i < block.length; i += 1) {
      unavailableDates.add(toIsoDate(addDays(blockStart, i)));
    }
  });

  return unavailableDates;
};

function App() {
  const [language, setLanguage] = useState("es");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [favoriteListingIds, setFavoriteListingIds] = useState([]);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [availabilityResult, setAvailabilityResult] = useState(null);
  
  const userMenuRef = useRef(null);
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  };

  const toggleFavoriteListing = (listingId) => {
    setFavoriteListingIds((prev) => (prev.includes(listingId)
      ? prev.filter((id) => id !== listingId)
      : [...prev, listingId]));
  };

  const handleUserMenuAction = (actionKey) => {
    setIsUserMenuOpen(false);
    if (actionKey === "logout") {
      setIsAuthenticated(false);
    }
  };

  const handleAuthAction = () => {
    setIsAuthenticated(true);
  };

  const featuredListings = useMemo(() => {
    return listings.filter((l) => l.featured);
  }, []);

  const todayIso = useMemo(() => toIsoDate(new Date()), []);

  const listingUnavailableDates = useMemo(() => {
    const baseDate = new Date(`${todayIso}T00:00:00`);

    return listings.reduce((accumulator, listing) => {
      accumulator[listing.id] = buildUnavailableDatesForListing(listing.id, baseDate);
      return accumulator;
    }, {});
  }, [todayIso]);

  const isListingAvailableForRange = (listingId, startIso, endIso) => {
    const datesToCheck = eachDayIso(startIso, endIso);
    if (!datesToCheck.length) {
      return false;
    }

    const unavailableDates = listingUnavailableDates[listingId];
    return datesToCheck.every((dateIso) => !unavailableDates.has(dateIso));
  };

  const handleCheckAvailability = () => {
    if (!checkInDate || !checkOutDate) {
      setAvailabilityResult({
        isAvailable: false,
        title: t.hero.missingDatesTitle,
        message: t.hero.missingDatesMessage,
        listingNames: []
      });
      return;
    }

    if (checkOutDate <= checkInDate) {
      setAvailabilityResult({
        isAvailable: false,
        title: t.hero.invalidRangeTitle,
        message: t.hero.invalidRangeMessage,
        listingNames: []
      });
      return;
    }

    const availableListings = listings.filter((listing) => (
      isListingAvailableForRange(listing.id, checkInDate, checkOutDate)
    ));

    if (!availableListings.length) {
      setAvailabilityResult({
        isAvailable: false,
        title: t.hero.unavailableTitle,
        message: t.hero.unavailableMessage,
        listingNames: []
      });
      return;
    }

    setAvailabilityResult({
      isAvailable: true,
      title: t.hero.availableTitle,
      message: t.hero.availableMessage.replace("{count}", String(availableListings.length)),
      listingNames: availableListings.slice(0, 3).map((listing) => listing.title)
    });
  };

  const defaultMinCheckOut = useMemo(() => toIsoDate(addDays(new Date(`${todayIso}T00:00:00`), 1)), [todayIso]);
  const minCheckOut = checkInDate
    ? toIsoDate(addDays(new Date(`${checkInDate}T00:00:00`), 1))
    : defaultMinCheckOut;

  return (
    <div className="app">
      <Navbar
        t={t}
        language={language}
        onToggleLanguage={toggleLanguage}
        isUserMenuOpen={isUserMenuOpen}
        setIsUserMenuOpen={setIsUserMenuOpen}
        userMenuRef={userMenuRef}
        logoImg={logoImg}
        onUserMenuAction={handleUserMenuAction}
        isAuthenticated={isAuthenticated}
        onAuthAction={handleAuthAction}
      />

      <HeroSection
        t={t}
        language={language}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        minCheckIn={todayIso}
        minCheckOut={minCheckOut}
        availabilityResult={availabilityResult}
        onChangeCheckIn={(value) => {
          setCheckInDate(value);
          if (checkOutDate && value && checkOutDate <= value) {
            setCheckOutDate(toIsoDate(addDays(new Date(`${value}T00:00:00`), 1)));
          }
        }}
        onChangeCheckOut={setCheckOutDate}
        onCheckAvailability={handleCheckAvailability}
      />

      <ListingsSection
        label={t.collections.label}
        title={t.listings.featuredAccommodations}
        listings={featuredListings.slice(0, 4)}
        perNightLabel={t.listings.perNight}
        onSelectListing={() => {}}
        favoriteListingIds={favoriteListingIds}
        onToggleFavorite={toggleFavoriteListing}
      />

      <ExperiencesSection
        t={t}
        onSelectExperienceCategory={() => {}}
      />
      
      <FooterSection t={t} logoImg={logoImg} footerImage={footerImage} />
    </div>
  );
}

export default App;
