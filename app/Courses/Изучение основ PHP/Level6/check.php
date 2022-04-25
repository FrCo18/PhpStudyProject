<?php

return function (string $php_code, string $eval_text, string $echo_text): bool {
    $regex_code = '/\$numbers\s*=\s*\[1,\s*2,\s*3,\s*4,\s*5\]\s*;\s*foreach\s*\(\s*\$numbers\sas\s\$number\s*\)\s*\{\s*echo\s*(\$number\s*\.\s*(\' \'|" ")|(\' \'|" ")\s*\.\s*\$number)\s*;\s*\}/s';
    $regex_echo = '/\s*1 2 3 4 5\s*/';

    if(!(preg_match_all('/echo .*?;/', $php_code, $matches_count) && count($matches_count[0]) === 1)){
        return false;
    }

    return preg_match($regex_code, $php_code) && preg_match($regex_echo, $echo_text);
};
