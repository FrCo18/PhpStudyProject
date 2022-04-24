<?php

namespace App\Courses;

use Closure;

class TaskChecker
{
    private string $course_name;
    private int $level_number;
    private Closure $check_task_callback;

    public function __construct(string $course_name, int $level_number)
    {
        $this->course_name = $course_name;
        $this->level_number = $level_number;
        $this->setCheckTaskCallback($course_name, $level_number);
    }

    public function setCheckTaskCallback(string $course_name, int $level_number): void
    {
        $this->check_task_callback = include  "/var/www/html/app/Courses/$course_name/Level$level_number/check.php";
    }

    public function checkTask(string $php_code, string $eval_result = '', $echo_text = ''): bool
    {
        $result = $this->check_task_callback;
        return $result($php_code, $eval_result, $echo_text);
    }

    public function setCourseName(string $name): void
    {
        $this->course_name = $name;
    }

    public function getCourseName(): string
    {
        return $this->course_name;
    }

    public function setLevelNumber(int $level_number): void
    {
        $this->level_number = $level_number;
    }

    public function getLevelNumber(): int
    {
        return $this->level_number;
    }
}
