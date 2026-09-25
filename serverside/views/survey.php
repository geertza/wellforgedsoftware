<section class="bg-light">

<div class="container my-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card shadow">
                <div class="card-header bg-primary text-white">
                    <h3 class="card-title mb-0">Website Suggestion Form</h3>
                </div>
                <div class="card-body">
                    <form action="#" method="POST">
                        
                        <!-- 1. Username (First and Last) -->
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <label for="firstName" class="form-label fw-bold">First Name</label>
                                <input type="text" class="form-control" id="firstName" placeholder="John" required>
                            </div>
                            <div class="col-md-6">
                                <label for="lastName" class="form-label fw-bold">Last Name</label>
                                <input type="text" class="form-control" id="lastName" placeholder="Doe" required>
                            </div>
                        </div>

                        <!-- 2. Written Suggestions -->
                        <div class="mb-4">
                            <label for="suggestions" class="form-label fw-bold">Your Written Suggestions</label>
                            <textarea class="form-control" id="suggestions" rows="4" placeholder="Share your feedback or ideas here..." required></textarea>
                        </div>

                        <!-- 3. Rate My Site (Radio Buttons) -->
                        <!-- <div class="mb-4">
                            <label class="form-label d-block fw-bold">Rate My Site</label>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="siteRating" id="rateExcellent" value="excellent" required>
                                <label class="form-check-label" for="rateExcellent">Excellent</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="siteRating" id="rateGood" value="good">
                                <label class="form-check-label" for="rateGood">Good</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="siteRating" id="rateFair" value="fair">
                                <label class="form-check-label" for="rateFair">Fair</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="siteRating" id="ratePoor" value="poor">
                                <label class="form-check-label" for="ratePoor">Poor</label>
                            </div>
                        </div> -->
                        <button type="button" id="openModal">Rate this site</button>
                        <span id="rateStatus">No rating yet</span>

                        <!-- 4. Multiple Choice Question (Checkboxes) -->
                        <div class="mb-4">
                            <label class="form-label d-block fw-bold">What features would you like to see improved? (Select all that apply)</label>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="speed" id="checkSpeed">
                                <label class="form-check-label" for="checkSpeed">Website Loading Speed</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="design" id="checkDesign">
                                <label class="form-check-label" for="checkDesign">Visual Design & Layout</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="navigation" id="checkNavigation">
                                <label class="form-check-label" for="checkNavigation">Navigation & Search</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="content" id="checkContent">
                                <label class="form-check-label" for="checkContent">Content Quality</label>
                            </div>
                        </div>
                        <!-- pop up menu -->
                         
                        <!-- 5. Submit Button -->
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary btn-lg">Submit Suggestions</button>
                        </div>

                    </form>
                <div class="overlay" id="overlay">
  <div class="modal" role="dialog" aria-modal="true">
    <div class="stars">
      <input type="radio" id="s5" name="stars" value="5"><label for="s5" aria-label="5 stars"></label>
      <input type="radio" id="s4" name="stars" value="4"><label for="s4" aria-label="4 stars"></label>
      <input type="radio" id="s3" name="stars" value="3"><label for="s3" aria-label="3 stars"></label>
      <input type="radio" id="s2" name="stars" value="2"><label for="s2" aria-label="2 stars"></label>
      <input type="radio" id="s1" name="stars" value="1"><label for="s1" aria-label="1 star"></label>
    </div>
    <button type="button" id="cancelModal">Cancel</button>
    <button type="button" id="confirmModal" disabled>Save rating</button>
  </div>
</div>

                </div>
            </div>
        </div>
    </div>
</div>

</style>
<script>
const overlay = document.getElementById('overlay');
const openModalBtn = document.getElementById('openModal');
const cancelModalBtn = document.getElementById('cancelModal');
const confirmModalBtn = document.getElementById('confirmModal');
const rateStatus = document.getElementById('rateStatus');
const starInputs = document.querySelectorAll('input[name="stars"]');
const form = document.querySelector('form');

let savedRating = null;
let pendingRating = null;

openModalBtn.addEventListener('click', () => {
  pendingRating = savedRating;
  confirmModalBtn.disabled = pendingRating === null;
  overlay.classList.add('open');
});

cancelModalBtn.addEventListener('click', () => overlay.classList.remove('open'));

starInputs.forEach(input => {
  input.addEventListener('change', () => {
    pendingRating = Number(input.value);
    confirmModalBtn.disabled = false;
  });
});

confirmModalBtn.addEventListener('click', () => {
  savedRating = pendingRating;
  rateStatus.textContent = `${savedRating} star${savedRating === 1 ? '' : 's'} selected`;
  overlay.classList.remove('open');
});

form.addEventListener('submit', (e) => {
  if (savedRating === null) {
    e.preventDefault();
    rateStatus.textContent = 'Please rate the site before submitting';
    rateStatus.style.color = 'red';
    return;
  }
  // rating is valid — you can stash it in a hidden input here if you want
  // it included in the POST body, e.g.:
  // const hidden = document.createElement('input');
  // hidden.type = 'hidden'; hidden.name = 'siteRating'; hidden.value = savedRating;
  // form.appendChild(hidden);
});
</script>
</section>

