<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;

/**
 * @property int $id_course
 * @property string $name
 * @property int $id_difficulty
 */
class Course extends Model
{
    use HasFactory;

    protected $table = 'Courses';

    protected $primaryKey = 'id_course';
    public $timestamps = false;

    public static function getJoinCourses(int $id_user): Collection|array
    {
        $query = '
        select "Courses"."id_course",
           "Courses"."name"                             as course,
           "DifficultyCourses"."name"                   as difficulty,
           "Courses"."description",
           coalesce("ProgressCourses".is_complete, false) as is_complete
        from "Courses"
        inner join "DifficultyCourses" on "Courses"."id_difficulty" = "DifficultyCourses"."id_difficulty"
        left join "ProgressCourses"
                   on "ProgressCourses"."id_course" = "Courses"."id_course" and "ProgressCourses"."id_user" = ' . $id_user . '
        order by "Courses"."id_course" asc
        ';

//        $test = self::query()
//            ->selectRaw('"Courses"."id_course", "Courses"."name" as course,
//                "DifficultyCourses"."name" as difficulty, "Courses"."description",
//            coalesce("ProgressCourses".is_complete, false) as is_complete')
//            ->join('DifficultyCourses', 'Courses.id_difficulty', '=', 'DifficultyCourses.id_difficulty')
//            ->leftJoin('ProgressCourses', function (JoinClause $join) use ($id_user) {
//                return $join->on('ProgressCourses.id_course', '=', 'Courses.id_course')
//                    ->on('ProgressCourses.id_user', '=', $id_user);
//            })
//            ->orderBy('Courses.id_course');

        return array_map(fn(\stdClass $el) => (array)$el, DB::select($query));
    }
}
