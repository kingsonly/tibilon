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
     * @group Projects
     *
     * Get a paginated list of projects.
     *
     * @urlParam page integer optional The page number (default is 1).
     * @urlParam perpage integer optional Items per page (default is 10).
     * @urlParam total integer optional The total number of items.
     *
     * @response {
     *    "status": "success",
     *    "data": [
     *        {
     *            "id": 1,
     *            "name": "Project Name",
     *            "address": {
     *                "id": 1,
     *                "street": "Street Name",
     *                "city": "City Name",
     *                "state": "State Name",
     *                "country": "Country Name"
     *            },
     *            "manager": {
     *                "id": 1,
     *                "name": "Manager Name"
     *            },
     *            "client": {
     *                "id": 1,
     *                "name": "Client Name"
     *            }
     *        }
     *    ]
     * }
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

    /**
     * @group Projects
     *
     * Create a new project.
     *
     * @bodyParam name string required The name of the project.
     * @bodyParam manager integer required The ID of the project manager.
     * @bodyParam address string required The full address of the project.
     * @bodyParam description string required The project description.
     * @bodyParam number_of_properties integer required The number of properties in the project.
     * @bodyParam client integer required The ID of the client.
     * @bodyParam start_date date required The project start date (YYYY-MM-DD).
     * @bodyParam end_date date required The project end date (YYYY-MM-DD).
     * @bodyParam image file required An image file for the project.
     *
     * @response {
     *    "status": "success",
     *    "message": "Project created successfully."
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Failed to create the project."
     * }
     */

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
     * @group Projects
     *
     * Get details of a project by ID.
     *
     * @urlParam id string required The ID of the project.
     *
     * @response {
     *    "status": "success",
     *    "data": {
     *        "id": 1,
     *        "name": "Project Name",
     *        "address": {
     *            "id": 1,
     *            "street": "Street Name",
     *            "city": "City Name",
     *            "state": "State Name",
     *            "country": "Country Name"
     *        },
     *        "manager": {
     *            "id": 1,
     *            "name": "Manager Name"
     *        },
     *        "client": {
     *            "id": 1,
     *            "name": "Client Name"
     *        }
     *    }
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Project with ID {id} not found."
     * }
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
     * @group Projects
     *
     * Update a project by ID.
     *
     * @urlParam id string required The ID of the project to update.
     *
     * @bodyParam name string required The name of the project.
     * @bodyParam manager integer required The ID of the project manager.
     * @bodyParam address string required The full address of the project.
     * @bodyParam description string required The project description.
     * @bodyParam number_of_properties integer required The number of properties in the project.
     * @bodyParam client integer required The ID of the client.
     * @bodyParam start_date date required The project start date (YYYY-MM-DD).
     * @bodyParam end_date date required The project end date (YYYY-MM-DD).
     * @bodyParam image string The image URL for the project.
     *
     * @response {
     *    "status": "success",
     *    "message": "Project updated successfully."
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Failed to update the project."
     * }
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
     * @group Projects
     *
     * Delete a project by ID.
     *
     * @urlParam id string required The ID of the project to delete.
     *
     * @response {
     *    "status": "success",
     *    "message": "Project deleted successfully."
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Failed to delete the project."
     * }
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
     * @group Projects
     *
     * Search for projects by name, description, number of properties, start date, or end date.
     *
     * @queryParam query string required The search query.
     * @queryParam page integer The page number (default is 1).
     * @queryParam perpage integer The number of results per page (default is 10).
     *
     * @response {
     *    "status": "success",
     *    "data": {
     *        "projects": [
     *            {
     *                "id": 1,
     *                "name": "Project Name",
     *                "description": "Project Description",
     *                "number_of_properties": 10,
     *                "start_date": "2023-01-01",
     *                "end_date": "2023-12-31"
     *            },
     *            {
     *                "id": 2,
     *                "name": "Another Project",
     *                "description": "Another Description",
     *                "number_of_properties": 5,
     *                "start_date": "2023-02-15",
     *                "end_date": "2023-11-30"
     *            }
     *        ]
     *    }
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "No records match your search."
     * }
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
    private function addTeamMember()
    {
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
