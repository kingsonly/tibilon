<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use App\Models\User;
use Laravel\Sanctum\Sanctum;
abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;
    public function userCreate(){
        return Sanctum::actingAs(
            User::factory()->create(),
            ['*']
        );

    }
}
