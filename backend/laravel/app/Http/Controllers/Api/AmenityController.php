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
     * @group Amenities
     *
     * Retrieve a paginated list of amenities.
     *
     * @queryParam per_page integer The number of amenities per page. (default: 10)
     * @queryParam page integer The page number. (default: 1)
     *
     * @response 200 {
     *     "data": [
     *         {
     *             "id": 1,
     *             "name": "Amenity 1",
     *             // Include other amenity fields here
     *         },
     *         {
     *             "id": 2,
     *             "name": "Amenity 2",
     *             // Include other amenity fields here
     *         },
     *         // Add more amenity entries as needed
     *     ],
     *     "links": {
     *         "first": "URL_TO_FIRST_PAGE",
     *         "last": "URL_TO_LAST_PAGE",
     *         "prev": "URL_TO_PREVIOUS_PAGE",
     *         "next": "URL_TO_NEXT_PAGE"
     *     },
     *     "meta": {
     *         "current_page": 1,
     *         "from": 1,
     *         "last_page": 2,
     *         "path": "URL_TO_ENDPOINT",
     *         "per_page": 10,
     *         "to": 10,
     *         "total": 15
     *     }
     * }
     *
     * @response 400 {
     *     "status": "error",
     *     "message": "Error message describing the issue."
     * }
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);

        $model = Amenities::orderBy('id', 'desc')->paginate($perPage, ['*'], 'page', $page);
        return AmenitiesList::collection($model);
    }


    /**
     * @group Amenities
     *
     * Create a new amenity.
     *
     * @bodyParam image file required The image of the amenity.
     * @bodyParam name string required The name of the amenity.
     *
     * @response 200 {
     *     "status": "success"
     * }
     *
     * @response 400 {
     *     "status": "error",
     *     "message": "Error message describing the issue."
     * }
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
     * @group Amenities
     *
     * Display a specific amenity.
     *
     * @urlParam id string required The ID of the amenity to retrieve.
     *
     * @response 200 {
     *     "data": {
     *         "id": 1,
     *         "name": "Amenity Name",
     *         "image": "/images/amenities/amenity_image.jpg",
     *         "created_at": "2023-10-30 12:34:56",
     *         "updated_at": "2023-10-30 12:34:56"
     *     }
     * }
     *
     * @response 400 {
     *     "status": "error",
     *     "message": "Amenity not found."
     * }
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
     * @group Amenities
     *
     * Update a specific amenity.
     *
     * @urlParam id string required The ID of the amenity to update.
     *
     * @bodyParam name string required The name of the amenity.
     * @bodyParam gender string required The gender of the amenity.
     * @bodyParam email string required The email of the amenity.
     * @bodyParam address string required The address of the amenity.
     * @bodyParam phone_number string required The phone number of the amenity.
     *
     * @response 200 {
     *     "status": "success",
     *     "message": "Amenity updated successfully"
     * }
     *
     * @response 400 {
     *     "status": "error",
     *     "message": "Amenity not found or update failed"
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

        $model = Amenities::find($id)->first();
        if (!empty($model)) {

            $model->name = $request->input('name');
            $model->gender = $request->input('gender');
            $model->email = $request->input('email');
            $model->address = $request->input('address');
            $model->phone_number = $request->input('phone_number');
            $model->status = Amenities::DefaultStatus;
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
     * @group Amenities
     *
     * Delete a specific amenity.
     *
     * @urlParam id string required The ID of the amenity to delete.
     *
     * @response 200 {
     *     "status": "success",
     *     "message": "Amenity deleted successfully"
     * }
     *
     * @response 400 {
     *     "status": "error",
     *     "message": "Amenity not found or deletion failed"
     * }
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


    /**
     * @group Amenities
     *
     * Search amenities based on a query.
     *
     * @queryParam query string required The search query.
     * @queryParam page integer The page number (default is 1).
     * @queryParam perpage integer The number of items per page (default is 10).
     *
     * @response 200 {
     *     "status": "success",
     *     "data": {
     *         "current_page": 1,
     *         "data": [
     *             {
     *                 "id": 1,
     *                 "name": "Amenity 1"
     *             },
     *             {
     *                 "id": 2,
     *                 "name": "Amenity 2"
     *             }
     *             // Other amenity objects
     *         ],
     *         "first_page_url": "http://url.com/api/amenities?page=1",
     *         "from": 1,
     *         "last_page": 2,
     *         "last_page_url": "http://url.com/api/amenities?page=2",
     *         "next_page_url": "http://url.com/api/amenities?page=2",
     *         "path": "http://url.com/api/amenities",
     *         "per_page": 10,
     *         "prev_page_url": null,
     *         "to": 10,
     *         "total": 11
     *     }
     * }
     *
     * @response 400 {
     *     "status": "error",
     *     "message": "No records match the search."
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

        $affiliates = Amenities::where('name', 'LIKE', "%$query%")
            ->paginate($perPage, ["*"], "page", $page);

        if (!empty($affiliates)) {
            return AmenitiesList::collection($affiliates);
        } else {
            return response()->json(["status" => "error", "message" => "No record matches your search."], 400);
        }
    }
}
