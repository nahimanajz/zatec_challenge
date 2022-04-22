<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
//use App\Http\Controllers\SigninControler;
use App\Http\Controllers\SigninControler;
use App\Http\Controllers\TopupController;
use App\Models\Topup;


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

Route::post('/products/create', 'ProductController@store');
Route::put('/products/create', 'ProductController@store');
Route::get('/products', 'ProductController@index'); // only admin

// update amount
Route::post('/products/{user_id}', 'ProductController@store');
Route::post('/purchase/{user_id}/{product_id}', 'TransactionController@store'); // buy one product at a time, with just topped up amount

//TODO: DO NOT USER TRANSACTIONS TABLE
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/signup', [AuthController::class, 'register']);


//product route 
Route::get('/products', [ProductController::class, 'index']);
//Topuproutes
Route::post('/topup/create', [TopupController::class, 'store']);