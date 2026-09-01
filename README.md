# El Tren dels Anglesos

Audioguia i mapa interactiu del patrimoni de l'antiga línia ferroviària entre Alcoi i el Port de Gandia.

## Desenvolupament local

Requereix Node.js 22.13 o una versió posterior.

```bash
npm install
npm run dev
```

Per verificar la versió destinada a l'allotjament actual:

```bash
npm run build
```

## Publicació gratuïta en GitHub Pages

El projecte inclou un procés automàtic de publicació que funciona encara que es copie a un altre usuari o es canvie el nom del repositori. En cada publicació detecta la ruta correcta i prepara les imatges, les icones i l'arxiu GPX perquè funcionen des d'una pàgina de projecte.

1. Puja el projecte a un repositori de GitHub amb la branca principal anomenada `main`.
2. En GitHub, obri **Settings → Pages**.
3. En **Build and deployment → Source**, selecciona **GitHub Actions**.
4. Obri **Actions → Publicar en GitHub Pages** i prem **Run workflow**. Els següents canvis a `main` es publicaran automàticament.

La web quedarà disponible normalment en `https://USUARI.github.io/NOM-DEL-REPOSITORI/`. Si el repositori es diu `USUARI.github.io`, es publicarà directament en `https://USUARI.github.io/`.

No cal modificar `.openai/hosting.json`: la configuració de GitHub Pages és independent i conserva l'opció d'allotjament existent.

## Enllaços directes als modals

Cada punt d'interés es pot obrir directament afegint el seu identificador a l'URL, per exemple `?punt=estacio-gandia`. La guia de benvinguda utilitza `?guia=benvinguda`. En obrir o tancar un modal des de la web, l'adreça i l'historial del navegador s'actualitzen automàticament.
