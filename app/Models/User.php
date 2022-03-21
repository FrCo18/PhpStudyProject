<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\Date;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property int $idUser
 * @property string $password
 * @property string|null $firstName
 * @property string|null $lastName
 * @property string|null $middleName
 * @property Date $registerDate
 * @property string $email
 * @property string $token
 */
class User extends Model
{
    use HasFactory, HasApiTokens;

    protected $table = 'Users';
    protected $primaryKey = 'idUser';

    public const CREATED_AT = 'registerDate';
    public const UPDATED_AT = 'updatedAt';
}
