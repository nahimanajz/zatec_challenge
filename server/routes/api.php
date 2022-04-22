<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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