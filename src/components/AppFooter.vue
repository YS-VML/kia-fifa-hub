<template>
  <footer class="footer">
    <div class="container">
      <!-- Legal mentions -->
      <div class="footer__mentions">
        <p class="footer__mention-line">
          Consommations mixtes du Nouveau Kia EV2 100% électrique : 15,5 kWh / 100 km.
        </p>
        <p class="footer__mention-line">
          Jeu organisé par Kia France SAS, 2 rue des Martinets, 92500 Rueil-Malmaison. Ouvert du 8 juin au 18 juillet 2026.  Participation gratuite sans obligation d’achat. Jeu réservé aux personnes majeures résidant en France métropolitaine. Tirage au sort à partir du 22 juillet 2026. Données traitées conformément au RGPD. Jeu non sponsorisé.
        </p>
      </div>

      <!-- Energy label -->
      <div class="footer__energy">
        <img src="/img/score.png" alt="Étiquette énergie Kia EV2" class="footer__score" />
      </div>

      <!-- Bottom bar -->
      <div class="footer__bottom">
        <div class="footer__logo">
          <img src="/img/logo-kia.png" alt="KIA" />
        </div>
        <div class="footer__links">
          <a href="/mentions-legales.html" target="_blank">Mentions légales</a>
          <span>|</span>
          <a href="/reglement.html" target="_blank">Règlement</a>
          <span>|</span>
          <a href="https://www.kia.com/fr/cookies/" target="_blank">Gestion des cookies</a>
          <span>|</span>
          <a href="https://www.kia.com/fr/" target="_blank">Kia France</a>
          <span>|</span>
          <a href="https://www.kia.com/fr/nous-contacter/contact/#/" target="_blank">Nous contacter</a>
        </div>
        <div class="footer__socials">
          <a href="https://www.facebook.com/kiafrance/" target="_blank" aria-label="Facebook">
            <img src="/img/fb.png" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/kiafrance/" target="_blank" aria-label="Instagram">
            <img src="/img/insta.png" alt="Instagram" />
          </a>
          <a href="https://twitter.com/kiafrance" target="_blank" aria-label="Twitter/X">
            <img src="/img/x.png" alt="X" />
          </a>
          <a href="https://www.youtube.com/user/KIAFrance" target="_blank" aria-label="YouTube">
            <img src="/img/yt.png" alt="YouTube" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #05141F;
  padding: 40px 0 0;
}

.footer__mentions {
  padding: 0 0 24px; 
}

.footer__mention-line {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: #fff;
  line-height: 1.6;
  margin: 0 0 8px;
}
.footer__mention-line:last-child { margin-bottom: 0; }

.footer__energy {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.footer__energy-label {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: rgba(255,255,255,0.7);
  line-height: 1.4;
}

.footer__score {
  width: 150px;
  height: auto;
}

.footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 0;
}

.footer__logo img {
  width: 88px;
  height: auto;
}

.footer__links {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.footer__links a {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 11px;
  color: #fff;
  text-decoration: none;
  transition: opacity 0.2s;
}
.footer__links a:hover { opacity: 0.75; }

.footer__links span {
  color: #fff;
  font-size: 11px;
}

.footer__socials {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer__socials a {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: opacity 0.2s;
}
.footer__socials a:hover { opacity: 0.75; }

.footer__socials img {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .footer__bottom {
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 20px 0 24px;
  }

  .footer__links {
    gap: 6px;
    justify-content: center;
  }

  .footer__energy {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
