<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public static function getJoinCourses(): Collection|array
    {
        return self::query()
            ->select('Courses.id_course', 'Courses.name as course', 'DifficultyCourse.name as difficulty', 'Courses.description')
            ->join('DifficultyCourse', 'Courses.id_difficulty', '=', 'DifficultyCourse.id_difficulty')
            ->orderBy('Courses.id_course')
            ->get();
    }
}
