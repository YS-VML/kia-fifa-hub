<template>
  <section class="play" id="jouer">
    <div class="container">

      <!-- Quiz + Prize -->
      <div class="play__bottom">

        <!-- QUIZ -->
        <div class="quiz" :class="{ 'quiz--participated': participated }" id="quiz">
          <img class="quiz__trophy" src="/img/trophy.png" alt="" />

          <!-- Barre de progression partagée -->
          <div v-if="step >= 1 && step <= 4" class="quiz__progress">
            <div class="quiz__progress-bar" :style="{ width: (step * 25) + '%' }"></div>
          </div>

          <!-- STEP 0 — Vérification email (hub) -->
          <template v-if="step === 0 && !participated">
            <div class="quiz__header">
              <h3 class="quiz__q-title hub-check__title">Je viens d’essayer un véhicule Kia.<br>Je confirme mon essai en concession.​</h3>
            </div>
            <div class="qform__group" style="order:3">
              <label class="qform__label">Adresse e-mail*</label>
              <input class="qform__input" type="email" v-model="emailInput"
                placeholder="adresse@mail.com"
                @keyup.enter="checkEmail" />
              <p v-if="emailError" class="qform__error" style="margin-top:6px">{{ emailError }}</p>
            </div>
            <div class="quiz__cta" style="justify-content:center; margin-top:-20px">
              <button class="btn-gold" @click="checkEmail" :disabled="!emailInput || emailChecking">
                {{ emailChecking ? 'Vérification…' : 'Je confirme' }}
                <svg v-if="!emailChecking" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </template>

          <!-- PARTICIPATED — Déjà inscrit (hub) -->
          <template v-if="participated">
            <div class="hub-participated">
              <p class="hub-participated__title">
                🎉 Bravo<template v-if="participatedPrenom">&nbsp;{{ participatedPrenom }}</template>, votre participation est complète&nbsp;!
              </p>
              <p class="hub-participated__text">
                Vous avez répondu au quiz et essayé une Kia. Votre participation est complète. Vous êtes éligible à l'ensemble des lots du jeu Kia × Coupe du Monde de la FIFA 2026™ :
              </p>
              <ul class="hub-participated__list">
                <li><strong>Kia EV2 100 % électrique</strong></li>
                <li>Week-end à Chamonix</li>
                <li>Goodies Kia × FIFA officiels</li>
                <li>Entrées Mondial de l'Auto</li>
              </ul>
              <p class="hub-participated__rdv">
                <strong>On vous donne rendez-vous pour le tirage au sort !</strong>
              </p>
              <div class="quiz__cta" style="justify-content:center">
                <a href="https://www.kia.com/fr/vehicules/ev2/" target="_blank" class="btn-gold hub-participated__btn">
                  Découvrir le Kia EV2
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </a>
              </div>
            </div>
          </template>

          <!-- Q1 -->
          <template v-if="step === 1">
            <div class="quiz__header">
              <p class="quiz__q-label">Question 1 :</p>
              <h3 class="quiz__q-title">Depuis quelle année Kia est-il partenaire officiel de la FIFA ?</h3>
            </div>
            <div class="quiz__options">
              <div v-for="opt in q1Options" :key="opt.val"
                class="quiz__option" :class="{ active: answers[1] === opt.val }"
                @click="answers[1] = opt.val">
                <div class="quiz__option-letter">{{ opt.letter }}</div>
                <div class="quiz__option-text">{{ opt.label }}</div>
              </div>
            </div>
            <div class="quiz__cta">
              <button class="btn-gold" @click="next(1)" :disabled="!answers[1]">
                Question suivante
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </template>

          <!-- Q2 -->
          <template v-if="step === 2">
            <div class="quiz__header">
              <p class="quiz__q-label">Question 2 :</p>
              <h3 class="quiz__q-title">Où est fabriqué le nouveau Kia EV2&nbsp;?</h3>
            </div>
            <div class="quiz__options">
              <div v-for="opt in q2Options" :key="opt.val"
                class="quiz__option" :class="{ active: answers[2] === opt.val }"
                @click="answers[2] = opt.val">
                <div class="quiz__option-letter">{{ opt.letter }}</div>
                <div class="quiz__option-text">{{ opt.label }}</div>
              </div>
            </div>
            <div class="quiz__cta">
              <button class="btn-gold" @click="next(2)" :disabled="!answers[2]">
                Question suivante
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </template>

          <!-- Q3 -->
          <template v-if="step === 3">
            <div class="quiz__header">
              <p class="quiz__q-label">Question 3 :</p>
              <h3 class="quiz__q-title">Combien de temps faut-il pour recharger la batterie du Kia EV2 de 10% à 80% en recharge rapide ?</h3>
            </div>
            <div class="quiz__options">
              <div v-for="opt in q3Options" :key="opt.val"
                class="quiz__option" :class="{ active: answers[3] === opt.val }"
                @click="answers[3] = opt.val">
                <div class="quiz__option-letter">{{ opt.letter }}</div>
                <div class="quiz__option-text">{{ opt.label }}</div>
              </div>
            </div>
            <div class="quiz__cta">
              <button class="btn-gold" @click="next(3)" :disabled="!answers[3]">
                Question suivante
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </template>

          <!-- Q4 — pronostic (custom dropdown) -->
          <template v-if="step === 4">
            <div class="quiz__header">
              <p class="quiz__q-label">Question 4 :</p>
              <h3 class="quiz__q-title">Selon vous, quel pays va remporter la Coupe du Monde de la FIFA 2026™ ?<sup>*</sup></h3>
            </div>

            <!-- Custom dropdown -->
            <div class="quiz__dropdown" :class="{ open: dropdownOpen }" v-click-outside="closeDropdown">
              <button class="quiz__dropdown-trigger" @click="dropdownOpen = !dropdownOpen" type="button">
                <span v-if="answers[4]" class="quiz__dropdown-selected">
                  <span v-if="countries.find(c=>c.label===answers[4])?.file" class="quiz__flag" :style="`background-image: url(/img/uniformes_600x400/${countries.find(c=>c.label===answers[4])?.file}.svg)`"></span>
                  {{ answers[4] }}
                </span>
                <span v-else class="quiz__dropdown-placeholder">Sélectionnez un pays</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div v-if="dropdownOpen" class="quiz__dropdown-list">
                <button
                  v-for="c in countries" :key="c.file"
                  class="quiz__dropdown-item"
                  :class="{ active: answers[4] === c.label }"
                  type="button"
                  @click="answers[4] = c.label; dropdownOpen = false"
                >
                  <span>{{ c.label }}</span>
                  <span v-if="c.file" class="quiz__flag" :style="`background-image: url(/img/uniformes_600x400/${c.file}.svg)`"></span>
                  <span v-else class="quiz__flag-empty"></span>
                </button>
              </div>
            </div>

            <div class="quiz__cta">
              <button class="btn-gold" @click="goToForm" :disabled="!answers[4]">
                Je finalise ma participation
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
            <p class="quiz__note">*Le résultat du pronostic n'a pas d'impact sur le tirage au sort</p>
          </template>

          <!-- STEP 5 — FORM -->
          <template v-if="step === 5">
            <!-- Success -->
            <div v-if="submitted" class="qform-success">
              <p>Merci pour votre participation !<br/>Bonne chance pour le tirage au sort.</p>
            </div>

            <form v-else @submit.prevent="onSubmit" class="qform">
              <div class="qform__header">
                <p class="qform__eyebrow">Participez au jeu</p>
                <h3 class="qform__title">En nous communiquant vos coordonnées,<br/>vous êtes éligible à de nombreux lots.</h3>
              </div>

              <!-- Civilité -->
              <div class="qform__group">
                <label class="qform__label">Civilité*</label>
                <div class="quiz__dropdown" :class="{ open: civiliteOpen }" v-click-outside="() => civiliteOpen = false">
                  <button class="quiz__dropdown-trigger" type="button" @click="civiliteOpen = !civiliteOpen">
                    <span v-if="form.civilite">{{ form.civilite === 'M' ? 'M.' : 'Mme' }}</span>
                    <span v-else class="quiz__dropdown-placeholder">Sélectionnez</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div v-if="civiliteOpen" class="quiz__dropdown-list">
                    <button v-for="opt in civiliteOptions" :key="opt.val" type="button"
                      class="quiz__dropdown-item" :class="{ active: form.civilite === opt.val }"
                      @click="form.civilite = opt.val; civiliteOpen = false">
                      <span>{{ opt.label }}</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div class="qform__group">
                <label class="qform__label">Adresse e-mail*</label>
                <input class="qform__input" type="email" v-model="form.email" placeholder="adresse@mail.com" required />
              </div>

              <!-- Nom + Prénom -->
              <div class="qform__row">
                <div class="qform__group">
                  <label class="qform__label">Nom*</label>
                  <input class="qform__input" type="text" v-model="form.nom" placeholder="Dupont" required />
                </div>
                <div class="qform__group">
                  <label class="qform__label">Prénom*</label>
                  <input class="qform__input" type="text" v-model="form.prenom" placeholder="Jean" required />
                </div>
              </div>

              <!-- Téléphone -->
              <div class="qform__group">
                <label class="qform__label">Téléphone*</label>
                <input class="qform__input" type="tel" v-model="form.tel" placeholder="0123456789" maxlength="14" required />
              </div>

              <p class="qform__required">*champ obligatoire</p>

              <!-- [HIDDEN] pitch + optin1 + concession fields — à réactiver -->
              <template v-if="false">
              <p class="qform__pitch">Passez à la vitesse supérieure pour tenter de gagner le Kia EV2 ou un week-end à Chamonix.</p>
              <div class="qform__checks">
                <label class="qform__check">
                  <input type="checkbox" v-model="form.optin1" />
                  <span>J'accepte d'être recontacté·e par une concession Kia afin d'organiser mon essai.</span>
                </label>

                <!-- Champs conditionnels si optin1 coché -->
                <Transition name="concession-slide">
                <div v-if="form.optin1" class="qform__concession">
                  <div class="qform__group">
                    <label class="qform__label">Code postal*</label>
                    <input class="qform__input" type="text" v-model="form.concessionCodePostal" placeholder="31140" :required="form.optin1" />
                  </div>
                  <div class="qform__group">
                    <label class="qform__label">Ville*</label>
                    <input class="qform__input" type="text" v-model="form.concessionVille" placeholder="Lyon" :required="form.optin1" />
                  </div>
                  <div class="qform__group">
                    <label class="qform__label">Choisissez votre concession*</label>
                    <p v-if="dealersError" class="qform__dealer-hint qform__dealer-hint--error">{{ dealersError }}</p>
                    <p v-if="concessionHint && !dealers.length && !dealersLoading" class="qform__dealer-hint qform__dealer-hint--warn">Veuillez d'abord renseigner votre code postal.</p>
                    <div class="quiz__dropdown" :class="{ open: concessionOpen && dealers.length > 0 }" v-click-outside="() => concessionOpen = false">
                      <button class="quiz__dropdown-trigger" type="button" @click="dealers.length ? (concessionOpen = !concessionOpen) : (concessionHint = true)">
                        <span v-if="form.concession">Kia | {{ dealers.find(d => d.code === form.concession)?.ville }} – {{ dealers.find(d => d.code === form.concession)?.nom }}</span>
                        <span v-else-if="dealersLoading" class="quiz__dropdown-placeholder">Recherche en cours…</span>
                        <span v-else-if="dealers.length === 0" class="quiz__dropdown-placeholder">Renseignez votre code postal</span>
                        <span v-else class="quiz__dropdown-placeholder">Sélectionnez votre concession</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                      </button>
                      <div v-if="concessionOpen && dealers.length" class="quiz__dropdown-list">
                        <button v-for="d in dealers" :key="d.code" type="button"
                          class="quiz__dropdown-item" :class="{ active: form.concession === d.code }"
                          @click="form.concession = d.code; concessionOpen = false">
                          <span>Kia | {{ d.ville }} – {{ d.nom }}</span>
                          <span class="qform__dealer-dist">{{ d.distance.toFixed(1) }} km</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="qform__group">
                    <label class="qform__label">Choisissez le modèle qui vous intéresse*</label>
                    <div class="quiz__dropdown" :class="{ open: modeleOpen }" v-click-outside="() => modeleOpen = false">
                      <button class="quiz__dropdown-trigger" type="button" @click="modeleOpen = !modeleOpen">
                        <span v-if="form.modele">{{ modeleAllOptions.find(m => m.val === form.modele)?.label }}</span>
                        <span v-else class="quiz__dropdown-placeholder">Sélectionnez un modèle</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                      </button>
                      <div v-if="modeleOpen" class="quiz__dropdown-list">
                        <template v-for="g in modeleGroups" :key="g.group">
                          <div class="quiz__dropdown-group">{{ g.group }}</div>
                          <button v-for="m in g.options" :key="m.val" type="button"
                            class="quiz__dropdown-item quiz__dropdown-item--indented"
                            :class="{ active: form.modele === m.val }"
                            @click="form.modele = m.val; modeleOpen = false">
                            <span>{{ m.label }}</span>
                          </button>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
                </Transition>
              </div>
              </template>

              <div class="qform__checks">
                <label class="qform__check">
                  <input type="checkbox" v-model="form.optin2" required />
                  <span>J'accepte le <a href="/reglement.html" target="_blank">règlement du jeu</a> et la <a href="/mentions-legales.html" target="_blank">politique de confidentialité</a>*</span>
                </label>
                <label class="qform__check">
                  <input type="checkbox" v-model="form.optin3" />
                  <span>J'accepte de recevoir des communications marketing de Kia par e-mail et SMS</span>
                </label>
              </div>

              <p v-if="formError" class="qform__error">{{ formError }}</p>

              <button class="btn-gold qform__submit" type="submit" :disabled="submitting">
                {{ submitting ? 'Envoi en cours…' : 'Je valide mon inscription' }}
                <svg v-if="!submitting" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </form>
          </template>
        </div>

        <!-- PRIZE -->
        <div class="prize">
          <p class="prize__title">À gagner</p>
          <div class="prize__main">
            <picture>
              <source srcset="/img/grandprix-m.png" media="(max-width: 768px)" />
              <img src="/img/grandprix.png" alt="Grand prix : 1 Kia EV2" />
            </picture>
          </div>
          <p class="prize__subtitle">Et d'autres lots à gagner</p>
          <div class="prize__others">
            <div class="prize__item prize__item--chamonix">
              <img src="/img/logo1.png" alt="" />
              <span class="prize__item-label">Week-end à<br/>Chamonix</span>
            </div>
            <div class="prize__row-bottom">
              <div class="prize__item prize__item--mondial">
                <img src="/img/logo3.png" alt="" />
                <span class="prize__item-label">Places pour le Mondial<br/>de l'Auto</span>
              </div>
              <div class="prize__item prize__item--goodies">
                <img src="/img/logo2.png" alt="" />
                <span class="prize__item-label">Goodies<br/>FIFA</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { quizAnswers as answers } from '../quizStore.js'
import { useDealers } from '../useDealers.js'

const step = ref(0)
const dropdownOpen = ref(false)
const civiliteOpen = ref(false)
const concessionOpen = ref(false)
const modeleOpen = ref(false)
const concessionHint = ref(false)

// Hub — vérification email
const EMAIL_CHECK_URL = 'https://www.insightondemand.fr/api/kia/cdm2026.php'
const emailInput = ref('')
const emailChecking = ref(false)
const emailError = ref('')
const participated = ref(false)
const participatedPrenom = ref('')

async function checkEmail() {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    emailError.value = 'Veuillez saisir une adresse e-mail valide.'
    return
  }
  emailError.value = ''
  emailChecking.value = true
  try {
    // Emails de test locaux (court-circuit API)
    const TEST_EMAILS = { 'test1@test.fr': '1', 'test0@test.fr': '0' }
    const testOverride = TEST_EMAILS[emailInput.value.toLowerCase()]
    const data = testOverride !== undefined
      ? testOverride
      : await fetch(`${EMAIL_CHECK_URL}?email=${encodeURIComponent(emailInput.value)}`).then(r => r.text())
    const exists = parseInt(data.trim()) === 1

    if (exists) {
      participated.value = true
    } else {
      form.email = emailInput.value
      _source = 'concession'
      step.value = 1
    }
  } catch {
    emailError.value = 'Erreur de connexion. Veuillez réessayer.'
  } finally {
    emailChecking.value = false
  }
}

const civiliteOptions = [
  { label: 'M.', val: 'M' },
  { label: 'Mme', val: 'Mme' },
]

const modeleGroups = [
  {
    group: 'Gamme Kia 100% électrique',
    options: [
      { label: 'EV2', val: 'EV2 100% électrique' },
      { label: 'EV3', val: 'EV3 100% électrique' },
      { label: 'EV4', val: 'EV4 100% électrique' },
      { label: 'EV5', val: 'EV5 100% électrique' },
      { label: 'EV6', val: 'EV6 100% électrique' },
      { label: 'EV9', val: 'EV9 100% électrique' },
    ],
  },
  {
    group: 'Gamme Kia SUV & Crossover',
    options: [
      { label: 'Niro Hybride',                  val: 'Niro Hybride' },
      { label: 'Niro Hybride Rechargeable',     val: 'Niro Hybride Rechargeable' },
      { label: 'Sportage Hybride',              val: 'Sportage Hybride' },
      { label: 'Sportage Hybride Rechargeable', val: 'Sportage Hybride Rechargeable' },
      { label: 'Sorento Hybride Rechargeable',  val: 'Sorento Hybride Rechargeable' },
    ],
  },
  {
    group: 'Gamme Kia Ceed',
    options: [
      { label: 'Ceed',    val: 'Ceed' },
      { label: 'ProCeed', val: 'ProCeed' },
      { label: 'Ceed SW', val: 'Ceed SW' },
      { label: 'XCeed',   val: 'XCeed' },
    ],
  },
  {
    group: 'Gamme Kia Citadine',
    options: [
      { label: 'Picanto', val: 'Picanto' },
      { label: 'Stonic', val: 'Stonic' },
    ],
  },
]

const modeleAllOptions = modeleGroups.flatMap(g => g.options)

const WS_URL = 'https://insightondemand.fr/webservice/rest/kia/vml_cdm_2026.php'

// Mapping A/B/C → valeurs réelles attendues par l'API
const q1Map = { A: '1998', B: '2007', C: '2018' }
const q2Map = { A: 'Mexique', B: 'Slovaquie', C: 'Corée du Sud' }
const q3Map = { A: '30 minutes', B: '1h05', C: '2h30' }

// Paramètres URL (source, levier)
const _urlParams = new URLSearchParams(window.location.search)
let _source = _urlParams.get('source') || ''
const _levier = _urlParams.get('levier') || ''

const form = reactive({
  civilite: '',
  email: '',
  nom: '',
  prenom: '',
  tel: '',
  codePostal: '',
  ville: '',
  optin1: false,
  optin2: false,
  optin3: false,
  concessionCodePostal: '',
  concessionVille: '',
  concession: '',
  modele: '',
})

const submitting = ref(false)
const submitted = ref(false)
const formError = ref('')

const concessionCodePostalRef = computed(() => form.concessionCodePostal)
const { dealers, ville: autoVille, loading: dealersLoading, error: dealersError } = useDealers(concessionCodePostalRef)

watch(autoVille, v => { if (v && !form.concessionVille) form.concessionVille = v })
watch(dealers, () => { form.concession = ''; if (dealers.value.length) concessionHint.value = false })

const q1Options = [
  { letter: 'A', val: 'A', label: '1998' },
  { letter: 'B', val: 'B', label: '2007' },
  { letter: 'C', val: 'C', label: '2018' },
]
const q2Options = [
  { letter: 'A', val: 'A', label: 'Mexique' },
  { letter: 'B', val: 'B', label: 'Slovaquie' },
  { letter: 'C', val: 'C', label: 'Corée du Sud' },
]
const q3Options = [
  { letter: 'A', val: 'A', label: '30 minutes' },
  { letter: 'B', val: 'B', label: '1 h 05' },
  { letter: 'C', val: 'C', label: '2 h 30' },
]

// 48 pays classés par rang FIFA (juin 2025)
const countries = [
  { label: 'France',              file: 'France' },           // #1
  { label: 'Espagne',             file: 'Espagne' },          // #2
  { label: 'Argentine',           file: 'Argentine' },        // #3
  { label: 'Angleterre',          file: 'Angleterre' },       // #4
  { label: 'Portugal',            file: 'Portugal' },         // #5
  { label: 'Brésil',              file: 'Bresil' },           // #6
  { label: 'Pays-Bas',            file: 'Pays-Bas' },         // #7
  { label: 'Maroc',               file: 'Maroc' },            // #8
  { label: 'Belgique',            file: 'Belgique' },         // #9
  { label: 'Allemagne',           file: 'Allemagne' },        // #10
  { label: 'Croatie',             file: 'Croatie' },          // #11
  { label: 'Colombie',            file: 'Colombie' },         // #13
  { label: 'Sénégal',             file: 'Senegal' },          // #14
  { label: 'Mexique',             file: 'Mexique' },          // #15
  { label: 'États-Unis',          file: 'Etats-Unis' },       // #16
  { label: 'Uruguay',             file: 'Uruguay' },          // #17
  { label: 'Japon',               file: 'Japon' },            // #18
  { label: 'Suisse',              file: 'Suisse' },           // #19
  { label: 'Iran',                file: 'Iran' },             // #21
  { label: 'Turquie',             file: 'Turquie' },          // #22
  { label: 'Équateur',            file: 'Equateur' },         // #23
  { label: 'Autriche',            file: 'Autriche' },         // #24
  { label: 'Corée du Sud',        file: 'Coree_du_Sud' },     // #25
  { label: 'Australie',           file: 'Australie' },        // #27
  { label: 'Algérie',             file: 'Algerie' },          // #28
  { label: 'Égypte',              file: 'Egypte' },           // #29
  { label: 'Canada',              file: 'Canada' },           // #30
  { label: 'Norvège',             file: 'Norvege' },          // #31
  { label: 'Panama',              file: 'Panama' },           // #33
  { label: 'Côte d\'Ivoire',      file: 'Cote_d_Ivoire' },   // #34
  { label: 'Suède',               file: 'Suede' },            // #38
  { label: 'Paraguay',            file: 'Paraguay' },         // #40
  { label: 'Rép. tchèque',        file: 'Republique_tcheque' }, // #41
  { label: 'Écosse',              file: 'Ecosse' },           // #43
  { label: 'Tunisie',             file: 'Tunisie' },          // #44
  { label: 'Congo RD',            file: 'Congo_RD' },         // #46
  { label: 'Ouzbékistan',         file: 'Ouzbekistan' },      // #50
  { label: 'Qatar',               file: 'Qatar' },            // #55
  { label: 'Irak',                file: 'Irak' },             // #57
  { label: 'Afrique du Sud',      file: 'Afrique_du_Sud' },   // #60
  { label: 'Arabie Saoudite',     file: 'Arabie_Saoudite' },  // #61
  { label: 'Jordanie',            file: 'Jordanie' },         // #63
  { label: 'Bosnie-Herzégovine',  file: 'Bosnie_Herzegovine' }, // #65
  { label: 'Cap-Vert',            file: 'Cap_Vert' },         // #69
  { label: 'Ghana',               file: 'Ghana' },            // #74
  { label: 'Curaçao',             file: 'Curacao' },          // #82
  { label: 'Haïti',               file: 'Haiti' },            // #83
  { label: 'Nouvelle-Zélande',    file: 'Nouvelle_Zelande' }, // #85
]

function closeDropdown() { dropdownOpen.value = false }

function next(q) {
  if (!answers[q]) return
  step.value = q + 1
}

function goToForm() {
  if (!answers[4]) return
  step.value = 5
}

async function onSubmit() {
  formError.value = ''
  if (typeof fbq !== 'undefined') fbq('track', 'CompleteRegistration')

  const telClean = form.tel.replace(/[\s.\-()]/g, '')
  if (!/^(?:(?:\+|00)33|0)[1-9]\d{8}$/.test(telClean)) {
    formError.value = 'Veuillez saisir un numéro de téléphone français valide (ex : 0612345678).'
    return
  }

  if (form.optin1) {
    if (!form.concessionCodePostal || !form.concessionVille) {
      formError.value = 'Veuillez renseigner votre code postal et votre ville.'
      return
    }
    if (!form.concession) {
      formError.value = 'Veuillez sélectionner une concession.'
      return
    }
    if (!form.modele) {
      formError.value = 'Veuillez sélectionner un modèle.'
      return
    }
  }
  submitting.value = true

  const payload = {
    campagne:      'VML_CDM_2026',
    civilite:      form.civilite === 'M' ? 'Mr' : 'Mrs',
    nom:           form.nom.trim(),
    prenom:        form.prenom.trim(),
    email:         form.email.trim(),
    telephone:     form.tel.replace(/\s/g, ''),
    optin:         form.optin3 ? 'oui' : 'non',
    essai:         form.optin1 ? 'oui' : 'non',
    ...(form.optin1 ? {
      code_postal:   form.concessionCodePostal.trim(),
      ville:         form.concessionVille.trim(),
      td_concession: form.concession,
      td_modele:     form.modele,
    } : {}),
    source:        _source,
    levier:        _levier,
    question1:     q1Map[answers[1]] || answers[1],
    question2:     q2Map[answers[2]] || answers[2],
    question3:     q3Map[answers[3]] || answers[3],
    question4:     answers[4], 
  }

  try {
    const res = await fetch(WS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(payload).toString(),
    })
    const text = await res.text()
    if (text.includes('OK')) {
      participatedPrenom.value = form.prenom.trim()
      participated.value = true
      step.value = 0
    } else if (text.includes('numéro de téléphone est déjà en base') && text.includes('email est déjà en base')) {
      formError.value = 'Ce numéro de téléphone et cette adresse e-mail sont déjà associés à une participation récente.'
    } else if (text.includes('numéro de téléphone est déjà en base')) {
      formError.value = 'Ce numéro de téléphone est déjà associé à une participation récente.'
    } else if (text.includes('email est déjà en base')) {
      formError.value = 'Cette adresse e-mail est déjà associée à une participation récente.'
    } else {
      formError.value = 'Erreur lors de l\'envoi. Veuillez réessayer.'
    }
  } catch {
    formError.value = 'Erreur réseau. Veuillez réessayer.'
  } finally {
    submitting.value = false
  }
}

// directive v-click-outside
const vClickOutside = {
  mounted(el, binding) {
    el._clickOutside = (e) => { if (!el.contains(e.target)) binding.value() }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el) { document.removeEventListener('click', el._clickOutside) }
}
</script>
