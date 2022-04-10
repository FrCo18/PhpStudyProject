<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Date;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property int $idUser
 * @property string $password
 * @property string|null $first_name
 * @property string|null $last_name
 * @property string|null $middle_name
 * @property Date $created_at
 * @property string $email
 * @property string $token
 */
class User extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $table = 'Users';
    protected $primaryKey = 'idUser';

    protected $fillable = [
        'email',
        'password'
    ];
}
