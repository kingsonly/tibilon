<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\LoginResources;
use App\Models\Client;
use App\Models\Project;
use App\Models\PropertyClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ClientAdminController extends Controller
{
    /**
     * this is the dashboard which would display content for the user,
     * such content includes project, project property,payment,project task,project documents,project stage.support tticket
     */


    /**
     * @group Client
     *
     * Get a list of projects and associated properties for the authenticated client.
     *
     *
     * @response 200 {
     *     "status": "success",
     *     "data": {
     *         "project": [
     *             {
     *                 "id": 1,
     *                 "name": "Project 1"
     *             },
     *             {
     *                 "id": 2,
     *                 "name": "Project 2"
     *             }
     *             // Other project objects
     *         ],
     *         "property": [
     *             {
     *                 "id": 1,
     *                 "property_name": "Property 1",
     *                 "payments": [
     *                     {
     *                         "id": 1,
     *                         "amount": 1000
     *                     },
     *                     {
     *                         "id": 2,
     *                         "amount": 1500
     *                     }
     *                     // Other payment objects
     *                 ],
     *                 "agent": {
     *                     "id": 1,
     *                     "name": "Agent 1"
     *                 }
     *             },
     *             {
     *                 "id": 2,
     *                 "property_name": "Property 2",
     *                 "payments": [
     *                     {
     *                         "id": 3,
     *                         "amount": 1200
     *                     }
     *                     // Other payment objects
     *                 ],
     *                 "agent": {
     *                     "id": 2,
     *                     "name": "Agent 2"
     *                 }
     *             }
     *             // Other property objects
     *         ]
     *     }
     * }
     *
     * @response 401 {
     *     "message": "Unauthenticated."
     * }
     */


    public function index()
    {
        $user = Auth::guard('client')->user();
        $getProject = Project::where(["client_id" => $user->id])->get();
        $getProperty = PropertyClient::where(["client_id" => $user->id])->with("property.payments", "property.agent")->get();

        $data = [
            "project" => $getProject,
            "property" => $getProperty
        ];

        return response()->json(["status" => "success", "data" => $data], 200);
    }


    /**
     * @group Client
     *
     * Get a list of projects for the authenticated client.
     *
     *
     * @response 200 {
     *     "status": "success",
     *     "data": [
     *         {
     *             "id": 1,
     *             "name": "Project 1"
     *         },
     *         {
     *             "id": 2,
     *             "name": "Project 2"
     *         }
     *         // Other project objects
     *     ]
     * }
     *
     * @response 401 {
     *     "message": "Unauthenticated."
     * }
     */


    public function allProjects()
    {
        $user = Auth::guard('client')->user();
        $getProject = Project::where(["client_id" => $user->id])->get();

        return response()->json(["status" => "success", "data" => $getProject], 200);
    }

    /**
     * @group Client
     *
     * Get a list of properties associated with the authenticated client.
     *
     *
     * @response 200 {
     *     "status": "success",
     *     "data": [
     *         {
     *             "id": 1,
     *             "name": "Property 1",
     *             "payments": [
     *                 {
     *                     "id": 1,
     *                     "amount": 1000,
     *                     // Other payment properties
     *                 }
     *                 // Other payment objects
     *             ],
     *             "agent": {
     *                 "id": 1,
     *                 "name": "Agent Name",
     *                 // Other agent properties
     *             }
     *         },
     *         {
     *             "id": 2,
     *             "name": "Property 2",
     *             // Other property properties
     *         }
     *         // Other property objects
     *     ]
     * }
     *
     * @response 401 {
     *     "message": "Unauthenticated."
     * }
     */

    public function allProperties()
    {
        $user = Auth::guard('client')->user();
        $getProperty = PropertyClient::where(["client_id" => $user->id])->with("property.payments", "property.agent")->get();

        return response()->json(["status" => "success", "data" => $getProperty], 200);
    }

    /**
     * @group Authentication
     * @unauthenticated
     *
     * Authenticate a client user by email and password.
     *
     * @bodyParam email string required The email address of the client.
     * @bodyParam password string required The password of the client.
     *
     * @response 200 {
     *     "status": "success",
     *     "message": "User logged in",
     *     "data": {
     *         "id": 1,
     *         "name": "John Doe",
     *         "email": "johndoe@example.com",
     *         "token": "your_access_token_here"
     *         // Other user properties
     *     }
     * }
     *
     * @response 400 {
     *     "status": "error",
     *     "data": {
     *         "email": [
     *             "The email field is required."
     *         ]
     *     }
     * }
     *
     * @response 400 {
     *     "status": "error",
     *     "message": "Wrong Email or Password"
     * }
     */



    public function login(Request $request)
    {
        //return response()->json(['status' => 'success', 'message' => 'user logged in'], 200);
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return  response()->json(["status" => "error", "data" => $validator->errors()], 400);
        }
        $user = Client::where('email', $request->email)->first();
        if ($user && Hash::check($request->password, $user->password)) {
            $user['token'] = $user->createToken('MyAuthApp')->plainTextToken;
            return response()->json(['status' => 'success', 'message' => 'user logged in', "data" => $user], 200);
        } else {
            return  response()->json(["status" => "error", "message" => "Wrong Email or Password"], 400);
        }
    }

    /**
     *  @group Authentication
     *
     * Logout the authenticated client user.
     *
     *
     * @response 200 {
     *     "status": "success"
     * }
     *
     * @response 400 {
     *     "status": "error",
     *     "message": "Something went wrong. Could not logout at this moment."
     * }
     */

    public function logout()
    {
        if (Auth::guard('client')->logout()) {
            return response()->json(["status" => "success"], 200);
        }
        return response()->json(["status" => "error", "message" => "Something went wrong could not logout at this moment."], 400);
    }
}
