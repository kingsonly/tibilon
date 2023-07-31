<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\User;
use App\Mail\Welcomeemail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Mail\Forgotpassword;
use App\Http\Resources\LoginResources;
use App\Http\Resources\UsersResource;
use Illuminate\Http\JsonResponse;





/**
 * @group User management
 *
 * APIs for managing basic site requirments such as login, logout, registration etc
 */
class UserController extends Controller
{
    /**
     * @autenticated
     * This route is responsible for fetching a perticular logedin users basic data
     * @response {
     *      "status": "success",
     *      "message": "subitems fetched with pagination",
     *      "data": {
     *          "current_page": 10,
     *          "data": [
     *                      {
     *                          "id": 10,
     *                          "name": "Darius Labadie",
     *                          "email": "ckerluke@example.com",
     *                          "email_verified_at": "2023-05-26T14:23:44.000000Z",
     *                          "log_user_id": 1,
     *                          "created_at": "2023-05-26T14:23:44.000000Z",
     *                          "updated_at": "2023-05-26T14:23:44.000000Z"
     *                       },
     *                    {
     *                          "id": 9,
     *                          "name": "Ciara Schuppe",
     *                          "email": "nhirthe@example.org",
     *                          "email_verified_at": "2023-05-26T14:23:44.000000Z",
     *                          "log_user_id": 1,
     *                          "created_at": "2023-05-26T14:23:44.000000Z",
     *                          "updated_at": "2023-05-26T14:23:44.000000Z"
     *                          },   
     *                     {
     *                          "id": 8,
     *                          "name": "Miss Adele Waelchi",
     *                          "email": "valerie59@example.net",
     *                          "email_verified_at": "2023-05-26T14:23:44.000000Z",
     *                          "log_user_id": 1,
     *                          "created_at": "2023-05-26T14:23:44.000000Z",    
     *                          "updated_at": "2023-05-26T14:23:44.000000Z"
     *                      },
     *                      {
     *                          "id": 7,
     *                          "name": "Miss Jailyn Hessel IV",
     *                          "email": "lisa73@example.org",
     *                          "email_verified_at": "2023-05-26T14:23:44.000000Z",
     *                          "log_user_id": 1,
     *                          "created_at": "2023-05-26T14:23:44.000000Z",
     *                          "updated_at": "2023-05-26T14:23:44.000000Z"
     *                       }
     *                  ],
     *                  "first_page_url": "http://localhost:8080/api/user?page=1",
     *                  "from": 91,
     *                  "last_page": 10,
     *                  "last_page_url": "http://localhost:8080/api/user?page=10",
     *                  "links": [
     *                              {
     *                                  "url": "http://localhost:8080/api/user?page=9",
     *                                  "label": "&laquo; Previous",
     *                                  "active": false
     *                              },
     *                              {
     *                                  "url": "http://localhost:8080/api/user?page=1",
     *                                  "label": "1",
     *                                  "active": false
     *                                  },
     *                             {
     *                                  "url": "http://localhost:8080/api/user?page=2",
     *                                  "label": "2",
     *                                  "active": false
     *                              },
     *                              {
     *                                  "url": "http://localhost:8080/api/user?page=3",
     *                                       "label": "3",
     *                                  "active": false
     *                              },
     *                              {
     *                                  "url": "http://localhost:8080/api/user?page=4",
     *                                  "label": "4",
     *                                  "active": false
     *                              },        
     *                          ],
     *                          "next_page_url": null,
     *                          "path": "http://localhost:8080/api/user",
     *                          "per_page": 10,
     *                          "prev_page_url": "http://localhost:8080/api/user?page=9",
     *                          "to": 100,
     *                          "total": 100
     *                        },
     *                        "totalpages": 10,
     *                        "perpage": 10
     *          }
     */

    public function index(Request $request)
    {
        // $loggedinuser = auth()->guard('sanctum')->user();
        // if (!isset($loggedinuser)) {
        //     return response()->json(['status' => 'error', 'message' => 'you dont have write and edit access',  'data' => ''], 400);
        // }
        $query = $request->all();

        if (array_key_exists('perpage', $query)) { //check if perpage is in query string
            $perpage = $query["perpage"];
        } else {
            $perpage = 10;
        }

        $query = $request->all();
        if (array_key_exists('page', $query)) { //check if page is in query string
            $page = $query["page"];
        } else {
            $page = 1;
        }
        $users = User::orderBy('id', 'desc')->with(["properties.property", "payment.payment","commission.payment"])->paginate($perpage);
        $data = $users;

        return UsersResource::collection($data);
        $totalpages = ceil($users["total"] / $perpage);
        return response()->json(['status' => 'success', 'message' => 'subitems fetched with pagination', 'data' => $data,  'totalpages' => $totalpages, 'perpage' => $perpage], 200);
    }

    /**
     * @bodyParam email string required The email of the user. Example: kingsonly13c@gmail.com
     * @bodyParam password string required The password of the user. Example: firstoctober
     * @bodyParam firstname string required The firstname of the user. Example: kingsley
     * @bodyParam lastname string required The lastname of the user. Example: Achumie
     * This route is responsible for enabling a user to register and create an account on the system
     * @response {
     *  "status": "success",
     *  "message": "user created successfully",
     *  "data": {
     *      "email": "kingsonly13c@gmail.com",
     *      "name": "Kings Kings",
     *      "updated_at": "2023-04-14T15:28:27.000000Z",
     *      "created_at": "2023-04-14T15:28:27.000000Z",
     *      "id": 16,
     *      "reverse": 1681486107
     *    }
     * }
     */
    public function register(Request $request)
    {
        $userAuth = auth()->guard('sanctum')->user();
        if($userAuth){
            $validator = Validator::make($request->all(), [
                'email' => 'required|unique:users',
                'firstname' => 'required',
                'lastname' => 'required',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
            }
    
            $user = new User();
            $time = new \DateTime("Africa/Lagos");
            $user->email = $request->input('email');
            $user->password = "$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi";
            //$user->isactive = 1;
            $password = $request->input('password');
            $user->firstname = ucwords($request->input('firstname')) ;
            $user->lastname = ucwords($request->input('lastname'));
            $user->log_user_id = $userAuth->id;
            $codex = substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ"), -3);
            $user->passwordresetcode = $codex . str_shuffle('1234567');
    
            if ($user->save()) {
    
                // note change the sending of email to become a queue
                try {
                    //$user->link = time().str_shuffle("01234567893ABCDEFGHIJKLMN01234567893ABCDEFGHIJKLMN").$user->emailresetcode;
                    Mail::to($user)->send(new Welcomeemail($user));
                } catch (\Exception $e) {
                    //throw new $e($e->getMessage());
                    //$error = $e->getMessage();
                    return response()->json(['status' => 'success', 'message' => "user created successfully", 'data' => $user], 201);
                }
    
                return response()->json(['status' => 'success', 'message' => "user created successfully", 'data' => $user], 201);
            } else {
                return response()->json(['status' => 'error', 'message' => 'cannot create user', 'data' => $user], 400);
            }
        }
        return response()->json(['status' => 'error', 'message' => 'You must be An Admin Member to use this route'], 400);

        
    }

    /**
     * @bodyParam email string required The email of the user. Example: kingsonly13c@gmail.com
     * @bodyParam password string required The password of the user. Example: firstoctober
     * This route is responsible for enabling a user to login into the system
     * @response {
     *  "data": {
     *      "name": "Prof. Morris Boehm",
     *      "token": "3|XyZ0nQXDCq4ZN8Z81ILGSvJMTRDDtGDMAXeWGip4",
     *      "email": "damion.mante@example.com",
     *      "status": "success",
     *      "message": "user logged in"
     *     }
     * }
     */

    public function login(Request $request): LoginResources | JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return  response()->json(["status" => "error", "data" => $validator->errors()],400) ;
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $authUser = Auth::user();
            $authUser['token'] = $authUser->createToken('MyAuthApp')->plainTextToken;

            //return response()->json(['status' => 'success', 'message' => 'user logged in', 'data' => $authUser], 200);
            return new LoginResources($authUser);
        } else {
            return  response()->json(["status" => "error", "message" => "Wrong Email or Password"],400) ;
        }
    }


     /**
     * @bodyParam email string required The email used to send password reset link to a user . Example:kings@gmail.com
     * This route is responsible for sending password reset link to a user when the user wants to reset their password
     * @response {
     *  "status": "success",
     *  "message": "Please check your email for further instruction",
     *  "data": {
     *      "firstname": "Gavin Abbott",
     *      "link": "/recoverpassword/1683386125VJZ3625741"
     *  }
     * }
     */
    public function sendpasswordresetlink(Request $request)
    {
        
        $time = new \DateTime("Africa/Lagos");
        $validator = Validator::make($request->all(), [
            'email' => 'required',
        ]);

        if ($validator->fails()) {
            return  response()->json(["status" => "error", "data" => $validator->errors()],400) ;
        }

        $email = $request->input('email');
        $user = User::where('email', $email)->first();

        if (empty($user)) {
            return response()->json(["status" => "error", "message" => "The email address you entered does not exist.", "data" => ''], 400);
        } else {
            $codex = substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ"), -3);
            $user->passwordresetcode = $codex . str_shuffle('1234567');

            $user->save();
            $data = array(
                'firstname' => $user->firstname,
                'lastname' => $user->lastname,

                'link' => $user->passwordresetcode,
            );

            try {

                Mail::to($email)->send(new Forgotpassword($data));
            } catch (\Exception $e) {
                //throw $e("Email not sent");
                
                return response()->json(['status' => 'error', 'email was not sent', 'data' => $e], 400);
            }
            return response()->json(['status' => 'success', 'message' => 'Please check your email for further instruction'], 200);
        }
    }

    /**
     * @urlParam id string required This id is used to fetch the user from the database which password needs to be changed.
     * @bodyParam password string required The password which would be saved as the new users password . Example:firstoctober
     * @response {
     *  "status": "success",
     *  "message": "password changed successfully",
     *  "data": {
     *      "id": 1,
     *      "name": "Gavin Abbott",
     *      "email": "noe.wisozk@example.org",
     *      "email_verified_at": "2023-05-06T04:05:23.000000Z",
     *      "passwordresetcode": 1683386423,
     *      "created_at": "2023-04-12T14:05:43.000000Z",
     *      "updated_at": "2023-05-06T15:20:23.000000Z"
     *    }
     * }
     */
    public function resetpassword(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => $validator->errors()], 200);
        }

        $password = $request->input('password');
        $code = $id;
        $code = substr($code, -10);
        $user = User::where('passwordresetcode', $code)->first();

        if ($user == null) {
            return response()->json(["status" => "error", "message" => "code does not exist or expired", "data" => ''], 400);
        } else {
            $user->passwordresetcode = time();
            $user->password = bcrypt($password);
            $time = new \DateTime("Africa/Lagos");
            $user->email_verified_at = $time->format("Y-m-d h:m:s");
            $user->save();
            return response()->json(['status' => 'success', 'message' => 'password changed successfully', 'data' => $user], 200);
        }
    }

    /**
     * This route is used by a user to destroy their account
     * @response {
     *  "status": "success",
     *  "message": "The user with 2 ID was deleted successfully"
     * s}
     */
    public function destroy($id)
    {
        $loggedinuser = $userAuth = auth()->guard('sanctum')->user();;
        if( empty($loggedinuser))
        {
          return response()->json(['status'=>'error', 'message'=>'you dont have write and edit access',  'data' =>''],400);
        }
    
        $user = User::find($id);
        if (empty($user)) {
            return response()->json(["status" => "error", "message" => "No user was found with the above id ${id}"], 400);
        }
        $user->delete();
        return response()->json(["status" => "success", "message" => "The user with ${id} ID was deleted successfully"], 200);
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

        $users = User::where('firstname', 'LIKE', "%$query%")
            ->orWhere('lastname', 'LIKE', "%$query%")
            ->orWhere('email', 'LIKE', "%$query%")
            ->orWhere('created_at', 'LIKE', "%$query%")
            ->orWhere('updated_at', 'LIKE', "%$query%")
            ->with(["properties", "payment.payment"])
            ->paginate($perPage, ["*"], "page", $page);
        
            if(!empty($users)){
                return UsersResource::collection($users);
            }else{
                return response()->json(["status" => "error","message" => "No record matches your search."],400);
            }


        
    }

    public function logout()
    {
        $auth = Auth::user();
        if($auth->tokens()->delete()){
            return response()->json(["status" => "success"],200);
        }
        return response()->json(["status" => "error"],400);
        
    }


    
}
