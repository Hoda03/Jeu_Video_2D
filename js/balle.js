// Exemple de classe
class Balle {
  x;
  y;
  couleur = "black";
  rayon;

  constructor(x, y, rayon, couleur) {
    this.x = x;
    this.y = y;
    this.rayon = rayon;
    this.couleur = couleur;
  }

  
  draw(ctx) {
    ctx.save();

    ctx.translate(this.x, this.y);

    // dessin d'un cercle, on utilise le mode "chemin"
    ctx.beginPath();

    // cx, cy, rayon, angle départ, angle arrivée en radians
    ctx.arc(0, 0, this.rayon, 0, 2 * Math.PI);

    // on donne l'ordre d'afficher le chemin
    ctx.fillStyle = this.couleur;
    ctx.fill(); // en formes pleines

    ctx.lineWidth = 10;
    
    // en fil de fer

    ctx.restore();
  }

  move() {
  }
}
