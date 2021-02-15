window.onload = main;

let canvas;
let ctx;
let niveauCourant = 1;
let etatJeu = "MenuPrincipal";
let s=0;

// ici on va stocker les objets graphiques du jeu, ennemis, etc.
let tableauDesBalles = [];
let balleChercheuse;
let assets;
let musiqueCourante = null;

// programme principal
// programme principal
function main() {
  console.log("Page chargée ! DOM ready ! Toutes les ressources de la page sont utilisables (vidéos, images, polices ...)");

  loadAssets(startGame);

}

function startGame(assetsLoaded) {

  assets = assetsLoaded;
  // On récupère grace à la "selector API" un pointeur sur le canvas
  canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext("2d");
  // on ajoute des écouteurs souris/clavier sur le canvas
  canvas.onmousedown = traiteMouseDown;
  canvas.onmouseup = traiteMouseUp;
  canvas.onmousemove = traiteMouseMove;

  //canvas.addEventListener("mousedown", traiteMouseDown);
  //canvas.addEventListener("mousedown", traiteMouseDown2);

  // le canvas ne peut détecter les touches que si il a le focus (voir mooc)
  // c'est plus simple de mettre l'écouteur sur le document (la page)
  document.onkeydown = traiteKeyDown;
  document.onkeyup = traiteKeyUp;

  // pour dessiner, on a besoin de son "contexte graphique", un objet qui
  // va permettre de dessiner, ou de changer les propriétés du canvas
  // (largeur du trait, couleur, repère, etc.)

  ctx = canvas.getContext("2d");

  console.log(monstre.donneTonNom());

  creerDesBalles(niveauCourant + 1);

  requestAnimationFrame(animationLoop);
  setInterval(changePositionYeux, 300); // appelle la fonction changeCouleur toutes les n millisecondes
}

function creerDesBalles(nb) {
  let tabCouleurs = ["red", "green"];

  for (let i = 0; i < nb; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let r = Math.random() * 30;
    let indexCouleur = Math.floor(Math.random() * tabCouleurs.length);
    let couleur = tabCouleurs[indexCouleur];
    let vx = -5 + Math.random() * 10;
    let vy = -5 + Math.random() * 10;

    let b = new BalleAvecVitesseXY(x, y, r, couleur, vx, vy);

    // on ajoute la balle au tableau
    tableauDesBalles.push(b);
  }

  // on ajoute une balle chercheuse dans le tableau
  balleChercheuse = new BalleChercheuse(100, 100, 40, "red", 0, 0);
  tableauDesBalles.push(balleChercheuse);
}
function afficheInfoJeu() {
  ctx.save();
  ctx.fillStyle = "orange";
  ctx.font = "30pt Calibri";
  ctx.fillText("Niveau : " + niveauCourant, 400, 40);
 
  ctx.lineWidth = 2;
  ctx.strokeStyle = "red";
  ctx.strokeText("Niveau : " + niveauCourant, 400, 40);
  ctx.font = "20pt OCR A Std";
  ctx.fillText("Score : " + s, 40, 40);
  ctx.fillText(etatJeu, 300, 100);
  ctx.restore();
}
// animation à 60 images/s
function animationLoop() {
  // 1 on efface le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  afficheInfoJeu(); // scores, niveau etc.

  switch (etatJeu) {
    case "MenuPrincipal":
      afficheMenuPrincipal();
      break;
    case "JeuEnCours":
      updateJeu();
      break;
    case "EcranChangementNiveau":
      afficheEcranChangementNiveau();
      break;
    case "GameOver":
      afficheEcranGameOver();
  }

  // 5 On demande au navigateur de rappeler la fonction
  // animationLoop dans 1/60ème de seconde
  requestAnimationFrame(animationLoop);
}
function afficheMenuPrincipal() {
  ctx.save();
  ctx.translate(0, 100);
  ctx.fillStyle = "green";
  ctx.font = "30pt Calibri";
  ctx.fillText("MENU PRINCIPAL", 100, 20);

  ctx.fillText("Cliquez pour démarrer", 65, 60);
  musique(assets.kol);
  ctx.restore();
}

function afficheEcranChangementNiveau() {
  ctx.save();
  ctx.translate(0, 100);
  ctx.fillStyle = "green";
  ctx.font = "30pt Calibri";
  ctx.fillText("Changement niveau", 100, 20);

  ctx.fillText("Cliquez pour niveau suivant", 65, 60);

  ctx.restore();
}

function afficheEcranGameOver() {
  ctx.save();
  ctx.translate(0, 100);
  ctx.fillStyle = "green";
  ctx.font = "30pt Calibri";
  ctx.fillText("GAME OVER", 100, 20);

  ctx.fillText("Cliquez pour recommencer", 65, 60);
  musique(assets.lwest);
  ctx.restore();
}

function niveauSuivant() {
  console.log("NIVEAU SUIVANT");
  niveauCourant++;
  creerDesBalles(niveauCourant + 1);
  etatJeu = "JeuEnCours";
}

function updateJeu() {
  monstre.draw(ctx);

  updateBalles();
  // 3 on déplace les objets
  monstre.move();
  //deplacerLesBalles();

  // 4 on peut faire autre chose (par ex: detecter des collisions,
  // ou prendre en compte le clavier, la souris, la manette de jeu)
  traiteCollisionsJoueurAvecBords();

  if (niveauFini()) {
    etatJeu = "EcranChangementNiveau";
  }
}

function niveauFini() {
  return tableauDesBalles.length === 0;
}

function traiteCollisionBalleAvecMonstre(b) {
  if (
    circRectsOverlap(
      monstre.x,
      monstre.y,
      monstre.l,
      monstre.h,
      b.x,
      b.y,
      b.rayon
    )
  ) {
    if (b instanceof BalleChercheuse) {
      console.log("COLLISION AVEC BALLE CHERCHEUSE");
    }
    if (
      b.couleur == "red"
    ) {
      s += 10;
      
      
    }
    
    if (
      b.couleur != "red"
    ) {
      
    
      etatJeu= "GameOver";
    }
    console.log("COLLISION....");
    // on cherche l'index de la balle dans le tableau des balles
    let index = tableauDesBalles.indexOf(b);

    // pour supprimer un élément : on utilise la méthode splice(index, nbElementsASupprimer) sur le tableau
    tableauDesBalles.splice(index, 1);
    //b.couleur = "pink";
  }
}

function updateBalles() {
  let cpt=0
  // utilisation d'un itérateur sur le tableau
  tableauDesBalles.forEach((b) => {
    b.draw(ctx);
    traiteCollisionsBalleAvecBords(b);
    traiteCollisionBalleAvecMonstre(b);

    b.move();
    if (
      b.couleur == "red"
    ) {
      cpt += 1;
    }
  })
  if (cpt== 0) {
    niveauSuivant();
  }
 
}
