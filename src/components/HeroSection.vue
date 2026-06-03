<template>
  <!-- NAV BAR -->
  <header class="site-nav">
    <div class="site-nav__inner">
      <img src="/img/header-logo.png" alt="KIA — Partenaire Officiel FIFA" />
    </div>
  </header>

  <!-- HERO -->
  <section class="hero">
    <!-- Background image fills the whole section -->

    <div class="hero__inner">
      <!-- LEFT: text content -->
      <div class="hero__content">
        <p class="hero__eyebrow">Votre but ?</p>
        <h1 class="hero__title">
          <span class="hero__title-line1">Gagnez le Kia EV2</span>
          <span class="hero__title-line2">100% électrique</span>
        </h1>
      </div>
    </div>

    <!-- mention desktop -->
    <p class="hero__legal hero__legal--desktop">Visuel généré par intelligence artificielle.<br>Image non contractuelle, présentée à titre d'illustration.</p>
    <!-- mention mobile -->
    <p class="hero__legal hero__legal--mobile">Visuel généré par intelligence artificielle.<br>Image non contractuelle, présentée à titre d'illustration.</p>

  </section>
</template>

<script setup>
function scrollTo() {
  const el = document.getElementById('quiz')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
/* ── NAV ── */
.site-nav {
  width: 100%;
  background-color: #05141F;
}
.site-nav__inner {
  padding: 18px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.site-nav__inner img {
  width: 190px;
  height: auto;
}

/* ── HERO ── */
.hero {
  position: relative;
  width: 100%;
  height: 760px;
  background:
    linear-gradient(108deg, rgba(5, 20, 31, 0.40) 31.85%, rgba(5, 20, 31, 0.00) 56.88%),
    linear-gradient(0deg, #05141F 10.72%, rgba(5, 20, 31, 0.00) 18.49%, rgba(5, 20, 31, 0.00) 30.13%),
    url('/img/header-bg.png') center / cover no-repeat;
}

.hero__inner {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 0 0 104px;
  display: flex;
  align-items: center;
}

/* ── LEFT TEXT ── */
.hero__content {
  width: 660px;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 100px;
  height: 100%;
}

.hero__eyebrow {
  font-family: 'KIA', Arial, sans-serif;
  font-size: 64px;
  font-weight: 600;
  color: #fff;
  margin: 0;
  line-height: normal;
}

.hero__title {
  margin: 0 0 40px;
  line-height: normal;
  white-space: nowrap;
}
.hero__title-line1,
.hero__title-line2 {
  display: block;
  font-family: 'KIA', Arial, sans-serif;
  font-size: 38px;
  font-weight: 400;
  color: #fff;
  letter-spacing: 2.28px;
  line-height: 48px;
}


/* ── LEGAL (bottom-right) ── */
.hero__legal {
  position: absolute;
  text-align: right;
  max-width: 340px;
  line-height: 1.4;
  z-index: 2;
  margin: 0;
}
.hero__legal--desktop {
  bottom: 150px;
  right: 65px;
  font-size: 14px;
  color: rgba(255,255,255,0.8);
}
.hero__legal--mobile { display: none; }

/* spacer desktop : masqué */
.hero__img-spacer { display: none; }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .hero {
    height: 640px;
  }
  .hero__inner {
    padding: 0 0 0 48px;
  }
  .hero__content {
    width: 480px;
    padding-top: 40px;
  }
  .hero__eyebrow { font-size: 44px; }
  .hero__title-line1 { font-size: 32px; letter-spacing: 1.5px; line-height: 40px; }
  .hero__title-line2 { font-size: 32px; letter-spacing: 1.5px; line-height: 40px; }
}

@media (max-width: 768px) {
  .hero__legal--desktop { display: none; }
  .hero__legal--mobile {
    display: block;
    position: absolute;
    bottom: 75px;
    right: 16px;
    font-size: 8px;
    color: rgba(255,255,255,0.7);
    text-align: right;
  }

  .hero {
    background:
      url('/img/header-bg-m.png') top center / 100% auto no-repeat,
      #05141F;
    height: auto;
    min-height: 460px;
  }

  .hero__inner {
    padding:0px 24px 48px !important;
    height: auto;
    align-items: flex-start;
  }

  .hero__content {
    width: 100%;
    padding: 0;
    height: auto;
    text-align: center;
    align-items: center;
  }

  .site-nav__inner img { width: 150px; height: auto; }

  .hero__eyebrow {
    font-size: 38px;
    font-weight: 600;
  }

  .hero__title {
    white-space: normal;
    text-align: center;
    margin-bottom: 0;
  }
  .hero__title-line1,
  .hero__title-line2 {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 32px;
    font-weight: 300;
    line-height: 34px;
    letter-spacing: -1.6px;
    color: #fff;
  }

}
</style>
