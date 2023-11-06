<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Request;
use Tests\TestCase;

class AdminControllerTest extends TestCase
{
    use RefreshDatabase;


    public function test_Login_returns_token_with_valid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'test@test.com',
            'password' => bcrypt('password')
        ]);

        $response = $this->postJson('/api/user/login', [
            'email' => $user->email,
            'password' => 'password'
        ]);

        $response->assertStatus(200);
    }

    public function test_login_returns_error_with_invalid_credentials(): void
    {
        $response = $this->postJson('/api/user/login', [
            'email' => 'noneexisting@user.com',
            'password' => 'password'
        ]);

        $response->assertStatus(400);
    }


    public function test_unauthenticated_user_cannot_another_register_with_valid_data()
    {


        $request = new Request([
            'email' => 'existing@example.com',
            'firstname' => 'John',
            'lastname' => 'Doe',
            'password' => 'password123'
        ]);
        $response =  $this->postJson('/api/user/adduser', $request->all());

        $response->assertStatus(401);
    }

    public function test_only_login_user_can_another_register_with_valid_data()
    {
        $user = User::factory()->create([
            'email' => 'test@test.com',
            'password' => bcrypt('password')
        ]);

        $request = new Request([
            'email' => 'existing@example.com',
            'firstname' => 'John',
            'lastname' => 'Doe',
            'password' => 'password123'
        ]);
        $response =  $this->actingAs($user)->postJson('/api/user/adduser', $request->all());

        $response->assertStatus(201);
    }

    public function test_if_user_can_register_without_required_fields()
    {
        $request = new Request([]);

        $user = User::factory()->create([
            'email' => 'test@test.com',
            'password' => bcrypt('password')
        ]);

        $response =  $this->actingAs($user)->postJson('/api/user/adduser', $request->all());

        $response->assertStatus(400);
    }
}
