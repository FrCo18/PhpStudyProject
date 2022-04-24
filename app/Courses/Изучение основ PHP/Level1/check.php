<?php

return function (string $php_code, string $eval_text, string $echo_text): bool {
    $valid_code = (bool)preg_match('/echo\s*[\'"]Это моё первое задание![\'"];/', $php_code);
    return $valid_code && $echo_text == 'Это моё первое задание!';
};
