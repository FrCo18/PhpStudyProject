<?php

return function (string $php_code, string $eval_text, string $echo_text): bool {

    $echo_check = '1 2 3 4 5' === $echo_text;

    $regex = '/for\s*\(\s*\$\w+\s*=\s*\d\s*;\s\$\w+\s*<\s*\d\s*;\s*\$\w+\+{2}\s*\)\s*\{(?<body>.*?)\}/s';

    $variants_in_body = '/('
        . '\s*(?<var>\$[\w_\d]+)\s*\.=\s*\$[\w_\d]+\s*\.\s*(\' \'|" ")\s*;'
        . '|\s*(?<var1>\$[\w_\d]+)\s*\.=\s*(\' \'|" ")\s*\.\s*\$[\w_\d]+\s*;'
        . '|\s*(?<var2>\$[\w_\d]+)\s*\.=\s*["\']\s*\$[\w_\d]+\s*[\'"]'
        . ')/s';

    if (preg_match($regex, $php_code, $matches)) {
        if (!preg_match($variants_in_body, $matches['body'], $matches)) {
            return false;
        }
    } else {
        return false;
    }

    if (preg_match_all('/echo .*?;/', $php_code, $matches_count) && count($matches_count[0]) === 1) {
        if ($matches['var']) {
            return $echo_check && (bool)preg_match('/echo\s*\(*\s*trim\(\s*' .
                    preg_quote($matches['var'])
                    . '\s*\)*\s*;/', $php_code);
        } else if ($matches['var1']) {
            return $echo_check && (bool)preg_match('/echo\s*\(*\s*trim\(\s*' .
                    preg_quote($matches['var1'])
                    . '\s*\)*\s*;/', $php_code);
        }

        else if ($matches['var2']) {
            return $echo_check && (bool)preg_match('/echo\s*\(*\s*trim\(\s*' .
                    preg_quote($matches['var2'])
                    . '\s*\)*\s*;/', $php_code);
        }
    }

    return false;
};
