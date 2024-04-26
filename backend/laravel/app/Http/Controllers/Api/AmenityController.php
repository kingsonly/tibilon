<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\AmenitiesList;
use App\Http\Resources\AmenityShow;
use App\Models\Amenities;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Validator;

class AmenityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);

        $model = Amenities::orderBy('id', 'desc')->paginate($perPage, ['*'], 'page', $page);
        return AmenitiesList::collection($model);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required',
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
        }
        $loggedinuser = auth()->guard('sanctum')->user();
        $image = $request->file('image');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('images/amenities'), $imageName);

        $model = new Amenities();
        $model->name = $request->input('name');
        $model->image = '/images/amenities/' . $imageName;
        $model->log_user_id = $loggedinuser->id;
        $model->status = Amenities::DefaultStatus;

        if ($model->save()) {
            return response()->json(["status" => "success"], 200);
        }
        return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled"], 400);
    }

    /**
     * Display the specified resource.
     */

    public function show(string $id)
    {

        $model = Amenities::find($id)->first();
        if (!empty($model)) {
            return new AmenityShow($model);
        } else {
            return response()->json(["status" => "error", "message" => "There are no Affiliates at the moment"], 400);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required',
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
        }

        $model = Amenities::find($id)->first();
        if (!empty($model)) {

            $model->name = $request->input('name');

            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/amenities'), $imageName);

            $model->image = '/images/amenities/' . $imageName;

            if ($model->save()) {
                return response()->json(["status" => "success", "message" => "You have successfully updted the record"], 200);
            } else {
                return response()->json(["status" => "error", "message" => "Something went wrong please try again"], 400);
            }
        } else {
            return response()->json(["status" => "error", "message" => "The requested record does not exist"], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = Amenities::find($id);
        if (!empty($model)) {
            if ($model->delete()) {
                return response()->json(["status" => "success"], 200);
            } else {
                return response()->json(["status" => "error", "message" => "Couldnot delete this record please retry after some minute"], 400);
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

        $affiliates = Amenities::where('name', 'LIKE', "%$query%")
        ->paginate($perPage, ["*"], "page", $page);
        
            if(!empty($affiliates)){
                return AmenitiesList::collection($affiliates);
            }else{
                return response()->json(["status" => "error","message" => "No record matches your search."],400);
            }


        
    }

}
