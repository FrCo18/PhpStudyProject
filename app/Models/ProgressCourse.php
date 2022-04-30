<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgressCourse extends Model
{
    use HasFactory;

    protected $table = 'ProgressCourses';
    protected $primaryKey = 'id_progress_course';
    public $timestamps = false;

    public static function setProgressCourse(int $id_course, int $id_user, bool $is_complete): bool
    {
        $progress_task = self::query()
            ->where('id_user', $id_user)
            ->where('id_course', $id_course)
            ->first();
        if ($progress_task) {
            $result = self::query()
                ->where('id_user', $id_user)
                ->where('id_course', $id_course)
                ->update(['is_complete' => $is_complete]);
        } else {
            $result = self::query()->insert([
                'id_user' => $id_user,
                'id_course' => $id_course,
                'is_complete' => $is_complete
            ]);
        }

        return $result;
    }
}
