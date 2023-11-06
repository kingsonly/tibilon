<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\Material as ResourcesMaterial;
use App\Http\Resources\MaterialType as ResourcesMaterialType;
use App\Models\Material;
use App\Models\MaterialType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;



class MaterialController extends Controller
{
    /**
     * @group Material
     *
     * Get a paginated list of materials.
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
     *            "name": "Material Name",
     *            "materialType": {
     *                "id": 1,
     *                "name": "Material Type Name",
     *                "material_id": 1,
     *                "unit_id": 1
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
        $model = Material::with(["materialType"])->paginate($perPage, ["*"], "page", $page);
        return ResourcesMaterial::collection($model);
    }

    /**
     * @group Material
     *
     * Create a new material.
     *
     * @bodyParam name string required The name of the material.
     *
     * @response {
     *    "status": "success",
     *    "message": "Material created successfully."
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Failed to create the material."
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

        $model = new Material();
        $model->name = $request->input("name");
        $model->log_user_id = $userAuth->id;
        $model->status = Material::Default;
        if ($model->save()) {
            return response()->json(["status" => "success"], 200);
        }
        return response()->json(["status" => "error"], 400);
    }

    /**
     * @group Material
     *
     * Update a material by ID.
     *
     * @urlParam id string required The ID of the material to update.
     *
     * @bodyParam name string required The new name of the material.
     *
     * @response {
     *    "status": "success",
     *    "message": "Material updated successfully."
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Failed to update the material."
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Material with ID {id} not found."
     * }
     */

    public function show(string $id)
    {
        $model = Material::find($id)->with(["materialType"])->first();
        if (!empty($model)) {
            return new ResourcesMaterial($model);
        }
        return response()->json(["status" => "error", "message" => "There is not material with this ID " . $id], 400);
    }

    /**
     * @group Material
     *
     * Update a material by ID.
     *
     * @urlParam id string required The ID of the material to update.
     *
     * @bodyParam name string required The new name of the material.
     *
     * @response {
     *    "status": "success",
     *    "message": "Material updated successfully."
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Failed to update the material."
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Material with ID {id} not found."
     * }
     */

    public function update(Request $request, string $id)
    {
        $model = Material::find($id)->with(["materialType"])->first();
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
     * @group Material
     *
     * Delete a material by ID.
     *
     * @urlParam id string required The ID of the material to delete.
     *
     * @response {
     *    "status": "success",
     *    "message": "Material deleted successfully."
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Failed to delete the material."
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Material with ID {id} not found."
     * }
     */
    public function destroy(string $id)
    {
        $model = Material::find($id);
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
     * Search for materials.
     *
     * @urlParam page integer Page number (optional, default is 1).
     * @urlParam perpage integer Items per page (optional, default is 10).
     *
     * @bodyParam query string required The search query.
     *
     * @response {
     *    "status": "success",
     *    "data": [
     *        {
     *            "id": 1,
     *            "name": "Material Name",
     *            "materialType": {
     *                "id": 1,
     *                "name": "Material Type"
     *            }
     *        }
     *    ]
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Ensure that all required fields are properly filled or no record matches your search."
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

        $model = Material::where('name', 'LIKE', "%$query%")
            ->with(["materialType"])
            ->paginate($perPage, ["*"], "page", $page);

        if (!empty($model)) {
            return ResourcesMaterial::collection($model);
        } else {
            return response()->json(["status" => "error", "message" => "No record matches your search."], 400);
        }
    }

    // material type crude creation here

    /**
     *
     * @group MaterialType
     * List material types.
     *
     * @urlParam page integer Page number (optional, default is 1).
     * @urlParam perpage integer Items per page (optional, default is 10).
     * @urlParam total integer Total number of pages (optional).
     *
     * @queryParam total integer Total number of pages (optional).
     *
     * @response {
     *    "status": "success",
     *    "data": [
     *        {
     *            "id": 1,
     *            "name": "Material Type Name",
     *            "unit": {
     *                "id": 1,
     *                "name": "Unit Name"
     *            }
     *        }
     *    ]
     * }
     */
    public function indexMaterialtype(Request $request)
    {
        $page = $request->input("page", 1);
        $perPage = $request->input("perpage", 10);
        $total = $request->input("total");

        $query = $request->all();
        if (array_key_exists('perpage', $query) && array_key_exists('total', $query)) {
            if ($page < $total) {
                $page++;
            }
        }

        $model = MaterialType::with(["unit"])->paginate($perPage, ["*"], "page", $page);

        return ResourcesMaterialType::collection($model);
    }


    /**
     * @group MaterialType
     *
     * Create a new material type.
     *
     * @urlParam name string required Name of the material type.
     * @urlParam unit integer required ID of the associated unit.
     * @urlParam material integer required ID of the associated material.
     *
     * @bodyParam name string required The name of the material type.
     * @bodyParam unit integer required The ID of the associated unit.
     * @bodyParam material integer required The ID of the associated material.
     *
     * @response {
     *    "status": "success",
     *    "message": "Material type created successfully."
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Failed to create the material type."
     * }
     */
    public function storeMaterialtype(Request $request)
    {
        $userAuth = auth()->guard('sanctum')->user();
        $validate = Validator::make(
            $request->all(),
            [
                'name' => 'required',
                'unit' => 'required',
                'material' => 'required',
            ]
        );

        if ($validate->fails()) {
            return response()->json(['status' => 'error', 'message' => "Ensure that all required fields are properly filled."], 400);
        }

        $model = new MaterialType();
        $model->name = $request->input("name");
        $model->unit_id = $request->input("unit");
        $model->material_id = $request->input("material");
        $model->log_user_id = $userAuth->id;
        $model->status = MaterialType::Default;

        if ($model->save()) {
            return response()->json(["status" => "success", "message" => "Material type created successfully."], 200);
        }

        return response()->json(["status" => "error", "message" => "Failed to create the material type."], 400);
    }



    /**
     * @group MaterialType
     *
     * Get details of a material type by ID.
     *
     * @urlParam id string required The ID of the material type.
     *
     * @response {
     *    "status": "success",
     *    "data": {
     *        "id": 1,
     *        "name": "Material Type Name",
     *        "unit": {
     *            "id": 1,
     *            "name": "Unit Name"
     *        }
     *    }
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Material type with ID {id} not found."
     * }
     */
    public function showMaterialtype(string $id)
    {
        $model = MaterialType::with(["unit"])->find($id);

        if (!empty($model)) {
            return new ResourcesMaterialType($model);
        }

        return response()->json(["status" => "error", "message" => "Material type with ID $id not found."], 400);
    }


    /**
     * @group MaterialType
     *
     * Get material types based on material ID.
     *
     * @urlParam id string required The ID of the material.
     *
     * @response {
     *    "status": "success",
     *    "data": [
     *        {
     *            "id": 1,
     *            "name": "Material Type Name",
     *            "unit": {
     *                "id": 1,
     *                "name": "Unit Name"
     *            }
     *        }
     *    ]
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "No material types found for material with ID {id}."
     * }
     */
    public function showMaterialtypeBasedOnMaterialID(string $id)
    {
        $model = MaterialType::with(["unit"])->where('material_id', $id)->get();

        if ($model->isNotEmpty()) {
            return ResourcesMaterialType::collection($model);
        }

        return response()->json(["status" => "error", "message" => "No material types found for material with ID $id."], 400);
    }


    /**
     * @group MaterialType
     *
     * Update a material type by ID.
     *
     * @urlParam id string required The ID of the material type to update.
     *
     * @bodyParam name string required The new name of the material type.
     * @bodyParam material integer required The new material ID.
     * @bodyParam unit integer required The new unit ID.
     *
     * @response {
     *    "status": "success",
     *    "message": "Material type updated successfully."
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Failed to update the material type."
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Material type with ID {id} not found."
     * }
     */
    public function updateMaterialtype(Request $request, string $id)
    {
        $model = MaterialType::find($id)->first();
        if (empty($model)) {
            return response()->json(["status" => "error", "message" => "There are no material with this specific ID"], 400);
        }

        $validate = Validator::make(
            $request->all(),
            [
                'name' => 'required',
                'material' => 'required',
                'unit' => 'required',
            ]
        );

        if ($validate->fails()) {
            return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
        }

        $model->name = $request->input("name");
        $model->material_id = $request->input("material");
        $model->unit_id = $request->input("unit");
        $model->log_user_id = $model->log_user_id;
        $model->status = $model->status;
        if ($model->save()) {
            return response()->json(["status" => "success"], 200);
        }
        return response()->json(["status" => "error", "message" => "Something went wrong "], 400);
    }

    /**
     * @group MaterialType
     *
     * Delete a material type by ID.
     *
     * @urlParam id string required The ID of the material type to delete.
     *
     * @response {
     *    "status": "success",
     *    "message": "Material type deleted successfully."
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Failed to delete the material type."
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Material type with ID {id} not found."
     * }
     */
    public function destroyMaterialtype(string $id)
    {
        $model = MaterialType::find($id);
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
     * @group MaterialType
     *
     * Search for material types by name.
     *
     * @urlParam page integer Page number (optional, default is 1).
     * @urlParam perpage integer Items per page (optional, default is 10).
     *
     * @queryParam query string required The search query.
     *
     * @response {
     *    "status": "success",
     *    "data": [
     *        {
     *            "id": 1,
     *            "name": "Material Type Name"
     *        }
     *    ]
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Ensure that all required fields are properly filled or no record matches your search."
     * }
     */
    public function searchMaterialtype(Request $request)
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

        $model = MaterialType::where('name', 'LIKE', "%$query%")
            ->paginate($perPage, ["*"], "page", $page);

        if (!empty($model)) {
            return ResourcesMaterialType::collection($model);
        } else {
            return response()->json(["status" => "error", "message" => "No record matches your search."], 400);
        }
    }

    /**
     * @group Material
     *
     * Get all materials with their associated material types.
     *
     * @response {
     *    "status": "success",
     *    "data": [
     *        {
     *            "id": 1,
     *            "name": "Material Name",
     *            "materialType": {
     *                "id": 1,
     *                "name": "Material Type Name",
     *                "material_id": 1,
     *                "unit_id": 1
     *            }
     *        }
     *    ]
     * }
     */
    public function getAllMaterialWithMaterialType(Request $request)
    {
        $materials = Material::select('id', 'name')
            ->with(['materialType' => function ($query) {
                $query->select('id', 'name', 'material_id', 'unit_id');
            }])
            ->get();
        return response()->json($materials, 200);
    }
}
