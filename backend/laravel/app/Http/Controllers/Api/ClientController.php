<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\ClientResource;
use App\Models\Client;
use App\Models\ClientAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
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
        $model = Client::orderBy('id', 'desc')->paginate($perPage, ["*"], "page", $page);
        return ClientResource::collection($model);
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
                'email' => 'required',
                'phone' => 'required',
                'address_id' => 'required',
                'type' => 'required',
                'image' => 'required',
            ]
        );

        if ($validate->fails()) {
            return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
        }

        $model = new Client();
        if (!empty($request->input("longitude")) and !empty($request->input("latitude"))) {
            $address = $this->clientAddress($request->input("address_id"), $request->input("longitude"), $request->input("latitude"));
        } else {
            $address = $this->clientAddress($request->input("address_id"));
        }

        $model->name = $request->input("name");
        $model->address_id = $address->id;
        $model->email = $request->input("email");
        $model->phone = $request->input("phone");
        $model->client_type = $request->input("type");
        $model->log_user_id = $userAuth->id;
        $model->status = Client::DefaultStatus;
        $model->password = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';
        
        // Check if image is set to 'default'
    if ($request->input("image") !== 'default') {
        $image = $request->file('image');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('images/client'), $imageName);
        $model->image = '/images/client/' . $imageName;
    } else {
        // If image is 'default', set the image field to 'default'
        $model->image = 'default';
    }
    
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
        $model = Client::find($id)->first();
        if (!empty($model)) {
            return new ClientResource($model);
        }
        return response()->json(["status" => "error", "message" => "There is not material with this ID " . $id], 400);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $model = Client::find($id)->first();
        if (empty($model)) {
            return response()->json(["status" => "error", "message" => "There are no material with this specific ID"], 400);
        }

        $validate = Validator::make(
            $request->all(),
            [
                'name' => 'required',
                'email' => 'required',
                'phone' => 'required',
                'address_id' => 'required',
                'type' => 'required',
            ]
        );

        if ($validate->fails()) {
            return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
        }
        if ($model->address_id == $request->input("address")) {
            $address = $model->address_id;
        } else {
            if (!empty($request->input("longitude")) and !empty($request->input("latitude"))) {
                $address = $this->clientAddress($request->input("address_id"), $request->input("longitude"), $request->input("latitude"));
            } else {
                $address = $this->clientAddress($request->input("address_id"));
            }
        }

        $model->name = $request->input("name");
        $model->address_id = $address->id;
        $model->email = $request->input("email");
        $model->phone = $request->input("phone");
        $model->client_type = $request->input("type");
        $model->status = Client::DefaultStatus;
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
        $model = Client::find($id);
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

        $model = Client::where('name', 'LIKE', "%$query%")
            ->orWhere('phone', 'LIKE', "%$query%")
            ->orWhere('email', 'LIKE', "%$query%")
            ->paginate($perPage, ["*"], "page", $page);

        if (!empty($model)) {
            return ClientResource::collection($model);
        } else {
            return response()->json(["status" => "error", "message" => "No record matches your search."], 400);
        }
    }

    private function clientAddress($address, $longitude = 0, $latitude = 0)
    {
        $userAuth = auth()->guard('sanctum')->user();
        $model = new ClientAddress();
        $model->full_address = $address;
        $model->longitude = $longitude;
        $model->latitude = $latitude;
        $model->log_user_id = $userAuth->id;
        $model->status = Client::DefaultStatus;
        if ($model->save()) {
            return $model;
        }
        return response()->json(["status" => "error", "message" => "something went wrong when creating address"], 400);
    }
}
