import "./App.css";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es, enUS } from "date-fns/locale";
import { useState, useMemo } from "react";
import { listings } from "./data";
import { translations } from "./translations";
import logoImg from "./assets/logo.png";
import footerImage from "./assets/footer.jpg";

registerLocale("es", es);
registerLocale("en", enUS);

function App() {
  const [language, setLanguage] = useState("es");
  const [heroFilters, setHeroFilters] = useState({
    location: "",
    date: null
  });

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  };

  const handleFilterChange = (field, value) => {
    setHeroFilters((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const categories = useMemo(() => {
    const cats = [...new Set(listings.map(l => l.category))];
    return cats;
  }, []);

  const featuredListings = useMemo(() => {
    return listings.filter((l) => l.featured);
  }, []);

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <img src={logoImg} alt="Horizon Stays" className="logoImg" />
        </div>

        <div className="navLinks">
          <a href="#" className="navLink">{t.navbar.destinations}</a>
          <a href="#" className="navLink">{t.navbar.experiences}</a>
          <a href="#" className="navLink">{t.navbar.journal}</a>
          <a href="#" className="navLink">{t.navbar.about}</a>
        </div>

        <div className="navActions">
          <button className="bookBtn">{t.navbar.bookNow}</button>
          <div className="userAvatar">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face" alt="User" />
          </div>
          <button className="languageToggle" onClick={toggleLanguage}>
            {language === "es" ? "EN" : "ES"}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="heroOverlay" />
        <div className="heroContent">
          <h1 className="heroTitle">{t.hero.title}</h1>
          <p className="heroSubtitle">{t.hero.subtitle}</p>
          
          <div className="searchBar">
            <div className="searchField">
              <div className="searchIcon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#10b981"/>
                </svg>
              </div>
              <div className="searchInputWrapper">
                <label>{t.hero.location}</label>
                <input 
                  type="text" 
                  placeholder={t.hero.locationPlaceholder}
                  value={heroFilters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                />
              </div>
            </div>
            
            <div className="searchDivider" />
            
            <div className="searchField">
              <div className="searchIcon calendar">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="#10b981" strokeWidth="2"/>
                  <path d="M16 2V6M8 2V6M3 10H21" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="searchInputWrapper">
                <label>{t.hero.date}</label>
                <DatePicker
                  selected={heroFilters.date}
                  onChange={(date) => handleFilterChange("date", date)}
                  locale={language === "es" ? "es" : "en"}
                  dateFormat="dd MMM, yyyy"
                  placeholderText="12 Oct, 2024"
                  className="heroDatePicker"
                  minDate={new Date()}
                />
              </div>
            </div>
            
            <button className="searchButton">{t.hero.searchBtn}</button>
          </div>
        </div>
      </section>

      {/* COLLECTIONS SECTION */}
      <section className="collections">
        <div className="sectionHeader">
          <div>
            <span className="sectionLabel">{t.collections.label}</span>
            <h2 className="sectionTitle">{t.collections.title}</h2>
          </div>
          <a href="#" className="viewAllLink">{t.collections.viewAll}</a>
        </div>
        
        <div className="collectionsGrid">
          <div className="collectionCard large">
            <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop" alt="Mountain" />
            <div className="collectionOverlay" />
            <div className="collectionContent">
              <h3>{t.collections.mountain}</h3>
            </div>
          </div>
          <div className="collectionCard">
            <img src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&h=400&fit=crop" alt="Lake" />
            <div className="collectionOverlay" />
            <div className="collectionContent">
              <h3>{t.collections.lake}</h3>
            </div>
          </div>
          <div className="collectionCard">
            <img src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=600&h=400&fit=crop" alt="Forest" />
            <div className="collectionOverlay" />
            <div className="collectionContent">
              <h3>{t.collections.forest}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats">
        <div className="statCard">
          <span className="statValue">{t.stats.propertiesValue}</span>
          <span className="statLabel">{t.stats.properties}</span>
        </div>
        <div className="statCard">
          <span className="statValue">{t.stats.destinationsValue}</span>
          <span className="statLabel">{t.stats.destinations}</span>
        </div>
        <div className="statCard">
          <span className="statValue">{t.stats.satisfactionValue}</span>
          <span className="statLabel">{t.stats.satisfaction}</span>
        </div>
        <div className="statCard">
          <span className="statValue">{t.stats.ownersValue}</span>
          <span className="statLabel">{t.stats.owners}</span>
        </div>
      </section>

      {/* EXPERIENCES SECTION */}
      <section className="experiences">
        <div className="sectionHeader">
          <div>
            <h2 className="sectionTitle light">{t.experiences.title}</h2>
            <p className="sectionSubtitle">{t.experiences.subtitle}</p>
          </div>
          <a href="#" className="viewAllLink green">{t.experiences.viewAll}</a>
        </div>
        
        <div className="experiencesGrid">
          <div className="experienceCard featured">
            <img src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=600&h=800&fit=crop" alt="A-Frame" />
            <div className="experienceOverlay" />
            <div className="experienceContent">
              <span className="experienceTag">Experiencia</span>
              <h3>{t.experiences.aframe}</h3>
              <p className="experienceCount">{t.experiences.aframeCount}</p>
            </div>
          </div>
          <div className="experienceCard small">
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=300&fit=crop" alt="Vineyard" />
            <div className="experienceOverlay" />
            <div className="experienceContent">
              <h3>{t.experiences.vineyard}</h3>
            </div>
          </div>
          <div className="experienceCard small">
            <img src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=300&fit=crop" alt="Forest" />
            <div className="experienceOverlay" />
            <div className="experienceContent">
              <h3>{t.experiences.forestCabins}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="listings">
        <h2 className="sectionTitle light">{t.listings.featuredAccommodations}</h2>
        <div className="listingsGrid">
          {featuredListings.slice(0, 4).map((listing) => (
            <div key={listing.id} className="listingCard">
              <div className="listingImage">
                <img src={listing.image} alt={listing.title} />
                <button className="favoriteBtn">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="white" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
              <div className="listingContent">
                <h4>{listing.title}</h4>
                <p className="listingLocation">{listing.location}</p>
                <div className="listingFooter">
                  <span className="listingPrice">{listing.price}</span>
                  <span className="listingRating">★ {listing.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footerAtmosphere" aria-hidden="true">
          <img src={footerImage} alt="" className="footerAtmosphereImage" />
          <div className="footerAtmosphereFade" />
        </div>

        <div className="footerMain">
          <div className="footerBrand">
            <img src={logoImg} alt="Horizon Stays" className="footerLogo" />
            <p>{t.footer.description}</p>
          </div>

          <div className="footerLinks">
            <div className="footerColumn">
              <h4>{t.footer.exploreTitle}</h4>
              {t.footer.exploreLinks.map((link, i) => (
                <a key={i} href="#">{link}</a>
              ))}
            </div>
            <div className="footerColumn">
              <h4>{t.footer.hostsTitle}</h4>
              {t.footer.hostsLinks.map((link, i) => (
                <a key={i} href="#">{link}</a>
              ))}
            </div>
            <div className="footerColumn">
              <h4>{t.footer.supportTitle}</h4>
              {t.footer.supportLinks.map((link, i) => (
                <a key={i} href="#">{link}</a>
              ))}
            </div>
            <div className="footerColumn">
              <h4>{t.footer.connectTitle}</h4>
              {t.footer.connectLinks.map((link, i) => (
                <a key={i} href="#">{link}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="footerBottom">© 2026 Horizon. {t.footer.rights}</div>
      </footer>
    </div>
  );
}

export default App;
