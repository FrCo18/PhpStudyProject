<?php

return function (string $php_code, string $eval_text, string $echo_text): bool {

    $default_function = 'function printNumbers(int $start, int $limit): void
{
 for ($i = $start; $i <= $limit; $i++) {
  echo "$i\n";
 }
}';

    $function_regex = 'printNumbers\((\$[\w_\d]+|1)\s*,\s*(\$[\w_\d]+|5)\);';

    $valid_code = (bool)preg_match('/' . preg_quote($default_function) . '.*' . $function_regex . '/s', $php_code);
    return $valid_code && $echo_text == "1\n2\n3\n4\n5\n";
};
