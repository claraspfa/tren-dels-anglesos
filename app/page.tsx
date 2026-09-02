"use client";
/* eslint-disable @next/next/no-img-element -- Local heritage assets and Leaflet marker HTML require native image elements. */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { pointGuides, welcomeGuides } from "./guide-copy";
import type { GuideKey } from "./guide-copy";

type Lang = "va" | "es" | "en";
type Group = "station" | "hut" | "tunnel" | "bridge" | "depot" | "dock";
type ViewMode = "map" | "list";
type RouteStart = "alcoi" | "port";
type StatusFilter = "all" | "existing" | "lost";
type Point = { id: string; lat: number; lon: number; name: string; group: Group; lost?: boolean; image?: string };
type LegendFilter = `${Group}-${Exclude<StatusFilter, "all">}`;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;
const wikilocRouteUrl = "https://ca.wikiloc.com/rutes-senderisme/el-tren-dels-anglesos-itinerari-de-la-linia-alcoi-gandia-283561629";

const POIS: Point[] = [
  { id: "port-gandia", lat: 38.99224, lon: -0.15932, name: "Estació del Port de Gandia", group: "station", image: "/photos/inventory/port-gandia.jpg" },
  { id: "estacio-gandia", lat: 38.97008, lon: -0.17893, name: "Estació de Gandia", group: "station", image: "/photos/inventory/estacio-gandia.jpg" },
  { id: "almoines", lat: 38.94253, lon: -0.17883, name: "Baixador d'Almoines", group: "station", image: "/photos/inventory/almoines.jpg" },
  { id: "beniarjo", lat: 38.93239, lon: -0.18481, name: "Baixador de Beniarjó", group: "station", image: "/photos/inventory/beniarjo.jpg" },
  { id: "potries-estacio", lat: 38.9158, lon: -0.1971, name: "Estació de Potries", group: "station", lost: true, image: "/photos/inventory/potries-estacio.jpg" },
  { id: "vilallonga", lat: 38.88795, lon: -0.21176, name: "Estació de Vilallonga", group: "station", lost: true, image: "/photos/inventory/vilallonga.jpg" },
  { id: "orxa", lat: 38.85027, lon: -0.32435, name: "Estació de l'Orxa", group: "station", image: "/photos/inventory/orxa.jpg" },
  { id: "gaianes", lat: 38.81101, lon: -0.41055, name: "Baixador de Gaianes", group: "station", lost: true },
  { id: "muro-estacio", lat: 38.77843, lon: -0.44067, name: "Estació de Muro d'Alcoi", group: "station", image: "/photos/inventory/muro-estacio.jpg" },
  { id: "cocentaina", lat: 38.75072, lon: -0.43864, name: "Estació de Cocentaina", group: "station", lost: true, image: "/photos/inventory/cocentaina.jpg" },
  { id: "beniarres-estacio", lat: 38.819, lon: -0.38308, name: "Estació de Beniarrés", group: "station", lost: true, image: "/photos/inventory/beniarres-estacio.jpg" },
  { id: "alcoi", lat: 38.70638, lon: -0.47178, name: "Estació d'Alcoi", group: "station", lost: true, image: "/photos/inventory/alcoi.jpg" },
  { id: "pont-ferro", lat: 38.95802, lon: -0.18205, name: "Pont de ferro", group: "bridge" },
  { id: "pont-tarraso", lat: 38.88228, lon: -0.24475, name: "Pont del Tarrasó", group: "bridge", image: "/photos/inventory/pont-tarraso.jpg" },
  { id: "pont-garrofera", lat: 38.87341, lon: -0.28219, name: "Pont de la Garrofera", group: "bridge", image: "/photos/inventory/pont-garrofera.jpg" },
  { id: "pont-beniarres", lat: 38.81882, lon: -0.38739, name: "Pont de Beniarrés", group: "bridge", lost: true },
  { id: "gran-pont-muro", lat: 38.78662, lon: -0.44102, name: "Gran pont de Muro", group: "bridge", lost: true },
  { id: "tunel-1", lat: 38.72583, lon: -0.44489, name: "Túnel nº 1", group: "tunnel" },
  { id: "tunel-2", lat: 38.818, lon: -0.37596, name: "Túnel nº 2", group: "tunnel", image: "/photos/inventory/tunel-2.jpg" },
  { id: "tunel-3", lat: 38.84418, lon: -0.333996, name: "Túnel nº 3", group: "tunnel", lost: true },
  { id: "tunel-4", lat: 38.85941, lon: -0.3011, name: "Túnel nº 4", group: "tunnel", image: "/photos/inventory/tunel-4.jpg" },
  { id: "tunel-5", lat: 38.87353, lon: -0.27817, name: "Túnel nº 5", group: "tunnel", image: "/photos/inventory/tunel-5.jpg" },
  { id: "tunel-6", lat: 38.87603, lon: -0.27049, name: "Túnel nº 6", group: "tunnel", image: "/photos/inventory/tunel-6.jpg" },
  { id: "tunel-7", lat: 38.88005, lon: -0.26267, name: "Túnel nº 7", group: "tunnel", image: "/photos/inventory/tunel-7.jpg" },
  { id: "tunel-8", lat: 38.87806, lon: -0.25833, name: "Túnel nº 8", group: "tunnel", image: "/photos/inventory/tunel-8.jpg" },
  { id: "caseta-nord-gandia", lat: 38.97718, lon: -0.17501, name: "Casella del Nord de Gandia", group: "hut", lost: true },
  { id: "caseta-sud-gandia", lat: 38.95875, lon: -0.18265, name: "Casella del Sud de Gandia", group: "hut", lost: true },
  { id: "caseta-potries", lat: 38.91986, lon: -0.1919, name: "Casella de Potries", group: "hut", image: "/photos/inventory/caseta-potries.jpg" },
  { id: "caseta-vilallonga", lat: 38.89635, lon: -0.20724, name: "Casella de Vilallonga", group: "hut", lost: true },
  { id: "caseta-tarraso", lat: 38.88292, lon: -0.23853, name: "Casella del Tarrasó", group: "hut", image: "/photos/inventory/caseta-tarraso.jpg" },
  { id: "caseta-raco-duc", lat: 38.880826, lon: -0.265315, name: "Casella del Racó del Duc", group: "hut", image: "/photos/inventory/caseta-raco-duc.jpg" },
  { id: "caseta-garrofera", lat: 38.874212, lon: -0.280277, name: "Casella de la Garrofera", group: "hut", image: "/photos/inventory/caseta-garrofera.jpg" },
  { id: "caseta-desfiladero", lat: 38.869812, lon: -0.290954, name: "Casella del Desfiladero", group: "hut", image: "/photos/inventory/caseta-desfiladero.jpg" },
  { id: "caseta-parres", lat: 38.863817, lon: -0.2966, name: "Casella de les Parres", group: "hut", image: "/photos/inventory/caseta-parres.jpg" },
  { id: "caseta-deveses", lat: 38.852273, lon: -0.315502, name: "Casella de les Deveses", group: "hut", image: "/photos/inventory/caseta-deveses.jpg" },
  { id: "caseta-orxa", lat: 38.84201, lon: -0.33508, name: "Casella de l'Orxa", group: "hut", lost: true },
  { id: "caseta-beniarres", lat: 38.81813, lon: -0.39177, name: "Casella de Beniarrés", group: "hut", image: "/photos/inventory/caseta-beniarres.jpg" },
  { id: "caseta-gaianes", lat: 38.81213, lon: -0.40651, name: "Casella de Gaianes", group: "hut", image: "/photos/inventory/caseta-gaianes.jpg" },
  { id: "caseta-muro", lat: 38.78163, lon: -0.44158, name: "Casella de Muro d'Alcoi", group: "hut", lost: true },
  { id: "caseta-cocentaina", lat: 38.75614, lon: -0.43642, name: "Casella de Cocentaina", group: "hut", lost: true },
  { id: "caseta-sud-cocentaina", lat: 38.72834, lon: -0.44119, name: "Casella del Sud de Cocentaina", group: "hut", lost: true },
  { id: "caseta-tunel-alcoi", lat: 38.72549, lon: -0.44486, name: "Casella del Túnel d'Alcoi", group: "hut", lost: true },
  { id: "caseta-algars", lat: 38.71865, lon: -0.45585, name: "Casella d'Algars", group: "hut", lost: true },
  { id: "diposit-aigua-gandia", lat: 38.97044, lon: -0.17833, name: "Dipòsit d'aigua de Gandia", group: "depot", image: "/photos/inventory/diposit-aigua-gandia.jpg" },
  { id: "diposit-locomotores-gandia", lat: 38.97044, lon: -0.17833, name: "Dipòsit de locomotores de Gandia", group: "depot", lost: true, image: "/photos/inventory/diposit-locomotores-gandia.jpg" },
  { id: "diposit-aigua-raco-duc", lat: 38.86935, lon: -0.28976, name: "Dipòsit d'aigua del Racó del Duc", group: "depot", image: "/photos/inventory/diposit-aigua-raco-duc.jpg" },
  { id: "moll-muro", lat: 38.77806, lon: -0.4404, name: "Moll de Muro d'Alcoi", group: "dock", image: "/photos/inventory/moll-muro.jpg" },
];

const municipalityByPoint: Record<string, string> = {
  "port-gandia": "Gandia",
  "estacio-gandia": "Gandia",
  almoines: "Almoines",
  beniarjo: "Beniarjó",
  "potries-estacio": "Potries",
  vilallonga: "Vilallonga",
  orxa: "l'Orxa",
  gaianes: "Gaianes",
  "muro-estacio": "Muro d'Alcoi",
  cocentaina: "Cocentaina",
  "beniarres-estacio": "Beniarrés",
  alcoi: "Alcoi",
  "pont-ferro": "Gandia",
  "pont-tarraso": "Vilallonga",
  "pont-garrofera": "l'Orxa",
  "pont-beniarres": "Beniarrés",
  "gran-pont-muro": "Muro d'Alcoi",
  "tunel-1": "Cocentaina",
  "tunel-2": "Beniarrés",
  "tunel-3": "l'Orxa",
  "tunel-4": "l'Orxa",
  "tunel-5": "l'Orxa",
  "tunel-6": "l'Orxa",
  "tunel-7": "Vilallonga",
  "tunel-8": "Vilallonga",
  "caseta-nord-gandia": "Gandia",
  "caseta-sud-gandia": "Gandia",
  "caseta-potries": "Potries",
  "caseta-vilallonga": "Vilallonga",
  "caseta-tarraso": "Vilallonga",
  "caseta-raco-duc": "Vilallonga",
  "caseta-garrofera": "l'Orxa",
  "caseta-desfiladero": "l'Orxa",
  "caseta-parres": "l'Orxa",
  "caseta-deveses": "l'Orxa",
  "caseta-orxa": "l'Orxa",
  "caseta-beniarres": "Beniarrés",
  "caseta-gaianes": "Gaianes",
  "caseta-muro": "Muro d'Alcoi",
  "caseta-cocentaina": "Cocentaina",
  "caseta-sud-cocentaina": "Cocentaina",
  "caseta-tunel-alcoi": "Cocentaina",
  "caseta-algars": "Alcoi",
  "diposit-aigua-gandia": "Gandia",
  "diposit-locomotores-gandia": "Gandia",
  "diposit-aigua-raco-duc": "l'Orxa",
  "moll-muro": "Muro d'Alcoi",
};

const GROUPS: Group[] = ["station", "tunnel", "bridge", "hut", "depot", "dock"];
const ICONS: Record<Group, string> = { station: assetPath("/icons/station.png"), tunnel: assetPath("/icons/tunnel.png"), bridge: assetPath("/icons/bridge.png"), hut: assetPath("/icons/hut.png"), depot: assetPath("/icons/depot.png"), dock: assetPath("/icons/bridge.png") };
const ROUTE_POSITION: Record<string, number> = {
  alcoi: 0,
  "caseta-algars": 19,
  "caseta-tunel-alcoi": 26,
  "tunel-1": 26,
  "caseta-sud-cocentaina": 30,
  cocentaina: 46,
  "caseta-cocentaina": 50,
  "moll-muro": 67,
  "muro-estacio": 67,
  "caseta-muro": 70,
  "gran-pont-muro": 81,
  gaianes: 125,
  "caseta-gaianes": 128,
  "pont-beniarres": 140,
  "caseta-beniarres": 142,
  "beniarres-estacio": 147,
  "tunel-2": 152,
  "caseta-orxa": 188,
  "tunel-3": 191,
  orxa: 203,
  "caseta-deveses": 213,
  "tunel-4": 226,
  "caseta-parres": 231,
  "caseta-desfiladero": 237,
  "diposit-aigua-raco-duc": 238,
  "pont-garrofera": 248,
  "caseta-garrofera": 250,
  "tunel-5": 252,
  "tunel-6": 259,
  "caseta-raco-duc": 266,
  "tunel-7": 268,
  "tunel-8": 272,
  "pont-tarraso": 291,
  "caseta-tarraso": 306,
  vilallonga: 332,
  "caseta-vilallonga": 340,
  "potries-estacio": 360,
  "caseta-potries": 365,
  beniarjo: 375,
  almoines: 385,
  "pont-ferro": 405,
  "caseta-sud-gandia": 406,
  "estacio-gandia": 419,
  "diposit-aigua-gandia": 420,
  "diposit-locomotores-gandia": 420,
  "caseta-nord-gandia": 426,
  "port-gandia": 437,
};

const copy = {
  va: {
    title: "El tren dels Anglesos", subtitle: "Un viatge pel traçat de l'antiga línia d'Alcoi a Gandia", route: "Ruta patrimonial", language: "Idioma",
    welcomeTitle: "Comença el viatge", welcomeText: "Coneix la història del ferrocarril abans d'explorar les seues parades.", explore: "Explora la ruta", exploreText: "Acosta't al mapa o consulta tots els punts en forma de llista.",
    map: "Mapa", list: "Llista", legend: "Llegenda", closeLegend: "Tancar llegenda", all: "Mostrar-ho tot", existing: "Conservats", lost: "Desapareguts", results: "punts visibles", empty: "No hi ha punts que coincidisquen amb aquesta selecció.", reset: "Mostrar tots els punts", close: "Tancar", startFrom: "Punt de partida", alcoiStart: "Alcoi", portStart: "Port de Gandia",
    mapCaption: "De la muntanya al port de Gandia", mapHint: "Amplia el mapa o toca un grup per descobrir les parades.", back: "Tornar a la ruta", listen: "Escoltar l'audioguia", audioSoon: "Àudio disponible pròximament", heritage: "Patrimoni ferroviari", viewPoint: "Veure punt", wikilocEyebrow: "Ruta GPS", wikilocTitle: "Vols seguir la ruta amb Wikiloc?", wikilocText: "Obri l’itinerari complet al teu mòbil i segueix el traçat de l’antiga línia Alcoi–Gandia.", wikilocAction: "Obrir la ruta en Wikiloc", surveyEyebrow: "La teua opinió", surveyTitle: "Ajuda'ns a millorar l'experiència", surveyText: "Respon esta breu enquesta i comparteix amb nosaltres la teua opinió sobre el projecte.", surveyAction: "Respondre l'enquesta",
    introTitle: "Benvinguts al Tren dels Anglesos", introLead: "Una via que va unir durant més de setanta-cinc anys les comarques de l'interior amb la costa.", historyTitle: "Una línia nascuda en 1893", historyText: "L'Alcoy and Harbour Company Limited va construir la línia per transportar mercaderies fins al port de Gandia. Amb el temps, el tren es convertí també en una connexió imprescindible per a milers de viatgers.", landscapeTitle: "El paisatge del Serpis", landscapeText: "El recorregut travessa l'Alcoià, el Comtat i la Safor entre muntanyes, barrancs i vegetació de ribera. Túnels, ponts, estacions i casetes encara expliquen el passat ferroviari del territori.", legacyTitle: "Un patrimoni per descobrir", legacyText: "El tren va fer el seu últim viatge el 15 d'abril de 1969. Hui, l'antic traçat és una manera de recórrer el paisatge i entendre les poblacions que van créixer al voltant del ferrocarril.", stationInfoTitle: "Les estacions i baixadors del Tren dels Anglesos", stationInfoText: [
      "Les estacions eren un dels principals punts de trobada entre el ferrocarril i les poblacions que travessava. Al seu interior habitualment podíem trobar les taquilles, sales d’espera i les dependències des d’on el personal ferroviari organitzava el servei i regulava la circulació de trens.",
      "A la línia Alcoi-Gandia les parades es dividien segons la seua importància en estacions de primera o tercera classe i baixadors. Aquesta categoria determinava la grandària de l’edifici i els serveis de què disposava, com per exemple cantines, banys, i també la quantitat d’instal·lacions auxiliars com magatzems, dipòsits o molls de mercaderies, entre moltes altres. Tot i la diferència de classes, les estacions del tren compartien totes una mateixa imatge arquitectònica, el que feia que foren fàcil de reconèixer.",
      "Les estacions d’aquesta línia eren edificis senzills, generalment d’una sola planta, de forma rectangular i amb cobertes de teula a dos aigües. A les façanes destaca l’arc de mig punt central i les finestres laterals que es remarquen amb l’ús de rajola vista, al igual que en els cantons. Al centre solia aparèixer també un frontó triangular amb un element imprescindible per als viatgers: el cartell amb el nom de l’estació. Els baixadors, destinats a parades de menor importància o afluència, eren encara més modestos. Tenien menys dependències, una decoració pràcticament inexistent i únicament els espais necessaris per donar servei als passatgers.",
      "La repetició d’un mateix model permetia a la companyia construir de manera més ràpida i econòmica i, al mateix temps, donar una imatge comuna a tota la línia. Per això, encara hui, quan trobem una d’aquestes construccions podem reconèixer en la seua arquitectura una part de la identitat del tren dels anglesos.",
    ],
  },
  es: {
    title: "El tren de los Ingleses", subtitle: "Un viaje por el trazado de la antigua línea de Alcoy a Gandía", route: "Ruta patrimonial", language: "Idioma",
    welcomeTitle: "Empieza el viaje", welcomeText: "Conoce la historia del ferrocarril antes de explorar sus paradas.", explore: "Explora la ruta", exploreText: "Acércate al mapa o consulta todos los puntos en forma de lista.",
    map: "Mapa", list: "Lista", legend: "Leyenda", closeLegend: "Cerrar leyenda", all: "Mostrar todo", existing: "Conservados", lost: "Desaparecidos", results: "puntos visibles", empty: "No hay puntos que coincidan con esta selección.", reset: "Mostrar todos los puntos", close: "Cerrar", startFrom: "Punto de partida", alcoiStart: "Alcoy", portStart: "Puerto de Gandía",
    mapCaption: "De la montaña al puerto de Gandía", mapHint: "Amplía el mapa o toca un grupo para descubrir las paradas.", back: "Volver a la ruta", listen: "Escuchar la audioguía", audioSoon: "Audio disponible próximamente", heritage: "Patrimonio ferroviario", viewPoint: "Ver punto", wikilocEyebrow: "Ruta GPS", wikilocTitle: "¿Quieres seguir la ruta con Wikiloc?", wikilocText: "Abre el itinerario completo en tu móvil y sigue el trazado de la antigua línea Alcoy–Gandía.", wikilocAction: "Abrir la ruta en Wikiloc", surveyEyebrow: "Tu opinión", surveyTitle: "Ayúdanos a mejorar la experiencia", surveyText: "Responde esta breve encuesta y comparte con nosotros tu opinión sobre el proyecto.", surveyAction: "Responder la encuesta",
    introTitle: "Bienvenidos al Tren de los Ingleses", introLead: "Una vía que unió durante más de setenta y cinco años las comarcas del interior con la costa.", historyTitle: "Una línea nacida en 1893", historyText: "The Alcoy and Harbour Company Limited construyó la línea para transportar mercancías hasta el puerto de Gandía. Con el tiempo, el tren se convirtió también en una conexión imprescindible para miles de viajeros.", landscapeTitle: "El paisaje del Serpis", landscapeText: "El recorrido atraviesa l'Alcoià, el Comtat y la Safor entre montañas, barrancos y vegetación de ribera. Túneles, puentes, estaciones y casetas todavía explican el pasado ferroviario del territorio.", legacyTitle: "Un patrimonio por descubrir", legacyText: "El tren hizo su último viaje el 15 de abril de 1969. Hoy, el antiguo trazado permite recorrer el paisaje y comprender las poblaciones que crecieron alrededor del ferrocarril.", stationInfoTitle: "Las estaciones y apeaderos del Tren de los Ingleses", stationInfoText: [
      "Las estaciones eran uno de los principales puntos de encuentro entre el ferrocarril y las poblaciones que atravesaba. En su interior se encontraban habitualmente las taquillas, las salas de espera y las dependencias desde las que el personal ferroviario organizaba el servicio y regulaba la circulación de trenes.",
      "En la línea Alcoy-Gandía las paradas se dividían, según su importancia, en estaciones de primera o tercera clase y apeaderos. Esta categoría determinaba el tamaño del edificio y los servicios de los que disponía, como cantinas, baños y también la cantidad de instalaciones auxiliares, como almacenes, depósitos o muelles de mercancías, entre muchas otras. A pesar de la diferencia de clases, todas las estaciones del tren compartían una misma imagen arquitectónica, lo que hacía que fueran fáciles de reconocer.",
      "Las estaciones de esta línea eran edificios sencillos, generalmente de una sola planta, de forma rectangular y con cubiertas de teja a dos aguas. En las fachadas destacaban el arco de medio punto central y las ventanas laterales, remarcados con ladrillo visto, al igual que las esquinas. En el centro solía aparecer también un frontón triangular con un elemento imprescindible para los viajeros: el cartel con el nombre de la estación. Los apeaderos, destinados a paradas de menor importancia o afluencia, eran todavía más modestos. Tenían menos dependencias, una decoración prácticamente inexistente y únicamente los espacios necesarios para atender a los pasajeros.",
      "La repetición de un mismo modelo permitía a la compañía construir de forma más rápida y económica y, al mismo tiempo, dar una imagen común a toda la línea. Por eso, todavía hoy, cuando encontramos una de estas construcciones podemos reconocer en su arquitectura una parte de la identidad del Tren de los Ingleses.",
    ],
  },
  en: {
    title: "The Englishmen's Train", subtitle: "A journey along the former railway line from Alcoy to Gandia", route: "Heritage route", language: "Language",
    welcomeTitle: "Start the journey", welcomeText: "Discover the railway's story before exploring its stops.", explore: "Explore the route", exploreText: "Zoom into the map or browse every place as a list.",
    map: "Map", list: "List", legend: "Legend", closeLegend: "Close legend", all: "Show all", existing: "Surviving", lost: "Lost", results: "visible places", empty: "No places match this selection.", reset: "Show all places", close: "Close", startFrom: "Starting point", alcoiStart: "Alcoy", portStart: "Gandia Port",
    mapCaption: "From the mountains to Gandia port", mapHint: "Zoom into the map or tap a cluster to discover the stops.", back: "Back to the route", listen: "Listen to the audio guide", audioSoon: "Audio coming soon", heritage: "Railway heritage", viewPoint: "View place", wikilocEyebrow: "GPS route", wikilocTitle: "Would you like to follow the route with Wikiloc?", wikilocText: "Open the complete itinerary on your phone and follow the former Alcoy–Gandia railway line.", wikilocAction: "Open the route in Wikiloc", surveyEyebrow: "Your opinion", surveyTitle: "Help us improve the experience", surveyText: "Take this short survey and share your thoughts about the project with us.", surveyAction: "Take the survey",
    introTitle: "Welcome to the Englishmen's Train", introLead: "A railway that linked the inland counties with the coast for more than seventy-five years.", historyTitle: "A line built in 1893", historyText: "The Alcoy and Harbour Company Limited built the line to carry goods to Gandia port. It later became an essential connection for thousands of passengers.", landscapeTitle: "The Serpis landscape", landscapeText: "The route crosses l'Alcoià, el Comtat and la Safor through mountains, ravines and riverside vegetation. Tunnels, bridges, stations and railway huts still tell the story of the line.", legacyTitle: "Heritage waiting to be explored", legacyText: "The train made its final journey on 15 April 1969. Today, the former track offers a way to explore the landscape and understand the towns that grew around the railway.", stationInfoTitle: "Stations and halts on the Englishmen's Train", stationInfoText: [
      "Stations were among the main meeting points between the railway and the towns it crossed. Inside were usually ticket offices, waiting rooms and the offices from which railway staff organised services and regulated train movements.",
      "On the Alcoy–Gandia line, stops were divided according to their importance into first- or third-class stations and halts. This category determined the size of the building and the services it offered, such as refreshment rooms and toilets, as well as the number of auxiliary facilities, including warehouses, depots and goods platforms. Despite their different classes, all the railway's stations shared the same architectural appearance, making them easy to recognise.",
      "The stations on this line were simple buildings, generally single-storey, rectangular in plan and covered by pitched tiled roofs. Their façades featured a central round arch and side windows highlighted with exposed brickwork, as were the corners. A triangular pediment usually appeared in the centre with an essential feature for travellers: the sign bearing the station's name. Halts, intended for stops of lesser importance or with fewer passengers, were even more modest. They had fewer rooms, almost no decoration and only the spaces needed to serve passengers.",
      "Repeating the same model allowed the company to build more quickly and economically while giving the entire line a shared identity. That is why, even today, when we encounter one of these buildings, its architecture still reveals part of the identity of the Englishmen's Train.",
    ],
  },
};

const groupLabels: Record<Lang, Record<Group, string>> = {
  va: { station: "Estacions i baixadors", tunnel: "Túnels", bridge: "Ponts", hut: "Caselles", depot: "Dipòsits", dock: "Molls" },
  es: { station: "Estaciones y apeaderos", tunnel: "Túneles", bridge: "Puentes", hut: "Casetas", depot: "Depósitos", dock: "Muelles" },
  en: { station: "Stations and halts", tunnel: "Tunnels", bridge: "Bridges", hut: "Railway huts", depot: "Depots", dock: "Loading docks" },
};

const otherGroupLabels: Record<Lang, Record<Group, string>> = {
  va: { station: "Altres estacions i baixadors", tunnel: "Altres túnels", bridge: "Altres ponts", hut: "Altres caselles", depot: "Altres dipòsits", dock: "Altres molls" },
  es: { station: "Otras estaciones y apeaderos", tunnel: "Otros túneles", bridge: "Otros puentes", hut: "Otras casetas", depot: "Otros depósitos", dock: "Otros muelles" },
  en: { station: "Other stations and halts", tunnel: "Other tunnels", bridge: "Other bridges", hut: "Other railway huts", depot: "Other depots", dock: "Other loading docks" },
};

const lostGroupLabels: Record<Lang, Record<Group, string>> = {
  va: { station: "Estacions i baixadors desapareguts", tunnel: "Túnels desapareguts", bridge: "Ponts desapareguts", hut: "Caselles desaparegudes", depot: "Dipòsits desapareguts", dock: "Molls desapareguts" },
  es: { station: "Estaciones y apeaderos desaparecidos", tunnel: "Túneles desaparecidos", bridge: "Puentes desaparecidos", hut: "Casetas desaparecidas", depot: "Depósitos desaparecidos", dock: "Muelles desaparecidos" },
  en: { station: "Lost stations and halts", tunnel: "Lost tunnels", bridge: "Lost bridges", hut: "Lost railway huts", depot: "Lost depots", dock: "Lost loading docks" },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("va");
  const [selected, setSelected] = useState<Point | null>(null);
  const [welcome, setWelcome] = useState(false);
  const [view, setView] = useState<ViewMode>("map");
  const [routeStart, setRouteStart] = useState<RouteStart>("alcoi");
  const [filters, setFilters] = useState<LegendFilter[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const t = copy[lang];
  const filteredPoints = useMemo(() => POIS.filter((point) => filters.length === 0 || filters.includes(`${point.group}-${point.lost ? "lost" : "existing"}`)), [filters]);

  useEffect(() => { document.documentElement.lang = lang === "va" ? "ca-valencia" : lang; }, [lang]);

  const syncModalFromUrl = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const pointId = params.get("punt");
    const point = pointId ? POIS.find((candidate) => candidate.id === pointId) ?? null : null;
    if (point) {
      setSelected(point);
      setWelcome(false);
      return;
    }
    setSelected(null);
    setWelcome(params.get("guia") === "benvinguda");
  }, []);

  useEffect(() => {
    const initialSync = window.requestAnimationFrame(syncModalFromUrl);
    window.addEventListener("popstate", syncModalFromUrl);
    return () => {
      window.cancelAnimationFrame(initialSync);
      window.removeEventListener("popstate", syncModalFromUrl);
    };
  }, [syncModalFromUrl]);

  const openModalUrl = useCallback((kind: "welcome" | "point", point?: Point) => {
    const url = new URL(window.location.href);
    const alreadyInModal = url.searchParams.has("punt") || url.searchParams.get("guia") === "benvinguda";
    url.searchParams.delete("punt");
    url.searchParams.delete("guia");
    if (kind === "welcome") url.searchParams.set("guia", "benvinguda");
    if (kind === "point" && point) url.searchParams.set("punt", point.id);
    if (alreadyInModal) {
      window.history.replaceState(window.history.state, "", url);
    } else {
      const currentState = typeof window.history.state === "object" && window.history.state !== null ? window.history.state : {};
      window.history.pushState({ ...currentState, routeModal: true }, "", url);
    }
  }, []);

  const openWelcome = useCallback(() => {
    openModalUrl("welcome");
    setSelected(null);
    setWelcome(true);
  }, [openModalUrl]);

  const openPoint = useCallback((point: Point) => {
    openModalUrl("point", point);
    setWelcome(false);
    setSelected(point);
  }, [openModalUrl]);

  const closeModal = useCallback(() => {
    const state = window.history.state as { routeModal?: boolean } | null;
    if (state?.routeModal) {
      window.history.back();
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.delete("punt");
    url.searchParams.delete("guia");
    window.history.replaceState(window.history.state, "", url);
    setSelected(null);
    setWelcome(false);
  }, []);

  return <><main className="route-page">
    <header className="route-header"><div className="brand"><span className="eyebrow">{t.route}</span><h1>{t.title}</h1><p>{t.subtitle}</p></div><Language lang={lang} setLang={setLang} label={t.language} /></header>
    <button className="welcome-card" onClick={openWelcome}><span className="welcome-symbol"><img src={assetPath("/icons/welcome-hand.png")} alt="" /></span><span className="welcome-copy"><strong>{t.welcomeTitle}</strong><small>{t.welcomeText}</small></span><span className="welcome-arrow" aria-hidden="true">→</span></button>
    <section className="explorer" aria-labelledby="explorer-title">
      <div className="explorer-heading"><div><span className="eyebrow">{POIS.length} {t.results}</span><h2 id="explorer-title">{t.explore}</h2><p>{t.exploreText}</p></div><div className="explorer-actions"><div className="view-switch" aria-label={t.explore}><button aria-pressed={view === "map"} onClick={() => setView("map")}><span className="map-pin-icon" aria-hidden="true" />{t.map}</button><button aria-pressed={view === "list"} onClick={() => setView("list")}><span aria-hidden="true">☷</span>{t.list}</button></div><div className="legend-control"><button className="legend-trigger" aria-expanded={filtersOpen} onClick={() => setFiltersOpen((current) => !current)}>{t.legend}<span className="legend-toggle-icon" aria-hidden="true"><i /><i /></span></button><LegendPanel lang={lang} filters={filters} setFilters={setFilters} open={filtersOpen} onClose={() => setFiltersOpen(false)} /></div></div></div>
      <div className="explorer-layout"><div className="explorer-content">{view === "map" ? <MapView points={filteredPoints} onSelect={openPoint} lang={lang} onReset={() => setFilters([])} /> : <ListView points={filteredPoints} lang={lang} onSelect={openPoint} onReset={() => setFilters([])} routeStart={routeStart} setRouteStart={setRouteStart} />}</div></div>
      <aside className="wikiloc-card" aria-labelledby="wikiloc-title"><span className="wikiloc-marker" aria-hidden="true"><i /></span><div><span className="eyebrow">{t.wikilocEyebrow}</span><h2 id="wikiloc-title">{t.wikilocTitle}</h2><p>{t.wikilocText}</p></div><a href={wikilocRouteUrl} target="_blank" rel="noopener noreferrer">{t.wikilocAction}<span aria-hidden="true">↗</span></a></aside>
      <section className="survey-card" aria-labelledby="survey-title"><div><span className="eyebrow">{t.surveyEyebrow}</span><h2 id="survey-title">{t.surveyTitle}</h2><p>{t.surveyText}</p></div><a href="https://docs.google.com/forms/d/e/1FAIpQLSfh2ueL8W7ycmJGZBmw7l3XSsPRGkOMKTm5cN8n_Ot_WuGilg/viewform?usp=header" target="_blank" rel="noreferrer">{t.surveyAction}<span aria-hidden="true">↗</span></a></section>
    </section>
  </main>
  {welcome && <ModalShell label={t.introTitle} onClose={closeModal}><WelcomeDetail lang={lang} onBack={closeModal} onLanguage={setLang} /></ModalShell>}
  {selected && <ModalShell label={selected.name} onClose={closeModal}><PointDetail point={selected} lang={lang} onBack={closeModal} onLanguage={setLang} onSelect={openPoint} /></ModalShell>}
  </>;
}

function Language({ lang, setLang, label }: { lang: Lang; setLang: (lang: Lang) => void; label: string }) {
  const [open, setOpen] = useState(false);
  const control = useRef<HTMLDivElement>(null);
  const labels: Record<Lang, string> = { va: "Valencià", es: "Español", en: "English" };

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => { if (!control.current?.contains(event.target as Node)) setOpen(false); };
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => { document.removeEventListener("pointerdown", handlePointerDown); window.removeEventListener("keydown", handleKeyDown); };
  }, [open]);

  return <div className="language-control" ref={control}><button className="language-trigger" aria-label={label} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((current) => !current)}><span>{labels[lang]}</span><span className="language-chevron" aria-hidden="true" /></button>{open && <div className="language-menu" role="menu" aria-label={label}>{(["va", "es", "en"] as Lang[]).map((item) => <button key={item} role="menuitemradio" aria-checked={lang === item} onClick={() => { setLang(item); setOpen(false); }}><span>{labels[item]}</span><span aria-hidden="true">{lang === item ? "✓" : ""}</span></button>)}</div>}</div>;
}

function LegendPanel({ lang, filters, setFilters, open, onClose }: { lang: Lang; filters: LegendFilter[]; setFilters: Dispatch<SetStateAction<LegendFilter[]>>; open: boolean; onClose: () => void }) {
  const t = copy[lang];
  const toggleFilter = (filter: LegendFilter) => setFilters((current) => current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]);
  return <><button className={`legend-scrim ${open ? "is-open" : ""}`} aria-label={t.closeLegend} onClick={onClose} tabIndex={open ? 0 : -1} /><aside className={`legend-panel ${open ? "is-open" : ""}`} aria-label={t.legend}><div className="legend-panel-title"><strong>{t.legend}</strong><button className="legend-close" onClick={onClose} aria-label={t.closeLegend}>×</button></div><div className="legend-options"><LegendButton active={filters.length === 0} onClick={() => setFilters([])} label={t.all} />{GROUPS.flatMap((group) => ([false, true] as const).map((lost) => { const filter: LegendFilter = `${group}-${lost ? "lost" : "existing"}`; return <LegendButton key={filter} active={filters.includes(filter)} onClick={() => toggleFilter(filter)} label={lost ? lostGroupLabels[lang][group] : groupLabels[lang][group]} tone={group} lost={lost} />; }))}</div></aside></>;
}

function LegendButton({ active, onClick, label, tone, lost }: { active: boolean; onClick: () => void; label: string; tone?: Group; lost?: boolean }) {
  return <button className="legend-option" aria-pressed={active} onClick={onClick}><span className={`legend-dot ${tone ?? "all"} ${lost ? "is-lost" : ""}`} aria-hidden="true" /><span>{label}</span></button>;
}

function MapView({ points, onSelect, lang, onReset }: { points: Point[]; onSelect: (point: Point) => void; lang: Lang; onReset: () => void }) {
  const t = copy[lang];
  if (!points.length) return <EmptyState lang={lang} onReset={onReset} compact />;
  return <div className="map-stage"><RouteMap points={points} onSelect={onSelect} lang={lang} /><div className="map-caption"><strong>{t.mapCaption}</strong><span>{t.mapHint}</span></div></div>;
}

function clusterPoints(points: Point[], zoom: number) {
  if (zoom >= 11) return points.map((point) => [point]);
  const cell = zoom <= 8 ? 0.08 : zoom === 9 ? 0.042 : 0.022;
  const clusters = new Map<string, Point[]>();
  points.forEach((point) => { const key = `${Math.floor(point.lat / cell)}:${Math.floor(point.lon / cell)}`; clusters.set(key, [...(clusters.get(key) ?? []), point]); });
  return Array.from(clusters.values());
}

function RouteMap({ points, onSelect, lang }: { points: Point[]; onSelect: (point: Point) => void; lang: Lang }) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!container.current || !points.length) return;
    let active = true;
    let map: LeafletMap | undefined;
    let resizeObserver: ResizeObserver | undefined;
    const initialise = async () => {
      const { default: L } = await import("leaflet");
      if (!active || !container.current) return;
      map = L.map(container.current, { zoomControl: false, scrollWheelZoom: true, minZoom: 8 });
      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap contributors" }).addTo(map);
      const markerLayer = L.layerGroup().addTo(map);
      const visibleBounds = L.latLngBounds(points.map((point) => [point.lat, point.lon] as [number, number]));
      const renderMarkers = () => {
        if (!map) return;
        markerLayer.clearLayers();
        clusterPoints(points, map.getZoom()).forEach((cluster) => {
          if (cluster.length > 1) {
            const lat = cluster.reduce((sum, point) => sum + point.lat, 0) / cluster.length;
            const lon = cluster.reduce((sum, point) => sum + point.lon, 0) / cluster.length;
            const label = `${cluster.length} ${copy[lang].results}`;
            const icon = L.divIcon({ className: "marker-shell cluster-shell", iconSize: [48, 48], iconAnchor: [24, 24], html: `<span class="map-cluster"><b>${cluster.length}</b></span>` });
            L.marker([lat, lon], { icon, title: label, alt: label, keyboard: true }).addTo(markerLayer).bindTooltip(label, { direction: "top", offset: [0, -18] }).on("click", () => map?.fitBounds(L.latLngBounds(cluster.map((point) => [point.lat, point.lon] as [number, number])), { padding: [54, 54], maxZoom: 12 }));
            return;
          }
          const point = cluster[0];
          const coincidentPoints = points.filter((candidate) => candidate.lat === point.lat && candidate.lon === point.lon);
          const coincidentIndex = coincidentPoints.findIndex((candidate) => candidate.id === point.id);
          const spread = coincidentPoints.length > 1 ? 28 : 0;
          const angle = coincidentPoints.length > 1 ? (Math.PI * 2 * coincidentIndex) / coincidentPoints.length : 0;
          const icon = L.divIcon({ className: "marker-shell", iconSize: [44, 44], iconAnchor: [22 + Math.cos(angle) * spread, 22 + Math.sin(angle) * spread], html: `<span class="leaflet-poi type-${point.group} ${point.lost ? "is-lost" : ""}"><img src="${ICONS[point.group]}" alt="" /></span>` });
          L.marker([point.lat, point.lon], { icon, title: point.name, alt: point.name, keyboard: true }).addTo(markerLayer).bindTooltip(point.name, { direction: "top", offset: [0, -18] }).on("click", () => onSelect(point));
        });
      };
      map.on("zoomend", renderMarkers);
      renderMarkers();
      requestAnimationFrame(() => { map?.invalidateSize(); map?.fitBounds(visibleBounds, { padding: [42, 42], maxZoom: points.length < 3 ? 13 : 10 }); });
      fetch(assetPath("/ruta-alcoi-gandia.gpx")).then((response) => response.text()).then((xml) => {
        if (!active || !map) return;
        const doc = new DOMParser().parseFromString(xml, "application/xml");
        const track = Array.from(doc.querySelectorAll("trkpt")).filter((_, index) => index % 3 === 0).map((point) => [Number(point.getAttribute("lat")), Number(point.getAttribute("lon"))] as [number, number]);
        if (track.length) L.polyline(track, { color: "#b55235", weight: 5, opacity: .92, lineCap: "round" }).addTo(map);
      }).catch(() => undefined);
      resizeObserver = new ResizeObserver(() => map?.invalidateSize());
      resizeObserver.observe(container.current);
    };
    void initialise();
    return () => { active = false; resizeObserver?.disconnect(); map?.remove(); };
  }, [points, onSelect, lang]);
  return <div ref={container} className="leaflet-map" aria-label={copy[lang].mapCaption} />;
}

function PointList({ points, lang, onSelect, onReset }: { points: Point[]; lang: Lang; onSelect: (point: Point) => void; onReset: () => void }) {
  if (!points.length) return <EmptyState lang={lang} onReset={onReset} />;
  return <div className="point-list">{points.map((point, index) => <PointCard key={point.id} point={point} lang={lang} onClick={() => onSelect(point)} index={index + 1} />)}</div>;
}

function ListView({ points, lang, onSelect, onReset, routeStart, setRouteStart }: { points: Point[]; lang: Lang; onSelect: (point: Point) => void; onReset: () => void; routeStart: RouteStart; setRouteStart: (start: RouteStart) => void }) {
  const t = copy[lang];
  const orderedPoints = useMemo(() => {
    const ordered = [...points].sort((first, second) => (ROUTE_POSITION[first.id] ?? Number.MAX_SAFE_INTEGER) - (ROUTE_POSITION[second.id] ?? Number.MAX_SAFE_INTEGER));
    return routeStart === "alcoi" ? ordered : ordered.reverse();
  }, [points, routeStart]);
  return <div className="list-view"><div className="list-toolbar"><div className="list-origin"><span className="list-origin-label">{t.startFrom}</span><div className="origin-switch" aria-label={t.startFrom}><button aria-pressed={routeStart === "alcoi"} onClick={() => setRouteStart("alcoi")}>{t.alcoiStart}</button><button aria-pressed={routeStart === "port"} onClick={() => setRouteStart("port")}>{t.portStart}</button></div></div></div><PointList points={orderedPoints} lang={lang} onSelect={onSelect} onReset={onReset} /></div>;
}

function PointCard({ point, lang, onClick, index }: { point: Point; lang: Lang; onClick: () => void; index: number }) {
  const t = copy[lang];
  return <button className="point-card" onClick={onClick}><span className={`point-card-media type-${point.group}`}>{point.image ? <img src={assetPath(point.image)} alt="" /> : <img className="point-card-icon" src={ICONS[point.group]} alt="" />}<span className="point-number">{String(index).padStart(2, "0")}</span></span><span className="point-card-copy"><span className="point-meta"><span>{groupLabels[lang][point.group]}</span><span className={point.lost ? "is-lost" : ""}>{point.lost ? t.lost : t.existing}</span></span><strong>{point.name}</strong><span className="point-link">{t.viewPoint} →</span></span></button>;
}

function EmptyState({ lang, onReset, compact = false }: { lang: Lang; onReset: () => void; compact?: boolean }) {
  const t = copy[lang];
  return <div className={`empty-state ${compact ? "compact" : ""}`}><span aria-hidden="true">⌖</span><strong>{t.empty}</strong><button onClick={onReset}>{t.reset}</button></div>;
}

function AudioCard({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return <button className="audio-card" disabled><span className="play" aria-hidden="true">▶</span><span><strong>{t.listen}</strong><small>{t.audioSoon}</small></span><span className="wave" aria-hidden="true">∿∿∿</span></button>;
}

function ModalShell({ label, onClose, children }: { label: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeButton = document.querySelector<HTMLButtonElement>(".modal-close");
    closeButton?.focus();
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", handleKeyDown); };
  }, [onClose]);

  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="modal-shell" role="dialog" aria-modal="true" aria-label={label}>{children}</section></div>;
}

function DetailHeader({ lang, onBack, onLanguage }: { lang: Lang; onBack: () => void; onLanguage: (lang: Lang) => void }) {
  return <header className="detail-header"><Language lang={lang} setLang={onLanguage} label={copy[lang].language} /><button className="modal-close" onClick={onBack} aria-label={copy[lang].close}><span aria-hidden="true">×</span></button></header>;
}

function PointDetail({ point, lang, onBack, onLanguage, onSelect }: { point: Point; lang: Lang; onBack: () => void; onLanguage: (lang: Lang) => void; onSelect: (point: Point) => void }) {
  const t = copy[lang];
  const nearby = POIS.filter((candidate) => candidate.group === point.group && candidate.id !== point.id).slice(0, 3);
  const guide = pointGuides[lang][guideKeyForPoint(point)];
  return <div className="detail-modal-content"><DetailHeader lang={lang} onBack={onBack} onLanguage={onLanguage} /><article className="point-detail"><div className={`detail-media type-${point.group}`}>{point.image ? <img src={assetPath(point.image)} alt={point.name} /> : <><img className="detail-icon" src={ICONS[point.group]} alt="" /><span>{groupLabels[lang][point.group]}</span></>}</div><div className="detail-copy"><span className="eyebrow">{t.heritage} · {groupLabels[lang][point.group]}</span><h1>{point.name}</h1><div className="detail-badges"><span className={point.lost ? "lost" : "existing"}>{point.lost ? t.lost : t.existing}</span><span>{municipalityByPoint[point.id]}</span></div><section className="guide-info"><h2>{guide.title}</h2>{guide.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section><AudioCard lang={lang} /><section className="nearby"><div className="section-heading"><span className="eyebrow">{groupLabels[lang][point.group]}</span><h2>{otherGroupLabels[lang][point.group]}</h2></div><div>{nearby.map((candidate) => <button key={candidate.id} onClick={() => onSelect(candidate)}><span>{candidate.name}</span><span aria-hidden="true">→</span></button>)}</div></section></div></article></div>;
}

function guideKeyForPoint(point: Point): GuideKey {
  if (point.group !== "depot") return point.group;
  return point.id === "diposit-locomotores-gandia" ? "locomotiveDepot" : "waterDepot";
}

function WelcomeDetail({ lang, onBack, onLanguage }: { lang: Lang; onBack: () => void; onLanguage: (lang: Lang) => void }) {
  const t = copy[lang];
  const guide = welcomeGuides[lang];
  return <div className="detail-modal-content"><DetailHeader lang={lang} onBack={onBack} onLanguage={onLanguage} /><article className="welcome-detail"><div className="welcome-hero"><span className="eyebrow">1893 — 1969</span><strong>{t.title}</strong><div className="rail-line" aria-hidden="true"><i /><i /><i /><i /></div></div><div className="welcome-body"><span className="eyebrow">{t.route}</span><h1>{guide.title}</h1><p className="intro-lead">{guide.paragraphs[0]}</p><AudioCard lang={lang} /><div className="history-stats"><div><strong>1893</strong><span>{lang === "en" ? "Opening" : lang === "es" ? "Inauguración" : "Inauguració"}</span></div><div><strong>76</strong><span>{lang === "en" ? "Years in service" : lang === "es" ? "Años en servicio" : "Anys de servei"}</span></div><div><strong>3</strong><span>{lang === "en" ? "Counties" : lang === "es" ? "Comarcas" : "Comarques"}</span></div></div><section className="guide-info welcome-guide">{guide.paragraphs.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section></div></article></div>;
}
