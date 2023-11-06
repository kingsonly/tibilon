<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ResourcesUnit;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UnitController extends Controller
{
    /**
     * @group Unit
     *
     * Get a paginated list of units.
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
     *            "name": "Unit Name"
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
        $model = Unit::paginate($perPage, ["*"], "page", $page);
        return ResourcesUnit::collection($model);
    }

    /**
     * @group Unit
     *
     * Create a new unit.
     *
     * @bodyParam name string required The name of the unit.
     *
     * @response {
     *    "status": "success",
     *    "message": "Unit created successfully."
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Failed to create the unit."
     * }
     */
    public function store(Request $request)
    {
        $userAuth = auth()->guard('sanctum')->user();
        $validate = Validator::make(
            $request->all(),
            [
                'name' => 'required',
            ]
        );

        if ($validate->fails()) {
            return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
        }

        $model = new Unit();
        $model->name = $request->input("name");
        $model->log_user_id = $userAuth->id;
        $model->status = Unit::Default;
        if ($model->save()) {
            return response()->json(["status" => "success"], 200);
        }
        return response()->json(["status" => "error"], 400);
    }

    /**
     * @group Unit
     *
     * Get details of a unit by ID.
     *
     * @urlParam id string required The ID of the unit.
     *
     * @response {
     *    "status": "success",
     *    "data": {
     *        "id": 1,
     *        "name": "Unit Name"
     *    }
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Unit with ID {id} not found."
     * }
     */
    public function show(string $id)
    {
        $model = Unit::find($id)->first();
        if (!empty($model)) {
            return new ResourcesUnit($model);
        }
        return response()->json(["status" => "error", "message" => "There is not material with this ID " . $id], 400);
    }

    /**
     * @group Unit
     *
     * Update a unit by ID.
     *
     * @urlParam id string required The ID of the unit to update.
     *
     * @bodyParam name string required The new name of the unit.
     *
     * @response {
     *    "status": "success",
     *    "message": "Unit updated successfully."
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Failed to update the unit."
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Unit with ID {id} not found."
     * }
     */
    public function update(Request $request, string $id)
    {
        $model = Unit::find($id)->first();
        if (empty($model)) {
            return response()->json(["status" => "error", "message" => "There are no material with this specific ID"], 400);
        }

        $validate = Validator::make(
            $request->all(),
            [
                'name' => 'required',
            ]
        );

        if ($validate->fails()) {
            return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
        }

        $model->name = $request->input("name");
        $model->log_user_id = $model->log_user_id;
        $model->status = $model->status;
        if ($model->save()) {
            return response()->json(["status" => "success"], 200);
        }
        return response()->json(["status" => "error", "message" => "Something went wrong "], 400);
    }

    /**
     * @group Unit
     *
     * Delete a unit by ID.
     *
     * @urlParam id string required The ID of the unit to delete.
     *
     * @response {
     *    "status": "success",
     *    "message": "Unit deleted successfully."
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Failed to delete the unit."
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Unit with ID {id} not found."
     * }
     */
    public function destroy(string $id)
    {
        $model = Unit::find($id);
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
     * @group Unit
     *
     * Search for units by name.
     *
     * @queryParam query string required The search query.
     * @urlParam page integer optional The page number (default is 1).
     * @urlParam perpage integer optional Items per page (default is 10).
     *
     * @response {
     *    "status": "success",
     *    "data": [
     *        {
     *            "id": 1,
     *            "name": "Unit Name"
     *        }
     *    ]
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "No units match your search."
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

        $model = Unit::where('name', 'LIKE', "%$query%")
            ->paginate($perPage, ["*"], "page", $page);

        if (!empty($model)) {
            return ResourcesUnit::collection($model);
        } else {
            return response()->json(["status" => "error", "message" => "No record matches your search."], 400);
        }
    }
}
