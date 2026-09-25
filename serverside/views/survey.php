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
                        <div class="mb-4">
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
                        </div>

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
                         <label>Choose Color Scheme:</label>
                            <button type="button" id="openColorModal">Select 3 Colors</button>
                            <input type="hidden" id="colorSchemeInput" name="colorScheme">
                         <!-- The Popup Modal -->
                            <div id="colorModal" class="modal" style="display:none;">
                            <div class="modal-content">
                                <span class="close">&times;</span>
                                <h3>Pick 3 Colors (Triadic Scheme)</h3>
                                
                                <!-- Color Wheel Container (SVG or Canvas) -->
                                <div class="color-wheel-container">
                                <canvas id="colorWheel" width="250" height="250"></canvas>
                                </div>

                                <!-- Preview of Selected 3 Colors -->
                                <div class="palette-preview">
                                <div class="swatch" id="swatch1"></div>
                                <div class="swatch" id="swatch2"></div>
                                <div class="swatch" id="swatch3"></div>
                                </div>

                        <!-- 5. Submit Button -->
                        <div class="d-grid">
                            <button type="submit" class="btn btn-primary btn-lg">Submit Suggestions</button>
                        </div>

                    </form>
                

                </div>
            </div>
        </div>
    </div>
</div>
</section>

