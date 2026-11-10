/**
 * Rue 90 — catalogue unique (source de vérité pour la recherche, les filtres,
 * les fiches produit et le panier). Tout est factice : prix en cents CAD.
 */

export type Lang = "fr" | "en";

export type CategoryId =
  | "chaussures"
  | "futsal"
  | "sacs"
  | "entrainement"
  | "vetements"
  | "accessoires";

export type SizeSet = "chaussures" | "futsal" | "vetements";

export type BadgeId = "nouveau" | "bestseller" | "elite";

export type ArtKind =
  | "boot"
  | "futsal"
  | "shin"
  | "knee"
  | "glue"
  | "gloves"
  | "goal"
  | "cone"
  | "target"
  | "ball"
  | "coach"
  | "jacket"
  | "bag"
  | "short"
  | "jersey";

export type SpecKey =
  | "matiere"
  | "poids"
  | "tailles"
  | "couleur"
  | "usage"
  | "composition"
  | "garantie"
  | "capacite"
  | "terrain"
  | "niveau"
  | "dimensions"
  | "contenu"
  | "entretien";

export interface Spec {
  k: SpecKey;
  fv: string;
  ev: string;
}

export interface Product {
  id: string;
  category: CategoryId;
  name: string;
  nameEn: string;
  price: number; // cents CAD
  rating: number;
  reviews: number;
  badge?: BadgeId;
  bestseller?: boolean;
  art: ArtKind;
  /** Photos réelles (chemins publics). La première est l'image principale. */
  images?: string[];
  sizeSet?: SizeSet;
  customizable?: boolean;
  shortFr: string;
  shortEn: string;
  longFr: string;
  longEn: string;
  specs: Spec[];
}

export interface Category {
  id: CategoryId;
  fr: string;
  en: string;
  short: string;
  shortEn: string;
  blurbFr: string;
  blurbEn: string;
}

export const categories: Category[] = [
  {
    id: "chaussures",
    fr: "Chaussures",
    en: "Boots",
    short: "Chaussures",
    shortEn: "Boots",
    blurbFr: "Terrain sec, sol mouillé, élite ou junior.",
    blurbEn: "Dry ground, wet ground, elite or junior.",
  },
  {
    id: "sacs",
    fr: "Sacs de Sport",
    en: "Sports Bags",
    short: "Sacs",
    shortEn: "Bags",
    blurbFr: "Duffles, roulettes et sacs à dos.",
    blurbEn: "Duffels, wheeled bags and backpacks.",
  },
  {
    id: "futsal",
    fr: "Souliers Futsal",
    en: "Futsal Shoes",
    short: "Futsal",
    shortEn: "Futsal",
    blurbFr: "Semelles gomme pour parquet et béton.",
    blurbEn: "Gum outsoles for court and concrete.",
  },
  {
    id: "entrainement",
    fr: "Équipement Entraînement & Coachs",
    en: "Training & Coach Gear",
    short: "Entraînement",
    shortEn: "Training",
    blurbFr: "Buts, cônes, cibles, ballons, kit coach.",
    blurbEn: "Goals, cones, targets, balls, coach kit.",
  },
  {
    id: "vetements",
    fr: "Vêtements & Maillots",
    en: "Apparel & Jerseys",
    short: "Vêtements",
    shortEn: "Apparel",
    blurbFr: "Maillots personnalisables, vestes, shorts.",
    blurbEn: "Custom jerseys, jackets, shorts.",
  },
  {
    id: "accessoires",
    fr: "Accessoires & Protection",
    en: "Accessories & Protection",
    short: "Accessoires",
    shortEn: "Accessories",
    blurbFr: "Protège-tibias, genoux, gants, colle.",
    blurbEn: "Shin guards, knee pads, gloves, glue.",
  },
];

export const categoryById = (id: CategoryId): Category =>
  categories.find((c) => c.id === id) ?? categories[0];

const s = (k: SpecKey, fv: string, ev: string): Spec => ({ k, fv, ev });

export const products: Product[] = [
  // ---------------------------------------------------------------- Chaussures
  {
    id: "chaussures-vitesse-elite",
    category: "chaussures",
    name: "Chaussures de foot Vitesse Élite",
    nameEn: "Vitesse Elite Football Boots",
    price: 24999,
    rating: 4.9,
    reviews: 128,
    badge: "elite",
    bestseller: true,
    art: "boot",
    sizeSet: "chaussures",
    shortFr: "Tige tricotée ultralégère pour les joueurs de vitesse.",
    shortEn: "Ultralight knit upper built for speed players.",
    longFr:
      "Conçues pour les ailiers qui jouent sur la première accélération, ces chaussures associent une tige tricotée sans couture à une semelle à crampons coniques. Le talon renforcé garde le pied verrouillé sur les changements de direction.",
    longEn:
      "Designed for wingers who live on the first step, these boots pair a seamless knit upper with a conical stud plate. The reinforced heel keeps the foot locked in through sharp changes of direction.",
    specs: [
      s("matiere", "Tige tricotée technique", "Technical knit upper"),
      s("terrain", "Gazon naturel, terrain sec", "Natural grass, dry surface"),
      s("poids", "192 g (pointure 42)", "192 g (size 42)"),
    ],
  },
  {
    id: "chaussures-controle-elite",
    category: "chaussures",
    name: "Chaussures de foot Contrôle Élite",
    nameEn: "Contrôle Elite Football Boots",
    price: 22999,
    rating: 4.8,
    reviews: 96,
    badge: "elite",
    art: "boot",
    sizeSet: "chaussures",
    shortFr: "Zone de touche texturée pour un contrôle net.",
    shortEn: "Textured strike zone for a clean first touch.",
    longFr:
      "Une surface de touche texturée sur l'avant-pied absorbe les balles rapides, tandis que la semelle rigide transmet toute la puissance sur les frappes lointaines. Un modèle pensé pour le milieu de terrain qui garde le ballon.",
    longEn:
      "A textured forefoot strike zone cushions fast balls, while the stiff sole plate passes every bit of power into long-range shots. Built for the midfielder who keeps possession.",
    specs: [
      s("matiere", "Synthétique texturé", "Textured synthetic"),
      s("terrain", "Gazon naturel et synthétique", "Natural and artificial grass"),
      s("usage", "Milieu de terrain, meneur de jeu", "Midfield, playmaker"),
    ],
  },
  {
    id: "chaussures-terrain-sec",
    category: "chaussures",
    name: "Chaussures de foot Terrain Sec",
    nameEn: "Dry Ground Football Boots",
    price: 18999,
    rating: 4.6,
    reviews: 74,
    art: "boot",
    sizeSet: "chaussures",
    shortFr: "Le classique FG, stable et durable.",
    shortEn: "The classic FG boot, stable and durable.",
    longFr:
      "Le modèle que l'on porte trois soirs par semaine : semelle FG à crampons fixes, empeigne en synthétique facile à nettoyer et chaussant régulier. Aucune surprise, saison après saison.",
    longEn:
      "The boot you wear three nights a week: fixed-stud FG outsole, easy-to-clean synthetic upper and a regular fit. No surprises, season after season.",
    specs: [
      s("matiere", "Synthétique haute résistance", "High-resistance synthetic"),
      s("terrain", "Terrain sec", "Dry surface"),
      s("garantie", "Garantie 12 mois", "12-month warranty"),
    ],
  },
  {
    id: "chaussures-sol-mouille",
    category: "chaussures",
    name: "Chaussures de foot Sol Mouillé",
    nameEn: "Wet Ground Football Boots",
    price: 16499,
    rating: 4.5,
    reviews: 51,
    art: "boot",
    sizeSet: "chaussures",
    shortFr: "Semelle à crampons vissés pour les terrains gras.",
    shortEn: "Screw-in studs for heavy, wet pitches.",
    longFr:
      "Crampons vissés en acier pour mordre dans les terrains détrempés de novembre. L'empeigne traitée repousse l'eau et le revêtement intérieur reste confortable quand la partie dure.",
    longEn:
      "Steel screw-in studs bite into the soaked November pitches. The treated upper sheds water and the interior liner stays comfortable when the match runs long.",
    specs: [
      s("matiere", "Synthétique traité déperlant", "Water-repellent synthetic"),
      s("terrain", "Sol mouillé, terrain gras", "Wet ground, soft pitch"),
      s("poids", "245 g (pointure 42)", "245 g (size 42)"),
    ],
  },
  {
    id: "chaussures-junior",
    category: "chaussures",
    name: "Chaussures de foot Junior",
    nameEn: "Junior Football Boots",
    price: 9999,
    rating: 4.4,
    reviews: 63,
    badge: "nouveau",
    art: "boot",
    images: [
      "/img/produits/chaussures-junior/1-laterale.webp",
      "/img/produits/chaussures-junior/2-face.webp",
      "/img/produits/chaussures-junior/3-interieure.webp",
      "/img/produits/chaussures-junior/4-arriere.webp",
      "/img/produits/chaussures-junior/5-dessus.webp",
      "/img/produits/chaussures-junior/6-semelle.webp",
      "/img/produits/chaussures-junior/7-trois-quarts.webp",
    ],
    sizeSet: "chaussures",
    shortFr: "Légères, souples et faciles à enfiler.",
    shortEn: "Light, flexible and easy to pull on.",
    longFr:
      "Une pointure junior pensée pour les pieds qui grandissent : tige souple, laçage large et semelle FG légère. La sangle de talon s'ajuste sans serrer la cheville.",
    longEn:
      "A junior fit built for growing feet: flexible upper, wide lacing and a light FG sole. The heel strap adjusts without pinching the ankle.",
    specs: [
      s("matiere", "Synthétique souple", "Flexible synthetic"),
      s("tailles", "Pointures 33 à 38", "Sizes 33 to 38"),
      s("terrain", "Terrain sec et synthétique", "Dry and artificial surface"),
    ],
  },

  // -------------------------------------------------------------------- Futsal
  {
    id: "futsal-precision",
    category: "futsal",
    name: "Souliers Futsal Précision",
    nameEn: "Précision Futsal Shoes",
    price: 13999,
    rating: 4.8,
    reviews: 112,
    bestseller: true,
    art: "futsal",
    sizeSet: "futsal",
    shortFr: "Semelle gomme pour un grip net sur parquet.",
    shortEn: "Gum outsole with clean grip on hardwood.",
    longFr:
      "Semelle en gomme non marquante et semelle intermédiaire fine : le pied reste au ras du sol pour les appuis courts du futsal. L'avant-pied renforcé résiste à l'usure des semelles de salle.",
    longEn:
      "A non-marking gum outsole and a thin midsole keep the foot low to the ground for short futsal steps. The reinforced forefoot stands up to court wear.",
    specs: [
      s("matiere", "Suède et mesh", "Suede and mesh"),
      s("terrain", "Parquet, salle", "Hardwood, indoor court"),
      s("usage", "Futsal, appuis courts", "Futsal, quick steps"),
    ],
  },
  {
    id: "futsal-rapidite",
    category: "futsal",
    name: "Souliers Futsal Rapidité",
    nameEn: "Rapidité Futsal Shoes",
    price: 12999,
    rating: 4.6,
    reviews: 87,
    art: "futsal",
    sizeSet: "futsal",
    shortFr: "Chaussant près du pied pour les changements de rythme.",
    shortEn: "Close fit for sharp changes of pace.",
    longFr:
      "Un chaussant serré et une tige légère qui suivent le pied dans les changements de direction. La semelle gomme conserve le grip sur béton comme sur parquet.",
    longEn:
      "A snug fit and light upper that move with the foot through cuts and pivots. The gum outsole keeps its grip on concrete as well as hardwood.",
    specs: [
      s("matiere", "Mesh technique", "Technical mesh"),
      s("terrain", "Béton, parquet", "Concrete, hardwood"),
      s("poids", "238 g (pointure 42)", "238 g (size 42)"),
    ],
  },
  {
    id: "futsal-pro-grip",
    category: "futsal",
    name: "Souliers Futsal Pro Grip",
    nameEn: "Pro Grip Futsal Shoes",
    price: 15999,
    rating: 4.9,
    reviews: 64,
    badge: "elite",
    art: "futsal",
    sizeSet: "futsal",
    shortFr: "Le modèle des joueurs de futsal de haut niveau.",
    shortEn: "The shoe high-level futsal players reach for.",
    longFr:
      "Semelle gomme à motifs profonds, coque de protection sur l'avant-pied et tige en cuir synthétique souple. Conçue pour les matchs qui se jouent dans un mètre carré.",
    longEn:
      "A deeply patterned gum outsole, forefoot protection cage and soft synthetic leather upper. Made for matches decided inside a square metre.",
    specs: [
      s("matiere", "Cuir synthétique souple", "Soft synthetic leather"),
      s("terrain", "Parquet, salle", "Hardwood, indoor court"),
      s("niveau", "Compétition", "Competitive"),
    ],
  },
  {
    id: "futsal-junior",
    category: "futsal",
    name: "Souliers Futsal Junior",
    nameEn: "Junior Futsal Shoes",
    price: 8499,
    rating: 4.3,
    reviews: 41,
    badge: "nouveau",
    art: "futsal",
    sizeSet: "futsal",
    shortFr: "Premiers souliers de futsal, confortables dès l'essai.",
    shortEn: "First futsal shoes, comfortable from day one.",
    longFr:
      "Un modèle junior simple à enfiler, avec une semelle gomme adhérente et un amorti souple pour les premières saisons en salle.",
    longEn:
      "A junior model that pulls on easily, with a grippy gum sole and soft cushioning for the first indoor seasons.",
    specs: [
      s("matiere", "Mesh et synthétique", "Mesh and synthetic"),
      s("tailles", "Pointures 30 à 35", "Sizes 30 to 35"),
      s("terrain", "Salle, gymnase", "Indoor court, gym"),
    ],
  },

  // -------------------------------------------------------------- Accessoires
  {
    id: "tibias-blindes",
    category: "accessoires",
    name: "Protège-tibias Blindés",
    nameEn: "Armoured Shin Guards",
    price: 3999,
    rating: 4.7,
    reviews: 156,
    bestseller: true,
    art: "shin",
    shortFr: "Coque rigide et manchon compressif inclus.",
    shortEn: "Hard shell with compression sleeve included.",
    longFr:
      "Une coque polypropylène qui encaisse les contacts sans glisser, maintenue par un manchon compressif qui reste en place pendant les 90 minutes.",
    longEn:
      "A polypropylene shell that absorbs contact without shifting, held by a compression sleeve that stays put for the full 90 minutes.",
    specs: [
      s("matiere", "Polypropylène et manchon élasthanne", "Polypropylene and elastane sleeve"),
      s("tailles", "S, M, L", "S, M, L"),
      s("contenu", "1 paire et 1 manchon", "1 pair and 1 sleeve"),
    ],
  },
  {
    id: "genoux-renfort",
    category: "accessoires",
    name: "Protège-genoux Renfort",
    nameEn: "Reinforced Knee Pads",
    price: 2999,
    rating: 4.5,
    reviews: 72,
    art: "knee",
    shortFr: "Amorti mousse pour les appuis au sol.",
    shortEn: "Foam cushioning for tackles to the ground.",
    longFr:
      "Un protège-genou léger avec un coussin de mousse amovible, pensé pour les gardiens et les joueurs qui terminent les matchs à genoux. La bande élastique ne roule pas.",
    longEn:
      "A light knee pad with a removable foam insert, made for keepers and players who end matches on their knees. The elastic band does not roll.",
    specs: [
      s("matiere", "Mousse EVA et tricot", "EVA foam and knit"),
      s("tailles", "S/M et L/XL", "S/M and L/XL"),
      s("contenu", "1 paire", "1 pair"),
    ],
  },
  {
    id: "colle-gants",
    category: "accessoires",
    name: "Colle pour gants Pro Grip",
    nameEn: "Pro Grip Glove Glue",
    price: 1299,
    rating: 4.6,
    reviews: 204,
    bestseller: true,
    art: "glue",
    shortFr: "Restaure l'adhérence des gants de gardien.",
    shortEn: "Restores grip on worn keeper gloves.",
    longFr:
      "Une application sur paume propre suffit pour retrouver l'adhérence d'un gant fatigué. Le flacon de 25 ml couvre environ six applications.",
    longEn:
      "One coat on a clean palm brings the grip back to a tired glove. The 25 ml bottle covers about six applications.",
    specs: [
      s("capacite", "25 ml", "25 ml"),
      s("usage", "Gants de gardien en latex", "Latex keeper gloves"),
      s("contenu", "1 flacon", "1 bottle"),
    ],
  },
  {
    id: "gants-elite",
    category: "accessoires",
    name: "Gants de gardien Élite",
    nameEn: "Élite Goalkeeper Gloves",
    price: 12999,
    rating: 4.9,
    reviews: 143,
    bestseller: true,
    badge: "elite",
    art: "gloves",
    shortFr: "Latex allemand 4 mm, coupe hybride.",
    shortEn: "4 mm German latex, hybrid cut.",
    longFr:
      "Paume en latex allemand de 4 mm pour les matchs sous la pluie, dos en néoprène et sangle de poignet large. La coupe hybride laisse les doigts libres tout en fermant les espaces.",
    longEn:
      "A 4 mm German latex palm for wet-weather matches, neoprene backhand and a wide wrist strap. The hybrid cut keeps fingers free while closing the gaps.",
    specs: [
      s("matiere", "Latex 4 mm et néoprène", "4 mm latex and neoprene"),
      s("tailles", "7 à 11", "7 to 11"),
      s("usage", "Match, terrain humide", "Match, wet conditions"),
    ],
  },
  {
    id: "gants-entrainement",
    category: "accessoires",
    name: "Gants de gardien Entraînement",
    nameEn: "Training Goalkeeper Gloves",
    price: 6999,
    rating: 4.5,
    reviews: 88,
    art: "gloves",
    shortFr: "Durables, faits pour les séances répétées.",
    shortEn: "Durable, built for repeated sessions.",
    longFr:
      "Un latex plus résistant que confortable : ces gants encaissent les séances quotidiennes sur terrain synthétique sans se déchirer au bout de trois semaines.",
    longEn:
      "A latex built for durability rather than softness: these gloves take daily sessions on artificial turf without splitting after three weeks.",
    specs: [
      s("matiere", "Latex résistant 3 mm", "3 mm durable latex"),
      s("tailles", "7 à 11", "7 to 11"),
      s("usage", "Entraînement", "Training"),
    ],
  },
  {
    id: "gants-junior",
    category: "accessoires",
    name: "Gants de gardien Junior",
    nameEn: "Junior Goalkeeper Gloves",
    price: 4499,
    rating: 4.3,
    reviews: 57,
    badge: "nouveau",
    art: "gloves",
    shortFr: "Coupe plate, faciles à fermer pour les jeunes.",
    shortEn: "Flat cut, easy for young keepers to close.",
    longFr:
      "Une coupe plate et une sangle de poignet courte pour les mains des 8 à 13 ans. Le latex souple pardonne les prises approximatives.",
    longEn:
      "A flat cut and short wrist strap sized for 8 to 13 year-old hands. The soft latex forgives imperfect catches.",
    specs: [
      s("matiere", "Latex souple 3 mm", "3 mm soft latex"),
      s("tailles", "4 à 6", "4 to 6"),
      s("usage", "École de gardiens", "Keeper school"),
    ],
  },

  // -------------------------------------------------------------- Entraînement
  {
    id: "but-pliable",
    category: "entrainement",
    name: "Petit but pliable 1,2 m",
    nameEn: "Folding Mini Goal 1.2 m",
    price: 14999,
    rating: 4.6,
    reviews: 45,
    art: "goal",
    shortFr: "Se plie en dix secondes, filet inclus.",
    shortEn: "Folds in ten seconds, net included.",
    longFr:
      "Un but d'entraînement en aluminium qui se monte sans outil et se range dans le coffre. Le filet est déjà monté sur le cadre, il suffit de le déplier.",
    longEn:
      "An aluminium training goal that sets up without tools and packs into a car boot. The net comes pre-fitted to the frame — just unfold it.",
    specs: [
      s("matiere", "Aluminium et filet polypropylène", "Aluminium and polypropylene net"),
      s("dimensions", "1,2 m × 0,8 m × 0,8 m", "1.2 m × 0.8 m × 0.8 m"),
      s("contenu", "1 but et 4 piquets", "1 goal and 4 pegs"),
    ],
  },
  {
    id: "paire-buts-18",
    category: "entrainement",
    name: "Paire de petits buts 1,8 m",
    nameEn: "Pair of Mini Goals 1.8 m",
    price: 27999,
    rating: 4.8,
    reviews: 31,
    badge: "elite",
    art: "goal",
    shortFr: "Deux buts robustes pour les exercices de finition.",
    shortEn: "Two sturdy goals for finishing drills.",
    longFr:
      "Deux buts de 1,8 m en acier galvanisé, conçus pour rester dehors toute la saison. Les filets se fixent par velcro et se remplacent séparément.",
    longEn:
      "Two 1.8 m galvanised steel goals built to stay outside all season. The nets attach with velcro and can be replaced separately.",
    specs: [
      s("matiere", "Acier galvanisé", "Galvanised steel"),
      s("dimensions", "1,8 m × 1,2 m × 1 m", "1.8 m × 1.2 m × 1 m"),
      s("contenu", "2 buts, 2 filets, 8 piquets", "2 goals, 2 nets, 8 pegs"),
    ],
  },
  {
    id: "cones-entrainement",
    category: "entrainement",
    name: "Cônes d'entraînement (50)",
    nameEn: "Training Cones (50)",
    price: 3499,
    rating: 4.7,
    reviews: 189,
    bestseller: true,
    art: "cone",
    shortFr: "Lot de 50 cônes souples avec support.",
    shortEn: "Set of 50 flexible cones with a carrier.",
    longFr:
      "Cinquante cônes de 15 cm, souples au point de plier sous le pied, avec leur support de rangement. Le kit de base de tout entraîneur.",
    longEn:
      "Fifty 15 cm cones flexible enough to fold underfoot, with their storage rack. The basic kit every coach needs.",
    specs: [
      s("matiere", "PVC souple", "Flexible PVC"),
      s("contenu", "50 cônes et 1 support", "50 cones and 1 carrier"),
      s("dimensions", "15 cm de hauteur", "15 cm tall"),
    ],
  },
  {
    id: "cibles-precision",
    category: "entrainement",
    name: "Cibles de précision (4)",
    nameEn: "Precision Targets (4)",
    price: 5999,
    rating: 4.5,
    reviews: 66,
    art: "target",
    shortFr: "Quatre cibles à suspendre dans les coins.",
    shortEn: "Four targets to hang in the corners.",
    longFr:
      "Quatre cibles à fixer dans les coins du but pour travailler la finition sous pression. La toile résiste aux frappes répétées et les attaches s'adaptent à tous les filets.",
    longEn:
      "Four targets to clip into the goal corners for finishing work under pressure. The canvas takes repeated strikes and the straps fit any net.",
    specs: [
      s("matiere", "Toile PVC renforcée", "Reinforced PVC canvas"),
      s("contenu", "4 cibles et 8 attaches", "4 targets and 8 clips"),
      s("dimensions", "60 cm × 60 cm", "60 cm × 60 cm"),
    ],
  },
  {
    id: "ballon-entrainement",
    category: "entrainement",
    name: "Ballon d'entraînement Taille 5",
    nameEn: "Training Ball Size 5",
    price: 4999,
    rating: 4.6,
    reviews: 231,
    art: "ball",
    shortFr: "Le ballon qui survit à une saison de séances.",
    shortEn: "The ball that survives a season of sessions.",
    longFr:
      "Un ballon taille 5 thermosoudé, gonflé à 0,8 bar, avec une vessie butyle qui tient la pression d'une semaine à l'autre. Machine à coudre renforcée sur les coutures.",
    longEn:
      "A thermally bonded size 5 ball inflated to 0.8 bar, with a butyl bladder that holds pressure week to week. Stitching is reinforced at every seam.",
    specs: [
      s("matiere", "PU thermosoudé", "Thermally bonded PU"),
      s("tailles", "Taille 5", "Size 5"),
      s("poids", "430 g", "430 g"),
    ],
  },
  {
    id: "ballon-match-pro",
    category: "entrainement",
    name: "Ballon de match Pro",
    nameEn: "Pro Match Ball",
    price: 8999,
    rating: 4.9,
    reviews: 97,
    badge: "elite",
    art: "ball",
    shortFr: "Homologué pour la compétition, toucher ferme.",
    shortEn: "Competition approved, firm touch.",
    longFr:
      "Le ballon des jours de match : surface texturée pour la stabilité en vol, vessie latex pour une réponse immédiate et poids contrôlé à 425 g.",
    longEn:
      "The match-day ball: a textured surface for flight stability, latex bladder for instant response and a controlled 425 g weight.",
    specs: [
      s("matiere", "PU texturé et vessie latex", "Textured PU and latex bladder"),
      s("tailles", "Taille 5", "Size 5"),
      s("niveau", "Compétition", "Competitive"),
    ],
  },
  {
    id: "kit-coachs",
    category: "entrainement",
    name: "Équipement complet pour coachs",
    nameEn: "Complete Coach Kit",
    price: 21999,
    rating: 4.8,
    reviews: 54,
    art: "coach",
    shortFr: "Chasubles, cônes, sifflet, tableau et sac.",
    shortEn: "Bibs, cones, whistle, tactics board and bag.",
    longFr:
      "Tout ce qu'il faut pour animer une séance : 12 chasubles, 20 cônes, un sifflet, un tableau tactique effaçable et un sac de transport. Le kit que l'on donne à un nouvel entraîneur.",
    longEn:
      "Everything needed to run a session: 12 bibs, 20 cones, a whistle, a wipe-clean tactics board and a carry bag. The kit you hand a new coach.",
    specs: [
      s("contenu", "12 chasubles, 20 cônes, sifflet, tableau, sac", "12 bibs, 20 cones, whistle, board, bag"),
      s("matiere", "Polyester et PVC", "Polyester and PVC"),
      s("usage", "Entraînement collectif", "Team training"),
    ],
  },
  {
    id: "veste-coachs",
    category: "entrainement",
    name: "Veste d'entraînement Coachs",
    nameEn: "Coach Training Jacket",
    price: 10999,
    rating: 4.7,
    reviews: 39,
    art: "jacket",
    sizeSet: "vetements",
    shortFr: "Coupe-vent avec poche pour le tableau tactique.",
    shortEn: "Windbreaker with a tactics-board pocket.",
    longFr:
      "Une veste légère qui coupe le vent des soirs d'octobre, avec une poche arrière assez grande pour le tableau tactique. Le col montant protège le cou quand on reste immobile.",
    longEn:
      "A light jacket that cuts the wind on October evenings, with a back pocket big enough for a tactics board. The high collar protects your neck while you stand still.",
    specs: [
      s("matiere", "Polyester déperlant", "Water-repellent polyester"),
      s("tailles", "S à XL", "S to XL"),
      s("usage", "Banc, entraînement", "Bench, training"),
    ],
  },
  {
    id: "veste-joueurs",
    category: "entrainement",
    name: "Veste d'entraînement Joueurs",
    nameEn: "Player Training Jacket",
    price: 9499,
    rating: 4.5,
    reviews: 84,
    art: "jacket",
    sizeSet: "vetements",
    shortFr: "Molleton léger, fermeture pleine longueur.",
    shortEn: "Light fleece, full-length zip.",
    longFr:
      "Le survêtement d'échauffement : molleton léger, fermeture pleine longueur et poignets élastiques. Assez chaud pour l'avant-match, assez fin pour rester sur le banc.",
    longEn:
      "The warm-up layer: light fleece, full-length zip and elastic cuffs. Warm enough for pre-match, thin enough to keep on the bench.",
    specs: [
      s("matiere", "Molleton polyester", "Polyester fleece"),
      s("tailles", "S à XL", "S to XL"),
      s("entretien", "Lavage 30 °C", "Machine wash 30 °C"),
    ],
  },

  // ---------------------------------------------------------------------- Sacs
  {
    id: "sac-pro-45",
    category: "sacs",
    name: "Sac de sport Rue 90 Pro 45 L",
    nameEn: "Rue 90 Pro Sports Bag 45 L",
    price: 7999,
    rating: 4.8,
    reviews: 176,
    bestseller: true,
    art: "bag",
    shortFr: "Compartiment chaussures séparé et ventilé.",
    shortEn: "Separate ventilated boot compartment.",
    longFr:
      "Un duffle de 45 L avec un compartiment à chaussures ventilé, une poche humide étanche et une bandoulière rembourrée. Il passe en bagage cabine.",
    longEn:
      "A 45 L duffel with a ventilated boot compartment, a waterproof wet pocket and a padded shoulder strap. It fits as carry-on luggage.",
    specs: [
      s("capacite", "45 L", "45 L"),
      s("matiere", "Polyester 600D", "600D polyester"),
      s("dimensions", "55 cm × 28 cm × 30 cm", "55 cm × 28 cm × 30 cm"),
    ],
  },
  {
    id: "sac-roulette",
    category: "sacs",
    name: "Sac de sport à roulettes 90 L",
    nameEn: "Wheeled Sports Bag 90 L",
    price: 14999,
    rating: 4.7,
    reviews: 68,
    art: "bag",
    shortFr: "90 L sur roues, pour les déplacements de club.",
    shortEn: "90 L on wheels for club travel.",
    longFr:
      "Le sac des tournois : 90 L, roues remplaçables, poignée télescopique et fond renforcé. Il avale les maillots d'une équipe complète.",
    longEn:
      "The tournament bag: 90 L, replaceable wheels, telescopic handle and a reinforced base. It swallows a full squad's kit.",
    specs: [
      s("capacite", "90 L", "90 L"),
      s("matiere", "Polyester 900D et fond PVC", "900D polyester and PVC base"),
      s("garantie", "Garantie 2 ans", "2-year warranty"),
    ],
  },
  {
    id: "sac-dos-25",
    category: "sacs",
    name: "Sac à dos Compact 25 L",
    nameEn: "Compact Backpack 25 L",
    price: 6499,
    rating: 4.5,
    reviews: 59,
    art: "bag",
    shortFr: "Pour le club, l'école et le trajet en métro.",
    shortEn: "For the club, school and the metro ride.",
    longFr:
      "Un sac à dos de 25 L avec dos ventilé, poche ordinateur 15 pouces et sangle pour accrocher un ballon. Assez discret pour aller en cours.",
    longEn:
      "A 25 L backpack with a ventilated back panel, 15-inch laptop sleeve and a strap to hook a ball. Discreet enough for class.",
    specs: [
      s("capacite", "25 L", "25 L"),
      s("matiere", "Polyester recyclé", "Recycled polyester"),
      s("dimensions", "45 cm × 30 cm × 18 cm", "45 cm × 30 cm × 18 cm"),
    ],
  },
  {
    id: "sac-chaussures",
    category: "sacs",
    name: "Sac à chaussures ventilé",
    nameEn: "Ventilated Boot Bag",
    price: 2999,
    rating: 4.4,
    reviews: 112,
    art: "bag",
    shortFr: "Deux oeillets d'aération, fond lavable.",
    shortEn: "Two air vents, washable base.",
    longFr:
      "Un sac séparé pour les crampons, avec deux oeillets d'aération et un fond lavable à la main. Il garde le reste du sac de sport au sec.",
    longEn:
      "A separate bag for the boots, with two air vents and a hand-washable base. It keeps the rest of your kit dry.",
    specs: [
      s("capacite", "8 L", "8 L"),
      s("matiere", "Polyester enduit", "Coated polyester"),
      s("entretien", "Lavage à la main", "Hand wash"),
    ],
  },

  // ----------------------------------------------------------------- Vêtements
  {
    id: "maillot-domicile",
    category: "vetements",
    name: "Maillot personnalisable Domicile",
    nameEn: "Customisable Home Jersey",
    price: 8999,
    rating: 4.9,
    reviews: 212,
    bestseller: true,
    art: "jersey",
    sizeSet: "vetements",
    customizable: true,
    shortFr: "Votre nom et votre numéro, floqués à la commande.",
    shortEn: "Your name and number, printed to order.",
    longFr:
      "Le maillot domicile en maille respirante, avec nom et numéro personnalisables. La coupe est ajustée aux épaules sans serrer la taille, et le flocage reste souple au lavage.",
    longEn:
      "The home jersey in breathable knit, with customisable name and number. The fit is shaped at the shoulders without gripping the waist, and the print stays flexible in the wash.",
    specs: [
      s("matiere", "Polyester respirant 140 g", "Breathable 140 g polyester"),
      s("tailles", "S à XL", "S to XL"),
      s("entretien", "Lavage 30 °C, à l'envers", "Wash 30 °C, inside out"),
    ],
  },
  {
    id: "maillot-exterieur",
    category: "vetements",
    name: "Maillot personnalisable Extérieur",
    nameEn: "Customisable Away Jersey",
    price: 8999,
    rating: 4.8,
    reviews: 143,
    art: "jersey",
    sizeSet: "vetements",
    customizable: true,
    shortFr: "Version extérieur, personnalisable au même tarif.",
    shortEn: "Away version, customisable at the same price.",
    longFr:
      "La version extérieur du maillot maison : même maille, même coupe, un motif inversé qui reste lisible sur les terrains clairs. Personnalisation incluse.",
    longEn:
      "The away version of the home shirt: same knit, same fit, an inverted pattern that stays legible on light pitches. Personalisation included.",
    specs: [
      s("matiere", "Polyester respirant 140 g", "Breathable 140 g polyester"),
      s("tailles", "S à XL", "S to XL"),
      s("entretien", "Lavage 30 °C, à l'envers", "Wash 30 °C, inside out"),
    ],
  },
  {
    id: "maillot-gardien",
    category: "vetements",
    name: "Maillot gardien personnalisable",
    nameEn: "Customisable Goalkeeper Jersey",
    price: 9499,
    rating: 4.7,
    reviews: 61,
    art: "jersey",
    sizeSet: "vetements",
    customizable: true,
    shortFr: "Manches longues rembourrées aux coudes.",
    shortEn: "Long sleeves padded at the elbows.",
    longFr:
      "Un maillot de gardien à manches longues, avec des coudes légèrement rembourrés et une coupe plus longue dans le dos. Nom et numéro personnalisables.",
    longEn:
      "A long-sleeve keeper jersey with lightly padded elbows and a longer back hem. Name and number are customisable.",
    specs: [
      s("matiere", "Polyester et élasthanne", "Polyester and elastane"),
      s("tailles", "S à XL", "S to XL"),
      s("usage", "Gardien, match et entraînement", "Goalkeeper, match and training"),
    ],
  },
  {
    id: "shorts-entrainement",
    category: "vetements",
    name: "Shorts d'entraînement",
    nameEn: "Training Shorts",
    price: 4499,
    rating: 4.6,
    reviews: 133,
    art: "short",
    sizeSet: "vetements",
    shortFr: "Maille légère avec doublure intégrée.",
    shortEn: "Light knit with a built-in liner.",
    longFr:
      "Un short court avec doublure intégrée, deux poches latérales et une ceinture élastique qui ne descend pas quand on sprinte.",
    longEn:
      "Short-length shorts with a built-in liner, two side pockets and an elastic waistband that stays up when you sprint.",
    specs: [
      s("matiere", "Polyester recyclé", "Recycled polyester"),
      s("tailles", "S à XL", "S to XL"),
      s("entretien", "Lavage 30 °C", "Machine wash 30 °C"),
    ],
  },
];

export const productCount = products.length;

export const productsByCategory = (id: CategoryId): Product[] =>
  products.filter((p) => p.category === id);

export const categoryCount = (id: CategoryId): number =>
  productsByCategory(id).length;

export const getProduct = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const bestsellers = (): Product[] =>
  products.filter((p) => p.bestseller);

export const newest = (): Product[] =>
  products.filter((p) => p.badge === "nouveau").concat(
    products.filter((p) => p.badge !== "nouveau"),
  );

export const relatedProducts = (product: Product, count = 4): Product[] => {
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );
  const others = products.filter(
    (p) => p.category !== product.category && p.id !== product.id,
  );
  return [...sameCategory, ...others].slice(0, count);
};

export const customizableJersey = (): Product =>
  getProduct("maillot-domicile") as Product;

/* ---------------------------------------------------------------- Formatage */

/** 12999 → « 129,99 $ » (toujours en dollars canadiens). */
export const formatPrice = (cents: number): string => {
  const value = Math.round(cents) / 100;
  const [whole, decimals] = value.toFixed(2).split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${grouped},${decimals} $`;
};

/** 12999 → « 129,99 » sans le symbole (pour les champs). */
export const formatAmount = (cents: number): string =>
  formatPrice(cents).replace(" $", "");

/* ------------------------------------------------------------------ Tailles */

export const sizeOptions = (set?: SizeSet): string[] => {
  if (set === "chaussures") {
    return ["39", "40", "41", "42", "43", "44", "45", "46"];
  }
  if (set === "futsal") {
    return ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
  }
  if (set === "vetements") {
    return ["S", "M", "L", "XL"];
  }
  return [];
};

/* ------------------------------------------------------------- Bandes de prix */

export type PriceBandId = "u50" | "50-100" | "100-200" | "200+";

export interface PriceBand {
  id: PriceBandId;
  min: number;
  max: number | null;
}

export const priceBands: PriceBand[] = [
  { id: "u50", min: 0, max: 5000 },
  { id: "50-100", min: 5000, max: 10000 },
  { id: "100-200", min: 10000, max: 20000 },
  { id: "200+", min: 20000, max: null },
];

export const inBand = (cents: number, band: PriceBand): boolean =>
  cents >= band.min && (band.max === null || cents < band.max);

/* ---------------------------------------------------------------- Recherche */

const normalize = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const matchesQuery = (product: Product, rawQuery: string): boolean => {
  const query = normalize(rawQuery.trim());
  if (query.length === 0) return true;
  const category = categoryById(product.category);
  const haystack = normalize(
    [
      product.name,
      product.nameEn,
      product.shortFr,
      product.shortEn,
      category.fr,
      category.en,
      category.short,
      category.shortEn,
    ].join(" "),
  );
  return query.split(/\s+/).every((token) => haystack.includes(token));
};

export const searchProducts = (rawQuery: string): Product[] =>
  products.filter((p) => matchesQuery(p, rawQuery));

export type SortId = "nouveautes" | "prix-asc" | "prix-desc" | "note";

export const sortProducts = (list: Product[], sort: SortId): Product[] => {
  const copy = [...list];
  switch (sort) {
    case "prix-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "prix-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "note":
      return copy.sort(
        (a, b) => b.rating - a.rating || b.reviews - a.reviews,
      );
    default:
      return copy.sort(
        (a, b) =>
          Number(b.badge === "nouveau") - Number(a.badge === "nouveau") ||
          b.reviews - a.reviews,
      );
  }
};
