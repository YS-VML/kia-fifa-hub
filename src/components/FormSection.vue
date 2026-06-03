<template>
  <section class="form-section" id="form">
    <div class="container">
      <div class="form-wrap">
        <div class="form-header">
          <p class="form-header__eyebrow">Participez au jeu</p>
          <h2 class="form-header__title">
            En nous communiquant vos coordonnées,<br />
            vous êtes éligible à de nombreux lots.
          </h2>
          <img class="form-header__trophy" src="/img/trophy.png" alt="" />
        </div>

        <!-- Message succès -->
        <div v-if="submitted" class="form-success">
          <p>Merci pour votre participation !<br/>Bonne chance pour le tirage au sort.</p>
        </div>

        <form v-else @submit.prevent="onSubmit">

          <!-- Civilité -->
          <div class="form-group">
            <label class="form-label">Civilité*</label>
            <div class="form-select-wrap">
              <select class="form-select" v-model="form.civilite" required>
                <option value="" disabled>Sélectionnez</option>
                <option value="M">M.</option>
                <option value="Mme">Mme</option>
              </select>
              <span class="form-select-arrow">▼</span>
            </div>
          </div>

          <!-- Email -->
          <div class="form-group">
            <label class="form-label">Adresse e-mail*</label>
            <input class="form-input" type="email" v-model="form.email" placeholder="adresse@mail.com" required />
          </div>

          <!-- Nom + Prénom -->
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nom*</label>
              <input class="form-input" type="text" v-model="form.nom" placeholder="Dupont" required />
            </div>
            <div class="form-group">
              <label class="form-label">Prénom*</label>
              <input class="form-input" type="text" v-model="form.prenom" placeholder="adresse@mail.com" required />
            </div>
          </div>

          <!-- Téléphone -->
          <div class="form-group">
            <label class="form-label">Téléphone*</label>
            <input class="form-input" type="tel" v-model="form.tel" placeholder="0123456789" required />
          </div>

          <!-- Code postal + Ville -->
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Code postal*</label>
              <input class="form-input" type="text" v-model="form.codePostal" placeholder="31140" required />
            </div>
            <div class="form-group">
              <label class="form-label">Ville*</label>
              <input class="form-input" type="text" v-model="form.ville" placeholder="Lyon" required />
            </div>
          </div>

          <p class="form-required">*champ obligatoire</p>

          <!-- Checkboxes -->
          <div class="form-checks">
            <label class="form-check">
              <input type="checkbox" v-model="form.optin1" required />
              <span>
                Passez à la vitesse supérieure pour tenter de gagner le Kia EV2 ou un week-end à Chamonix.
                J'accepte d'être recontacté·e par une concession Kia afin d'organiser mon essai.
              </span>
            </label>
            <label class="form-check">
              <input type="checkbox" v-model="form.optin2" required />
              <span>
                J'accepte le <a href="#" target="_blank">règlement du jeu</a> et la
                <a href="#" target="_blank">politique de confidentialité</a>
              </span>
            </label>
            <label class="form-check">
              <input type="checkbox" v-model="form.optin3" />
              <span>J'accepte de recevoir des communications marketing de Kia par e-mail et SMS</span>
            </label>
          </div>

          <p v-if="error" class="form-error">{{ error }}</p>

          <button class="btn-gold form-submit" type="submit" :disabled="submitting">
            {{ submitting ? 'Envoi en cours…' : 'Je valide mon inscription' }}
            <svg v-if="!submitting" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { quizAnswers } from '../quizStore.js'

const WS_URL = 'https://www.insightondemand.fr/webservice/rest/kia/ev2_spotify.php'

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
})

const submitting = ref(false)
const submitted = ref(false)
const error = ref('')

async function onSubmit() {
  submitting.value = true
  error.value = ''

  const payload = {
    civilite: form.civilite === 'M' ? 'Mr' : 'Mrs',
    nom: form.nom.trim(),
    prenom: form.prenom.trim(),
    email: form.email.trim(),
    telephone: form.tel.replace(/\s/g, ''),
    code_postal: form.codePostal.trim(),
    ville: form.ville.trim(),
    optin: form.optin3 ? 'oui' : 'non',
    td_concession: '',
    source: '',
    levier: '',
    playlist_spotify: '',
    question1: quizAnswers[1],
    question2: quizAnswers[2],
    question3: quizAnswers[3],
    question4: quizAnswers[4],
    question5: '',
  }

  try {
    const res = await fetch(WS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const text = await res.text()
    if (text.includes('OK')) {
      submitted.value = true
    } else {
      error.value = 'Erreur lors de l\'envoi. Veuillez réessayer.'
    }
  } catch {
    error.value = 'Erreur réseau. Veuillez réessayer.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.form-section {
  background: #05141F;
  padding: 80px 0;
}

.form-wrap {
  max-width: 560px;
  margin: 0 auto;
  position: relative;
}

.form-header {
  margin-bottom: 36px;
  position: relative;
}

.form-header__eyebrow {
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #FFB917;
  font-weight: 700;
  margin-bottom: 10px;
}

.form-header__title {
  font-family: 'KIA', Arial, sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.3;
  color: #fff;
  padding-right: 80px;
}

.form-header__trophy {
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
}

.form-group {
  margin-bottom: 20px;
  flex: 1;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
  margin-bottom: 6px;
}

.form-input {
  width: 100%;
  padding: 12px 14px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.25);
  color: #fff;
  font-size: 14px;
  transition: border-color 0.2s;
}
.form-input::placeholder { color: rgba(255,255,255,0.35); }
.form-input:focus {
  outline: none;
  border-color: #FFB917;
}

.form-select-wrap { position: relative; }
.form-select {
  width: 100%;
  padding: 12px 40px 12px 14px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.25);
  color: rgba(255,255,255,0.6);
  font-size: 14px;
  appearance: none;
  cursor: pointer;
}
.form-select option { background: #05141F; }
.form-select-arrow {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: rgba(255,255,255,0.5);
  font-size: 11px;
}

.form-required {
  font-size: 11px;
  color: rgba(255,255,255,0.4);
  margin-bottom: 20px;
}

.form-checks {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 32px;
}

.form-check {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
}
.form-check input[type="checkbox"] {
  width: 16px;
  height: 16px;
  min-width: 16px;
  margin-top: 2px;
  accent-color: #FFB917;
  cursor: pointer;
}
.form-check span {
  font-size: 12px;
  line-height: 1.6;
  color: rgba(255,255,255,0.7);
}
.form-check a {
  color: #FFB917;
  text-decoration: underline;
}

.form-submit {
  width: 100%;
  justify-content: center;
  font-size: 16px;
  padding: 16px;
}

.form-success {
  text-align: center;
  padding: 48px 24px;
  font-family: 'KIA', Arial, sans-serif;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.6;
  color: #fff;
}

.form-error {
  font-size: 12px;
  color: #ff6b6b;
  margin-bottom: 12px;
}

.form-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .form-row { flex-direction: column; gap: 0; }
  .form-header__title { font-size: 20px; padding-right: 60px; }
}
</style>
