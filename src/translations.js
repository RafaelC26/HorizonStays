export const translations = {
  es: {
    navbar: {
      logo: "Horizon Stays",
      destinations: "Destinos",
      experiences: "Experiencias",
      journal: "Diario",
      about: "Nosotros",
      bookNow: "Reservar ahora",
      searchPlaceholder: "Buscar destinos..."
    },
    hero: {
      title: "La Naturaleza, Refinada",
      subtitle: "Experimenta un alto chez-vivir y una vida absoluta en nuestra colección seleccionada de retiros en la montaña",
      altTitle: "Escápate a lo Extraordinario",
      altSubtitle: "Refugios rurales seleccionados, desde villas en montañas neblinosas hasta fincas en viñedos soleados",
      location: "Ubicación",
      locationPlaceholder: "Alpes Suizos, Europa",
      date: "Entrada",
      searchBtn: "Buscar",
      exploreBtn: "Explora Experiencias"
    },
    collections: {
      label: "EL PORTAFOLIO",
      title: "Colecciones",
      viewAll: "Ver todos los destinos",
      mountain: "Escapadas de Montaña",
      lake: "Serenidad frente al Lago",
      forest: "Refugios en el Bosque"
    },
    experiences: {
      title: "Explorar por Experiencia",
      subtitle: "Descubre propiedades seleccionadas por estilo arquitectónico",
      viewAll: "Ver Todas las Categorías →",
      aframe: "Cabañas A-Frame",
      aframeCount: "128 propiedades",
      vineyard: "Fincas en Viñedos",
      forestCabins: "Refugios en el Bosque"
    },
    stats: {
      properties: "Propiedades",
      propertiesValue: "500+",
      destinations: "Destinos",
      destinationsValue: "25",
      satisfaction: "Satisfacción",
      satisfactionValue: "99%",
      owners: "Propietarios de Prestigio",
      ownersValue: "24"
    },
    listings: {
      featuredAccommodations: "Alojamientos Destacados",
      additionalStays: "Alojamientos Disponibles",
      noResults: "No encontramos alojamientos con esos filtros"
    },
    footer: {
      description: "Descubre estancias auténticas en destinos únicos, curadas para experiencias memorables.",
      exploreTitle: "Explora",
      exploreLinks: ["Destinos", "Cabañas", "Ciudades", "Lujo", "Sostenible"],
      hostsTitle: "Para anfitriones",
      hostsLinks: ["Publica tu espacio", "Comunidad host", "Recursos host", "Seguro"],
      supportTitle: "Soporte",
      supportLinks: ["Centro de ayuda", "Confianza y seguridad", "Políticas de cancelación", "Reportar un problema"],
      connectTitle: "Conecta",
      connectLinks: ["Acerca de", "Carreras", "Prensa", "Términos", "Privacidad"],
      rights: "Todos los derechos reservados"
    }
  },
  en: {
    navbar: {
      logo: "Horizon Stays",
      destinations: "Destinations",
      experiences: "Experiences",
      journal: "Journal",
      about: "About",
      bookNow: "Book Now",
      searchPlaceholder: "Search destinations..."
    },
    hero: {
      title: "Nature, Refined",
      subtitle: "Experience a high chez-vivre and absolute life in our curated collection of mountain retreats",
      altTitle: "Escape to the Extraordinary",
      altSubtitle: "Selected rural refuges, from villas in misty mountains to estates in sunny vineyards",
      location: "Location",
      locationPlaceholder: "Swiss Alps, Europe",
      date: "Check-in",
      searchBtn: "Search",
      exploreBtn: "Explore Experiences"
    },
    collections: {
      label: "THE PORTFOLIO",
      title: "Collections",
      viewAll: "View all destinations",
      mountain: "Mountain Escapes",
      lake: "Lakeside Serenity",
      forest: "Forest Retreats"
    },
    experiences: {
      title: "Explore by Experience",
      subtitle: "Discover properties selected by architectural style",
      viewAll: "View All Categories →",
      aframe: "A-Frame Cabins",
      aframeCount: "128 properties",
      vineyard: "Vineyard Estates",
      forestCabins: "Forest Retreats"
    },
    stats: {
      properties: "Properties",
      propertiesValue: "500+",
      destinations: "Destinations",
      destinationsValue: "25",
      satisfaction: "Satisfaction",
      satisfactionValue: "99%",
      owners: "Prestigious Owners",
      ownersValue: "24"
    },
    listings: {
      featuredAccommodations: "Featured Accommodations",
      additionalStays: "More Available Stays",
      noResults: "We couldn't find stays matching those filters"
    },
    footer: {
      description: "Discover authentic stays in unique destinations, curated for memorable experiences.",
      exploreTitle: "Explore",
      exploreLinks: ["Destinations", "Cabins", "Cities", "Luxury", "Sustainable"],
      hostsTitle: "For Hosts",
      hostsLinks: ["List your space", "Host community", "Host resources", "Insurance"],
      supportTitle: "Support",
      supportLinks: ["Help center", "Trust and safety", "Cancellation policies", "Report a problem"],
      connectTitle: "Connect",
      connectLinks: ["About", "Careers", "Press", "Terms", "Privacy"],
      rights: "All rights reserved"
    }
  }
};

export const getTranslation = (lang, keys) => {
  return keys.reduce((obj, key) => obj?.[key], translations[lang]);
};
