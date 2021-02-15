let mousePos = {};

function traiteMouseDown(event) {
  //console.log("Souris clickée dans le canvas bouton " + event.button);
  //console.log("Clickée en x = " + mousePos.x + " y = " + mousePos.y);

  // exemple d'utilisation de l'API du DOM pour modifier du contenu HTML
  let spanNiveau = document.querySelector("#niveau");
  spanNiveau.innerHTML = "<i>" + niveauCourant + "</i>";
  niveauCourant++;

  switch (etatJeu) {
    case "MenuPrincipal":
      etatJeu = "JeuEnCours";
      break;
    case "EcranChangementNiveau":
      //passeNiveauSuivant();
      niveauSuivant();
      break;
    case "GameOver" :
      etatJeu = "MenuPrincipal";
      break;
  }
}

function traiteMouseUp(event) {
  //console.log("Souris relâchée dans le canvas bouton " + event.button);
}

function traiteMouseMove(event) {
  //console.log("Souris déplacée dans le canvas");
  // pour prendre en compte les marges, le css, etc.
  var rect = canvas.getBoundingClientRect();

  mousePos.x = event.clientX - rect.left;
  mousePos.y = event.clientY - rect.top;

  //console.log("Souris en x = " + mousePos.x + " y = " + mousePos.y);

  monstre.setPos(mousePos.x, mousePos.y);

  balleChercheuse.setTarget(mousePos.x, mousePos.y);
}

function traiteKeyDown(event) {
  switch (event.key) {
    case "ArrowLeft":
      monstre.vitesseX = -5;
      break;
    case "ArrowRight":
      monstre.vitesseX = 5;
      break;
    case "ArrowUp":
      monstre.vitesseY = -5;
      break;
    case "ArrowDown":
      monstre.vitesseY = 5;
      break;
  }
}

function traiteKeyUp(event) {
  switch (event.key) {
    case "ArrowLeft":
    case "ArrowRight":
      monstre.vitesseX = 0;
      break;
    case "ArrowUp":
    case "ArrowDown":
      monstre.vitesseY = 0;
      break;
  }
}
