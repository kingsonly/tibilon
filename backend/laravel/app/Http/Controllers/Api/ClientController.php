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
     * @group Clients
     *
     * Get a list of clients.
     *
     * @queryParam page integer The page number (default is 1).
     * @queryParam perpage integer The number of results per page (default is 10).
     * @queryParam total integer The total number of records.
     *
     * @response {
     *    "status": "success",
     *    "data": {
     *        "clients": [
     *            {
     *                "id": 1,
     *                "name": "Client Name 1",
     *                "email": "client1@example.com",
     *                "phone": "123-456-7890"
     *            },
     *            {
     *                "id": 2,
     *                "name": "Client Name 2",
     *                "email": "client2@example.com",
     *                "phone": "987-654-3210"
     *            }
     *        ]
     *    }
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
        $model = Client::orderBy('id', 'desc')->paginate($perPage, ["*"], "page", $page);
        return ClientResource::collection($model);
    }

    /**
     * @group Clients
     *
     * Create a new client.
     *
     * @bodyParam name string required The name of the client.
     * @bodyParam email string required The email address of the client.
     * @bodyParam phone string required The phone number of the client.
     * @bodyParam address_id integer required The ID of the client's address.
     * @bodyParam type string required The type of the client.
     * @bodyParam image file required The client's image.
     * @bodyParam longitude float The longitude of the client's location (optional).
     * @bodyParam latitude float The latitude of the client's location (optional).
     *
     * @response {
     *    "status": "success",
     *    "message": "Client created successfully"
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Ensure that all required fields are properly filled."
     * }
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
        $image = $request->file('image');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('images/client'), $imageName);
        $model->image = '/images/client/' . $imageName;
        if ($model->save()) {
            return response()->json(["status" => "success"], 200);
        }
        return response()->json(["status" => "error"], 400);
    }

    /**
     * @group Clients
     *
     * Get client details by ID.
     *
     * @urlParam id required The ID of the client.
     *
     * @response {
     *    "status": "success",
     *    "message": "Client details retrieved successfully",
     *    "data": {
     *        "id": 1,
     *        "name": "Client Name",
     *        "email": "client@email.com",
     *        "phone": "123-456-7890",
     *        "address": "Client Address",
     *        "type": "Client Type",
     *        "image": "/images/client/client_image.jpg",
     *        "created_at": "2023-10-30T12:00:00Z",
     *        "updated_at": "2023-10-30T14:30:00Z"
     *    }
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Client with this ID does not exist"
     * }
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
     * @group Clients
     *
     * Update client information by ID.
     *
     * @urlParam id required The ID of the client to update.
     *
     * @bodyParam name string required The name of the client.
     * @bodyParam email string required The email of the client.
     * @bodyParam phone string required The phone number of the client.
     * @bodyParam address_id integer required The address ID of the client.
     * @bodyParam type string required The type of the client.
     * @bodyParam longitude float The longitude of the client's address.
     * @bodyParam latitude float The latitude of the client's address.
     *
     * @response {
     *    "status": "success",
     *    "message": "Client information updated successfully"
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Client with this ID does not exist"
     * }
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
     * @group Clients
     *
     * Delete a client by ID.
     *
     * @urlParam id required The ID of the client to delete.
     *
     * @response {
     *    "status": "success",
     *    "message": "Client deleted successfully"
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Client with this ID does not exist"
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "Could not delete this client record, please retry after some time"
     * }
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
    /**
     * @group Clients
     *
     * Search for clients by name, phone, or email.
     *
     * @queryParam query required The search query.
     * @queryParam page The page number (default: 1).
     * @queryParam perpage The number of results per page (default: 10).
     *
     * @response {
     *    "status": "success",
     *    "data": [
     *        {
     *            "id": 1,
     *            "name": "Client Name",
     *            "phone": "1234567890",
     *            "email": "client@example.com",
     *            // ... other client properties
     *        },
     *        // ... other client objects
     *    ]
     * }
     *
     * @response 400 {
     *    "status": "error",
     *    "message": "No record matches your search."
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
