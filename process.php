<!doctype html>
<html lang="en">

<head>
    <?php include 'inc/head.php'; ?>
</head>

<body>
    <?php include 'inc/nav.php'; ?>
    <div id="app" class="container">
        <pre><code>
            <div class="thank_you max-w-2xl mx-auto my-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg shadow-sm">
                <p class="text-sm md:text-base leading-relaxed break-words whitespace-normal">
                    Thank you, <?= htmlspecialchars($_POST['name'] ?? '', ENT_QUOTES, 'UTF-8'); ?>,
                    for your feedback! We appreciate your input and will take it into consideration
                    as we continue to improve our services.
                </p>
            </div>
          <?php
            print_r($_POST);
            ?>  
        </code></pre>

    </div>
</body>
<!-- <?php include 'inc/scripts.php'; ?> -->

</html>