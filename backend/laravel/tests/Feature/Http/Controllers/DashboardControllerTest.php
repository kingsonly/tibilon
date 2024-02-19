<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DashboardControllerTest extends TestCase
{
    use RefreshDatabase;


    public function test_authenticated_user_can_get_stats()
    {

        $user = User::factory()->create([
            'email' => 'test@test.com',
            'password' => bcrypt('password')
        ]);

        $response =  $this->actingAs($user)->getJson('/api/site');


        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'data' => [
                    'totalProjects',
                    'totalCompletedProject',
                    'totalInprogressProject',
                    'totalPropertyPayment',
                    'totalCompletedPropertyPayment',
                    'totalIncompletedPropertyPayment',
                    'totalProperty',
                    'totalContractors',
                    'totalInhouseContractor',
                    'totalExternalContractor',
                    'totalSoldProperty',
                    'totalAvailableProperty',
                    'affiliate',
                    'SalesTeam',
                    'task'
                ]
            ]);
    }
    public function test_unauthenticated_user_cannot_get_stats()
    {

        $response = $this->get('/api/site');
        $response->assertStatus(500);
    }
}
