<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ProjectResource;
use App\Models\Address;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = $request->input("page", 1);
        $perPage = $request->input("perpage", 10);
        $total = $request->input("total");

        $query = $request->all();
        if (array_key_exists('perpage', $query) and array_key_exists('total', $query)) {
            if ($page < $total) {
                $page++;
            }
        }
        $model = Project::with(["address", "manager", "client"])->orderBy('id', 'desc')->paginate($perPage, ["*"], "page", $page);
        return ProjectResource::collection($model);
    }

    public function store(Request $request)
    {
        $userAuth = auth()->guard('sanctum')->user();
        $validate = Validator::make(
            $request->all(),
            [
                'name' => 'required',
                'manager' => 'required',
                'address' => 'required',
                'description' => 'required',
                'number_of_properties' => 'required',
                'client' => 'required',
                'start_date' => 'required',
                'end_date' => 'required',
            ]
        );

        if ($validate->fails()) {
            return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
        }

        // create a new address for project 
        $projectAddress = new Address();
        $projectAddress->full_address = $request->input("address");
        $projectAddress->log_user_id = $userAuth->id;
        $projectAddress->status = Address::DefaultStatus;
        $projectAddress->save();

        // upload image to the server 
        $image = $request->file('image');
        $model = new Project();
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('images/project'), $imageName);
        $model->name = $request->input("name");
        $model->image = '/images/project/' . $imageName;
        $model->project_manager_user_id = $request->input("manager");
        $model->address_id = $projectAddress->id;
        $model->description = $request->input("description");
        $model->number_of_properties = $request->input("number_of_properties");
        $model->client_id = $request->input("client");
        $model->start_date = $request->input("start_date");
        $model->end_date = $request->input("end_date");
        $model->log_user_id = $userAuth->id;
        $model->status = Project::Inprogress;
        if ($model->save()) {
            //create an event and que the event .
            return response()->json(["status" => "success"], 200);
        }
        return response()->json(["status" => "error"], 400);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $model = Project::find($id)->with(["address", "manager", "client"])->first();
        if (!empty($model)) {
            return new ProjectResource($model);
        }
        return response()->json(["status" => "error", "message" => "There is no project with this ID " . $id], 400);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $model = Project::find($id)->first();
        if (empty($model)) {
            return response()->json(["status" => "error", "message" => "There are no project with this specific ID"], 400);
        }

        $validate = Validator::make(
            $request->all(),
            [
                'name' => 'required',
                'manager' => 'required',
                'address' => 'required',
                'description' => 'required',
                'number_of_properties' => 'required',
                'client' => 'required',
                'start_date' => 'required',
                'end_date' => 'required',
            ]
        );

        if ($validate->fails()) {
            return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
        }

        if ($model->address_id == $request->input("address")) {
            $address = $model->address_id;
        } else {
            if (!empty($request->input("longitude")) and !empty($request->input("latitude"))) {
                $address = $this->projectAddress($request->input("address_id"), $request->input("longitude"), $request->input("latitude"));
            } else {
                $address = $this->projectAddress($request->input("address_id"));
            }
        }

        $model->name = $request->input("name");
        $model->image = $request->input("image");
        $model->project_manager_user_id = $request->input("manager");
        $model->address_id = $address;
        $model->description = $request->input("description");
        $model->number_of_properties = $request->input("number_of_properties");
        $model->client_id = $request->input("client");
        $model->start_date = $request->input("start_date");
        $model->end_date = $request->input("end_date");
        $model->log_user_id = $model->log_user_id;
        $model->status = $model->status;
        if ($model->save()) {
            return response()->json(["status" => "success"], 200);
        }
        return response()->json(["status" => "error", "message" => "Something went wrong "], 400);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = Project::find($id);
        if (!empty($model)) {
            if ($model->delete()) {
                return response()->json(["status" => "success"], 200);
            } else {
                return response()->json(["status" => "error", "message" => "Could not delete this record please retry after some minute"], 400);
            }
        }
        return response()->json(["status" => "error", "message" => "The requested record does not exist"], 400);
    }

    /**
     * search.
     */
    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'query' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
        }

        $query = $request->input('query');
        $page = $request->input('page', 1);
        $perPage = $request->input('perpage', 10);

        $model = Project::where('name', 'LIKE', "%$query%")
            ->orWhere('description', 'LIKE', "%$query%")
            ->orWhere('number_of_properties', 'LIKE', "%$query%")
            ->orWhere('start_date', 'LIKE', "%$query%")
            ->orWhere('end_date', 'LIKE', "%$query%")
            ->paginate($perPage, ["*"], "page", $page);

        if (!empty($model)) {
            return ProjectResource::collection($model);
        } else {
            return response()->json(["status" => "error", "message" => "No record matches your search."], 400);
        }
    }

    /**
     * add a member .
     */
    private function addTeamMember(){
    }

    private function projectAddress($address, $longitude = 0, $latitude = 0)
    {
        $userAuth = auth()->guard('sanctum')->user();
        $model = new Address();
        $model->full_address = $address;
        $model->longitude = $longitude;
        $model->latitude = $latitude;
        $model->log_user_id = $userAuth->id;
        $model->status = Address::DefaultStatus;
        if ($model->save()) {
            return $model;
        }
        return response()->json(["status" => "error", "message" => "something went wrong when creating address"], 400);
    }

}
