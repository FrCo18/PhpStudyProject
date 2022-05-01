<?php

return function (string $php_code, string $eval_text, string $echo_text): bool {

    $remove_class = preg_replace('/class Person.*?\{.*}/s', '', $php_code);
    if (str_contains($remove_class, 'echo')) {
        return false;
    }

    $default_code = 'class Person
{
    public string $name = \'Bob\';
    public int $age = 18;

    public function displayInfo(): void
    {
        $msg = \'Name: \' . $this->name . ".\n";
        $msg .= \'Age: \' . $this->age . \'.\';
        echo $msg;
    }
}';

    $regex = '/' . preg_quote($default_code) .
        '.*?\$[\w_\d]+\s*=\s*new\s*Person\(\)\s*;.*?\$[\w_\d]+->name\s*=\s*["\']Ivan["\']\s*;.*?\$[\w_\d]+->displayInfo\(\);/s';

    $valid_echo_text = 'Name: Ivan.
Age: 18.';

    $valid_code = (bool)preg_match($regex, $php_code);
    return $valid_code && $echo_text == $valid_echo_text;
};
