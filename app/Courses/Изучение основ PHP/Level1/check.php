<?php

return function (string $php_code): bool {
    return (bool)preg_match('/echo\s*[\'"]Это моё первое задание![\'"];/', $php_code);
};
