<?php

return function (string $php_code, string $eval_text, string $echo_text): bool {
    $valid_code = (bool)preg_match('/echo\s*\$\w+\s*\+\s*\$\w+\s*;|echo\s*\$\w+\s*;/', $php_code);

    return $valid_code && $echo_text == '5';
};
