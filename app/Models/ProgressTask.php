<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

/**
 * @property int $id_progress_task
 * @property int $id_user
 * @property int $id_task
 * @property bool $is_complete
 */
class ProgressTask extends Model
{
    use HasFactory;

    protected $table = 'ProgressTasks';
    protected $primaryKey = 'id_progress_task';
    public $timestamps = false;

    public static function setProgressTask(int $id_task, int $id_user, bool $is_complete): bool
    {
        $progress_task = self::query()
            ->where('id_user', $id_user)
            ->where('id_task', $id_task)
            ->first();
        if ($progress_task) {
            $result = self::query()
                ->where('id_user', $id_user)
                ->where('id_task', $id_task)
                ->update(['is_complete' => $is_complete]);
        } else {
            $result = self::query()->insert([
                'id_user' => $id_user,
                'id_task' => $id_task,
                'is_complete' => $is_complete
            ]);
        }

        return $result;
    }
}
