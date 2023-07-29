<?php

use App\Http\Controllers\Api\ActivitiesController;
use App\Http\Controllers\Api\AffiliateController;
use App\Http\Controllers\Api\AmenityController;
use App\Http\Controllers\Api\ClientAdminController;
use App\Http\Controllers\Api\ClientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\MaterialController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ProjectDocumentsController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\UnitController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::group(['prefix' => 'user', ], function () {
    //this route is for usersfunctions that dontneed auth
    Route::post("login",[UserController::class , "login"]);
    Route::post("recoverpassword/{id}", [UserController::class, 'resetpassword']);
    Route::post("sendpasswordresetlink", [UserController::class, 'sendpasswordresetlink']);
    Route::get("/paymentreceipt/{id}",[PropertyController::class,"paymentReceipt"]);
});

Route::group(['prefix' => 'user', 'middleware' => ['auth:sanctum']], function () {
    //Route::middleware('auth:sanctum')->group( function () {
    Route::post('/', [UserController::class, 'index'])->name('users');
    Route::get("deleteuser/{id}", [UserController::class, 'destroy']);
    Route::post("adduser", [UserController::class, 'register']);
    Route::post("/search",[UserController::class,"search"]);
    Route::post("/addcommission/{id}",[PropertyController::class,"agentCommision"]);
    Route::get("/logout",[UserController::class,"logout"])->name("logout");
});


Route::group(['prefix' => 'site', 'middleware' => ['auth:sanctum']], function () {
    //Route::middleware('auth:sanctum')->group( function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('activities', [ActivitiesController::class, 'index'])->name('activities');
});

Route::group(['prefix' => 'affiliate', 'middleware' => ['auth:sanctum']], function(){
    Route::get("/", [AffiliateController::class, 'index']);
    Route::post("/create",[AffiliateController::class,"store"]);
    Route::get("/show/{id}",[AffiliateController::class,"show"]);
    Route::post("/update/{id}",[AffiliateController::class,"update"]);
    Route::delete("/destroy/{id}",[AffiliateController::class,"destroy"]);
    Route::post("/search",[AffiliateController::class,"search"]);
    Route::post("/addcommission/{id}",[PropertyController::class,"agentCommision"]);
});

Route::group(['prefix' => 'material', 'middleware' => ['auth:sanctum']], function(){
    Route::post("/", [MaterialController::class, 'index']);
    Route::post("/create", [MaterialController::class, 'store']);
    Route::get("/show/{id}", [MaterialController::class, 'show']);
    Route::post("/update/{id}", [MaterialController::class, 'update']);
    Route::delete("/destroy/{id}",[MaterialController::class,"destroy"]);
    Route::post("/search",[MaterialController::class,"search"]);
});

Route::group(['prefix' => 'materialtype', 'middleware' => ['auth:sanctum']], function(){
    Route::post("/", [MaterialController::class, 'indexMaterialtype']);
    Route::post("/create", [MaterialController::class, 'storeMaterialtype']);
    Route::get("/show/{id}", [MaterialController::class, 'showMaterialtype']);
    Route::get("/showmaterialtypewithmaterialid/{id}", [MaterialController::class, 'showMaterialtypeBasedOnMaterialID']);
    Route::post("/update/{id}", [MaterialController::class, 'updateMaterialtype']);
    Route::delete("/destroy/{id}",[MaterialController::class,"destroyMaterialtype"]);
    Route::post("/search",[MaterialController::class,"searchMaterialtype"]);
});

Route::group(['prefix' => 'unit', 'middleware' => ['auth:sanctum']], function(){
    Route::post("/", [UnitController::class, 'index']);
    Route::post("/create", [UnitController::class, 'store']);
    Route::get("/show/{id}", [UnitController::class, 'show']);
    Route::post("/update/{id}", [UnitController::class, 'update']);
    Route::delete("/destroy/{id}",[UnitController::class,"destroy"]);
    Route::post("/search",[UnitController::class,"search"]);
});

Route::group(['prefix' => 'project', 'middleware' => ['auth:sanctum']], function(){
    Route::post("/", [ProjectController::class, 'index']);
    Route::post("/create", [ProjectController::class, 'store']);
    Route::get("/show/{id}", [ProjectController::class, 'show']);
    Route::post("/update/{id}", [ProjectController::class, 'update']);
    Route::delete("/destroy/{id}",[ProjectController::class,"destroy"]);
    Route::post("/search",[ProjectController::class,"search"]);
});

Route::group(['prefix' => 'client', 'middleware' => ['auth:sanctum']], function(){
    Route::post("/", [ClientController::class, 'index']);
    Route::post("/create", [ClientController::class, 'store']);
    Route::get("/show/{id}", [ClientController::class, 'show']);
    Route::post("/update/{id}", [ClientController::class, 'update']);
    Route::delete("/destroy/{id}",[ClientController::class,"destroy"]);
    Route::post("/search",[ClientController::class,"search"]);
});
// Route::group(['prefix' => 'client/admin', 'middleware' => ['auth:client']], function(){
//     Route::post("/", [ClientAdminController::class, 'index']);
//     Route::get("/dashboard", [ClientAdminController::class, 'dashboard']);
// });

Route::group(['prefix' => 'property', 'middleware' => ['auth:sanctum']], function(){
    Route::post("/", [PropertyController::class, 'index']);
    Route::post("/create", [PropertyController::class, 'store']);
    Route::get("/show/{id}", [PropertyController::class, 'show']);
    Route::post("/update/{id}", [PropertyController::class, 'update']);
    Route::post("/search",[PropertyController::class,"search"]);
    Route::delete("/destroy/{id}",[PropertyController::class,"destroy"]);
    Route::get("/stats/{id}",[PropertyController::class,"stats"]);
    Route::post("/addpayment",[PropertyController::class,"addPayment"]);
    Route::get("/client/{id}",[PropertyController::class,"client"]);
    Route::post("/addamenity",[PropertyController::class,"addAmenity"]);
    Route::patch("/updateamenity/{id}",[PropertyController::class,"updateAmenity"]);
    Route::delete("/deleteamenity/{id}",[PropertyController::class,"deleteAmenity"]);
    Route::post("/viewpayment/{id}",[PropertyController::class,"viewPayment"]);
    Route::post("/allpayment/{id}",[PropertyController::class,"allPayment"]);
    Route::get("/agent/{id}",[PropertyController::class,"agent"]);
    Route::post("/addcommission/{id}",[PropertyController::class,"agentCommision"]);
    Route::get("/paymentreceipt/{id}",[PropertyController::class,"paymentReceipt"]);
});

Route::group(['prefix' => 'amenity', 'middleware' => ['auth:sanctum']], function(){
    Route::post("/", [AmenityController::class, 'index']);
    Route::post("/create", [AmenityController::class, 'store']);
    Route::get("/show/{id}", [AmenityController::class, 'show']);
    Route::post("/update/{id}", [AmenityController::class, 'update']);
    Route::delete("/destroy/{id}",[AmenityController::class,"destroy"]);
    Route::post("/search",[AmenityController::class,"search"]);
});

Route::group(['prefix' => 'clientadmin'], function () {
    //Route::middleware('auth:sanctum')->group( function () {
    Route::post('login', [ClientAdminController::class, 'login'])->name('clientlogin');
    
});

Route::group(['prefix' => 'clientadmin', 'middleware' => ['auth:client']], function(){ 
    Route::get('/', [ClientAdminController::class, 'index'])->name('clientindex');
    Route::get('/allprojects', [ClientAdminController::class, 'allProjects'])->name('clientprojects');
    Route::get('/allproperties', [ClientAdminController::class, 'allProperties'])->name('clientprojects');
    Route::get('/propertydocument', [ClientAdminController::class, 'allProperties'])->name('clientprojects');
});

Route::group(['prefix' => 'document', 'middleware' => ['auth:sanctum']], function(){ 
    Route::post('/', [ProjectDocumentsController::class, 'index'])->name('documentindex');
    Route::post('/create', [ProjectDocumentsController::class, 'store'])->name('createdocument');
    Route::post('/show/{id}', [ProjectDocumentsController::class, 'show'])->name('viewdocument');
    Route::delete('/delete/{id}', [ProjectDocumentsController::class, 'destroy'])->name('destroy');
});
