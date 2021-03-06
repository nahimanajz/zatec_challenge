<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchasesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
//use App\Http\Controllers\SigninControler;
use App\Http\Controllers\SigninControler;
use App\Http\Controllers\TopupController;
use App\Models\Topup;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/test', function(){
    return json_encode(["message"=> "Hi api are working !!!!"]);
});

Route::get('/products', 'ProductController@index'); 
Route::post('/products', [ProductController::class, 'store']);

//Route::post('/products/{user_id}', 'ProductController@store');
Route::post('/purchase/{user_id}/{product_id}', 'TransactionController@store'); // buy one product at a time, with just topped up amount

//TODO: DO NOT USER TRANSACTIONS TABLE
// Route::post('/auth/login', );
// Route::post('/auth/signup', [AuthController::class, 'register']);

Route::group(['prefix'=>'auth'], function (){
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/signup', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);

});

//product route 
//Route::group(['prefix'=>'products', 'middleware'=> 'auth:sanctum'], function (){
Route::group(['prefix'=>'products'], function (){   
  Route::get('/', [ProductController::class, 'index']);  
});

//Topup & purchas routes
//Route::group(['middleware' => 'auth:sanctum'], function() {
    
    Route::post('/topup/create', [TopupController::class, 'store']);
    Route::get('/topups/all/{user_id}', [TopupController::class, 'index']);
    Route::get('/purchases/all/{user_id}', [PurchasesController::class, 'index']);
    Route::post('/purchases/new/{user_id}/{product_id}', [PurchasesController::class, 'store']);
    Route::put('/discount/{product_id}/{discount}', [ProductController::class, 'update']);
    Route::get('/user/{user_id}', function($userId){
       return User::find($userId)->balance;
    });
//});