<?php

namespace Tests\Feature\Http\Controllers\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\Mail;
use App\Models\User;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;
    /**
     * test that the index page can pull all userson the system
     */
    public function test_that_all_user_is_fetched_from_the_database(): void
    {
        // use user factory to add 20 records into the user table
        User::factory(10)->create();
        // goto the users route
        $this->userCreate();
        $response = $this->get('/api/user');
        // start assertions here .
        $response->assertStatus(200)->assertJsonStructure([
            "data"=>[
                "name"
                
            ]
            
        ]);
    }

    public function test_user_has_been_deleted(){

        User::factory(10)->create();
        $this->userCreate();
        $response = $this->get('/api/user/deleteuser');
        $response->assertStatus(200)->assertJsonStructure([
            "status",
            "message"
        ]);
        
    }

    public function test_to_see_if_users_registration_information_entered_the_database(): void
    {
        Mail::fake();
        $data = [
            "firstname" => "kingsley Achumie",
            "lastname" => "kingsley Achumie",
            "email" => "kingsonly13c@gmail.com",
            "password" => "ubuxa##99",
           ];
        $response = $this->post('/api/site/register',$data);
        $response->assertStatus(201);
        $newData = [
            "email" => "kingsonly13c@gmail.com",
           ];
        $this->assertDatabaseHas("users", $newData);
    }

    public function test_to_see_if_the_returned_value_in_registration_page_is_correct(): void
    {
        Mail::fake();
        $data = [
            "firstname" => "kingsley Achumie",
            "lastname" => "kingsley Achumie",
            "email" => "kingsonly13a@gmail.com",
            "password" => "ubuxa##99",
           ];
        $response = $this->post('/api/site/register',$data);
        $response->assertStatus(201)->assertJsonStructure(
            [
                'status',
                'message',
                'data'=>[
                    'name',
                    'email',
                ]
            ]
        );
        Mail::assertSent(\App\Mail\Welcomeemail::class, function ($mail) {
            return $mail->hasTo('kingsonly13a@gmail.com');
        });
    }

    public function test_to_see_if_validation_works(){
        Mail::fake();
        $data = [
            "firstname" => "kingsley Achumie",
            "lastname" => "kingsley Achumie",
            "email" => "kingsonly13a@gmail.com",
           ];
        $response = $this->post('/api/site/register',$data);
        $response->assertStatus(400);
        
    }

    // this area deals with test for login

    public function test_to_see_if_the_structure_of_the_login_json_returened_is_correct(){
        $data = [
            "email" => "kingsonly15c@gmail.com",
            "password" => "password",
        ];
        //create a user with the above $data
        User::factory(1)->create(["email" => $data["email"] ]);
        $response = $this->post("/api/site/login",$data);
        $response->assertOk()->assertJsonStructure([
            
            "data"=>[
                "token",
                "status",
                "message",
            ]
        ]);
    }

    public function test_that_login_validation_is_working(){
        $data = ["email" => "test"];
        $response = $this->post("/api/site/login",$data);
        $response->assertStatus(400);
    }

    public function test_that_login_is_working(){
        
        $factoryData = [
            "email" => "test@test.com",
        ];
        User::factory(1)->create($factoryData);

        $data = [
            "email" => "test@test.com",
            "password" => "password"
        ];
        $response = $this->post("/api/site/login",$data);
        $response->assertStatus(200)->assertJsonStructure([
            "data"=>[
                "token",
            ]
        ]);
    }

    public function test_that_users_can_request_password_update(){
        
        $factoryData = [
            "email" => "test2@test.com",
        ];
        User::factory(1)->create($factoryData);

        $data = [
            "email" => "test2@test.com",
        ];
        $response = $this->post("/api/site/sendpasswordresetlink",$data);
        $response->assertStatus(200)->assertJsonStructure([
            "status",
            "message",
            "data"
        ])->assertJson(
            [
                'status' => 'success', 
                'message' => 'Please check your email for further instruction'
            ]
        );
    }

    
    
}
