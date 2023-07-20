<?php

namespace App\Http\Controllers\Api;

use App\Models\Activities;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ActivitiesController extends Controller
{
    
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
            $perpage = 20;
        }

        $query = $request->all();
        if (array_key_exists('page', $query)) { //check if page is in query string
            $page = $query["page"];
        } else {
            $page = 1;
        }
        $getActivities = Activities::select('*')
        ->selectRaw('DATE(created_at) as day')
        ->groupBy('day', 'id',"title","created_at","updated_at")
        ->orderBy('created_at', 'desc')
        ->paginate($perpage, ['*'], 'page', $page);
        
        $getActivitiesByGrouping = $getActivities->groupBy('day')
        ->map(function ($getActivities) {
            return [
                'date' => $getActivities->first()->created_at,
                'data' => $getActivities->toArray(),
            ];
        });
       
        if($page < $getActivities->toArray()["last_page"]){
            $page += 1;
        }
        return response()->json(['status' => 'success', 'message' => 'subitems fetched with pagination', 'data' => $getActivitiesByGrouping,  'perpage' => $perpage, 'nextpage' => $page], 200);
    }
    
}
