function musique(h) {
    if (musiqueCourante) {
        musiqueCourante.stop();
    }
    musiqueCourante = h;
    musiqueCourante.play();
}