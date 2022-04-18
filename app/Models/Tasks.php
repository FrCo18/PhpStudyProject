<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id_task
 * @property string $name
 * @property string $php_code
 * @property string $level_number
 * @property int $id_course
 * @property string $theory
 */
class Tasks extends Model
{
    use HasFactory;

    protected $table = 'Tasks';
    protected $primaryKey = 'id_task';

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public static function getTasksByCourseId(int $id_course): Collection|array
    {
        return self::query()
            ->select(
                [
                    'Tasks.id_task',
                    'Tasks.name as task_name',
                    'Tasks.php_code',
                    'Tasks.level_number',
                    'Tasks.id_course',
                    'Tasks.theory',
                    'Courses.name as course_name',
                    'DifficultyCourses.name as difficulty',
                    'Courses.description'
                ]
            )
            ->join('Courses', 'Courses.id_course', '=', 'Tasks.id_course')
            ->join('DifficultyCourses', 'Courses.id_difficulty', '=', 'DifficultyCourses.id_difficulty')
            ->where('Tasks.id_course', '=', $id_course)
            ->get();
    }

    public static function getTaskById(int $id_task): Model|Builder|null
    {
        return self::query()
            ->select(
                [
                    'Tasks.id_task',
                    'Tasks.name as task_name',
                    'Tasks.php_code',
                    'Tasks.level_number',
                    'Tasks.id_course',
                    'Tasks.theory',
                    'Courses.name as course_name',
                    'DifficultyCourses.name as difficulty',
                    'Courses.description'
                ]
            )
            ->join('Courses', 'Courses.id_course', '=', 'Tasks.id_course')
            ->join('DifficultyCourses', 'Courses.id_difficulty', '=', 'DifficultyCourses.id_difficulty')
            ->where('Tasks.id_task', '=', $id_task)
            ->first();
    }
}
