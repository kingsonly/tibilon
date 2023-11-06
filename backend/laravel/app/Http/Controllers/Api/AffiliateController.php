<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\AffiliateIList;
use App\Http\Resources\AffiliateShow;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

/**
 * @group Affiliate Management
 *
 * APIs to manage affiliate
 */

class AffiliateController extends Controller
{
    /**
     * Retrieves a paginated list of affiliates with their associated properties, payments, and commissions.
     *
     * @queryParam per_page int Size per page. Defaults to 10. Example:20
     * @queryParam  page int Page to view. Example:1
     *
     * @apiResourceCollection App\Http\Resources\AffiliateIList
     * @apiResourceModel App\Models\Affiliate
     *
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);

        $model = Affiliate::with(["properties.property", "payment.payment", "commission.payment"])->orderBy('id', 'desc')->paginate($perPage, ['*'], 'page', $page);
        return AffiliateIList::collection($model);
    }


    /**
     * This is the store method of the Affiliate class.
     * It is responsible for validating and storing affiliate data.
     * If the validation fails, it returns an error response.
     * If the data is successfully saved, it returns a success response.
     *
     * @bodyParam email email required Email of the affiliate. Example: colin@example.com
     * @bodyParam name string required Name of the affiliate. Example: Collins
     * @bodyParam gender string required Gender of the affiliate. Example: male
     * @bodyParam address string required Address of the affiliate. Example: house 69, fct
     * @bodyParam phone_number string required Contact of the affiliate. Example: 07000000001
     * @response 200{
     * "status":"success"
     * }
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
     * Display the specified affiliate.
     *
     * @urlParam Affiliate int required Affiliate ID. Example:1
     *
     * @apiResource App\Http\Resources\AffiliateShow
     * @apiResourceModel App\Models\Affiliate
     */

    public function show(string $id)
    {

        $model = Affiliate::find($id)->with(["properties.property", "payment.payment", "commission.payment"])->first();
        if (!empty($model)) {
            return new AffiliateShow($model);
        } else {
            return response()->json(["status" => "error", "message" => "There are no Affiliates at the moment"], 400);
        }
    }


    /**
     * Update the specified affiliate in storage.
     * @bodyParam email email required Email of the affiliate. Example: colin@example.com
     * @bodyParam name string required Name of the affiliate. Example: Collins
     * @bodyParam gender string required Gender of the affiliate. Example: male
     * @bodyParam address string required Address of the affiliate. Example: house 69, fct
     * @bodyParam phone_number string required Contact of the affiliate. Example: 07000000001
     *
     * @response 200{
     * "status":"success",
     * }
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
     * Remove the specified affiliate from storage.
     *
     * @response 200{
     * "status":"success"
     * }
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


    /**
     * searches  amd returns paginated list of affiliates with their associated properties, payments, and commissions.
     *
     * @queryParam query  string keyword. Example:collins
     * @queryParam per_page int Size per page. Defaults to 10. Example:20
     * @queryParam  page int Page to view. Example:1
     *
     * @apiResourceCollection App\Http\Resources\AffiliateIList
     * @apiResourceModel App\Models\Affiliate
     *
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

        if (!empty($affiliates)) {
            return AffiliateIList::collection($affiliates);
        } else {
            return response()->json(["status" => "error", "message" => "No record matches your search."], 400);
        }
    }

    private function properties(string $id)
    {
    }

    private function payment(string $id)
    {
    }
}
