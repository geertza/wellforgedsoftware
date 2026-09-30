<!doctype html>
<html lang="en">

<head>
  <?php include 'inc/head.php'; ?>
  <link rel="stylesheet" href="./css/home.css">
</head>

<body>
  <?php include 'inc/nav.php'; ?>
  <div id="app" class="min-h-screen px-4 pt-16">
    <div class="fire-container w-full text-center">
      <div class="fire-text   font-bold tracking-tight">
        <?php
        // Set your desired timezone
        $timezone = new DateTimeZone('America/Denver');

        // Create a date-time object representing 'now'
        $now = new DateTimeImmutable('now', $timezone);
        if ($now->format('H') < 12) {
          echo " Good Morning!";
        } elseif ($now->format('H') < 18) {
          echo " Good Afternoon!";
        } else {
          echo " Good Evening!";
        }
        ?>
      </div>

      <h2 class="fire-text text-4xl md:text-6xl font-bold tracking-tight">Welcome to</h2>
      <h1 class="fire-text text-4xl md:text-6xl font-bold tracking-tight">Well Forged Software </h1>
    </div>

  </div>
  <!-- <?php include 'inc/scripts.php'; ?> -->
</body>

</html>