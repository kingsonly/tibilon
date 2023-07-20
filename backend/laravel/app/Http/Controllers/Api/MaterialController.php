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
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = $request->input("page", 1);
        $perPage = $request->input("perpage", 10);
        $total = $request->input("total");

        $query = $request->all();
        if (array_key_exists('perpage', $query) and array_key_exists('total', $query)) {
            if($page < $total){
                $page++;
            }
        }
        $model = Material::with(["materialType"])->paginate($perPage, ["*"], "page", $page);
        return ResourcesMaterial::collection($model);
    }

    /**
     * Store a newly created resource in storage.
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
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $model = Material::find($id)->with(["materialType"])->first();
        if(!empty($model)){
            return new ResourcesMaterial($model);
        }
        return response()->json(["status" => "error", "message" => "There is not material with this ID ".$id],400);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $model = Material::find($id)->with(["materialType"])->first();
        if(empty($model)){
            return response()->json(["status" => "error", "message" => "There are no material with this specific ID"],400);
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
        if($model->save()){
            return response()->json(["status" => "success"],200);
        }
        return response()->json(["status" => "error", "message" => "Something went wrong "],400);
        
    }

    /**
     * Remove the specified resource from storage.
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
        
            if(!empty($model)){
                return ResourcesMaterial::collection($model);
            }else{
                return response()->json(["status" => "error","message" => "No record matches your search."],400);
            }


        
    }

    // material type crude creation here

     /**
     * Display a listing of the resource.
     */
    public function indexMaterialtype(Request $request)
    {
        $page = $request->input("page", 1);
        $perPage = $request->input("perpage", 10);
        $total = $request->input("total");

        $query = $request->all();
        if (array_key_exists('perpage', $query) and array_key_exists('total', $query)) {
            if($page < $total){
                $page++;
            }
        }
        $model = MaterialType::with(["unit"])->paginate($perPage, ["*"], "page", $page);
        return ResourcesMaterialType::collection($model);
    }

    /**
     * Store a newly created resource in storage.
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
            return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
        }

        $model = new MaterialType();
        $model->name = $request->input("name");
        $model->unit_id = $request->input("unit");
        $model->material_id = $request->input("material");
        $model->log_user_id = $userAuth->id;
        $model->status = MaterialType::Default;
        if ($model->save()) {
            return response()->json(["status" => "success"], 200);
        }
        return response()->json(["status" => "error"], 400);
    }

    /**
     * Display the specified resource.
     */
    public function showMaterialtype(string $id)
    {
        $model = MaterialType::find($id)->with(["unit"])->first();
        if(!empty($model)){
            return new ResourcesMaterialType($model);
        }
        return response()->json(["status" => "error", "message" => "There is not material with this ID ".$id],400);
        
    }

     /**
     * Display the specified resource based on material id.
     */
    public function showMaterialtypeBasedOnMaterialID(string $id)
    {
        $model = MaterialType::find($id)->with(["unit"])->get();
        if(!empty($model)){
            return ResourcesMaterialType::collection($model);
        }
        return response()->json(["status" => "error", "message" => "There is not material with this ID ".$id],400);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateMaterialtype(Request $request, string $id)
    {
        $model = MaterialType::find($id)->first();
        if(empty($model)){
            return response()->json(["status" => "error", "message" => "There are no material with this specific ID"],400);
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
        if($model->save()){
            return response()->json(["status" => "success"],200);
        }
        return response()->json(["status" => "error", "message" => "Something went wrong "],400);
        
    }

    /**
     * Remove the specified resource from storage.
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
        
            if(!empty($model)){
                return ResourcesMaterialType::collection($model);
            }else{
                return response()->json(["status" => "error","message" => "No record matches your search."],400);
            }


        
    }



}
