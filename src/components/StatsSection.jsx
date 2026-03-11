function StatsSection({ t }) {
  return (
    <section id="stats" className="stats">
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
  );
}

export default StatsSection;
