<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ResourcesUnit;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UnitController extends Controller
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
        $model = Unit::paginate($perPage, ["*"], "page", $page);
        return ResourcesUnit::collection($model);
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
     * Display the specified resource.
     */

    public function show(string $id)
    {
        $model = Unit::find($id)->first();
        if(!empty($model)){
            return new ResourcesUnit($model);
        }
        return response()->json(["status" => "error", "message" => "There is not material with this ID ".$id],400);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $model = Unit::find($id)->first();
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
        
            if(!empty($model)){
                return ResourcesUnit::collection($model);
            }else{
                return response()->json(["status" => "error","message" => "No record matches your search."],400);
            }
    }
}
