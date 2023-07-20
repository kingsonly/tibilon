<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\AffiliateIList;
use App\Http\Resources\AffiliateShow;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AffiliateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);

        $model = Affiliate::with(["properties.property", "payment.payment","commission.payment"])->orderBy('id', 'desc')->paginate($perPage, ['*'], 'page', $page);
        return AffiliateIList::collection($model);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'name' => 'required',
            "gender" => 'required',
            "address" => 'required',
            "phone_number" => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
        }
        $model = new Affiliate();
        $model->name = $request->input('name');
        $model->gender = $request->input('gender');
        $model->email = $request->input('email');
        $model->address = $request->input('address');
        $model->phone_number = $request->input('phone_number');
        $model->status = Affiliate::DefaultStatus;

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

        $model = Affiliate::find($id)->with(["properties.property", "payment.payment","commission.payment"])->first();
        if (!empty($model)) {
            return new AffiliateShow($model);
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
            'email' => 'required',
            'name' => 'required',
            "gender" => 'required',
            "address" => 'required',
            "phone_number" => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
        }

        $model = Affiliate::find($id)->first();
        if (!empty($model)) {

            $model->name = $request->input('name');
            $model->gender = $request->input('gender');
            $model->email = $request->input('email');
            $model->address = $request->input('address');
            $model->phone_number = $request->input('phone_number');
            $model->status = Affiliate::DefaultStatus;
            if ($model->save()) {
                return response()->json(["status" => "success", "message" => "You have successfully updted the record"], 200);
            } else {
                return response()->json(["status" => "error", "message" => "Something went wrong please try again"], 400);
            }
        } else {
            return response()->json(["status" => "error", "message" => "There are no Affiliates at the moment"], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = Affiliate::find($id);
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

        $affiliates = Affiliate::where('name', 'LIKE', "%$query%")
            ->orWhere('name', 'LIKE', "%$query%")
            ->orWhere('gender', 'LIKE', "%$query%")
            ->orWhere('email', 'LIKE', "%$query%")
            ->orWhere('address', 'LIKE', "%$query%")
            ->orWhere('phone_number', 'LIKE', "%$query%")
            ->orWhere('created_at', 'LIKE', "%$query%")
            ->orWhere('updated_at', 'LIKE', "%$query%")
            ->with(["properties", "payment.payment"])
            ->paginate($perPage, ["*"], "page", $page);
        
            if(!empty($affiliates)){
                return AffiliateIList::collection($affiliates);
            }else{
                return response()->json(["status" => "error","message" => "No record matches your search."],400);
            }


        
    }

    private function properties(string $id)
    {
    }

    private function payment(string $id)
    {
    }
}
