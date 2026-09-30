<!doctype html>
<html lang="en">

<head>
    <?php include 'inc/head.php'; ?>
</head>

<body>
    <?php include 'inc/nav.php'; ?>

    <div id="app" class="container mx-auto max-w-2xl py-8">
        <?php
        function pig_latin_word($english_word)
        {
            $word = trim($english_word);
            $apostrophe_cut_off = '';
            $punctuation_list = ['.', ',', '!', '?', ';', ':'];
            $trailing_punctuation = '';


            if (strpos($word, "'") !== false) {
                // Split the word into two parts at the first apostrophe
                list($word, $apostrophe_cut_off) = explode("'", $word, 2);
            }
            // Check for trailing punctuation
            if (in_array(substr($word, -1), $punctuation_list)) {
                $trailing_punctuation = substr($word, -1);
                $word = substr($word, 0, -1);
            }


            if ($word === '') {
                return '';
            }

            $lower_word = strtolower($word);
            $first_vowel_index = strcspn($lower_word, 'aeiou');

            if ($first_vowel_index === strlen($lower_word)) {
                // No vowels found (e.g., "my")
                $output = $lower_word . 'ay';
            } elseif ($first_vowel_index === 0) {
                // Starts with a vowel (e.g., "apple")
                $output = $lower_word . 'yay';
            } else {
                $output = substr($lower_word, $first_vowel_index) . substr($lower_word, 0, $first_vowel_index) . 'ay';
            }

            if ($word[0] === strtoupper($word[0])) {
                $output = ucfirst($output);
            }
            // Rejoin the apostrophe cut off part to the translated word
            if ($apostrophe_cut_off !== '') {
                $output = $output . "'" . $apostrophe_cut_off;
            }
            if (!empty($trailing_punctuation)) {
                $output .= (string)$trailing_punctuation;
            }

            return $output;
        }

        function pig_latin_sentence($english_sentence)
        {
            $words = preg_split('/\s+/', trim($english_sentence));
            $translated_words = [];

            foreach ($words as $word) {
                if ($word !== '') {
                    $translated_words[] = pig_latin_word($word);
                }
            }

            return implode(' ', $translated_words);
        }

        $result = '';

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $english_text = trim($_POST['english_text'] ?? '');

            if ($english_text !== '') {
                $result = pig_latin_sentence($english_text);
            }
        }
        ?>

        <form method="POST" class="space-y-6 bg-gray-900 p-6 rounded-lg shadow-lg">
            <div>
                <label for="english_text" class="block mb-2 text-sm font-medium text-orange-300">
                    Enter a word or sentence
                </label>
                <input
                    type="text"
                    id="english_text"
                    name="english_text"

                    placeholder="Enter your text..."
                    required
                    autofocus
                    class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500">
            </div>

            <button type="submit" class="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition text-white">
                Translate
            </button>

            <?php if ($result !== ''): ?>
                <div class="mt-6 p-4 bg-gray-800 border border-gray-600 rounded-lg">
                    <h2 class="text-lg font-semibold mb-2 text-orange-400">Pig Latin Translation</h2>
                    <p class="text-white"><?= htmlspecialchars($result) ?></p>
                </div>
            <?php endif; ?>
        </form>
    </div>
</body>

</html>