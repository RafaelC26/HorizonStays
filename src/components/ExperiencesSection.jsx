function ExperiencesSection({ t, onSelectExperienceCategory }) {
  return (
    <section id="experiences" className="experiences">
      <div className="sectionHeader">
        <div>
          <h2 className="sectionTitle light">{t.experiences.title}</h2>
          <p className="sectionSubtitle">{t.experiences.subtitle}</p>
        </div>
      </div>

      <div className="experiencesGrid">
        <button
          className="experienceCard featured"
          type="button"
          onClick={() => onSelectExperienceCategory?.("aframe")}
        >
          <img src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=600&h=800&fit=crop" alt="A-Frame" loading="lazy" decoding="async" />
          <div className="experienceOverlay" />
          <div className="experienceContent">
            <span className="experienceTag">Experiencia</span>
            <h3>{t.experiences.aframe}</h3>
            <p className="experienceCount">{t.experiences.aframeCount}</p>
          </div>
        </button>
        <button
          className="experienceCard small"
          type="button"
          onClick={() => onSelectExperienceCategory?.("forest")}
        >
          <img src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=300&fit=crop" alt="Forest" loading="lazy" decoding="async" />
          <div className="experienceOverlay" />
          <div className="experienceContent">
            <h3>{t.experiences.forestCabins}</h3>
          </div>
        </button>
      </div>
    </section>
  );
}

export default ExperiencesSection;
