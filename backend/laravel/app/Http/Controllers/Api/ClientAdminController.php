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
    public function index()
    {
        $user = Auth::guard('client')->user();
        $getProject = Project::where(["client_id" => $user->id])->get();
        $getProperty = PropertyClient::where(["client_id" => $user->id])->with("property.payments","property.agent")->get();

        $data = [
            "project" => $getProject,
            "property" => $getProperty
        ];

        return response()->json(["status" => "success", "data" => $data], 200);
    }

    public function allProjects(){
        $user = Auth::guard('client')->user();
        $getProject = Project::where(["client_id" => $user->id])->get();

        return response()->json(["status" => "success", "data" => $getProject], 200);
    }

    public function allProperties(){
        $user = Auth::guard('client')->user();
        $getProperty = PropertyClient::where(["client_id" => $user->id])->with("property.payments","property.agent")->get();

        return response()->json(["status" => "success", "data" => $getProperty], 200);
    }

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

    public function logout()
    {
        if (Auth::guard('client')->logout()) {
            return response()->json(["status" => "success"], 200);
        }
        return response()->json(["status" => "error", "message" => "Something went wrong could not logout at this moment."], 400);
    }
}
