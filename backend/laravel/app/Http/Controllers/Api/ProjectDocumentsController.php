<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\DocumentResource;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectDocumentsController extends Controller
{
    /**
     * @group Documents
     *
     * List documents for a specific project.
     *
     * This endpoint allows you to retrieve a paginated list of documents for a specific project.
     *
     * @queryParam project required The ID of the project. Example: 1
     * @queryParam fileType The type of the document. Example: 'pdf'
     * @queryParam perpage The number of documents to show per page. Example: 10
     * @queryParam page The current page of documents to retrieve. Example: 1
     * @queryParam total The total number of pages available. Example: 5
     *
     * @response 200 {
     *     "status": "success",
     *     "data": [
     *         {
     *             "id": 1,
     *             "file_name": "document.pdf",
     *             "file_type": "pdf",
     *             "project_id": 1,
     *             "created_at": "2023-10-30T12:00:00Z"
     *         },
     *         {
     *             "id": 2,
     *             "file_name": "document2.pdf",
     *             "file_type": "pdf",
     *             "project_id": 1,
     *             "created_at": "2023-10-31T12:00:00Z"
     *         }
     *         // More document objects
     *     ]
     * }
     *
     * @response 400 {
     *     "status": "error",
     *     "message": "Ensure that all required fields are properly filled."
     * }
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
        if (!empty($request->input("fileType"))) {
            $model = Document::where(["project_id" => $project])->orderBy('id', 'desc')->where(["file_type" => $request->input("fileType")])->paginate($perPage, ["*"], "page", $page);
        } else {
            $model = Document::where(["project_id" => $project])->orderBy('id', 'desc')->paginate($perPage, ["*"], "page", $page);
        }

        return DocumentResource::collection($model);
    }



    /**
     * @group Documents
     *
     * Upload a document for a specific project.
     *
     * This endpoint allows you to upload a document for a specific project.
     *
     * @bodyParam project required The ID of the project. Example: 1
     * @bodyParam title required The title of the document. Example: 'Project Report'
     * @bodyParam file required The document file to upload. Example: (binary)
     * @bodyParam fileType required The type of the document. Example: 'pdf'
     *
     * @response 200 {
     *     "status": "success",
     *     "message": "Document uploaded successfully."
     * }
     *
     * @response 400 {
     *     "status": "error",
     *     "message": "Ensure that all required fields are properly filled."
     * }
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
     * @group Documents
     *
     * Get details of a specific document.
     *
     * This endpoint allows you to retrieve details of a specific document by providing its ID.
     *
     * @urlParam id required The ID of the document. Example: 1
     *
     * @response 200 {
     *     "data": {
     *         "id": 1,
     *         "project_id": 2,
     *         "document_title": "Project Report",
     *         "file_type": "pdf",
     *         "file_path": "images/projects_document/2/document.pdf",
     *         "log_user_id": 3,
     *         "status": 1,
     *         "created_at": "2023-10-30T12:00:00Z",
     *         "updated_at": "2023-10-30T14:30:00Z"
     *     },
     *     "status": "success",
     *     "message": "Document details retrieved successfully."
     * }
     *
     * @response 404 {
     *     "status": "error",
     *     "message": "Document not found."
     * }
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
     * @group Documents
     *
     * Update a document's details.
     *
     * This endpoint allows you to update the details of a specific document by providing its ID.
     *
     * @urlParam id required The ID of the document. Example: 1
     *
     * @bodyParam title string optional The updated title of the document. Example: New Title
     *
     * @response 200 {
     *     "status": "success",
     *     "message": "Document details updated successfully."
     * }
     *
     * @response 400 {
     *     "status": "error",
     *     "message": "Ensure that all required fields are properly filled."
     * }
     *
     * @response 404 {
     *     "status": "error",
     *     "message": "Document not found."
     * }
     */
    public function update(Request $request, string $id)
    {

        if (count($request->all()) < 1) {
            return response()->json(['status' => 'error', 'message' => "ensure that all required filed are properly filled "], 400);
        }

        $model = Document::find($id);
        if (!empty($model)) {
            if (!empty($request->input('title'))) {
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
     * @group Documents
     *
     * Delete a document.
     *
     * This endpoint allows you to delete a specific document by providing its ID.
     *
     * @urlParam id required The ID of the document. Example: 1
     *
     * @response 200 {
     *     "status": "success",
     *     "message": "Document deleted successfully."
     * }
     *
     * @response 400 {
     *     "status": "error",
     *     "message": "We could not delete this record. Please try again."
     * }
     *
     * @response 404 {
     *     "status": "error",
     *     "message": "Document not found."
     * }
     */
    public function destroy(string $id)
    {
        $model = Document::find($id);
        if (!empty($model)) {
            if ($model->delete()) {
                return response()->json(["status" => "success"], 200);
            }
            return response()->json(["status" => "error", "message" => "we could not delete this record, please try again"], 400);
        }
        return response()->json(["status" => "error", "message" => "Something went wrong please retry"], 400);
    }

    public function search()
    {
    }
}
