import { TerritoriesSlug, TerritoriesLabel } from "./types";

export interface EnhancedISO3166Territory {
  slug: string,
  label: string,
  iso_a2: string,
  iso_a3: string,
  numeric_code: number,
  fr: string,
}

/**
 * List of ISO-3166 compatible territories
 * @see https://en.wikipedia.org/wiki/ISO_3166
 */
export const ISO3166TERRITORIES: EnhancedISO3166Territory[] = [
  { slug: "afghanistan", label: "Afghanistan", iso_a2: "AF", iso_a3: "AFG", numeric_code: 4, fr: "Afghanistan (l')" },
  { slug: "albania", label: "Albania", iso_a2: "AL", iso_a3: "ALB", numeric_code: 8, fr: "Albanie (l')" },
  { slug: "algeria", label: "Algeria", iso_a2: "DZ", iso_a3: "DZA", numeric_code: 12, fr: "Algérie (l')" },
  { slug: "american-samoa", label: "American Samoa", iso_a2: "AS", iso_a3: "ASM", numeric_code: 16, fr: "Samoa américaines (les)" },
  { slug: "andorra", label: "Andorra", iso_a2: "AD", iso_a3: "AND", numeric_code: 20, fr: "Andorre (l')" },
  { slug: "angola", label: "Angola", iso_a2: "AO", iso_a3: "AGO", numeric_code: 24, fr: "Angola (l')" },
  { slug: "anguilla-&-barbuda", label: "Anguilla", iso_a2: "AI", iso_a3: "AIA", numeric_code: 660, fr: "Anguilla" },
  { slug: "antartica", label: "Antarctica", iso_a2: "AQ", iso_a3: "ATA", numeric_code: 10, fr: "Antarctique (l')" },
  { slug: "antigua-and-barbuda", label: "Antigua and Barbuda", iso_a2: "AG", iso_a3: "ATG", numeric_code: 28, fr: "Antigua-et-Barbuda" },
  { slug: "argentina", label: "Argentina", iso_a2: "AR", iso_a3: "ARG", numeric_code: 32, fr: "Argentine (l')" },
  { slug: "armenia", label: "Armenia", iso_a2: "AM", iso_a3: "ARM", numeric_code: 51, fr: "Arménie (l')" },
  { slug: "aruba", label: "Aruba", iso_a2: "AW", iso_a3: "ABW", numeric_code: 533, fr: "Aruba" },
  { slug: "australia", label: "Australia", iso_a2: "AU", iso_a3: "AUS", numeric_code: 36, fr: "Australie (l')" },
  { slug: "austria", label: "Austria", iso_a2: "AT", iso_a3: "AUT", numeric_code: 40, fr: "Autriche (l')" },
  { slug: "azerbaidjan", label: "Azerbaijan", iso_a2: "AZ", iso_a3: "AZE", numeric_code: 31, fr: "Azerbaïdjan (l')" },
  { slug: "bahamas", label: "Bahamas (the)", iso_a2: "BS", iso_a3: "BHS", numeric_code: 44, fr: "Bahamas (les)" },
  { slug: "bahrain", label: "Bahrain", iso_a2: "BH", iso_a3: "BHR", numeric_code: 48, fr: "Bahreïn" },
  { slug: "bangladesh", label: "Bangladesh", iso_a2: "BD", iso_a3: "BGD", numeric_code: 50, fr: "Bangladesh (le)" },
  { slug: "barbados", label: "Barbados", iso_a2: "BB", iso_a3: "BRB", numeric_code: 52, fr: "Barbade (la)" },
  { slug: "belarus", label: "Belarus", iso_a2: "BY", iso_a3: "BLR", numeric_code: 112, fr: "Bélarus (le)" },
  { slug: "belgium", label: "Belgium", iso_a2: "BE", iso_a3: "BEL", numeric_code: 56, fr: "Belgique (la)" },
  { slug: "belize", label: "Belize", iso_a2: "BZ", iso_a3: "BLZ", numeric_code: 84, fr: "Belize (le)" },
  { slug: "benin", label: "Benin", iso_a2: "BJ", iso_a3: "BEN", numeric_code: 204, fr: "Bénin (le)" },
  { slug: "bermuda", label: "Bermuda", iso_a2: "BM", iso_a3: "BMU", numeric_code: 60, fr: "Bermudes (les)" },
  { slug: "bhutan", label: "Bhutan", iso_a2: "BT", iso_a3: "BTN", numeric_code: 64, fr: "Bhoutan (le)" },
  { slug: "bolivia", label: "Bolivia (Plurinational State of)", iso_a2: "BO", iso_a3: "BOL", numeric_code: 68, fr: "Bolivie (État plurinational de)" },
  { slug: "bonaire", label: "Bonaire, Sint Eustatius and Saba", iso_a2: "BQ", iso_a3: "BES", numeric_code: 535, fr: "Bonaire, Saint-Eustache et Saba" },
  { slug: "bosnia-and-herzegovina", label: "Bosnia and Herzegovina", iso_a2: "BA", iso_a3: "BIH", numeric_code: 70, fr: "Bosnie-Herzégovine (la)" },
  { slug: "botswana", label: "Botswana", iso_a2: "BW", iso_a3: "BWA", numeric_code: 72, fr: "Botswana (le)" },
  { slug: "bouvet-island", label: "Bouvet Island", iso_a2: "BV", iso_a3: "BVT", numeric_code: 74, fr: "Bouvet (l'Île)" },
  { slug: "brazil", label: "Brazil", iso_a2: "BR", iso_a3: "BRA", numeric_code: 76, fr: "Brésil (le)" },
  { slug: "british-indian-ocean-territory", label: "British Indian Ocean Territory (the)", iso_a2: "IO", iso_a3: "IOT", numeric_code: 86, fr: "Indien (le Territoire britannique de l'océan)" },
  { slug: "brunei", label: "Brunei Darussalam", iso_a2: "BN", iso_a3: "BRN", numeric_code: 96, fr: "Brunéi Darussalam (le)" },
  { slug: "bulgaria", label: "Bulgaria", iso_a2: "BG", iso_a3: "BGR", numeric_code: 100, fr: "Bulgarie (la)" },
  { slug: "burkina", label: "Burkina Faso", iso_a2: "BF", iso_a3: "BFA", numeric_code: 854, fr: "Burkina Faso (le)" },
  { slug: "burundi", label: "Burundi", iso_a2: "BI", iso_a3: "BDI", numeric_code: 108, fr: "Burundi (le)" },
  { slug: "cabo-verde", label: "Cabo Verde", iso_a2: "CV", iso_a3: "CPV", numeric_code: 132, fr: "Cabo Verde" },
  { slug: "cambodia", label: "Cambodia", iso_a2: "KH", iso_a3: "KHM", numeric_code: 116, fr: "Cambodge (le)" },
  { slug: "cameroon", label: "Cameroon", iso_a2: "CM", iso_a3: "CMR", numeric_code: 120, fr: "Cameroun (le)" },
  { slug: "canada", label: "Canada", iso_a2: "CA", iso_a3: "CAN", numeric_code: 124, fr: "Canada (le)" },
  { slug: "cayman-islands", label: "Cayman Islands (the)", iso_a2: "KY", iso_a3: "CYM", numeric_code: 136, fr: "Caïmans (les Îles)" },
  { slug: "central-african-republic", label: "Central African Republic (the)", iso_a2: "CF", iso_a3: "CAF", numeric_code: 140, fr: "République centrafricaine (la)" },
  { slug: "chad", label: "Chad", iso_a2: "TD", iso_a3: "TCD", numeric_code: 148, fr: "Tchad (le)" },
  { slug: "chile", label: "Chile", iso_a2: "CL", iso_a3: "CHL", numeric_code: 152, fr: "Chili (le)" },
  { slug: "china", label: "China", iso_a2: "CN", iso_a3: "CHN", numeric_code: 156, fr: "Chine (la)" },
  { slug: "christmas-island", label: "Christmas Island", iso_a2: "CX", iso_a3: "CXR", numeric_code: 162, fr: "Christmas (l'Île)" },
  { slug: "cocos-islands", label: "Cocos (Keeling) Islands (the)", iso_a2: "CC", iso_a3: "CCK", numeric_code: 166, fr: "Cocos (les Îles)/ Keeling (les Îles)" },
  { slug: "colombia", label: "Colombia", iso_a2: "CO", iso_a3: "COL", numeric_code: 170, fr: "Colombie (la)" },
  { slug: "comoros", label: "Comoros (the)", iso_a2: "KM", iso_a3: "COM", numeric_code: 174, fr: "Comores (les)" },
  { slug: "congo-democratic-republic", label: "Congo (the Democratic Republic of the)", iso_a2: "CD", iso_a3: "COD", numeric_code: 180, fr: "Congo (la République démocratique du)" },
  { slug: "congo", label: "Congo (the)", iso_a2: "CG", iso_a3: "COG", numeric_code: 178, fr: "Congo (le)" },
  { slug: "cook-islands", label: "Cook Islands (the)", iso_a2: "CK", iso_a3: "COK", numeric_code: 184, fr: "Cook (les Îles)" },
  { slug: "costa-rica", label: "Costa Rica", iso_a2: "CR", iso_a3: "CRI", numeric_code: 188, fr: "Costa Rica (le)" },
  { slug: "croatia", label: "Croatia", iso_a2: "HR", iso_a3: "HRV", numeric_code: 191, fr: "Croatie (la)" },
  { slug: "cuba", label: "Cuba", iso_a2: "CU", iso_a3: "CUB", numeric_code: 192, fr: "Cuba" },
  { slug: "curacao", label: "Curaçao", iso_a2: "CW", iso_a3: "CUW", numeric_code: 531, fr: "Curaçao" },
  { slug: "cyprus", label: "Cyprus", iso_a2: "CY", iso_a3: "CYP", numeric_code: 196, fr: "Chypre" },
  { slug: "northern-cyprus", label: "Turkish Republic of Northern Cyprus", iso_a2: "-97", iso_a3: "-97", numeric_code: -97, fr: "Chypre du Nord" },
  { slug: "czech", label: "Czechia", iso_a2: "CZ", iso_a3: "CZE", numeric_code: 203, fr: "Tchéquie (la)" },
  { slug: "cote-d-ivoire", label: "Côte d'Ivoire", iso_a2: "CI", iso_a3: "CIV", numeric_code: 384, fr: "Côte d'Ivoire (la)" },
  { slug: "denmark", label: "Denmark", iso_a2: "DK", iso_a3: "DNK", numeric_code: 208, fr: "Danemark (le)" },
  { slug: "djibouti", label: "Djibouti", iso_a2: "DJ", iso_a3: "DJI", numeric_code: 262, fr: "Djibouti" },
  { slug: "dominica", label: "Dominica", iso_a2: "DM", iso_a3: "DMA", numeric_code: 212, fr: "Dominique (la)" },
  { slug: "dominican-republic", label: "Dominican Republic (the)", iso_a2: "DO", iso_a3: "DOM", numeric_code: 214, fr: "dominicaine (la République)" },
  { slug: "ecuador", label: "Ecuador", iso_a2: "EC", iso_a3: "ECU", numeric_code: 218, fr: "Équateur (l')" },
  { slug: "egypt", label: "Egypt", iso_a2: "EG", iso_a3: "EGY", numeric_code: 818, fr: "Égypte (l')" },
  { slug: "el-salvador", label: "El Salvador", iso_a2: "SV", iso_a3: "SLV", numeric_code: 222, fr: "El Salvador" },
  { slug: "equatorial-guinea", label: "Equatorial Guinea", iso_a2: "GQ", iso_a3: "GNQ", numeric_code: 226, fr: "Guinée équatoriale (la)" },
  { slug: "eritrea", label: "Eritrea", iso_a2: "ER", iso_a3: "ERI", numeric_code: 232, fr: "Érythrée (l')" },
  { slug: "estonia", label: "Estonia", iso_a2: "EE", iso_a3: "EST", numeric_code: 233, fr: "Estonie (l')" },
  { slug: "eswatini", label: "Eswatini", iso_a2: "SZ", iso_a3: "SWZ", numeric_code: 748, fr: "Eswatini (l')" },
  { slug: "ethiopia", label: "Ethiopia", iso_a2: "ET", iso_a3: "ETH", numeric_code: 231, fr: "Éthiopie (l')" },
  { slug: "falkland-islands", label: "Falkland Islands (the) [Malvinas]", iso_a2: "FK", iso_a3: "FLK", numeric_code: 238, fr: "Falkland (les Îles)/Malouines (les Îles)" },
  { slug: "faroe-islands", label: "Faroe Islands (the)", iso_a2: "FO", iso_a3: "FRO", numeric_code: 234, fr: "Féroé (les Îles)" },
  { slug: "fiji", label: "Fiji", iso_a2: "FJ", iso_a3: "FJI", numeric_code: 242, fr: "Fidji (les)" },
  { slug: "finland", label: "Finland", iso_a2: "FI", iso_a3: "FIN", numeric_code: 246, fr: "Finlande (la)" },
  { slug: "france", label: "France", iso_a2: "FR", iso_a3: "FRA", numeric_code: 250, fr: "France (la)" },
  { slug: "french-guiana", label: "French Guiana", iso_a2: "GF", iso_a3: "GUF", numeric_code: 254, fr: "Guyane française (la )" },
  { slug: "french-polynesia", label: "French Polynesia", iso_a2: "PF", iso_a3: "PYF", numeric_code: 258, fr: "Polynésie française (la)" },
  { slug: "french-southern-territories", label: "French Southern Territories (the)", iso_a2: "TF", iso_a3: "ATF", numeric_code: 260, fr: "Terres australes françaises (les)" },
  { slug: "gabon", label: "Gabon", iso_a2: "GA", iso_a3: "GAB", numeric_code: 266, fr: "Gabon (le)" },
  { slug: "gambia", label: "Gambia (the)", iso_a2: "GM", iso_a3: "GMB", numeric_code: 270, fr: "Gambie (la)" },
  { slug: "georgia", label: "Georgia", iso_a2: "GE", iso_a3: "GEO", numeric_code: 268, fr: "Géorgie (la)" },
  { slug: "germany", label: "Germany", iso_a2: "DE", iso_a3: "DEU", numeric_code: 276, fr: "Allemagne (l')" },
  { slug: "ghana", label: "Ghana", iso_a2: "GH", iso_a3: "GHA", numeric_code: 288, fr: "Ghana (le)" },
  { slug: "gibraltar", label: "Gibraltar", iso_a2: "GI", iso_a3: "GIB", numeric_code: 292, fr: "Gibraltar" },
  { slug: "greece", label: "Greece", iso_a2: "GR", iso_a3: "GRC", numeric_code: 300, fr: "Grèce (la)" },
  { slug: "greenland", label: "Greenland", iso_a2: "GL", iso_a3: "GRL", numeric_code: 304, fr: "Groenland (le)" },
  { slug: "grenada", label: "Grenada", iso_a2: "GD", iso_a3: "GRD", numeric_code: 308, fr: "Grenade (la)" },
  { slug: "guadeloupe", label: "Guadeloupe", iso_a2: "GP", iso_a3: "GLP", numeric_code: 312, fr: "Guadeloupe (la)" },
  { slug: "guam", label: "Guam", iso_a2: "GU", iso_a3: "GUM", numeric_code: 316, fr: "Guam" },
  { slug: "guatemala", label: "Guatemala", iso_a2: "GT", iso_a3: "GTM", numeric_code: 320, fr: "Guatemala (le)" },
  { slug: "guernsey", label: "Guernsey", iso_a2: "GG", iso_a3: "GGY", numeric_code: 831, fr: "Guernesey" },
  { slug: "guinea", label: "Guinea", iso_a2: "GN", iso_a3: "GIN", numeric_code: 324, fr: "Guinée (la)" },
  { slug: "guinea-bissau", label: "Guinea-Bissau", iso_a2: "GW", iso_a3: "GNB", numeric_code: 624, fr: "Guinée-Bissau (la)" },
  { slug: "guyana", label: "Guyana", iso_a2: "GY", iso_a3: "GUY", numeric_code: 328, fr: "Guyana (le)" },
  { slug: "haiti", label: "Haiti", iso_a2: "HT", iso_a3: "HTI", numeric_code: 332, fr: "Haïti" },
  { slug: "heard-island-and-mcdonald-islands", label: "Heard Island and McDonald Islands", iso_a2: "HM", iso_a3: "HMD", numeric_code: 334, fr: "Heard-et-Îles MacDonald (l'Île)" },
  { slug: "holy-see", label: "Holy See (the)", iso_a2: "VA", iso_a3: "VAT", numeric_code: 336, fr: "Saint-Siège (le)" },
  { slug: "honduras", label: "Honduras", iso_a2: "HN", iso_a3: "HND", numeric_code: 340, fr: "Honduras (le)" },
  { slug: "hong-kong", label: "Hong Kong", iso_a2: "HK", iso_a3: "HKG", numeric_code: 344, fr: "Hong Kong" },
  { slug: "hungary", label: "Hungary", iso_a2: "HU", iso_a3: "HUN", numeric_code: 348, fr: "Hongrie (la)" },
  { slug: "iceland", label: "Iceland", iso_a2: "IS", iso_a3: "ISL", numeric_code: 352, fr: "Islande (l')" },
  { slug: "india", label: "India", iso_a2: "IN", iso_a3: "IND", numeric_code: 356, fr: "Inde (l')" },
  { slug: "indonesia", label: "Indonesia", iso_a2: "ID", iso_a3: "IDN", numeric_code: 360, fr: "Indonésie (l')" },
  { slug: "iran", label: "Iran (Islamic Republic of)", iso_a2: "IR", iso_a3: "IRN", numeric_code: 364, fr: "Iran (République Islamique d')" },
  { slug: "iraq", label: "Iraq", iso_a2: "IQ", iso_a3: "IRQ", numeric_code: 368, fr: "Iraq (l')" },
  { slug: "ireland", label: "Ireland", iso_a2: "IE", iso_a3: "IRL", numeric_code: 372, fr: "Irlande (l')" },
  { slug: "isle-of-man", label: "Isle of Man", iso_a2: "IM", iso_a3: "IMN", numeric_code: 833, fr: "Île de Man" },
  { slug: "israel", label: "Israel", iso_a2: "IL", iso_a3: "ISR", numeric_code: 376, fr: "Israël" },
  { slug: "italy", label: "Italy", iso_a2: "IT", iso_a3: "ITA", numeric_code: 380, fr: "Italie (l')" },
  { slug: "jamaica", label: "Jamaica", iso_a2: "JM", iso_a3: "JAM", numeric_code: 388, fr: "Jamaïque (la)" },
  { slug: "japan", label: "Japan", iso_a2: "JP", iso_a3: "JPN", numeric_code: 392, fr: "Japon (le)" },
  { slug: "jersey", label: "Jersey", iso_a2: "JE", iso_a3: "JEY", numeric_code: 832, fr: "Jersey" },
  { slug: "jordan", label: "Jordan", iso_a2: "JO", iso_a3: "JOR", numeric_code: 400, fr: "Jordanie (la)" },
  { slug: "kazakhstan", label: "Kazakhstan", iso_a2: "KZ", iso_a3: "KAZ", numeric_code: 398, fr: "Kazakhstan (le)" },
  { slug: "kenya", label: "Kenya", iso_a2: "KE", iso_a3: "KEN", numeric_code: 404, fr: "Kenya (le)" },
  { slug: "kiribati", label: "Kiribati", iso_a2: "KI", iso_a3: "KIR", numeric_code: 296, fr: "Kiribati" },
  { slug: "north-korea", label: "Korea (the Democratic People's Republic of)", iso_a2: "KP", iso_a3: "PRK", numeric_code: 408, fr: "Corée (la République populaire démocratique de)" },
  { slug: "south-korea", label: "Korea (the Republic of)", iso_a2: "KR", iso_a3: "KOR", numeric_code: 410, fr: "Corée (la République de)" },
  { slug: "kosovo", label: "Republic of Kosovo", iso_a2: "-98", iso_a3: "-98", numeric_code: -98, fr: "Kosovo", },
  { slug: "kuwait", label: "Kuwait", iso_a2: "KW", iso_a3: "KWT", numeric_code: 414, fr: "Koweït (le)" },
  { slug: "kyrgyzstan", label: "Kyrgyzstan", iso_a2: "KG", iso_a3: "KGZ", numeric_code: 417, fr: "Kirghizistan (le)" },
  { slug: "laos", label: "Lao People's Democratic Republic (the)", iso_a2: "LA", iso_a3: "LAO", numeric_code: 418, fr: "Lao (la République démocratique populaire)" },
  { slug: "latvia", label: "Latvia", iso_a2: "LV", iso_a3: "LVA", numeric_code: 428, fr: "Lettonie (la)" },
  { slug: "lebanon", label: "Lebanon", iso_a2: "LB", iso_a3: "LBN", numeric_code: 422, fr: "Liban (le)" },
  { slug: "lesotho", label: "Lesotho", iso_a2: "LS", iso_a3: "LSO", numeric_code: 426, fr: "Lesotho (le)" },
  { slug: "liberia", label: "Liberia", iso_a2: "LR", iso_a3: "LBR", numeric_code: 430, fr: "Libéria (le)" },
  { slug: "libya", label: "Libya", iso_a2: "LY", iso_a3: "LBY", numeric_code: 434, fr: "Libye (la)" },
  { slug: "liechtenstein", label: "Liechtenstein", iso_a2: "LI", iso_a3: "LIE", numeric_code: 438, fr: "Liechtenstein (le)" },
  { slug: "lithuania", label: "Lithuania", iso_a2: "LT", iso_a3: "LTU", numeric_code: 440, fr: "Lituanie (la)" },
  { slug: "luxembourg", label: "Luxembourg", iso_a2: "LU", iso_a3: "LUX", numeric_code: 442, fr: "Luxembourg (le)" },
  { slug: "macao", label: "Macao", iso_a2: "MO", iso_a3: "MAC", numeric_code: 446, fr: "Macao" },
  { slug: "madagascar", label: "Madagascar", iso_a2: "MG", iso_a3: "MDG", numeric_code: 450, fr: "Madagascar" },
  { slug: "malawi", label: "Malawi", iso_a2: "MW", iso_a3: "MWI", numeric_code: 454, fr: "Malawi (le)" },
  { slug: "malaysia", label: "Malaysia", iso_a2: "MY", iso_a3: "MYS", numeric_code: 458, fr: "Malaisie (la)" },
  { slug: "maldives", label: "Maldives", iso_a2: "MV", iso_a3: "MDV", numeric_code: 462, fr: "Maldives (les)" },
  { slug: "mali", label: "Mali", iso_a2: "ML", iso_a3: "MLI", numeric_code: 466, fr: "Mali (le)" },
  { slug: "malta", label: "Malta", iso_a2: "MT", iso_a3: "MLT", numeric_code: 470, fr: "Malte" },
  { slug: "marshall", label: "Marshall Islands (the)", iso_a2: "MH", iso_a3: "MHL", numeric_code: 584, fr: "Marshall (les Îles)" },
  { slug: "martinique", label: "Martinique", iso_a2: "MQ", iso_a3: "MTQ", numeric_code: 474, fr: "Martinique (la)" },
  { slug: "mauritania", label: "Mauritania", iso_a2: "MR", iso_a3: "MRT", numeric_code: 478, fr: "Mauritanie (la)" },
  { slug: "mauritius", label: "Mauritius", iso_a2: "MU", iso_a3: "MUS", numeric_code: 480, fr: "Maurice" },
  { slug: "mayotte", label: "Mayotte", iso_a2: "YT", iso_a3: "MYT", numeric_code: 175, fr: "Mayotte" },
  { slug: "mexico", label: "Mexico", iso_a2: "MX", iso_a3: "MEX", numeric_code: 484, fr: "Mexique (le)" },
  { slug: "micronesia", label: "Micronesia (Federated States of)", iso_a2: "FM", iso_a3: "FSM", numeric_code: 583, fr: "Micronésie (États fédérés de)" },
  { slug: "moldova", label: "Moldova (the Republic of)", iso_a2: "MD", iso_a3: "MDA", numeric_code: 498, fr: "Moldova (la République de)" },
  { slug: "monaco", label: "Monaco", iso_a2: "MC", iso_a3: "MCO", numeric_code: 492, fr: "Monaco" },
  { slug: "mongolia", label: "Mongolia", iso_a2: "MN", iso_a3: "MNG", numeric_code: 496, fr: "Mongolie (la)" },
  { slug: "montenegro", label: "Montenegro", iso_a2: "ME", iso_a3: "MNE", numeric_code: 499, fr: "Monténégro (le)" },
  { slug: "montserrat", label: "Montserrat", iso_a2: "MS", iso_a3: "MSR", numeric_code: 500, fr: "Montserrat" },
  { slug: "morocco", label: "Morocco", iso_a2: "MA", iso_a3: "MAR", numeric_code: 504, fr: "Maroc (le)" },
  { slug: "mozambique", label: "Mozambique", iso_a2: "MZ", iso_a3: "MOZ", numeric_code: 508, fr: "Mozambique (le)" },
  { slug: "myanmar", label: "Myanmar", iso_a2: "MM", iso_a3: "MMR", numeric_code: 104, fr: "Myanmar (le)" },
  { slug: "namibia", label: "Namibia", iso_a2: "NA", iso_a3: "NAM", numeric_code: 516, fr: "Namibie (la)" },
  { slug: "nauru", label: "Nauru", iso_a2: "NR", iso_a3: "NRU", numeric_code: 520, fr: "Nauru" },
  { slug: "nepal", label: "Nepal", iso_a2: "NP", iso_a3: "NPL", numeric_code: 524, fr: "Népal (le)" },
  { slug: "netherlands", label: "Netherlands (the)", iso_a2: "NL", iso_a3: "NLD", numeric_code: 528, fr: "Pays-Bas (les)" },
  { slug: "new-caledonia", label: "New Caledonia", iso_a2: "NC", iso_a3: "NCL", numeric_code: 540, fr: "Nouvelle-Calédonie (la)" },
  { slug: "new-zealand", label: "New Zealand", iso_a2: "NZ", iso_a3: "NZL", numeric_code: 554, fr: "Nouvelle-Zélande (la)" },
  { slug: "nicaragua", label: "Nicaragua", iso_a2: "NI", iso_a3: "NIC", numeric_code: 558, fr: "Nicaragua (le)" },
  { slug: "niger", label: "Niger (the)", iso_a2: "NE", iso_a3: "NER", numeric_code: 562, fr: "Niger (le)" },
  { slug: "nigeria", label: "Nigeria", iso_a2: "NG", iso_a3: "NGA", numeric_code: 566, fr: "Nigéria (le)" },
  { slug: "niue", label: "Niue", iso_a2: "NU", iso_a3: "NIU", numeric_code: 570, fr: "Niue" },
  { slug: "norfolk-island", label: "Norfolk Island", iso_a2: "NF", iso_a3: "NFK", numeric_code: 574, fr: "Norfolk (l'Île)" },
  { slug: "north-macedonia", label: "North Macedonia", iso_a2: "MK", iso_a3: "MKD", numeric_code: 807, fr: "Macédoine du Nord (la)" },
  { slug: "northern-mariana-islands", label: "Northern Mariana Islands (the)", iso_a2: "MP", iso_a3: "MNP", numeric_code: 580, fr: "Mariannes du Nord (les Îles)" },
  { slug: "norway", label: "Norway", iso_a2: "NO", iso_a3: "NOR", numeric_code: 578, fr: "Norvège (la)" },
  { slug: "oman", label: "Oman", iso_a2: "OM", iso_a3: "OMN", numeric_code: 512, fr: "Oman" },
  { slug: "pakistan", label: "Pakistan", iso_a2: "PK", iso_a3: "PAK", numeric_code: 586, fr: "Pakistan (le)" },
  { slug: "palau", label: "Palau", iso_a2: "PW", iso_a3: "PLW", numeric_code: 585, fr: "Palaos (les)" },
  { slug: "palestine", label: "Palestine, State of", iso_a2: "PS", iso_a3: "PSE", numeric_code: 275, fr: "Palestine, État de" },
  { slug: "panama", label: "Panama", iso_a2: "PA", iso_a3: "PAN", numeric_code: 591, fr: "Panama (le)" },
  { slug: "papua", label: "Papua New Guinea", iso_a2: "PG", iso_a3: "PNG", numeric_code: 598, fr: "Papouasie-Nouvelle-Guinée (la)" },
  { slug: "paraguay", label: "Paraguay", iso_a2: "PY", iso_a3: "PRY", numeric_code: 600, fr: "Paraguay (le)" },
  { slug: "peru", label: "Peru", iso_a2: "PE", iso_a3: "PER", numeric_code: 604, fr: "Pérou (le)" },
  { slug: "philippines", label: "Philippines (the)", iso_a2: "PH", iso_a3: "PHL", numeric_code: 608, fr: "Philippines (les)" },
  { slug: "pitcairn", label: "Pitcairn", iso_a2: "PN", iso_a3: "PCN", numeric_code: 612, fr: "Pitcairn" },
  { slug: "poland", label: "Poland", iso_a2: "PL", iso_a3: "POL", numeric_code: 616, fr: "Pologne (la)" },
  { slug: "portugal", label: "Portugal", iso_a2: "PT", iso_a3: "PRT", numeric_code: 620, fr: "Portugal (le)" },
  { slug: "puerto-rico", label: "Puerto Rico", iso_a2: "PR", iso_a3: "PRI", numeric_code: 630, fr: "Porto Rico" },
  { slug: "qatar", label: "Qatar", iso_a2: "QA", iso_a3: "QAT", numeric_code: 634, fr: "Qatar (le)" },
  { slug: "romania", label: "Romania", iso_a2: "RO", iso_a3: "ROU", numeric_code: 642, fr: "Roumanie (la)" },
  { slug: "russia", label: "Russian Federation (the)", iso_a2: "RU", iso_a3: "RUS", numeric_code: 643, fr: "Russie (la Fédération de)" },
  { slug: "rwanda", label: "Rwanda", iso_a2: "RW", iso_a3: "RWA", numeric_code: 646, fr: "Rwanda (le)" },
  { slug: "reunion", label: "Réunion", iso_a2: "RE", iso_a3: "REU", numeric_code: 638, fr: "Réunion (La)" },
  { slug: "saint-barthelemy", label: "Saint Barthélemy", iso_a2: "BL", iso_a3: "BLM", numeric_code: 652, fr: "Saint-Barthélemy" },
  { slug: "saint-helena-ascension-and-tristan-da-cunha", label: "Saint Helena, Ascension and Tristan da Cunha", iso_a2: "SH", iso_a3: "SHN", numeric_code: 654, fr: "Sainte-Hélène, Ascension et Tristan da Cunha" },
  { slug: "saint-kitts-and-nevis", label: "Saint Kitts and Nevis", iso_a2: "KN", iso_a3: "KNA", numeric_code: 659, fr: "Saint-Kitts-et-Nevis" },
  { slug: "saint-lucia", label: "Saint Lucia", iso_a2: "LC", iso_a3: "LCA", numeric_code: 662, fr: "Sainte-Lucie" },
  { slug: "saint-martin-french", label: "Saint Martin (French part)", iso_a2: "MF", iso_a3: "MAF", numeric_code: 663, fr: "Saint-Martin (partie française)" },
  { slug: "saint-pierre-and-miquelon", label: "Saint Pierre and Miquelon", iso_a2: "PM", iso_a3: "SPM", numeric_code: 666, fr: "Saint-Pierre-et-Miquelon" },
  { slug: "saint-vincent-and-the-grenadines", label: "Saint Vincent and the Grenadines", iso_a2: "VC", iso_a3: "VCT", numeric_code: 670, fr: "Saint-Vincent-et-les Grenadines" },
  { slug: "samoa", label: "Samoa", iso_a2: "WS", iso_a3: "WSM", numeric_code: 882, fr: "Samoa (le)" },
  { slug: "san-marino", label: "San Marino", iso_a2: "SM", iso_a3: "SMR", numeric_code: 674, fr: "Saint-Marin" },
  { slug: "sao-tome-and-principe", label: "Sao Tome and Principe", iso_a2: "ST", iso_a3: "STP", numeric_code: 678, fr: "Sao Tomé-et-Principe" },
  { slug: "saudi-arabia", label: "Saudi Arabia", iso_a2: "SA", iso_a3: "SAU", numeric_code: 682, fr: "Arabie saoudite (l')" },
  { slug: "senegal", label: "Senegal", iso_a2: "SN", iso_a3: "SEN", numeric_code: 686, fr: "Sénégal (le)" },
  { slug: "serbia", label: "Serbia", iso_a2: "RS", iso_a3: "SRB", numeric_code: 688, fr: "Serbie (la)" },
  { slug: "seychelles", label: "Seychelles", iso_a2: "SC", iso_a3: "SYC", numeric_code: 690, fr: "Seychelles (les)" },
  { slug: "sierra-leone", label: "Sierra Leone", iso_a2: "SL", iso_a3: "SLE", numeric_code: 694, fr: "Sierra Leone (la)" },
  { slug: "singapore", label: "Singapore", iso_a2: "SG", iso_a3: "SGP", numeric_code: 702, fr: "Singapour" },
  { slug: "saint-martin-dutch", label: "Sint Maarten (Dutch part)", iso_a2: "SX", iso_a3: "SXM", numeric_code: 534, fr: "Saint-Martin (partie néerlandaise)" },
  { slug: "slovakia", label: "Slovakia", iso_a2: "SK", iso_a3: "SVK", numeric_code: 703, fr: "Slovaquie (la)" },
  { slug: "slovenia", label: "Slovenia", iso_a2: "SI", iso_a3: "SVN", numeric_code: 705, fr: "Slovénie (la)" },
  { slug: "solomon-islands", label: "Solomon Islands", iso_a2: "SB", iso_a3: "SLB", numeric_code: 90, fr: "Salomon (les Îles)" },
  { slug: "somalia", label: "Somalia", iso_a2: "SO", iso_a3: "SOM", numeric_code: 706, fr: "Somalie (la)" },
  { slug: "somaliland", label: "Republic of Somaliland", iso_a2: "-99", iso_a3: "-99", numeric_code: -99, fr: "Somaliland" },
  { slug: "south-africa", label: "South Africa", iso_a2: "ZA", iso_a3: "ZAF", numeric_code: 710, fr: "Afrique du Sud (l')" },
  { slug: "south-georgia", label: "South Georgia and the South Sandwich Islands", iso_a2: "GS", iso_a3: "SGS", numeric_code: 239, fr: "Géorgie du Sud-et-les Îles Sandwich du Sud (la)" },
  { slug: "south-sudan", label: "South Sudan", iso_a2: "SS", iso_a3: "SSD", numeric_code: 728, fr: "Soudan du Sud (le)" },
  { slug: "spain", label: "Spain", iso_a2: "ES", iso_a3: "ESP", numeric_code: 724, fr: "Espagne (l')" },
  { slug: "sri-lanka", label: "Sri Lanka", iso_a2: "LK", iso_a3: "LKA", numeric_code: 144, fr: "Sri Lanka" },
  { slug: "sudan", label: "Sudan (the)", iso_a2: "SD", iso_a3: "SDN", numeric_code: 729, fr: "Soudan (le)" },
  { slug: "suriname", label: "Suriname", iso_a2: "SR", iso_a3: "SUR", numeric_code: 740, fr: "Suriname (le)" },
  { slug: "svalbard-and-jan-mayen", label: "Svalbard and Jan Mayen", iso_a2: "SJ", iso_a3: "SJM", numeric_code: 744, fr: "Svalbard et l'Île Jan Mayen (le)" },
  { slug: "sweden", label: "Sweden", iso_a2: "SE", iso_a3: "SWE", numeric_code: 752, fr: "Suède (la)" },
  { slug: "switzerland", label: "Switzerland", iso_a2: "CH", iso_a3: "CHE", numeric_code: 756, fr: "Suisse (la)" },
  { slug: "syria", label: "Syrian Arab Republic (the)", iso_a2: "SY", iso_a3: "SYR", numeric_code: 760, fr: "République arabe syrienne (la)" },
  { slug: "taiwan", label: "Taiwan (Province of China)", iso_a2: "TW", iso_a3: "TWN", numeric_code: 158, fr: "Taïwan (Province de Chine)" },
  { slug: "tajikistan", label: "Tajikistan", iso_a2: "TJ", iso_a3: "TJK", numeric_code: 762, fr: "Tadjikistan (le)" },
  { slug: "tanzania", label: "Tanzania, the United Republic of", iso_a2: "TZ", iso_a3: "TZA", numeric_code: 834, fr: "Tanzanie (la République-Unie de)" },
  { slug: "thailand", label: "Thailand", iso_a2: "TH", iso_a3: "THA", numeric_code: 764, fr: "Thaïlande (la)" },
  { slug: "timor-leste", label: "Timor-Leste", iso_a2: "TL", iso_a3: "TLS", numeric_code: 626, fr: "Timor-Leste (le)" },
  { slug: "togo", label: "Togo", iso_a2: "TG", iso_a3: "TGO", numeric_code: 768, fr: "Togo (le)" },
  { slug: "tokelau", label: "Tokelau", iso_a2: "TK", iso_a3: "TKL", numeric_code: 772, fr: "Tokelau (les)" },
  { slug: "tonga", label: "Tonga", iso_a2: "TO", iso_a3: "TON", numeric_code: 776, fr: "Tonga (les)" },
  { slug: "trinidad-and-tobago", label: "Trinidad and Tobago", iso_a2: "TT", iso_a3: "TTO", numeric_code: 780, fr: "Trinité-et-Tobago (la)" },
  { slug: "tunisia", label: "Tunisia", iso_a2: "TN", iso_a3: "TUN", numeric_code: 788, fr: "Tunisie (la)" },
  { slug: "turkey", label: "Turkey", iso_a2: "TR", iso_a3: "TUR", numeric_code: 792, fr: "Turquie (la)" },
  { slug: "turkmenistan", label: "Turkmenistan", iso_a2: "TM", iso_a3: "TKM", numeric_code: 795, fr: "Turkménistan (le)" },
  { slug: "turks-and-caicos-islands", label: "Turks and Caicos Islands (the)", iso_a2: "TC", iso_a3: "TCA", numeric_code: 796, fr: "Turks-et-Caïcos (les Îles)" },
  { slug: "tuvalu", label: "Tuvalu", iso_a2: "TV", iso_a3: "TUV", numeric_code: 798, fr: "Tuvalu (les)" },
  { slug: "uganda", label: "Uganda", iso_a2: "UG", iso_a3: "UGA", numeric_code: 800, fr: "Ouganda (l')" },
  { slug: "ukraine", label: "Ukraine", iso_a2: "UA", iso_a3: "UKR", numeric_code: 804, fr: "Ukraine (l')" },
  { slug: "united-arab-emirates", label: "United Arab Emirates (the)", iso_a2: "AE", iso_a3: "ARE", numeric_code: 784, fr: "Émirats arabes unis (les)" },
  { slug: "united-kingdom", label: "United Kingdom of Great Britain and Northern Ireland (the)", iso_a2: "GB", iso_a3: "GBR", numeric_code: 826, fr: "Royaume-Uni de Grande-Bretagne et d'Irlande du Nord (le)" },
  { slug: "united-states-minor-outlying-islands", label: "United States Minor Outlying Islands (the)", iso_a2: "UM", iso_a3: "UMI", numeric_code: 581, fr: "Îles mineures éloignées des États-Unis (les)" },
  { slug: "united-states-of-america", label: "United States of America (the)", iso_a2: "US", iso_a3: "USA", numeric_code: 840, fr: "États-Unis d'Amérique (les)" },
  { slug: "uruguay", label: "Uruguay", iso_a2: "UY", iso_a3: "URY", numeric_code: 858, fr: "Uruguay (l')" },
  { slug: "uzbekistan", label: "Uzbekistan", iso_a2: "UZ", iso_a3: "UZB", numeric_code: 860, fr: "Ouzbékistan (l')" },
  { slug: "vanuatu", label: "Vanuatu", iso_a2: "VU", iso_a3: "VUT", numeric_code: 548, fr: "Vanuatu (le)" },
  { slug: "venezuela", label: "Venezuela (Bolivarian Republic of)", iso_a2: "VE", iso_a3: "VEN", numeric_code: 862, fr: "Venezuela (République bolivarienne du)" },
  { slug: "vietnam", label: "Viet Nam", iso_a2: "VN", iso_a3: "VNM", numeric_code: 704, fr: "Viet Nam (le)" },
  { slug: "virgin-islands-uk", label: "Virgin Islands (British)", iso_a2: "VG", iso_a3: "VGB", numeric_code: 92, fr: "Vierges britanniques (les Îles)" },
  { slug: "virgin-islands-us", label: "Virgin Islands (U.S.)", iso_a2: "VI", iso_a3: "VIR", numeric_code: 850, fr: "Vierges des États-Unis (les Îles)" },
  { slug: "wallis-and-futuna", label: "Wallis and Futuna", iso_a2: "WF", iso_a3: "WLF", numeric_code: 876, fr: "Wallis-et-Futuna" },
  { slug: "western-sahara", label: "Western Sahara*", iso_a2: "EH", iso_a3: "ESH", numeric_code: 732, fr: "Sahara occidental (le)*" },
  { slug: "yemen", label: "Yemen", iso_a2: "YE", iso_a3: "YEM", numeric_code: 887, fr: "Yémen (le)" },
  { slug: "zambia", label: "Zambia", iso_a2: "ZM", iso_a3: "ZMB", numeric_code: 894, fr: "Zambie (la)" },
  { slug: "zimbabwe", label: "Zimbabwe", iso_a2: "ZW", iso_a3: "ZWE", numeric_code: 716, fr: "Zimbabwe (le)" },
  { slug: "aland-islands", label: "Åland Islands", iso_a2: "AX", iso_a3: "ALA", numeric_code: 248, fr: "Åland(les Îles)" },
]

/////////////////////
// TOOLS FUNCTIONS //
/////////////////////

/**
 * @dev Simplify ISO3166TERRITORIES array by returning only slug and label
 */
export function IsoTerritoriesToSlugAndLabel(): { slug: string, label: string }[] {
  return ISO3166TERRITORIES.map(t => {
    return {
      slug: t.slug,
      label: t.label,
      iso_a3: t.iso_a3
    }
  });
}

/**
 * @param code
 * @param system
 */
export function getTerritoryFromGeoJson(
  code: string,
  system: 'iso_a3' | 'iso_a3' = 'iso_a3'): { slug: TerritoriesSlug, label: TerritoriesLabel } {
  const territory = ISO3166TERRITORIES.find(i => i[system] === code.toUpperCase());
  if (!territory) {
    throw new Error(`Failed to retreive: ${code}.`);
  }
  return territory;
}

/**
 * @param code
 * @param system
 */
export function getTerritorySlugFromGeoJson(code: string, system: 'iso_a3' | 'iso_a3' = 'iso_a3'): TerritoriesSlug {
  const territory = getTerritoryFromGeoJson(code, system);
  if (!territory) {
    throw new Error(`Failed to territory: ${code}.`);
  }
  return territory.slug;
}

/**
 * @param code
 * @param system
 */
export function getTerritoryLabelFromGeoJson(code: string, system: 'iso_a3' | 'iso_a3' = 'iso_a3'): TerritoriesLabel {
  const territory = getTerritoryFromGeoJson(code, system);
  if (!territory) {
    throw new Error(`Failed to territory: ${code}.`);
  }
  return territory.label;
}

/**
 * @param slug
 */
export function getISO3166TerritoryFromSlug(slug: TerritoriesSlug): EnhancedISO3166Territory {
  const territory = ISO3166TERRITORIES.find(i => i.slug.toLowerCase() === slug.toLowerCase());
  if (!territory) {
    throw new Error(`Failed to territory: ${slug}.`);
  }
  return territory;
}
