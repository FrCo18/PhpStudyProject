<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;

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

    public static function getTasksByCourseId(int $id_course, int $id_user): array
    {
        $query = '
        select
        "Tasks"."id_task",
       "Tasks"."name"             as "task_name",
       "Tasks"."php_code",
       "Tasks"."level_number",
       "Tasks"."id_course",
       "Tasks"."theory",
       "Courses"."name"           as "course_name",
       "DifficultyCourses"."name" as "difficulty",
       "Courses"."description",
       "pt"."is_complete"

        from "Tasks"
         inner join "Courses" on "Courses"."id_course" = "Tasks"."id_course"
         inner join "DifficultyCourses" on "Courses"."id_difficulty" = "DifficultyCourses"."id_difficulty"
         left join "ProgressTasks" "pt" on "pt"."id_task" = "Tasks"."id_task" and "pt"."id_user" = ' . $id_user . '
         where "Tasks"."id_course" = ' . $id_course
        . ' order by "Tasks"."level_number"';

        return DB::select($query);
    }

    public static function getTaskById(int $id_task, int $id_user): array
    {
        $query = '
        select
        "Tasks"."id_task",
       "Tasks"."name"             as "task_name",
       "Tasks"."php_code",
       "Tasks"."level_number",
       "Tasks"."id_course",
       "Tasks"."theory",
       "Courses"."name"           as "course_name",
       "DifficultyCourses"."name" as "difficulty",
       "Courses"."description",
       "pt"."is_complete"

        from "Tasks"
         inner join "Courses" on "Courses"."id_course" = "Tasks"."id_course"
         inner join "DifficultyCourses" on "Courses"."id_difficulty" = "DifficultyCourses"."id_difficulty"
         left join "ProgressTasks" "pt" on "pt"."id_task" = ' . $id_task . ' and "pt"."id_user" = ' . $id_user . '

        where "Tasks"."id_task" = ' . $id_task . '
        limit 1
        ';


        return (array)DB::select($query)[0];
    }
}
