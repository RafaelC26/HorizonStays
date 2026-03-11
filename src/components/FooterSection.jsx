function FooterSection({ t, logoImg, footerImage }) {
  return (
    <footer id="footer" className="footer">
      <div className="footerAtmosphere" aria-hidden="true">
        <img src={footerImage} alt="" className="footerAtmosphereImage" loading="lazy" decoding="async" />
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
  );
}

export default FooterSection;
