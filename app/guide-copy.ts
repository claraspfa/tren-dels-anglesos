export type GuideLanguage = "va" | "es" | "en";
export type GuideKey = "station" | "hut" | "tunnel" | "bridge" | "waterDepot" | "locomotiveDepot" | "dock";

type Guide = { title: string; paragraphs: string[] };

export const pointGuides: Record<GuideLanguage, Record<GuideKey, Guide>> = {
  va: {
    station: {
      title: "Les estacions i baixadors del Tren dels Anglesos",
      paragraphs: [
        "Les estacions eren un dels principals punts de trobada entre el ferrocarril i les poblacions que travessava. Al seu interior habitualment podíem trobar les taquilles, sales d’espera i les dependències des d’on el personal ferroviari organitzava el servei i regulava la circulació de trens.",
        "A la línia Alcoi-Gandia les parades es dividien segons la seua importància en estacions de primera o tercera classe i baixadors. Aquesta categoria determinava la grandària de l’edifici i els serveis de què disposava, com per exemple cantines, banys, i també la quantitat d’instal·lacions auxiliars com magatzems, dipòsits o molls de mercaderies, entre moltes altres. Tot i la diferència de classes, les estacions del tren compartien totes una mateixa imatge arquitectònica, el que feia que foren fàcil de reconèixer.",
        "Les estacions d’aquesta línia eren edificis senzills, generalment d’una sola planta, de forma rectangular i amb cobertes de teula a dos aigües. A les façanes destaca l’arc de mig punt central i les finestres laterals que es remarquen amb l’ús de rajola vista, al igual que en els cantons. Al centre solia aparèixer també un frontó triangular amb un element imprescindible per als viatgers: el cartell amb el nom de l’estació. Els baixadors, destinats a parades de menor importància o afluència, eren encara més modestos. Tenien menys dependències, una decoració pràcticament inexistent i únicament els espais necessaris per donar servei als passatgers.",
        "La repetició d’un mateix model permetia a la companyia construir de manera més ràpida i econòmica i, al mateix temps, donar una imatge comuna a tota la línia. Per això, encara hui, quan trobem una d’aquestes construccions podem reconèixer en la seua arquitectura una part de la identitat del Tren dels Anglesos.",
      ],
    },
    bridge: {
      title: "Els ponts del Tren dels Anglesos",
      paragraphs: [
        "Construir una línia de ferrocarril entre Alcoi i Gandia no va ser una tasca senzilla. L’orografia accidentada del territori, amb barrancs, rius i desnivells constants, va obligar a construir nombrosos ponts al llarg del recorregut.",
        "A finals del segle XIX, quan es va construir la línia, els ponts ferroviaris combinaven encara les tècniques tradicionals amb les noves possibilitats que oferien els materials metàl·lics. Per això, al Tren dels Anglesos trobem tant ponts de pedra com metàl·lics. Els primers eren resistents i duradors i s’utilitzaven sobretot per salvar distàncies més reduïdes. En canvi, els ponts metàl·lics permetien cobrir espais més amplis amb estructures més lleugeres.",
        "Es calcula que la línia va comptar amb una dotzena de ponts, aproximadament la meitat dels quals eren metàl·lics. Molts es concentraren entre l’Orxa i Vilallonga, on el congost del Serpis presentava alguns dels majors reptes per als enginyers.",
        "Entre els més destacats hi havia el pont de Muro d’Alcoi, que travessava el riu d’Agres i era el més llarg de tota la línia, amb uns 132 metres de longitud. Hui, però, gran part d’aquells ponts metàl·lics han desaparegut, ja que després del tancament del ferrocarril moltes de les seues estructures de ferro van ser desmuntades i venudes. Per això, en alguns punts del recorregut encara podem trobar piles i estreps de pedra que aparentment no sostenen res. Són, en realitat, les restes dels antics ponts per on un dia va circular el Tren dels Anglesos.",
      ],
    },
    tunnel: {
      title: "Els túnels del Tren dels Anglesos",
      paragraphs: [
        "Perquè un tren puga circular amb seguretat necessita traçats amb pendents suaus i corbes poc pronunciades. En un territori tan muntanyós com el que separa Alcoi de Gandia, això va obligar els enginyers a perforar la roca i construir diversos túnels. La major part es concentren entre Beniarrés i Vilallonga, especialment al Racó del Duc, on el riu Serpis discorre encaixat entre les muntanyes.",
        "El projecte original preveia huit túnels, numerats des d’Alcoi cap a Gandia. Però finalment només set arribaren a formar part de la línia, perquè el número 3, després de començar els treballs, acabà enfonsant-se durant les obres i provocà la mort de diversos operaris, motiu pel qual s’abandonà la seua construcció. Per això, encara que només hi ha set túnels, la numeració arriba fins al número huit.",
        "El túnel més llarg és el número 8, conegut com el de la Mina Fosca o la Mina Llarga, amb uns 260 metres de longitud. Els seus respiradors ajudaven a evacuar el fum i els gasos de les locomotores de vapor, un problema habitual en els túnels ferroviaris de l’època. De fet, els testimonis dels antics viatgers recordaven que travessar-los podia resultar una experiència ben diferent de l’actual, perquè el fum i la carbonissa entraven als vagons i, després del trajecte, no era estrany arribar a destinació amb la roba i la cara ennegrides. Hui, els túnels del Tren dels Anglesos continuen sent alguns dels elements més impressionants de l’antic recorregut i ens permeten entendre millor les dificultats que va suposar portar el ferrocarril a través d’aquest paisatge.",
      ],
    },
    hut: {
      title: "Les caselles del Tren dels Anglesos",
      paragraphs: [
        "Al llarg de l’antic traçat del Tren dels Anglesos encara es poden trobar algunes petites construccions pròximes a la via. Són les conegudes com a caselles ferroviàries, edificis destinats als treballadors encarregats de vigilar i conservar la línia.",
        "Aquestes caselles complien una doble funció: servien alhora de lloc de treball i habitatge. En elles residien guardavies, guardabarreres o altres empleats ferroviaris; habitualment es tractava d’habitatges unifamiliars on residia el treballador amb la seua família. La seua presència era especialment important en els trams més allunyats de les poblacions i de més difícil accés. Viure al costat de la via permetia als treballadors controlar de manera permanent l’estat de la infraestructura i actuar ràpidament davant qualsevol problema que sorgira.",
        "Eren construccions modestes, habitualment d’una sola planta, i comptaven amb una cuina, una o dues habitacions i els banys, que en alguns casos es trobaven annexos a l’edifici. Algunes caselles disposaven també de petits horts o corrals que ajudaven a l’economia familiar i solien ubicar-se a la part de darrere, allunyades de les vies.",
        "A la línia Alcoi-Gandia hi hagué nombroses caselles repartides al llarg del recorregut. Moltes hui dia han desaparegut o tan sols en queden restes en mal estat. El tram on més caselles podem trobar encara és entre Vilallonga i l’Orxa, on foren especialment necessàries per la complicada orografia, que feia necessari mantenir una major vigilància de les vies, i per la seua distància respecte als nuclis urbans.",
        "Hui, les caselles que encara es conserven són un dels testimonis més directes de la vida quotidiana que es desenvolupava al voltant del ferrocarril.",
      ],
    },
    locomotiveDepot: {
      title: "Els dipòsits ferroviaris i garatges del Tren dels Anglesos",
      paragraphs: [
        "Després de la llarga jornada, els ferrocarrils necessitaven un lloc on ser guardats, que també servira per poder fer un manteniment diari. Per a això es crearen els dipòsits de locomotores, coneguts també popularment com a garatges. Aquestes instal·lacions no eren simples cotxeres, sinó que formaven part d’un conjunt d’instal·lacions tècniques on s’organitzava el manteniment del material ferroviari i el treball de maquinistes, fogoners i altres operaris.",
        "Els garatges amb menor capacitat solien caracteritzar-se per ser un edifici de planta rectangular amb una o dues vies, però per als garatges amb major capacitat s’utilitzà el model de rotonda, una edificació circular on les vies confluïen al centre en una placa giratòria. A Espanya el model més popular fou el de semirotonda, el qual permetia augmentar la capacitat si era necessari posteriorment.",
        "A la línia Alcoi-Gandia les principals instal·lacions es concentraven a Gandia, on existia un dipòsit amb capacitat per a sis locomotores, acompanyat de tallers, magatzems, carboneres i altres equipaments auxiliars necessaris per al funcionament del ferrocarril. Actualment d’aquest dipòsit sols queda la placa giratòria.",
        "A Alcoi també hi havia instal·lacions per al material motor, encara que eren més reduïdes i destinades principalment a reparacions urgents o de menor importància. El dipòsit de locomotores d’Alcoi seguia el model rectangular, amb menor capacitat.",
      ],
    },
    waterDepot: {
      title: "Els dipòsits d’aigua del Tren dels Anglesos",
      paragraphs: [
        "Les locomotores de vapor no podien funcionar només amb carbó. També necessitaven grans quantitats d’aigua per produir el vapor que posava en moviment la màquina. Per això, al llarg del traçat ferroviari s’instal·laven dipòsits d’aigua i punts d’aprovisionament que permetien reomplir les locomotores durant el recorregut. Aquests dipòsits solien situar-se en una posició elevada per facilitar que l’aigua baixara amb prou pressió fins a la locomotora. Quan això no era possible, s’utilitzaven sistemes de bombament.",
        "Els dipòsits d’aigua desaparegueren amb l’arribada de les locomotores elèctriques, tot i que en el cas de les d’Alcoi-Gandia quedaren en desús pel desmantellament de la línia. A la línia Alcoi-Gandia existiren diversos punts d’aquest tipus, encara que molts han desaparegut amb el pas del temps. Se’n conserva un dipòsit al Racó del Duc i un altre a Gandia. Del primer sols es conserva la base circular, construïda amb murs gruixuts de fàbrica i amb un accés remarcat per un arc de mig punt de rajola vista. La part superior metàl·lica, on s’emmagatzemava l’aigua, ha desaparegut per complet. A Gandia es conserva en millor estat el dipòsit que es trobava darrere del garatge de locomotores.",
        "Aquestes restes poden semblar senzilles, però eren imprescindibles per garantir que les locomotores pogueren continuar el seu recorregut sense quedar-se sense aigua.",
      ],
    },
    dock: {
      title: "Els molls de mercaderies del Tren dels Anglesos",
      paragraphs: [
        "Els molls de mercaderies servien per carregar, descarregar i, en alguns casos, emmagatzemar temporalment els productes que viatjaven en tren. Una de les seues característiques més reconeixibles era la plataforma elevada, situada aproximadament a la mateixa altura que el terra dels vagons. Això facilitava molt el trasllat de caixes, sacs i altres mercaderies entre el tren i el moll.",
        "Aquestes instal·lacions se situaven normalment al costat de vies secundàries, de manera que els vagons podien quedar apartats mentre es realitzaven les operacions de càrrega i descàrrega. Alguns molls eren simplement plataformes a l’aire lliure, mentre que altres incorporaven cobertes o edificis destinats a protegir les mercaderies.",
        "A la línia Alcoi-Gandia, els molls tingueren una importància especial, ja que el transport de mercaderies va ser una de les principals raons per les quals es construí el ferrocarril. Des de les comarques de l’interior es transportaven productes com paper, cartró, oli, vi, farina, teixits, fruites i hortalisses, mentre que des del port de Gandia arribaven materials com carbó i fusta.",
        "Actualment l’únic moll que es conserva en bon estat es troba a Muro d’Alcoi.",
        "Els molls ens recorden que el Tren dels Anglesos no només transportava passatgers: va ser també una infraestructura clau per moure productes, matèries primeres i activitat econòmica entre l’interior i la costa.",
      ],
    },
  },
  es: {
    station: {
      title: "Las estaciones y apeaderos del Tren de los Ingleses",
      paragraphs: [
        "Las estaciones eran uno de los principales puntos de encuentro entre el ferrocarril y las poblaciones que atravesaba. En su interior se encontraban habitualmente las taquillas, las salas de espera y las dependencias desde las que el personal ferroviario organizaba el servicio y regulaba la circulación de trenes.",
        "En la línea Alcoy-Gandía las paradas se dividían, según su importancia, en estaciones de primera o tercera clase y apeaderos. Esta categoría determinaba el tamaño del edificio y los servicios de los que disponía, como cantinas y baños, así como la cantidad de instalaciones auxiliares: almacenes, depósitos o muelles de mercancías, entre muchas otras. A pesar de la diferencia de clases, todas las estaciones compartían una misma imagen arquitectónica, lo que las hacía fáciles de reconocer.",
        "Las estaciones de esta línea eran edificios sencillos, generalmente de una sola planta, de forma rectangular y con cubiertas de teja a dos aguas. En las fachadas destacaban el arco de medio punto central y las ventanas laterales, remarcados con ladrillo visto, al igual que las esquinas. En el centro solía aparecer también un frontón triangular con un elemento imprescindible para los viajeros: el cartel con el nombre de la estación. Los apeaderos, destinados a paradas de menor importancia o afluencia, eran todavía más modestos. Tenían menos dependencias, una decoración prácticamente inexistente y únicamente los espacios necesarios para atender a los pasajeros.",
        "La repetición de un mismo modelo permitía a la compañía construir de forma más rápida y económica y, al mismo tiempo, dar una imagen común a toda la línea. Por eso, todavía hoy, cuando encontramos una de estas construcciones podemos reconocer en su arquitectura una parte de la identidad del Tren de los Ingleses.",
      ],
    },
    bridge: {
      title: "Los puentes del Tren de los Ingleses",
      paragraphs: [
        "Construir una línea de ferrocarril entre Alcoy y Gandía no fue una tarea sencilla. La orografía accidentada del territorio, con barrancos, ríos y desniveles constantes, obligó a construir numerosos puentes a lo largo del recorrido.",
        "A finales del siglo XIX, cuando se construyó la línea, los puentes ferroviarios combinaban todavía las técnicas tradicionales con las nuevas posibilidades que ofrecían los materiales metálicos. Por eso, en el Tren de los Ingleses encontramos tanto puentes de piedra como metálicos. Los primeros eran resistentes y duraderos y se utilizaban sobre todo para salvar distancias más reducidas. En cambio, los puentes metálicos permitían cubrir espacios más amplios con estructuras más ligeras.",
        "Se calcula que la línea contó con una docena de puentes, aproximadamente la mitad de ellos metálicos. Muchos se concentraron entre Lorcha y Villalonga, donde el desfiladero del Serpis planteaba algunos de los mayores retos para los ingenieros.",
        "Entre los más destacados estaba el puente de Muro de Alcoy, que atravesaba el río Agres y era el más largo de toda la línea, con unos 132 metros de longitud. Hoy, sin embargo, gran parte de aquellos puentes metálicos han desaparecido, ya que tras el cierre del ferrocarril muchas de sus estructuras de hierro fueron desmontadas y vendidas. Por eso, en algunos puntos del recorrido todavía podemos encontrar pilas y estribos de piedra que aparentemente no sostienen nada. Son, en realidad, los restos de los antiguos puentes por los que un día circuló el Tren de los Ingleses.",
      ],
    },
    tunnel: {
      title: "Los túneles del Tren de los Ingleses",
      paragraphs: [
        "Para que un tren pueda circular con seguridad necesita trazados con pendientes suaves y curvas poco pronunciadas. En un territorio tan montañoso como el que separa Alcoy de Gandía, esto obligó a los ingenieros a perforar la roca y construir varios túneles. La mayor parte se concentran entre Beniarrés y Villalonga, especialmente en el Racó del Duc, donde el río Serpis discurre encajado entre las montañas.",
        "El proyecto original preveía ocho túneles, numerados desde Alcoy hacia Gandía. Pero finalmente solo siete llegaron a formar parte de la línea, porque el número 3, después de comenzar los trabajos, acabó derrumbándose durante las obras y provocó la muerte de varios operarios, motivo por el que se abandonó su construcción. Por eso, aunque solo hay siete túneles, la numeración llega hasta el número ocho.",
        "El túnel más largo es el número 8, conocido como la Mina Fosca o la Mina Llarga, con unos 260 metros de longitud. Sus respiraderos ayudaban a evacuar el humo y los gases de las locomotoras de vapor, un problema habitual en los túneles ferroviarios de la época. Los antiguos viajeros recordaban que atravesarlos podía ser una experiencia muy distinta de la actual, porque el humo y la carbonilla entraban en los vagones y no era extraño llegar a destino con la ropa y la cara ennegrecidas. Hoy, los túneles del Tren de los Ingleses continúan siendo algunos de los elementos más impresionantes del antiguo recorrido y permiten comprender mejor las dificultades que supuso llevar el ferrocarril a través de este paisaje.",
      ],
    },
    hut: {
      title: "Las casillas del Tren de los Ingleses",
      paragraphs: [
        "A lo largo del antiguo trazado del Tren de los Ingleses todavía pueden encontrarse pequeñas construcciones próximas a la vía. Son las conocidas como casillas ferroviarias, edificios destinados a los trabajadores encargados de vigilar y conservar la línea.",
        "Estas casillas cumplían una doble función: servían a la vez como lugar de trabajo y vivienda. En ellas residían guardavías, guardabarreras u otros empleados ferroviarios; habitualmente eran viviendas unifamiliares donde vivía el trabajador con su familia. Su presencia era especialmente importante en los tramos más alejados de las poblaciones y de más difícil acceso. Vivir junto a la vía permitía controlar permanentemente el estado de la infraestructura y actuar con rapidez ante cualquier problema.",
        "Eran construcciones modestas, habitualmente de una sola planta, y contaban con cocina, una o dos habitaciones y baños, que en algunos casos estaban anexos al edificio. Algunas disponían también de pequeños huertos o corrales que ayudaban a la economía familiar y solían situarse en la parte trasera, alejados de las vías.",
        "En la línea Alcoy-Gandía hubo numerosas casillas repartidas a lo largo del recorrido. Muchas han desaparecido o solo conservan restos en mal estado. El tramo donde todavía podemos encontrar más se sitúa entre Villalonga y Lorcha, donde fueron especialmente necesarias por la complicada orografía, que exigía una mayor vigilancia de las vías, y por su distancia respecto a los núcleos urbanos.",
        "Hoy, las casillas que todavía se conservan son uno de los testimonios más directos de la vida cotidiana que se desarrollaba alrededor del ferrocarril.",
      ],
    },
    locomotiveDepot: {
      title: "Los depósitos ferroviarios y cocheras del Tren de los Ingleses",
      paragraphs: [
        "Después de la larga jornada, los ferrocarriles necesitaban un lugar donde guardarse y recibir mantenimiento diario. Para ello se crearon los depósitos de locomotoras, conocidos también popularmente como cocheras. Estas instalaciones no eran simples cobertizos, sino que formaban parte de un conjunto técnico donde se organizaba el mantenimiento del material ferroviario y el trabajo de maquinistas, fogoneros y otros operarios.",
        "Los depósitos de menor capacidad solían ser edificios de planta rectangular con una o dos vías, pero para los de mayor capacidad se utilizó el modelo de rotonda, una edificación circular cuyas vías confluían en una placa giratoria central. En España el modelo más popular fue el de semirrotonda, que permitía aumentar la capacidad posteriormente si era necesario.",
        "En la línea Alcoy-Gandía las principales instalaciones se concentraban en Gandía, donde existía un depósito con capacidad para seis locomotoras, acompañado de talleres, almacenes, carboneras y otros equipamientos auxiliares necesarios para el funcionamiento del ferrocarril. Actualmente de este depósito solo queda la placa giratoria.",
        "En Alcoy también había instalaciones para el material motor, aunque eran más reducidas y se destinaban principalmente a reparaciones urgentes o de menor importancia. El depósito de locomotoras de Alcoy seguía el modelo rectangular y tenía menor capacidad.",
      ],
    },
    waterDepot: {
      title: "Los depósitos de agua del Tren de los Ingleses",
      paragraphs: [
        "Las locomotoras de vapor no podían funcionar únicamente con carbón. También necesitaban grandes cantidades de agua para producir el vapor que ponía en movimiento la máquina. Por eso, a lo largo del trazado ferroviario se instalaban depósitos de agua y puntos de abastecimiento que permitían rellenar las locomotoras durante el recorrido. Estos depósitos solían situarse en una posición elevada para facilitar que el agua descendiera con suficiente presión hasta la locomotora. Cuando esto no era posible, se utilizaban sistemas de bombeo.",
        "Los depósitos de agua desaparecieron con la llegada de las locomotoras eléctricas, aunque en la línea Alcoy-Gandía quedaron en desuso por el desmantelamiento del ferrocarril. Existieron varios puntos de este tipo, pero muchos han desaparecido con el tiempo. Se conserva un depósito en el Racó del Duc y otro en Gandía. Del primero solo permanece la base circular, construida con gruesos muros de fábrica y un acceso remarcado por un arco de medio punto de ladrillo visto. La parte superior metálica, donde se almacenaba el agua, ha desaparecido por completo. En Gandía se conserva en mejor estado el depósito que se encontraba detrás de las cocheras de locomotoras.",
        "Estos restos pueden parecer sencillos, pero eran imprescindibles para garantizar que las locomotoras pudieran continuar su recorrido sin quedarse sin agua.",
      ],
    },
    dock: {
      title: "Los muelles de mercancías del Tren de los Ingleses",
      paragraphs: [
        "Los muelles de mercancías servían para cargar, descargar y, en algunos casos, almacenar temporalmente los productos que viajaban en tren. Una de sus características más reconocibles era la plataforma elevada, situada aproximadamente a la misma altura que el suelo de los vagones. Esto facilitaba mucho el traslado de cajas, sacos y otras mercancías entre el tren y el muelle.",
        "Estas instalaciones se situaban normalmente junto a vías secundarias, de forma que los vagones podían quedar apartados mientras se realizaban las operaciones de carga y descarga. Algunos muelles eran simplemente plataformas al aire libre, mientras que otros incorporaban cubiertas o edificios destinados a proteger las mercancías.",
        "En la línea Alcoy-Gandía, los muelles tuvieron una importancia especial, ya que el transporte de mercancías fue una de las principales razones por las que se construyó el ferrocarril. Desde las comarcas del interior se transportaban productos como papel, cartón, aceite, vino, harina, tejidos, frutas y hortalizas, mientras que desde el puerto de Gandía llegaban materiales como carbón y madera.",
        "Actualmente el único muelle que se conserva en buen estado se encuentra en Muro de Alcoy.",
        "Los muelles nos recuerdan que el Tren de los Ingleses no solo transportaba pasajeros: fue también una infraestructura clave para mover productos, materias primas y actividad económica entre el interior y la costa.",
      ],
    },
  },
  en: {
    station: {
      title: "Stations and halts on the Englishmen’s Train",
      paragraphs: [
        "Stations were among the main meeting points between the railway and the towns it crossed. Inside were usually ticket offices, waiting rooms and the offices from which railway staff organised services and regulated train movements.",
        "On the Alcoy-Gandia line, stops were divided according to their importance into first- or third-class stations and halts. This category determined the size of the building and the services it offered, such as refreshment rooms and toilets, as well as the number of auxiliary facilities, including warehouses, depots and goods platforms. Despite their different classes, all the railway’s stations shared the same architectural appearance, making them easy to recognise.",
        "The stations on this line were simple buildings, generally single-storey, rectangular in plan and covered by pitched tiled roofs. Their façades featured a central round arch and side windows highlighted with exposed brickwork, as were the corners. A triangular pediment usually appeared in the centre with an essential feature for travellers: the sign bearing the station’s name. Halts, intended for stops of lesser importance or with fewer passengers, were even more modest. They had fewer rooms, almost no decoration and only the spaces needed to serve passengers.",
        "Repeating the same model allowed the company to build more quickly and economically while giving the entire line a shared identity. That is why, even today, when we encounter one of these buildings, its architecture still reveals part of the identity of the Englishmen’s Train.",
      ],
    },
    bridge: {
      title: "Bridges on the Englishmen’s Train",
      paragraphs: [
        "Building a railway line between Alcoy and Gandia was no simple task. The rugged terrain, with ravines, rivers and constant changes in elevation, made it necessary to construct numerous bridges along the route.",
        "At the end of the nineteenth century, when the line was built, railway bridges still combined traditional techniques with the new possibilities offered by metal materials. The Englishmen’s Train therefore used both stone and metal bridges. Stone bridges were strong and durable and were mainly used to span shorter distances, while metal bridges could cover wider spaces with lighter structures.",
        "The line is estimated to have had around twelve bridges, approximately half of them metal. Many were concentrated between Lorcha and Villalonga, where the Serpis gorge posed some of the greatest challenges for engineers.",
        "One of the most notable was the bridge at Muro de Alcoy, which crossed the Agres river and was the longest on the entire line at around 132 metres. Today, however, many of those metal bridges have disappeared because their iron structures were dismantled and sold after the railway closed. At several points along the route, stone piers and abutments can still be seen apparently supporting nothing. They are, in fact, the remains of the old bridges that once carried the Englishmen’s Train.",
      ],
    },
    tunnel: {
      title: "Tunnels on the Englishmen’s Train",
      paragraphs: [
        "For a train to run safely, it needs a route with gentle gradients and broad curves. In the mountainous territory between Alcoy and Gandia, engineers therefore had to cut through the rock and build several tunnels. Most lie between Beniarrés and Villalonga, especially around the Racó del Duc, where the river Serpis runs between the mountains.",
        "The original project planned eight tunnels, numbered from Alcoy towards Gandia. Only seven eventually became part of the line because tunnel number 3 collapsed after work began, killing several workers, and its construction was abandoned. This is why the numbering reaches eight even though there are only seven tunnels.",
        "The longest is tunnel number 8, known as Mina Fosca or Mina Llarga, at around 260 metres. Its ventilation shafts helped remove smoke and gases from steam locomotives, a common problem in railway tunnels of the period. Former passengers recalled that travelling through them was very different from today: smoke and coal dust entered the carriages, and it was not unusual to arrive with blackened clothes and faces. The tunnels remain some of the most impressive features of the old route and help us understand the challenge of bringing the railway through this landscape.",
      ],
    },
    hut: {
      title: "Railway huts on the Englishmen’s Train",
      paragraphs: [
        "Small buildings can still be found beside the former route of the Englishmen’s Train. These railway huts housed the workers responsible for watching over and maintaining the line.",
        "The huts served two purposes at once: they were both a workplace and a home. Track watchmen, level-crossing keepers and other railway employees lived there, usually with their families in single-family dwellings. They were especially important on remote and difficult-to-reach sections. Living beside the line allowed workers to monitor the infrastructure continuously and respond quickly to any problem.",
        "They were modest buildings, usually single-storey, with a kitchen, one or two rooms and toilets, which were sometimes attached to the main building. Some also had small gardens or pens that supported the household economy and were usually located behind the house, away from the tracks.",
        "Many huts were distributed along the Alcoy-Gandia line. A large number have now disappeared or survive only as remains in poor condition. The greatest concentration can still be found between Villalonga and Lorcha, where the difficult terrain required closer supervision of the tracks and the route lay far from urban centres.",
        "The surviving huts are among the most direct reminders of everyday life around the railway.",
      ],
    },
    locomotiveDepot: {
      title: "Engine sheds and locomotive depots on the Englishmen’s Train",
      paragraphs: [
        "After a long day, railway engines needed somewhere to be stored and maintained. Locomotive depots, popularly known as engine sheds or garages, were created for this purpose. They were not simply storage buildings, but part of a group of technical facilities where rolling stock was maintained and drivers, firemen and other workers organised their tasks.",
        "Smaller sheds were generally rectangular buildings with one or two tracks. Larger depots used the roundhouse model, a circular building whose tracks met at a central turntable. In Spain the semicircular roundhouse became the most common model because its capacity could be increased later if necessary.",
        "The main facilities on the Alcoy-Gandia line were concentrated in Gandia, where a depot could accommodate six locomotives and was accompanied by workshops, warehouses, coal stores and other equipment needed to operate the railway. Only the turntable survives today.",
        "Alcoy also had facilities for motive power, although they were smaller and intended mainly for urgent or minor repairs. Alcoy’s locomotive depot followed the lower-capacity rectangular model.",
      ],
    },
    waterDepot: {
      title: "Water tanks on the Englishmen’s Train",
      paragraphs: [
        "Steam locomotives could not run on coal alone. They also needed large amounts of water to produce the steam that powered the engine. Water tanks and supply points were therefore installed along the line so that locomotives could refill during the journey. The tanks were usually elevated so that gravity provided enough pressure for the water to reach the locomotive; pumping systems were used when this was not possible.",
        "Water tanks disappeared with the arrival of electric locomotives, although on the Alcoy-Gandia line they fell out of use when the railway was dismantled. Several such points once existed, but many have disappeared over time. One tank survives at the Racó del Duc and another in Gandia. Only the circular base remains at the former, built with thick masonry walls and an entrance marked by a round arch of exposed brick. The upper metal tank that held the water has completely disappeared. The tank behind the Gandia locomotive depot survives in better condition.",
        "These remains may seem simple, but they were essential to ensure that steam locomotives could continue their journey without running out of water.",
      ],
    },
    dock: {
      title: "Goods platforms on the Englishmen’s Train",
      paragraphs: [
        "Goods platforms were used to load, unload and, in some cases, temporarily store products carried by train. One of their most recognisable features was the raised platform, positioned at approximately the same height as the carriage floor. This made it much easier to move boxes, sacks and other goods between the train and the platform.",
        "These facilities were normally located beside sidings so that wagons could be kept away from the main line during loading and unloading. Some were simply open-air platforms, while others included roofs or buildings to protect the goods.",
        "Goods platforms were especially important on the Alcoy-Gandia line because freight transport was one of the main reasons the railway was built. Paper, cardboard, oil, wine, flour, textiles, fruit and vegetables travelled from the inland counties, while coal and timber arrived through Gandia port.",
        "The only goods platform that remains in good condition today is at Muro de Alcoy.",
        "These platforms remind us that the Englishmen’s Train carried more than passengers: it was also a vital link for moving products, raw materials and economic activity between the inland areas and the coast.",
      ],
    },
  },
};

export const welcomeGuides: Record<GuideLanguage, Guide> = {
  va: {
    title: "Benvinguts al Tren dels Anglesos",
    paragraphs: [
      "Benvinguts i benvingudes a l’antic traçat del Tren dels Anglesos.",
      "Aquesta guia vos ajudarà a conèixer l’origen de la ruta, el paisatge que travessa i la història de l’antic ferrocarril que, durant dècades, va connectar les comarques de l’interior amb la costa.",
      "Estem davant l’antic traçat ferroviari que unia Alcoi amb Gandia i el seu port. El recorregut travessa municipis de l’Alcoià, el Comtat i la Safor, seguint en bona part el curs del riu Serpis. Al llarg de la ruta trobarem paisatges de muntanya, barrancs, vegetació de ribera i diferents construccions que ens recorden el passat ferroviari de la zona.",
      "La línia de ferrocarril es va inaugurar l’any 1893 i ràpidament es va passar a conèixer com el Tren dels Anglesos, nom que feia referència a l’empresa britànica responsable de la construcció i explotació de la línia, l’Alcoy and Gandia Harbour Company Limited. En un principi, la línia va ser concebuda per al transport de mercaderies, especialment carbó i productes industrials. Però amb el temps es va convertir també en un mitjà de transport fonamental per als habitants de les tres comarques, permetent-los el desplaçament entre les diferents poblacions per treballar, visitar familiars, fer gestions o gaudir del temps lliure. Alguns antics usuaris encara recorden les llargues cues que es formaven per comprar els bitllets, i els mateixos treballadors del ferrocarril explicaven que els vagons solien anar plens, sobretot els que feien el recorregut en direcció a Gandia durant l’estiu. Aquesta gran afluència va fer que una part de la costa de Gandia acabara sent coneguda popularment com la platja dels alcoians.",
      "El tren efectuava parades a Alcoi, Cocentaina, Muro, Beniarrés, l’Orxa, Vilallonga, Potries i Gandia, fins a arribar al port de Gandia. A més, també disposava de baixadors a Gaianes, Beniarjó i Almoines.",
      "Amb el pas dels anys el transport per carretera va anar guanyant importància. La popularització dels automòbils, autobusos i camions va provocar una disminució progressiva del nombre de passatgers i de mercaderies transportades per ferrocarril. Finalment, el Tren dels Anglesos va realitzar el seu últim viatge el 15 d’abril de 1969, després de més de setanta-cinc anys de servei.",
      "Hui, el tram entre l’Orxa i Vilallonga és un dels més coneguts i transitats. Durant el camí podreu trobar túnels, ponts, antigues estacions, caselles ferroviàries i altres restes que permeten imaginar com devia ser el pas del tren per aquest emblemàtic paisatge. Aquesta ruta és molt més que un camí per caminar o anar en bicicleta. És també una manera de descobrir la relació entre el territori, el riu Serpis i les poblacions que van créixer al voltant del ferrocarril.",
      "Al llarg de les diferents parades d’aquesta guia coneixereu alguns dels llocs més destacats del recorregut, la seua història, el seu patrimoni i les curiositats que encara conserva l’antic traçat del Tren dels Anglesos. Esperem que gaudiu del recorregut i que, durant el camí, vos sentiu com un viatger més d’aquell antic ferrocarril. Bon viatge!",
    ],
  },
  es: {
    title: "Bienvenidos al Tren de los Ingleses",
    paragraphs: [
      "Bienvenidos y bienvenidas al antiguo trazado del Tren de los Ingleses.",
      "Esta guía os ayudará a conocer el origen de la ruta, el paisaje que atraviesa y la historia del antiguo ferrocarril que, durante décadas, conectó las comarcas del interior con la costa.",
      "Nos encontramos ante el antiguo trazado ferroviario que unía Alcoy con Gandía y su puerto. El recorrido atraviesa municipios de l’Alcoià, el Comtat y la Safor, siguiendo en buena parte el curso del río Serpis. A lo largo de la ruta encontraremos paisajes de montaña, barrancos, vegetación de ribera y distintas construcciones que recuerdan el pasado ferroviario de la zona.",
      "La línea se inauguró en 1893 y pronto pasó a conocerse como el Tren de los Ingleses, en referencia a la empresa británica responsable de su construcción y explotación, la Alcoy and Gandia Harbour Company Limited. En un principio fue concebida para transportar mercancías, especialmente carbón y productos industriales. Con el tiempo se convirtió también en un medio de transporte fundamental para los habitantes de las tres comarcas, que lo utilizaban para trabajar, visitar a familiares, hacer gestiones o disfrutar del tiempo libre. Algunos antiguos usuarios todavía recuerdan las largas colas para comprar los billetes, y los trabajadores explicaban que los vagones solían ir llenos, sobre todo los que se dirigían a Gandía durante el verano. Esta gran afluencia hizo que una parte de la costa de Gandía acabara siendo conocida popularmente como la playa de los alcoyanos.",
      "El tren paraba en Alcoy, Cocentaina, Muro, Beniarrés, Lorcha, Villalonga, Potries y Gandía, hasta llegar al puerto de Gandía. También disponía de apeaderos en Gaianes, Beniarjó y Almoines.",
      "Con el paso de los años, el transporte por carretera fue ganando importancia. La popularización de automóviles, autobuses y camiones provocó una disminución progresiva del número de pasajeros y de mercancías transportadas por ferrocarril. Finalmente, el Tren de los Ingleses realizó su último viaje el 15 de abril de 1969, después de más de setenta y cinco años de servicio.",
      "Hoy, el tramo entre Lorcha y Villalonga es uno de los más conocidos y transitados. Durante el camino pueden encontrarse túneles, puentes, antiguas estaciones, casillas ferroviarias y otros restos que permiten imaginar cómo era el paso del tren por este emblemático paisaje. La ruta es mucho más que un camino para andar o ir en bicicleta: es también una manera de descubrir la relación entre el territorio, el río Serpis y las poblaciones que crecieron alrededor del ferrocarril.",
      "A lo largo de las distintas paradas de esta guía conoceréis algunos de los lugares más destacados del recorrido, su historia, su patrimonio y las curiosidades que todavía conserva el antiguo trazado del Tren de los Ingleses. Esperamos que disfrutéis del recorrido y que, durante el camino, os sintáis como un viajero más de aquel antiguo ferrocarril. ¡Buen viaje!",
    ],
  },
  en: {
    title: "Welcome to the Englishmen’s Train",
    paragraphs: [
      "Welcome to the former route of the Englishmen’s Train.",
      "This guide will introduce the origins of the route, the landscape it crosses and the history of the railway that linked the inland counties with the coast for decades.",
      "This former railway ran between Alcoy, Gandia and its port. It crosses municipalities in l’Alcoià, el Comtat and la Safor, following the river Serpis for much of the way. Along the route are mountain landscapes, ravines, riverside vegetation and buildings that recall the area’s railway past.",
      "The line opened in 1893 and soon became known as the Englishmen’s Train, a reference to the British company responsible for its construction and operation, the Alcoy and Gandia Harbour Company Limited. It was initially designed to carry freight, especially coal and industrial products, but it also became essential transport for people across the three counties. Passengers used it to travel between towns for work, family visits, errands and leisure. Former users still remembered long queues for tickets, while railway workers recalled packed carriages, especially those heading towards Gandia in summer. The crowds led part of Gandia’s coast to become popularly known as the beach of the people of Alcoy.",
      "The train stopped at Alcoy, Cocentaina, Muro, Beniarrés, Lorcha, Villalonga, Potries and Gandia before reaching Gandia port. It also served halts at Gaianes, Beniarjó and Almoines.",
      "Road transport gained importance over the years. The growing popularity of cars, buses and lorries caused a steady decline in passengers and rail freight. The Englishmen’s Train made its final journey on 15 April 1969 after more than seventy-five years of service.",
      "Today, the section between Lorcha and Villalonga is one of the best-known and most frequently visited. Tunnels, bridges, former stations, railway huts and other remains help visitors imagine the train crossing this remarkable landscape. The route is much more than a path for walking or cycling: it is also a way to discover the relationship between the land, the river Serpis and the towns that grew around the railway.",
      "At the different stops in this guide, you will discover some of the route’s most notable places, their history, their heritage and the curiosities that survive along the former railway. We hope you enjoy the journey and feel like one of the passengers who once travelled on this line. Have a good trip!",
    ],
  },
};
