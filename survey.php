<!doctype html>
<html lang="en">

<head>
  <?php include 'inc/head.php'; ?>
</head>

<body>
  <?php include 'inc/nav.php'; ?>
  <div id="app" class="container survey-form">
    <section class="mx-auto max-w-xl px-4 py-10">
      <form
        id="survey"
        action="process.php"
        method="post"
        class="space-y-7 rounded-xl bg-white p-6 shadow-md sm:p-8">
        <header>
          <h1 class="text-2xl font-bold text-slate-900">Tell us about your visit</h1>
          <p class="mt-1 text-sm text-slate-600">
            This survey takes about two minutes. Your answers help us improve the website.
          </p>
        </header>

        <!-- a. Text input -->
        <div>
          <label for="name" class="block text-sm font-semibold">Your name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Jane Smith"
            class="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>

        <!-- c. Select -->
        <div>
          <label for="role" class="block text-sm font-semibold text-slate-700">What is your role?</label>
          <select id="role" name="role" required class="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200">
            <option value="" disabled selected>Choose one</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher / Instructor</option>
            <option value="prospective_client">Prospective Client</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <span class="block text-sm font-semibold text-slate-700">How would you rate the quality of this site?</span>
          <div class="mt-2 flex flex-row-reverse justify-end gap-1 star-rating">

            <input type="radio" id="star5" name="quality_rating" value="5" required class="peer hidden" />
            <label for="star5" class="cursor-pointer text-2xl text-slate-300 hover:text-amber-400 peer-hover:text-amber-400 peer-checked:text-amber-500 star-icon">★</label>

            <input type="radio" id="star4" name="quality_rating" value="4" class="peer hidden" />
            <label for="star4" class="cursor-pointer star-icon text-2xl text-slate-300 hover:text-amber-400 peer-hover:text-amber-400 peer-checked:text-amber-500">★</label>

            <input type="radio" id="star3" name="quality_rating" value="3" class="peer hidden" />
            <label for="star3" class="cursor-pointer star-icon text-2xl text-slate-300 hover:text-amber-400 peer-hover:text-amber-400 peer-checked:text-amber-500">★</label>

            <input type="radio" id="star2" name="quality_rating" value="2" class="peer hidden" />
            <label for="star2" class="cursor-pointer text-2xl star-icon text-slate-300 hover:text-amber-400 peer-hover:text-amber-400 peer-checked:text-amber-500">★</label>

            <input type="radio" id="star1" name="quality_rating" value="1" class="peer hidden" />
            <label for="star1" class="cursor-pointer text-2xl star-icon text-slate-300 hover:text-amber-400 peer-hover:text-amber-400 peer-checked:text-amber-500">★</label>

          </div>
        </div>


        <!-- d. Radio buttons -->
        <fieldset>
          <legend class="text-sm font-semibold">How easy was the site to use?</legend>
          <div class="mt-3 space-y-2">
            <label class="flex cursor-pointer items-center gap-3">
              <input type="radio" name="ease" value="very-easy" required class="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <span>Very easy</span>
            </label>
            <label class="flex cursor-pointer items-center gap-3">
              <input type="radio" name="ease" value="easy" class="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <span>Easy</span>
            </label>
            <label class="flex cursor-pointer items-center gap-3">
              <input type="radio" name="ease" value="difficult" class="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <span>Difficult</span>
            </label>
            <label class="flex cursor-pointer items-center gap-3">
              <input type="radio" name="ease" value="very-difficult" class="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <span>Very difficult</span>
            </label>
          </div>
        </fieldset>

        <!-- e. Checkboxes -->
        <fieldset>
          <legend class="text-sm font-semibold">Which parts of the site did you use? <span class="font-normal text-slate-500">(select all that apply)</span></legend>
          <div class="mt-3 space-y-2">
            <label class="flex cursor-pointer items-center gap-3">
              <input type="checkbox" name="sections" value="home" class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <span>Home page</span>
            </label>
            <label class="flex cursor-pointer items-center gap-3">
              <input type="checkbox" name="sections" value="blog" class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <span>Blog or articles</span>
            </label>
            <label class="flex cursor-pointer items-center gap-3">
              <input type="checkbox" name="sections" value="products" class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <span>Products or services</span>
            </label>
            <label class="flex cursor-pointer items-center gap-3">
              <input type="checkbox" name="sections" value="contact" class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <span>Contact page</span>
            </label>
          </div>
        </fieldset>

        <!-- b. Textarea -->
        <div>
          <label for="comments" class="block text-sm font-semibold">What should we improve?</label>
          <textarea
            id="comments"
            name="comments"
            rows="4"
            placeholder="Tell us what worked and what didn't."
            class="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"></textarea>
        </div>

        <!-- f. Submit button -->
        <button
          type="submit"
          class="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2">
          Send feedback
        </button>

        <p id="thanks" class="hidden rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800" role="status">
          Thanks! Your feedback was received.
        </p>
      </form>
    </section>
  </div>
</body>
<!-- <?php include 'inc/scripts.php'; ?> -->

</html>