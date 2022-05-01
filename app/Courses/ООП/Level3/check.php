<?php

return function (string $php_code, string $eval_text, string $echo_text): bool {


    $remove_class = preg_replace('/class Person.*?\{.*}/s', '', $php_code);
    if (str_contains($remove_class, 'echo')) {
        return false;
    }

    if (preg_match('/class Person.*?\{(.*)}/s', $php_code, $matches)) {
        $is_contains_fields = str_contains($matches[1], "private string \$name = 'Bob';")
            && str_contains($matches[1], 'private int $age = 18;');

        $is_contains_functions = str_contains($matches[1], 'public function setName(string $str): void
    {
        $this->name = $str;
    }')
            && str_contains($matches[1], 'public function displayInfo(): void
    {
        $msg = \'Name: \' . $this->name . ".\n";
        $msg .= \'Age: \' . $this->age . \'.\';
        echo $msg;
    }');

        $is_contains_set_age_function_regex = '/public function setAge\(int \$age\)(:\s*void)*.*?\{.*?\}/s';

        if (!($is_contains_fields && $is_contains_functions
            && preg_match($is_contains_set_age_function_regex, $matches[1]))) {
            return false;
        }
    } else {
        return false;
    }


    $is_valid_echo_text = (bool)preg_match('/Name: .*?\.\nAge: 20\./', $echo_text);

    $valid_code = preg_match('/\$[\w_\d]+->setAge\(\s*(\$[\w_\d]+|\d+)\s*\)\s*;/', $php_code)
        && preg_match('/\$[\w_\d]+->displayInfo\(\)\s*;/', $php_code);
    return $valid_code && $is_valid_echo_text;
};
