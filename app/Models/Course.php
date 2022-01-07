<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idCourse
 * @property string $name
 * @property int $idDifficulty
 */
class Course extends Model
{
    use HasFactory;

    protected $table = 'Courses';

    protected $primaryKey = 'idCourse';
    public $timestamps = false;
}
