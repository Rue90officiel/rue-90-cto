import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "~/data/products";

const STORAGE_KEY = "rue90.lang";

const fr = {
  /* ------------------------------------------------------------------ marque */
  "brand.tagline": "Équipement de football",
  "brand.city": "Montréal, Canada",

  /* --------------------------------------------------------------- navigation */
  "nav.boutique": "Boutique",
  "nav.nouveautes": "Nouveautés",
  "nav.maillots": "Maillots personnalisés",
  "nav.contact": "Nous joindre",
  "nav.menu": "Menu",
  "nav.categories": "Catégories",
  "nav.close": "Fermer",
  "nav.quicklinks": "Liens rapides",

  /* ---------------------------------------------------------------- recherche */
  "search.label": "Recherche",
  "search.placeholder": "Rechercher un produit…",
  "search.all": "Voir tous les résultats",
  "search.empty": "Aucun produit trouvé.",
  "search.hint": "Saisissez au moins 2 caractères.",
  "search.results": "Résultats",

  /* ------------------------------------------------------------------ en-tête */
  "header.account": "Compte",
  "header.accountTitle": "Compte Rue 90",
  "header.accountSoon": "Bientôt disponible",
  "header.accountBody":
    "La création de compte et le suivi de commande arrivent prochainement. En attendant, écrivez-nous pour toute question.",
  "header.skip": "Aller au contenu",

  /* ------------------------------------------------------------------- accueil */
  "home.eyebrow": "Collection 2026",
  "home.title1": "Joué",
  "home.title2": "sur le terrain.",
  "home.sub":
    "Chaussures, maillots et équipement d'entraînement choisis pour les joueurs et les coachs du Québec. Tout en noir et blanc, comme le terrain en novembre.",
  "home.cta": "Découvrir la Collection",
  "home.secondary": "Voir les best-sellers",
  "home.stat1": "Produits en catalogue",
  "home.stat2": "Catégories",
  "home.stat3": "Prix en dollars canadiens",
  "home.catEyebrow": "Nos rayons",
  "home.catTitle": "Six catégories, un seul terrain",
  "home.catCta": "Explorer",
  "home.bestEyebrow": "Best-sellers",
  "home.bestTitle": "Ce que les joueurs commandent",
  "home.bestAll": "Toute la boutique",
  "home.prev": "Précédent",
  "home.next": "Suivant",
  "home.promoEyebrow": "Personnalisation",
  "home.promoTitle": "Votre nom. Votre numéro.",
  "home.promoBody":
    "Chaque maillot Rue 90 peut recevoir un nom et un numéro floqués. Douze caractères, deux chiffres, aucune limite d'imagination.",
  "home.promoCta": "Personnaliser un maillot",
  "home.promoNameLabel": "Nom",
  "home.promoNumberLabel": "Numéro",
  "home.promoNameHint": "12 caractères maximum",
  "home.promoNumberHint": "0 à 99",
  "home.promoFoot": "Aperçu en direct",
  "home.servicesTitle": "Comment ça marche",
  "home.svc1Title": "Achat en ligne",
  "home.svc1Body": "Le panier et le paiement arrivent bientôt.",
  "home.svc2Title": "Personnalisation",
  "home.svc2Body": "Nom et numéro ajoutés sur les maillots.",
  "home.svc3Title": "Catalogue",
  "home.svc3Body": "Plus de trente produits, tous les prix en CAD.",
  "home.svc4Title": "Service client",
  "home.svc4Body": "Une question ? Écrivez-nous, on répond en français.",

  /* ------------------------------------------------------------------ boutique */
  "shop.eyebrow": "Catalogue",
  "shop.title": "Boutique",
  "shop.intro":
    "Tout l'équipement Rue 90, filtrable par catégorie et par prix. Les prix sont en dollars canadiens.",
  "shop.searchLabel": "Rechercher dans la boutique",
  "shop.searchPlaceholder": "Rechercher un produit…",
  "shop.categories": "Catégories",
  "shop.all": "Tous",
  "shop.price": "Prix",
  "shop.sortLabel": "Trier",
  "shop.sort.nouveautes": "Nouveautés",
  "shop.sort.prix-asc": "Prix croissant",
  "shop.sort.prix-desc": "Prix décroissant",
  "shop.sort.note": "Mieux notés",
  "shop.resultsOne": "produit",
  "shop.resultsMany": "produits",
  "shop.active": "Filtres actifs",
  "shop.clearAll": "Tout effacer",
  "shop.empty": "Aucun produit ne correspond à votre recherche.",
  "shop.emptyBody": "Essayez un autre mot-clé ou retirez un filtre.",
  "shop.emptyCta": "Réinitialiser les filtres",
  "shop.band.u50": "Moins de 50 $",
  "shop.band.50-100": "50 $ – 100 $",
  "shop.band.100-200": "100 $ – 200 $",
  "shop.band.200+": "200 $ et plus",
  "shop.query": "Recherche",
  "shop.for": "pour",
  "shop.showing": "Affichage de",
  "shop.filterCount": "filtre",
  "shop.filterCountPlural": "filtres",

  /* -------------------------------------------------------------------- produit */
  "product.home": "Accueil",
  "product.breadcrumb": "Produit",
  "product.comingSoon": "À venir",
  "product.comingSoonNote": "Achat en ligne bientôt disponible.",
  "product.size": "Taille",
  "product.sizeHint": "Tailles disponibles.",
  "product.qty": "Quantité",
  "product.increase": "Augmenter la quantité",
  "product.decrease": "Diminuer la quantité",
  "product.description": "Description",
  "product.specs": "Caractéristiques",
  "product.reviews": "avis",
  "product.rating": "Note",
  "product.related": "À découvrir aussi",
  "product.relatedSub": "Sélectionné dans la même famille de produits.",
  "product.thumb": "Vue",
  "product.gallery": "Galerie du produit",
  "product.notFoundTitle": "Produit introuvable",
  "product.notFoundBody":
    "Ce produit n'existe pas ou n'est plus au catalogue. Le catalogue complet vous attend.",
  "product.backToShop": "Retour à la boutique",
  "product.returnsNote": "Retours acceptés 30 jours sur les articles non personnalisés.",
  "product.stock": "En stock",
  "product.customTitle": "Personnalisation",
  "product.customBody":
    "Ajoutez un nom et un numéro : l'aperçu du maillot se met à jour en direct.",
  "product.customName": "Nom",
  "product.customNumber": "Numéro",
  "product.customNamePlaceholder": "EX. DUPONT",
  "product.customNumberPlaceholder": "10",
  "product.customNameError": "Le nom doit contenir entre 2 et 12 lettres.",
  "product.customNumberError": "Le numéro doit être compris entre 0 et 99.",
  "product.customPreview": "Aperçu du maillot",
  "product.customEmpty": "VOTRE NOM",
  "product.customRequired": "Ajoutez un nom et un numéro, ou laissez vide.",
  "product.galleryView": "Vue",

  /* --------------------------------------------------------------- étiquettes */
  "badge.nouveau": "Nouveau",
  "badge.bestseller": "Best-seller",
  "badge.elite": "Élite",

  /* --------------------------------------------------------------------- panier */
  "cartPage.eyebrow": "Panier",
  "cartPage.title": "Panier — À venir",
  "cartPage.body":
    "L'achat en ligne n'est pas encore ouvert chez Rue 90. Bientôt, vous pourrez remplir un panier et passer commande ici même. En attendant, tout le catalogue reste à explorer.",
  "cartPage.cta": "Voir la boutique",

  /* ------------------------------------------------------------------- contact */
  "contact.eyebrow": "Service client",
  "contact.title": "Nous joindre",
  "contact.intro":
    "Une question sur une taille, une commande ou une personnalisation ? Écrivez-nous, on répond en français.",
  "contact.addressTitle": "Adresse",
  "contact.emailTitle": "Courriel",
  "contact.phoneTitle": "Téléphone",
  "contact.placeholderTag": "Coordonnées à venir",
  "contact.placeholderNote":
    "Ces coordonnées sont des espaces réservés : l'adresse, le courriel et le téléphone réels seront publiés après le lancement.",
  "contact.formTitle": "Écrivez-nous",
  "contact.formBody":
    "Tous les champs sont obligatoires. Ce formulaire est une démonstration : aucun message n'est réellement transmis.",
  "contact.name": "Nom",
  "contact.email": "Courriel",
  "contact.message": "Message",
  "contact.namePlaceholder": "Votre nom",
  "contact.emailPlaceholder": "vous@exemple.ca",
  "contact.messagePlaceholder": "Comment pouvons-nous vous aider ?",
  "contact.send": "Envoyer le message",
  "contact.success": "Merci, votre message a bien été envoyé.",
  "contact.successNote":
    "Ceci est une confirmation de démonstration : aucun message n'a réellement été transmis.",
  "contact.errorName": "Indiquez votre nom (2 caractères minimum).",
  "contact.errorEmail": "Entrez une adresse courriel valide.",
  "contact.errorMessage": "Votre message doit contenir au moins 10 caractères.",
  "contact.hours": "Heures d'ouverture",
  "contact.hoursValue": "Lundi au vendredi, 9 h à 17 h (HE)",
  "contact.reply": "Réponse sous un jour ouvrable.",
  "contact.another": "Écrire un autre message",

  /* -------------------------------------------------------------------- pied */
  "footer.tagline":
    "Équipement de football en noir et blanc. Conçu à Montréal, pour les joueurs et les coachs d'ici.",
  "footer.shop": "Boutique",
  "footer.help": "Aide",
  "footer.newsletter": "Infolettre",
  "footer.newsletterBody":
    "Nouveaux arrivages et promotions, une fois par mois. Pas plus.",
  "footer.emailPlaceholder": "Votre courriel",
  "footer.subscribe": "S'abonner",
  "footer.subscribed": "Merci, votre inscription est notée (démonstration).",
  "footer.emailError": "Entrez une adresse courriel valide.",
  "footer.rights": "© 2026 Rue 90. Tous droits réservés.",
  "footer.legal": "Prix en dollars canadiens (CAD).",
  "footer.placeholder": "Site en lancement : prix, commandes et coordonnées fictifs.",
  "footer.language": "Langue",
  "footer.follow": "Suivre",
  "footer.madeIn": "Conçu et assemblé au Québec",

  /* ------------------------------------------------------------------ communs */
  "common.close": "Fermer",
  "common.loading": "Chargement",
  "common.optional": "facultatif",
  "common.required": "obligatoire",
  "common.from": "De",
  "common.all": "Tous",
  "common.cad": "CAD",
  "common.currency": "Prix en dollars canadiens.",
  "common.openMenu": "Ouvrir le menu",
  "common.closeMenu": "Fermer le menu",
  "common.languageSwitch": "Changer la langue",
  "common.viewProduct": "Voir le produit",
  "common.seeAll": "Voir tout",
  "common.products": "produits",
} as const;

export type TKey = keyof typeof fr;

const en: Record<TKey, string> = {
  "brand.tagline": "Football equipment",
  "brand.city": "Montreal, Canada",

  "nav.boutique": "Shop",
  "nav.nouveautes": "New arrivals",
  "nav.maillots": "Custom jerseys",
  "nav.contact": "Contact us",
  "nav.menu": "Menu",
  "nav.categories": "Categories",
  "nav.close": "Close",
  "nav.quicklinks": "Quick links",

  "search.label": "Search",
  "search.placeholder": "Search for a product…",
  "search.all": "See all results",
  "search.empty": "No products found.",
  "search.hint": "Type at least 2 characters.",
  "search.results": "Results",

  "header.account": "Account",
  "header.accountTitle": "Rue 90 account",
  "header.accountSoon": "Coming soon",
  "header.accountBody":
    "Accounts and order tracking are coming soon. In the meantime, write to us with any question.",
  "header.skip": "Skip to content",

  "home.eyebrow": "2026 Collection",
  "home.title1": "Played",
  "home.title2": "on the pitch.",
  "home.sub":
    "Boots, jerseys and training gear picked for players and coaches in Quebec. All in black and white, like the pitch in November.",
  "home.cta": "Discover the Collection",
  "home.secondary": "See best-sellers",
  "home.stat1": "Products in the catalogue",
  "home.stat2": "Categories",
  "home.stat3": "Prices in Canadian dollars",
  "home.catEyebrow": "Our ranges",
  "home.catTitle": "Six categories, one pitch",
  "home.catCta": "Explore",
  "home.bestEyebrow": "Best-sellers",
  "home.bestTitle": "What players order",
  "home.bestAll": "The whole shop",
  "home.prev": "Previous",
  "home.next": "Next",
  "home.promoEyebrow": "Personalisation",
  "home.promoTitle": "Your name. Your number.",
  "home.promoBody":
    "Every Rue 90 jersey can carry a name and number printed on it. Twelve characters, two digits, no limit on imagination.",
  "home.promoCta": "Customise a jersey",
  "home.promoNameLabel": "Name",
  "home.promoNumberLabel": "Number",
  "home.promoNameHint": "12 characters max",
  "home.promoNumberHint": "0 to 99",
  "home.promoFoot": "Live preview",
  "home.servicesTitle": "How it works",
  "home.svc1Title": "Online shopping",
  "home.svc1Body": "Cart and payment are coming soon.",
  "home.svc2Title": "Personalisation",
  "home.svc2Body": "Name and number added to jerseys.",
  "home.svc3Title": "Catalogue",
  "home.svc3Body": "Over thirty products, every price in CAD.",
  "home.svc4Title": "Customer service",
  "home.svc4Body": "A question? Write to us — we answer in French or English.",

  "shop.eyebrow": "Catalogue",
  "shop.title": "Shop",
  "shop.intro":
    "All Rue 90 gear, filterable by category and price. Prices are in Canadian dollars.",
  "shop.searchLabel": "Search the shop",
  "shop.searchPlaceholder": "Search for a product…",
  "shop.categories": "Categories",
  "shop.all": "All",
  "shop.price": "Price",
  "shop.sortLabel": "Sort",
  "shop.sort.nouveautes": "Newest",
  "shop.sort.prix-asc": "Price: low to high",
  "shop.sort.prix-desc": "Price: high to low",
  "shop.sort.note": "Top rated",
  "shop.resultsOne": "product",
  "shop.resultsMany": "products",
  "shop.active": "Active filters",
  "shop.clearAll": "Clear all",
  "shop.empty": "No products match your search.",
  "shop.emptyBody": "Try another keyword or remove a filter.",
  "shop.emptyCta": "Reset filters",
  "shop.band.u50": "Under $50",
  "shop.band.50-100": "$50 – $100",
  "shop.band.100-200": "$100 – $200",
  "shop.band.200+": "$200 and up",
  "shop.query": "Search",
  "shop.for": "for",
  "shop.showing": "Showing",
  "shop.filterCount": "filter",
  "shop.filterCountPlural": "filters",

  "product.home": "Home",
  "product.breadcrumb": "Product",
  "product.comingSoon": "Coming soon",
  "product.comingSoonNote": "Online purchasing is coming soon.",
  "product.size": "Size",
  "product.sizeHint": "Available sizes.",
  "product.qty": "Quantity",
  "product.increase": "Increase quantity",
  "product.decrease": "Decrease quantity",
  "product.description": "Description",
  "product.specs": "Specifications",
  "product.reviews": "reviews",
  "product.rating": "Rating",
  "product.related": "You may also like",
  "product.relatedSub": "Picked from the same product family.",
  "product.thumb": "View",
  "product.gallery": "Product gallery",
  "product.notFoundTitle": "Product not found",
  "product.notFoundBody":
    "This product does not exist or is no longer in the catalogue. The full catalogue is waiting for you.",
  "product.backToShop": "Back to the shop",
  "product.returnsNote": "30-day returns on non-personalised items.",
  "product.stock": "In stock",
  "product.customTitle": "Personalisation",
  "product.customBody":
    "Add a name and a number — the jersey preview updates live.",
  "product.customName": "Name",
  "product.customNumber": "Number",
  "product.customNamePlaceholder": "E.G. DUPONT",
  "product.customNumberPlaceholder": "10",
  "product.customNameError": "The name must be 2 to 12 letters.",
  "product.customNumberError": "The number must be between 0 and 99.",
  "product.customPreview": "Jersey preview",
  "product.customEmpty": "YOUR NAME",
  "product.customRequired": "Add a name and number, or leave them empty.",
  "product.galleryView": "View",

  "badge.nouveau": "New",
  "badge.bestseller": "Best-seller",
  "badge.elite": "Elite",

  "cartPage.eyebrow": "Cart",
  "cartPage.title": "Cart — Coming soon",
  "cartPage.body":
    "Online purchasing is not open at Rue 90 yet. Soon you will be able to fill a cart and order right here. In the meantime, the whole catalogue is yours to explore.",
  "cartPage.cta": "Shop the collection",

  "contact.eyebrow": "Customer service",
  "contact.title": "Contact us",
  "contact.intro":
    "A question about sizing, an order or personalisation? Write to us — we answer in French or English.",
  "contact.addressTitle": "Address",
  "contact.emailTitle": "Email",
  "contact.phoneTitle": "Phone",
  "contact.placeholderTag": "Details coming soon",
  "contact.placeholderNote":
    "These details are placeholders: the real address, email and phone will be published after launch.",
  "contact.formTitle": "Write to us",
  "contact.formBody":
    "All fields are required. This form is a demonstration: no message is actually sent.",
  "contact.name": "Name",
  "contact.email": "Email",
  "contact.message": "Message",
  "contact.namePlaceholder": "Your name",
  "contact.emailPlaceholder": "you@example.ca",
  "contact.messagePlaceholder": "How can we help?",
  "contact.send": "Send message",
  "contact.success": "Thank you, your message has been sent.",
  "contact.successNote":
    "This is a demo confirmation: no message was actually sent.",
  "contact.errorName": "Enter your name (at least 2 characters).",
  "contact.errorEmail": "Enter a valid email address.",
  "contact.errorMessage": "Your message must be at least 10 characters.",
  "contact.hours": "Opening hours",
  "contact.hoursValue": "Monday to Friday, 9 am to 5 pm (ET)",
  "contact.reply": "We reply within one business day.",
  "contact.another": "Write another message",

  "footer.tagline":
    "Black and white football equipment. Designed in Montreal, for players and coaches here.",
  "footer.shop": "Shop",
  "footer.help": "Help",
  "footer.newsletter": "Newsletter",
  "footer.newsletterBody": "New arrivals and promotions, once a month. No more.",
  "footer.emailPlaceholder": "Your email",
  "footer.subscribe": "Subscribe",
  "footer.subscribed": "Thank you, you are on the list (demonstration).",
  "footer.emailError": "Enter a valid email address.",
  "footer.rights": "© 2026 Rue 90. All rights reserved.",
  "footer.legal": "Prices in Canadian dollars (CAD).",
  "footer.placeholder": "Launch site: prices, orders and contact details are fictional.",
  "footer.language": "Language",
  "footer.follow": "Follow",
  "footer.madeIn": "Designed and assembled in Quebec",

  "common.close": "Close",
  "common.loading": "Loading",
  "common.optional": "optional",
  "common.required": "required",
  "common.from": "From",
  "common.all": "All",
  "common.cad": "CAD",
  "common.currency": "Prices in Canadian dollars.",
  "common.openMenu": "Open menu",
  "common.closeMenu": "Close menu",
  "common.languageSwitch": "Switch language",
  "common.viewProduct": "View product",
  "common.seeAll": "See all",
  "common.products": "products",
};

export const dictionaries: Record<Lang, Record<TKey, string>> = { fr, en };

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TKey) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "fr" || stored === "en") setLangState(stored);
    } catch {
      /* localStorage indisponible : on reste en français */
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "fr" ? "fr-CA" : "en-CA";
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      t: (key: TKey) => dictionaries[lang][key] ?? fr[key],
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n doit être utilisé dans I18nProvider");
  return ctx;
}

export const specLabel: Record<string, { fr: string; en: string }> = {
  matiere: { fr: "Matière", en: "Material" },
  poids: { fr: "Poids", en: "Weight" },
  tailles: { fr: "Tailles", en: "Sizes" },
  couleur: { fr: "Couleur", en: "Colour" },
  usage: { fr: "Usage", en: "Use" },
  composition: { fr: "Composition", en: "Composition" },
  garantie: { fr: "Garantie", en: "Warranty" },
  capacite: { fr: "Capacité", en: "Capacity" },
  terrain: { fr: "Terrain", en: "Surface" },
  niveau: { fr: "Niveau", en: "Level" },
  dimensions: { fr: "Dimensions", en: "Dimensions" },
  contenu: { fr: "Contenu", en: "Contents" },
  entretien: { fr: "Entretien", en: "Care" },
};
