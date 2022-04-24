<?php

return function (string $php_code, string $eval_text, string $echo_text): bool {
    $regex = '/echo\s*(\$[\w_\d]+\s*\.\s*\$[\w_\d]+|[\'"].*?[\'"]\s*\.\s*[\'"].*?[\'"])\s*;/';
    $valid_code = (bool)preg_match($regex, $php_code);

    return $valid_code && $echo_text != '';
};
