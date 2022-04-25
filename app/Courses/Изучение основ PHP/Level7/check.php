<?php

return function (string $php_code, string $eval_text, string $echo_text): bool {
    $regex_code = '/\$user\s*=\s*\["фамилия"\s*=>\s*"Иванов",\s*"имя"\s*=>\s*"Иван",\s*"отчество"\s*=>\s*"Иванович"\];\s*foreach\s*\(\s*\$user\sas\s\$key\s*=>\s*\$item\s*\)\s*\{(?<body>.*?)}/s';
    $regex_echo = '/фамилия: Иванов\nимя: Иван\nотчество: Иванович\n*/';

    if ((preg_match_all('/echo .*?;/', $php_code, $matches_count) && count($matches_count[0]) === 1)) {
        if (!(preg_match_all($regex_echo, $echo_text, $matches_count) && count($matches_count[0]) === 1)) {
            return false;
        }

        if (preg_match($regex_code, $php_code, $matches)) {
            if (preg_match('/echo .*?;/', $matches['body'])) {
                return true;
            }
        }
    }

    return false;
};
