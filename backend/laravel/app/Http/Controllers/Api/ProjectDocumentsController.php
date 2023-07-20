<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\DocumentResource;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectDocumentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'project' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
        }

        $page = $request->input("page", 1);
        $project = $request->input("project");
        $perPage = $request->input("perpage", 10);
        $total = $request->input("total");

        $query = $request->all();
        if (array_key_exists('perpage', $query) and array_key_exists('total', $query)) {
            if ($page < $total) {
                $page++;
            }
        }
        if(!empty($request->input("fileType"))){
            $model = Document::where(["project_id" => $project])->orderBy('id', 'desc')->where(["file_type" => $request->input("fileType")])->paginate($perPage, ["*"], "page", $page);
        }else{
            $model = Document::where(["project_id" => $project])->orderBy('id', 'desc')->paginate($perPage, ["*"], "page", $page);

        }
        
        return DocumentResource::collection($model);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'project' => 'required',
            'title' => 'required',
            'file' => 'required',
            'fileType' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
        }
        $loggedinuser = auth()->guard('sanctum')->user();
        $image = $request->file('file');
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $project = $request->input("project");
        $image->move(public_path('images/projects_document/' . $project), $imageName);

        $model = new Document();
        $model->file_path = 'images/projects_document/' . $project . '/' . $imageName;
        $model->project_id = $request->input('project');
        $model->document_title = $request->input('title');
        $model->file_type = $request->input('fileType');
        $model->log_user_id = $loggedinuser->id;
        $model->status = Document::DefaultStatus;

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
        $model = Document::find($id)->first();
        if (!empty($model)) {
            return new DocumentResource($model);
        } else {
            return response()->json(["status" => "error", "message" => "There are no Affiliates at the moment"], 400);
        }
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        if (count($request->all()) < 1) {
            return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
        }

        $model = Document::find($id);
        if (!empty($model)) {
            if(!empty($request->input('title'))){
                $model->document_title = $request->input('title');
            }
            
            if ($model->save()) {
                return response()->json(["status" => "success", "message" => "You have successfully updted the record"], 200);
            } else {
                return response()->json(["status" => "error", "message" => "Something went wrong please try again"], 400);
            }
        } else {
            return response()->json(["status" => "error", "message" => "There are no property at the moment with this property id"], 400);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = Document::find($id);
        if(!empty($model)){
            if($model->delete()){
                return response()->json(["status" => "success"],200);
            }
            return response()->json(["status" => "error", "message" => "we could not delete this record, please try again"],400);
            
        }
        return response()->json(["status" => "error", "message" => "Something went wrong please retry"],400);
    }

    public function search()
    {

    }
}
